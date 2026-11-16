# 002-qa-account — почистване на предишния пуск; акаунт „QA Automation“ и неговият администратор през формите

- Пуск: 2026-11-12_13-19-50 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.14
- Спек: `tests/e2e/002-qa-account.spec.ts`
- Казуси: 1 от 2 проверки

## Казус 1: the QA account exists — created through the Accounts form when missing

_Известен от пуска 2026-11-12 10:10 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: [cleanup] 3 record(s) of the previous run are still there — remove them by hand before the run:
user/a20eafed-b958-4353-945a-2707ca85a320 (QA Manager)
user/5037b7a6-32c4-4ae0-9772-1ba9bbc0d024 (QA Booking Agent)
user/accb717a-e91a-4ce2-8dd5-cd5e275731a6 (QA Housekeeper)
```

**Как да се възпроизведе**

1. Спек `tests/e2e/002-qa-account.spec.ts`, проверка „the QA account exists — created through the Accounts form when missing“.

---

Какво проверява спекът: 002 — the QA account and its administrator exist, and the account is empty.
