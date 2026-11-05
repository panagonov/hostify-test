/**
 * The people of the QA account, one per role — the suite signs in as each of them (`signInAs(role)`), so every page is
 * tested from the role that works on it. Spec 100 creates them through Settings › Users (create when missing); they
 * share ONE known password (`QA_USERS_PASSWORD` of .env, the administrator's when unset). The administrator itself is
 * made by 002 (`QA_ADMIN_EMAIL`). E-mails end in `.test`: nothing is ever delivered.
 */
export type QaRole = 'admin' | 'manager' | 'propertyManager' | 'revenueManager' | 'bookingAgent' | 'accountant' | 'teamSupervisor' | 'housekeeper';

export interface QaUser {
    role: QaRole
    /** The role's name as the Users form offers it (the securityGroup name). */
    roleLabel: string
    name: string
    email: string
}

/** The people spec 100 creates. The property manager is NOT among them: the Users form locks a Property Manager to
 *  "Selected listings" and requires at least one listing — the account has none before the listings specs (2xx), so
 *  that person is created by the spec that follows the first listings (see docs/conventions.md → Data). */
export const QA_USERS: Record<Exclude<QaRole, 'admin'>, QaUser> = {
    manager: {role: 'manager', roleLabel: 'Manager', name: 'QA Manager', email: 'qa.manager@hostify-qa.test'},
    propertyManager: {role: 'propertyManager', roleLabel: 'Property Manager', name: 'QA Property Manager', email: 'qa.property.manager@hostify-qa.test'},
    revenueManager: {role: 'revenueManager', roleLabel: 'Revenue Manager', name: 'QA Revenue Manager', email: 'qa.revenue.manager@hostify-qa.test'},
    bookingAgent: {role: 'bookingAgent', roleLabel: 'Booking Agent', name: 'QA Booking Agent', email: 'qa.booking.agent@hostify-qa.test'},
    accountant: {role: 'accountant', roleLabel: 'Accountant', name: 'QA Accountant', email: 'qa.accountant@hostify-qa.test'},
    teamSupervisor: {role: 'teamSupervisor', roleLabel: 'Team Supervisor', name: 'QA Team Supervisor', email: 'qa.team.supervisor@hostify-qa.test'},
    housekeeper: {role: 'housekeeper', roleLabel: 'Housekeeper', name: 'QA Housekeeper', email: 'qa.housekeeper@hostify-qa.test'}
};

/** The roles spec 100 creates (no listings yet): everyone but the property manager. */
export const USERS_WITHOUT_LISTINGS: QaUser[] = Object.values(QA_USERS).filter(u => u.role !== 'propertyManager');
