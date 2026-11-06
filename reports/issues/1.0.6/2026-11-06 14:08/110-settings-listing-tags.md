# 110-settings-listing-tags — Settings › Listing tags: форма, записи през формата, сортиране и филтър по колони, табове, броене

- Пуск: 2026-11-06_14-08-44 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.6
- Спек: `tests/e2e/110-settings-listing-tags.spec.ts`
- Казуси: 1 от 5 проверки

## Казус 1: the page opens through the menu and the Create form behaves

_Нов в този пуск._

**Какво се обърка**

```
TimeoutError: page.goto: Timeout 60000ms exceeded.
Call log:
  - navigating to "https://hostify.bioseek.eu/app/", waiting until "domcontentloaded"

```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Страница: https://hostify.bioseek.eu/app/
3. Спек `tests/e2e/110-settings-listing-tags.spec.ts`, проверка „the page opens through the menu and the Create form behaves“.

**Скрийншоти**

![110-settings-listing-tags-1-screenshot.png](./110-settings-listing-tags-1-screenshot.png)


---

Какво проверява спекът: 110 — Settings › Listing tags: the first master-data page, and the TEMPLATE of a page spec.
