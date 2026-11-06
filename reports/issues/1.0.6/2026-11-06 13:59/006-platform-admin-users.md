# 006-platform-admin-users — Platform Admin › Users — формата „Create user“ на супер администратора: всяко поле, всеки таб, валидацията

- Пуск: 2026-11-06_13-59-50 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.6
- Спек: `tests/e2e/006-platform-admin-users.spec.ts`
- Казуси: 1 от 1 проверки

## Казус 1: the Create user form opens, every tab is presentable, an empty Save is refused

_Нов в този пуск._

**Какво се обърка**

```
TimeoutError: page.goto: Timeout 60000ms exceeded.
Call log:
  - navigating to "https://hostify.bioseek.eu/app/", waiting until "domcontentloaded"

```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като суперадминистратор (alarm@mail.bg).
2. Страница: https://hostify.bioseek.eu/app/
3. Спек `tests/e2e/006-platform-admin-users.spec.ts`, проверка „the Create user form opens, every tab is presentable, an empty Save is refused“.

**Скрийншоти**

![006-platform-admin-users-1-screenshot.png](./006-platform-admin-users-1-screenshot.png)


---

Какво проверява спекът: 006 — Platform Admin › Users: the super administrator's Create user form behaves and follows its layout.
