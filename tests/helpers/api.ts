import {request, type APIRequestContext} from '@playwright/test';
import {CONFIG} from './env';

export interface ApiAnswer<T = any> {
    success?: boolean
    data?: T
    count?: number
    message?: string
    error?: number
    status: number
    [key: string]: any
}

/**
 * Thin client of the Hydra REST API, signed in as one user (POST /user/login → bearer token). Used for SETUP and
 * VERIFICATION only — the journeys themselves go through the forms. Every call carries `x-demo-data: 1`, the same
 * header the browser sends (playwright.config.ts), so a record created here is a demo record too.
 */
export class ApiHelper {
    private constructor(
        private readonly ctx: APIRequestContext,
        readonly token: string,
        readonly user: {id: string; name?: string; email?: string; role?: any; tenant?: any; [key: string]: any}
    ) {}

    static async login(email: string, password: string): Promise<ApiHelper> {
        const ctx = await request.newContext({extraHTTPHeaders: {'x-demo-data': '1'}});
        const res = await ctx.post(`${CONFIG.apiUrl}/user/login`, {data: {email, password}});
        const body = await res.json().catch(() => ({}));
        if (!body?.success || !body?.data?.token) {
            await ctx.dispose();
            throw new Error(`API login failed for ${email}: HTTP ${res.status()} ${body?.message || ''}`.trim());
        }
        return new ApiHelper(ctx, body.data.token, body.data.user);
    }

    /** Whether the credentials are accepted — no session is kept. */
    static async canLogin(email: string, password: string): Promise<boolean> {
        try {
            const api = await ApiHelper.login(email, password);
            await api.dispose();
            return true;
        } catch {
            return false;
        }
    }

    async call<T = any>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, body?: unknown): Promise<ApiAnswer<T>> {
        const res = await this.ctx.fetch(`${CONFIG.apiUrl}${path}`, {
            method,
            headers: {Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'},
            // creating an account seeds its defaults through the CRUD (tens of seconds)
            timeout: method === 'POST' && path === '/tenant' ? 120_000 : 60_000,
            ...(body !== undefined ? {data: body} : {})
        });
        const json = await res.json().catch(() => ({}));
        return {...(json && typeof json === 'object' ? json : {raw: json}), status: res.status()};
    }

    get<T = any>(path: string, query: Record<string, string | number | boolean> = {}) {
        const qs = new URLSearchParams(Object.entries(query).map(([k, v]) => [k, String(v)])).toString();
        return this.call<T>('GET', qs ? `${path}?${qs}` : path);
    }

    post<T = any>(path: string, body: unknown) { return this.call<T>('POST', path, body); }

    put<T = any>(path: string, body: unknown) { return this.call<T>('PUT', path, body); }

    delete<T = any>(path: string, query: Record<string, string> = {}) {
        const qs = new URLSearchParams(query).toString();
        return this.call<T>('DELETE', qs ? `${path}?${qs}` : path);
    }

    /** A write that must succeed — returns `data`, throws with the server's message otherwise. */
    async must<T = any>(method: 'POST' | 'PUT', path: string, body: unknown): Promise<T> {
        const res = await this.call<T>(method, path, body);
        if (!res.success) throw new Error(`${method} ${path} failed (${res.status}): ${res.message || JSON.stringify(res).slice(0, 400)}`);
        return res.data as T;
    }

    /** GET /<entity>/search → the rows (at most `size`, default 50). */
    async search<T = any>(entity: string, query: Record<string, string | number | boolean> = {}): Promise<T[]> {
        const res = await this.get<T[]>(`/${entity}/search`, {size: 50, ...query});
        return Array.isArray(res.data) ? res.data : [];
    }

    /** GET /<entity>/search → the exact count the server reports for the query. */
    async count(entity: string, query: Record<string, string | number | boolean> = {}): Promise<number> {
        const res = await this.get<any[]>(`/${entity}/search`, {size: 1, ...query});
        if (typeof res.count === 'number') return res.count;
        return Array.isArray(res.data) ? res.data.length : 0;
    }

    /** GET /<entity>?id= → the record, or null when it does not exist (or may not be read). */
    async read<T = any>(entity: string, id: string): Promise<T | null> {
        const res = await this.get<T>(`/${entity}`, {id});
        const data: any = res.success ? res.data : null;
        // a missing record answers success with an empty body (itemNotFound), not an error
        return data && typeof data === 'object' && (data.id || data._id) ? (data as T) : null;
    }

    /** DELETE /<entity>?id= → true when the server removed it (or it was already gone). */
    async remove(entity: string, id: string): Promise<{ok: boolean; message?: string}> {
        const res = await this.delete(`/${entity}`, {id});
        if (res.success || res.status === 404) return {ok: true};
        return {ok: false, message: res.message || `HTTP ${res.status}`};
    }

    async dispose() {
        await this.ctx.dispose();
    }
}
