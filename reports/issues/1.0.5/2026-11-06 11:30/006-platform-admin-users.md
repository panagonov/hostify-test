# 006-platform-admin-users — Platform Admin › Users — формата „Create user“ на супер администратора: всяко поле, всеки таб, валидацията

- Пуск: 2026-11-06_11-30-05 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.5
- Спек: `tests/e2e/006-platform-admin-users.spec.ts`
- Казуси: 1 от 1 проверки

## Казус 1: the Create user form opens, every tab is presentable, an empty Save is refused

_Нов в този пуск._

**Какво се обърка**

```
Error: platform-user-form: the screen is not presentable (5):
- [error/field-parts] "Account": the parts of one field do not match — input 40px, button 34px @ [data-test=tenant] div.ant-space-compact.css-ry7cab
- [error/field-parts] "Role": the parts of one field do not match — input 40px, button 34px @ [data-test=role] div.ant-space-compact.css-ry7cab
- [error/field-parts] "Default account": the parts of one field do not match — input 40px, button 34px @ [data-test=defaultAccount] div.ant-space-compact.css-ry7cab
- [error/field-parts] "Owner": the parts of one field do not match — input 40px, button 34px @ [data-test=owner] div.ant-space-compact.css-ry7cab
- [error/field-height] "Password" is 56px tall — the form's fields are 40px @ [data-test=section-info] span.ant-input-affix-wrapper.ant-input-affix-wrapper-lg
```
- на екрана (platform-user-form): "Account": the parts of one field do not match — input 40px, button 34px @ [data-test=tenant] div.ant-space-compact.css-ry7cab
- на екрана (platform-user-form): "Role": the parts of one field do not match — input 40px, button 34px @ [data-test=role] div.ant-space-compact.css-ry7cab
- на екрана (platform-user-form): "Default account": the parts of one field do not match — input 40px, button 34px @ [data-test=defaultAccount] div.ant-space-compact.css-ry7cab
- на екрана (platform-user-form): "Owner": the parts of one field do not match — input 40px, button 34px @ [data-test=owner] div.ant-space-compact.css-ry7cab
- на екрана (platform-user-form): "Password" is 56px tall — the form's fields are 40px @ [data-test=section-info] span.ant-input-affix-wrapper.ant-input-affix-wrapper-lg

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като суперадминистратор (alarm@mail.bg).
2. Страница: https://hostify.bioseek.eu/app/platformAdmin/users
3. Спек `tests/e2e/006-platform-admin-users.spec.ts`, проверка „the Create user form opens, every tab is presentable, an empty Save is refused“.

**Скрийншоти**

_(снимката е махната от QA)_
_(снимката е махната от QA)_


**Предупреждения в конзолата**

- [ReviewsMenuChannels] TypeError: Failed to fetch
- [InboxMenuCount] TypeError: Failed to fetch
- [AlertsMenuCount] TypeError: Failed to fetch

---

Какво проверява спекът: 006 — Platform Admin › Users: the super administrator's Create user form behaves and follows its layout.
