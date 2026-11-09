# 110-settings-listing-tags — Settings › Listing tags: форма, записи през формата, сортиране и филтър по колони, табове, броене

- Пуск: 2026-11-09_12-21-50 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.10
- Спек: `tests/e2e/110-settings-listing-tags.spec.ts`
- Казуси: 1 от 5 проверки

## Казус 1: every column sorts and filters; the item page opens with its tabs

_Нов в този пуск._

**Какво се обърка**

```
TimeoutError: locator.click: Timeout 20000ms exceeded.
Call log:
  - waiting for locator('.ant-table-filter-dropdown:visible').last().locator('.hydra-filter-container__apply, .ant-btn-primary').first()
    - locator resolved to <button type="button" class="ant-btn css-ry7cab css-var-_r_5_ ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-sm hydra-filter-container__apply">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <button type="button" tabindex="-1" aria-label="Next month (PageDown)" class="ant-picker-header-next-btn">…</button> from <div>…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Страница: https://hostify.bioseek.eu/app/settings/listingTags
3. Спек `tests/e2e/110-settings-listing-tags.spec.ts`, проверка „every column sorts and filters; the item page opens with its tabs“ — стъпките:
4. sort the column "Tag" ascending (click its header)
5. sort the column "Tag" descending (click its header)
6. filter the column "Tag" by "view" (its filter icon), then Clear all
7. filter the column "Description" by "Listings" (its filter icon), then Clear all
8. sort the column "Active" ascending (click its header)
9. sort the column "Active" descending (click its header)
10. filter the column "Active" by "Yes" (its filter icon), then Clear all
11. sort the column "Date created" ascending (click its header)
12. sort the column "Date created" descending (click its header)
13. filter the column "Date created" by "2026" (its filter icon), then Clear all

**Скрийншоти**

![110-settings-listing-tags-1-screenshot.png](./110-settings-listing-tags-1-screenshot.png)


**Предупреждения в конзолата**

- [ReviewsMenuChannels] TypeError: Failed to fetch
- [hydraPartner] navbarExtensionLoader failed TypeError: Failed to fetch
- [InboxMenuCount] TypeError: Failed to fetch
- [demoData] the demo data status could not be read — no welcome modal TypeError: Failed to fetch
- [AlertsMenuCount] TypeError: Failed to fetch
- [hydraPartner] the plugin surfaces were not read TypeError: Failed to fetch

---

Какво проверява спекът: 110 — Settings › Listing tags: the first master-data page, and the TEMPLATE of a page spec.
