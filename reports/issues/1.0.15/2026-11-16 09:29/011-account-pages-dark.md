# 011-account-pages-dark — тъмната тема на акаунта — всяка страница се отваря, оглежда се и нищо не остава светло

- Пуск: 2026-11-16_09-29-38 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.15
- Спек: `tests/e2e/011-account-pages-dark.spec.ts`
- Казуси: 32 от 162 проверки

## Казус 1: inboxThreads in the dark theme (/app/inbox/inboxThreads)

_Нов в този пуск._

**Какво се обърка**

```
Error: inboxThreads: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×19 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: INBOX › Conversations — https://hostify.bioseek.eu/app/inbox/inboxThreads
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „inboxThreads in the dark theme (/app/inbox/inboxThreads)“.

**Скрийншоти**

![011-account-pages-dark-1-_shot-inboxThreads.png](./011-account-pages-dark-1-_shot-inboxThreads.png)
![011-account-pages-dark-1-_screenshot.png](./011-account-pages-dark-1-_screenshot.png)


## Казус 2: inboxAiRuns in the dark theme (/app/inbox/inboxAiRuns)

_Нов в този пуск._

**Какво се обърка**

```
Error: inboxAiRuns: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×13 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: INBOX › AI runs — https://hostify.bioseek.eu/app/inbox/inboxAiRuns
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „inboxAiRuns in the dark theme (/app/inbox/inboxAiRuns)“.

**Скрийншоти**

![011-account-pages-dark-2-_shot-inboxAiRuns.png](./011-account-pages-dark-2-_shot-inboxAiRuns.png)
![011-account-pages-dark-2-_screenshot.png](./011-account-pages-dark-2-_screenshot.png)


## Казус 3: messageTemplates in the dark theme (/app/inbox/messageTemplates)

_Нов в този пуск._

**Какво се обърка**

```
Error: messageTemplates: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×8 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: INBOX › Message templates — https://hostify.bioseek.eu/app/inbox/messageTemplates
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „messageTemplates in the dark theme (/app/inbox/messageTemplates)“.

**Скрийншоти**

![011-account-pages-dark-3-_shot-messageTemplates.png](./011-account-pages-dark-3-_shot-messageTemplates.png)
![011-account-pages-dark-3-_screenshot.png](./011-account-pages-dark-3-_screenshot.png)


## Казус 4: emailTemplates in the dark theme (/app/inbox/emailTemplates)

_Нов в този пуск._

**Какво се обърка**

```
Error: emailTemplates: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×9 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: INBOX › E-mail templates — https://hostify.bioseek.eu/app/inbox/emailTemplates
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „emailTemplates in the dark theme (/app/inbox/emailTemplates)“.

**Скрийншоти**

![011-account-pages-dark-4-_shot-emailTemplates.png](./011-account-pages-dark-4-_shot-emailTemplates.png)
![011-account-pages-dark-4-_screenshot.png](./011-account-pages-dark-4-_screenshot.png)


## Казус 5: emailLogs in the dark theme (/app/inbox/emailLogs)

_Нов в този пуск._

**Какво се обърка**

```
Error: emailLogs: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×8 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: INBOX › E-mail log — https://hostify.bioseek.eu/app/inbox/emailLogs
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „emailLogs in the dark theme (/app/inbox/emailLogs)“.

**Скрийншоти**

![011-account-pages-dark-5-_shot-emailLogs.png](./011-account-pages-dark-5-_shot-emailLogs.png)
![011-account-pages-dark-5-_screenshot.png](./011-account-pages-dark-5-_screenshot.png)


## Казус 6: inboxTags in the dark theme (/app/inbox/inboxTags)

_Нов в този пуск._

**Какво се обърка**

```
Error: inboxTags: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×8 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: INBOX › Inbox tags — https://hostify.bioseek.eu/app/inbox/inboxTags
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „inboxTags in the dark theme (/app/inbox/inboxTags)“.

**Скрийншоти**

![011-account-pages-dark-6-_shot-inboxTags.png](./011-account-pages-dark-6-_shot-inboxTags.png)
![011-account-pages-dark-6-_screenshot.png](./011-account-pages-dark-6-_screenshot.png)


## Казус 7: tasks in the dark theme (/app/operations/tasks)

_Нов в този пуск._

**Какво се обърка**

```
Error: tasks: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×17 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: TASKS › Tasks — https://hostify.bioseek.eu/app/operations/tasks
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „tasks in the dark theme (/app/operations/tasks)“.

**Скрийншоти**

![011-account-pages-dark-7-_shot-tasks.png](./011-account-pages-dark-7-_shot-tasks.png)
![011-account-pages-dark-7-_screenshot.png](./011-account-pages-dark-7-_screenshot.png)


## Казус 8: housekeepingBoard in the dark theme (/app/operations/housekeepingBoard)

_Нов в този пуск._

**Какво се обърка**

```
Error: housekeepingBoard: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×11 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: TASKS › Housekeeping — https://hostify.bioseek.eu/app/operations/housekeepingBoard
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „housekeepingBoard in the dark theme (/app/operations/housekeepingBoard)“.

**Скрийншоти**

![011-account-pages-dark-8-_shot-housekeepingBoard.png](./011-account-pages-dark-8-_shot-housekeepingBoard.png)
![011-account-pages-dark-8-_screenshot.png](./011-account-pages-dark-8-_screenshot.png)


## Казус 9: taskIssues in the dark theme (/app/operations/taskIssues)

_Нов в този пуск._

**Какво се обърка**

```
Error: taskIssues: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×15 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: TASKS › Issues — https://hostify.bioseek.eu/app/operations/taskIssues
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „taskIssues in the dark theme (/app/operations/taskIssues)“.

**Скрийншоти**

![011-account-pages-dark-9-_shot-taskIssues.png](./011-account-pages-dark-9-_shot-taskIssues.png)
![011-account-pages-dark-9-_screenshot.png](./011-account-pages-dark-9-_screenshot.png)


## Казус 10: taskTemplates in the dark theme (/app/operations/taskTemplates)

_Нов в този пуск._

**Какво се обърка**

```
Error: taskTemplates: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×9 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: TASKS › Templates — https://hostify.bioseek.eu/app/operations/taskTemplates
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „taskTemplates in the dark theme (/app/operations/taskTemplates)“.

**Скрийншоти**

![011-account-pages-dark-10-_shot-taskTemplates.png](./011-account-pages-dark-10-_shot-taskTemplates.png)
![011-account-pages-dark-10-_screenshot.png](./011-account-pages-dark-10-_screenshot.png)


## Казус 11: defaultAssignments in the dark theme (/app/operations/defaultAssignments)

_Нов в този пуск._

**Какво се обърка**

```
Error: defaultAssignments: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×9 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: TASKS › Assignments — https://hostify.bioseek.eu/app/operations/defaultAssignments
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „defaultAssignments in the dark theme (/app/operations/defaultAssignments)“.

**Скрийншоти**

![011-account-pages-dark-11-shot-defaultAssignments.png](./011-account-pages-dark-11-shot-defaultAssignments.png)
![011-account-pages-dark-11-screenshot.png](./011-account-pages-dark-11-screenshot.png)


## Казус 12: taskTeams in the dark theme (/app/operations/taskTeams)

_Нов в този пуск._

**Какво се обърка**

```
Error: taskTeams: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×9 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: TASKS › Teams — https://hostify.bioseek.eu/app/operations/taskTeams
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „taskTeams in the dark theme (/app/operations/taskTeams)“.

**Скрийншоти**

![011-account-pages-dark-12-_shot-taskTeams.png](./011-account-pages-dark-12-_shot-taskTeams.png)
![011-account-pages-dark-12-_screenshot.png](./011-account-pages-dark-12-_screenshot.png)


## Казус 13: taskNotificationSettings in the dark theme (/app/operations/taskNotificationSettings)

_Нов в този пуск._

**Какво се обърка**

```
Error: taskNotificationSettings: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×10 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: TASKS › Notifications — https://hostify.bioseek.eu/app/operations/taskNotificationSettings
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „taskNotificationSettings in the dark theme (/app/operations/taskNotificationSettings)“.

**Скрийншоти**

![011-account-pages-dark-13-shot-taskNotificationSettings.png](./011-account-pages-dark-13-shot-taskNotificationSettings.png)
![011-account-pages-dark-13-screenshot.png](./011-account-pages-dark-13-screenshot.png)


## Казус 14: taskExpenses in the dark theme (/app/operations/taskExpenses)

_Нов в този пуск._

**Какво се обърка**

```
Error: taskExpenses: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×13 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: TASKS › Task expenses — https://hostify.bioseek.eu/app/operations/taskExpenses
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „taskExpenses in the dark theme (/app/operations/taskExpenses)“.

**Скрийншоти**

![011-account-pages-dark-14-_shot-taskExpenses.png](./011-account-pages-dark-14-_shot-taskExpenses.png)
![011-account-pages-dark-14-_screenshot.png](./011-account-pages-dark-14-_screenshot.png)


## Казус 15: reservations in the dark theme (/app/reservationsMenu/reservations)

_Нов в този пуск._

**Какво се обърка**

```
Error: reservations: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×17 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: RESERVATIONS › Reservations — https://hostify.bioseek.eu/app/reservationsMenu/reservations
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „reservations in the dark theme (/app/reservationsMenu/reservations)“.

**Скрийншоти**

![011-account-pages-dark-15-shot-reservations.png](./011-account-pages-dark-15-shot-reservations.png)
![011-account-pages-dark-15-screenshot.png](./011-account-pages-dark-15-screenshot.png)


## Казус 16: reservationAlterations in the dark theme (/app/reservationsMenu/reservationAlterations)

_Нов в този пуск._

**Какво се обърка**

```
Error: reservationAlterations: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×15 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: RESERVATIONS › Alterations — https://hostify.bioseek.eu/app/reservationsMenu/reservationAlterations
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „reservationAlterations in the dark theme (/app/reservationsMenu/reservationAlterations)“.

**Скрийншоти**

![011-account-pages-dark-16-shot-reservationAlterations.png](./011-account-pages-dark-16-shot-reservationAlterations.png)
![011-account-pages-dark-16-screenshot.png](./011-account-pages-dark-16-screenshot.png)


## Казус 17: reservationImports in the dark theme (/app/reservationsMenu/reservationImports)

_Нов в този пуск._

**Какво се обърка**

```
Error: reservationImports: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×16 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: RESERVATIONS › Excel import — https://hostify.bioseek.eu/app/reservationsMenu/reservationImports
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „reservationImports in the dark theme (/app/reservationsMenu/reservationImports)“.

**Скрийншоти**

![011-account-pages-dark-17-shot-reservationImports.png](./011-account-pages-dark-17-shot-reservationImports.png)
![011-account-pages-dark-17-screenshot.png](./011-account-pages-dark-17-screenshot.png)


## Казус 18: listings in the dark theme (/app/listingsMenu/listings)

_Нов в този пуск._

**Какво се обърка**

```
Error: listings: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×28 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: LISTINGS › Listings — https://hostify.bioseek.eu/app/listingsMenu/listings
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „listings in the dark theme (/app/listingsMenu/listings)“ — стъпките:
4. every column has a header and the actions column is the last one

**Скрийншоти**

![011-account-pages-dark-18-_shot-listings.png](./011-account-pages-dark-18-_shot-listings.png)
![011-account-pages-dark-18-_screenshot.png](./011-account-pages-dark-18-_screenshot.png)


## Казус 19: listingFaqs in the dark theme (/app/listingsMenu/listingFaqs)

_Нов в този пуск._

**Какво се обърка**

```
Error: listingFaqs: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×7 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: LISTINGS › Listing faqs — https://hostify.bioseek.eu/app/listingsMenu/listingFaqs
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „listingFaqs in the dark theme (/app/listingsMenu/listingFaqs)“.

**Скрийншоти**

![011-account-pages-dark-19-_shot-listingFaqs.png](./011-account-pages-dark-19-_shot-listingFaqs.png)
![011-account-pages-dark-19-_screenshot.png](./011-account-pages-dark-19-_screenshot.png)


## Казус 20: guidebookTemplates in the dark theme (/app/listingsMenu/guidebookTemplates)

_Нов в този пуск._

**Какво се обърка**

```
Error: guidebookTemplates: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×8 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: LISTINGS › Guidebook templates — https://hostify.bioseek.eu/app/listingsMenu/guidebookTemplates
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „guidebookTemplates in the dark theme (/app/listingsMenu/guidebookTemplates)“.

**Скрийншоти**

![011-account-pages-dark-20-shot-guidebookTemplates.png](./011-account-pages-dark-20-shot-guidebookTemplates.png)
![011-account-pages-dark-20-screenshot.png](./011-account-pages-dark-20-screenshot.png)


## Казус 21: listingUnits in the dark theme (/app/listingsMenu/listingUnits)

_Нов в този пуск._

**Какво се обърка**

```
Error: listingUnits: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×13 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: LISTINGS › Units — https://hostify.bioseek.eu/app/listingsMenu/listingUnits
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „listingUnits in the dark theme (/app/listingsMenu/listingUnits)“.

**Скрийншоти**

![011-account-pages-dark-21-_shot-listingUnits.png](./011-account-pages-dark-21-_shot-listingUnits.png)
![011-account-pages-dark-21-_screenshot.png](./011-account-pages-dark-21-_screenshot.png)


## Казус 22: listingBuildings in the dark theme (/app/listingsMenu/listingBuildings)

_Нов в този пуск._

**Какво се обърка**

```
Error: listingBuildings: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×8 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: LISTINGS › Buildings — https://hostify.bioseek.eu/app/listingsMenu/listingBuildings
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „listingBuildings in the dark theme (/app/listingsMenu/listingBuildings)“.

**Скрийншоти**

![011-account-pages-dark-22-shot-listingBuildings.png](./011-account-pages-dark-22-shot-listingBuildings.png)
![011-account-pages-dark-22-screenshot.png](./011-account-pages-dark-22-screenshot.png)


## Казус 23: listingLinks in the dark theme (/app/listingsMenu/listingLinks)

_Нов в този пуск._

**Какво се обърка**

```
Error: listingLinks: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×14 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: LISTINGS › Parent/Child & links — https://hostify.bioseek.eu/app/listingsMenu/listingLinks
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „listingLinks in the dark theme (/app/listingsMenu/listingLinks)“.

**Скрийншоти**

![011-account-pages-dark-23-_shot-listingLinks.png](./011-account-pages-dark-23-_shot-listingLinks.png)
![011-account-pages-dark-23-_screenshot.png](./011-account-pages-dark-23-_screenshot.png)


## Казус 24: listingPolicies in the dark theme (/app/listingsMenu/listingPolicies)

_Нов в този пуск._

**Какво се обърка**

```
Error: listingPolicies: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×10 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: LISTINGS › Cancellation policies — https://hostify.bioseek.eu/app/listingsMenu/listingPolicies
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „listingPolicies in the dark theme (/app/listingsMenu/listingPolicies)“.

**Скрийншоти**

![011-account-pages-dark-24-_shot-listingPolicies.png](./011-account-pages-dark-24-_shot-listingPolicies.png)
![011-account-pages-dark-24-_screenshot.png](./011-account-pages-dark-24-_screenshot.png)


## Казус 25: guests in the dark theme (/app/guests)

_Нов в този пуск._

**Какво се обърка**

```
Error: guests: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×13 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: Guests — https://hostify.bioseek.eu/app/guests
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „guests in the dark theme (/app/guests)“.

**Скрийншоти**

![011-account-pages-dark-25-_shot-guests.png](./011-account-pages-dark-25-_shot-guests.png)
![011-account-pages-dark-25-_screenshot.png](./011-account-pages-dark-25-_screenshot.png)


## Казус 26: reportingHousekeeping in the dark theme (/app/reporting/reportingHousekeeping)

_Нов в този пуск._

**Какво се обърка**

```
Error: reportingHousekeeping: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×11 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: REPORTING › Housekeeping — https://hostify.bioseek.eu/app/reporting/reportingHousekeeping
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „reportingHousekeeping in the dark theme (/app/reporting/reportingHousekeeping)“.

**Скрийншоти**

![011-account-pages-dark-26-shot-reportingHousekeeping.png](./011-account-pages-dark-26-shot-reportingHousekeeping.png)
![011-account-pages-dark-26-screenshot.png](./011-account-pages-dark-26-screenshot.png)


## Казус 27: channelHealth in the dark theme (/app/reporting/channelHealth)

_Нов в този пуск._

**Какво се обърка**

```
Error: the column "(no key)" has a header — the columns: Name | Channel | Connection | Last sync at | Errors (24 h) | Listings | (no header: no key) | Last error message

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: REPORTING › Channel Health — https://hostify.bioseek.eu/app/reporting/channelHealth
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „channelHealth in the dark theme (/app/reporting/channelHealth)“ — стъпките:
4. every column has a header and the actions column is the last one

**Скрийншоти**

![011-account-pages-dark-27-_shot-channelHealth.png](./011-account-pages-dark-27-_shot-channelHealth.png)
![011-account-pages-dark-27-_screenshot.png](./011-account-pages-dark-27-_screenshot.png)


## Казус 28: reportingReviews in the dark theme (/app/reporting/reportingReviews)

_Нов в този пуск._

**Какво се обърка**

```
Error: reportingReviews: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×15 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: REPORTING › Reviews — https://hostify.bioseek.eu/app/reporting/reportingReviews
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „reportingReviews in the dark theme (/app/reporting/reportingReviews)“.

**Скрийншоти**

![011-account-pages-dark-28-_shot-reportingReviews.png](./011-account-pages-dark-28-_shot-reportingReviews.png)
![011-account-pages-dark-28-_screenshot.png](./011-account-pages-dark-28-_screenshot.png)


## Казус 29: guestCheckins in the dark theme (/app/reporting/guestCheckins)

_Нов в този пуск._

**Какво се обърка**

```
Error: guestCheckins: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×14 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: REPORTING › Registrations — https://hostify.bioseek.eu/app/reporting/guestCheckins
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „guestCheckins in the dark theme (/app/reporting/guestCheckins)“.

**Скрийншоти**

![011-account-pages-dark-29-_shot-guestCheckins.png](./011-account-pages-dark-29-_shot-guestCheckins.png)
![011-account-pages-dark-29-_screenshot.png](./011-account-pages-dark-29-_screenshot.png)


## Казус 30: checkinGuests in the dark theme (/app/reporting/checkinGuests)

_Нов в този пуск._

**Какво се обърка**

```
Error: checkinGuests: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×13 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: REPORTING › Registered guests — https://hostify.bioseek.eu/app/reporting/checkinGuests
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „checkinGuests in the dark theme (/app/reporting/checkinGuests)“.

**Скрийншоти**

![011-account-pages-dark-30-_shot-checkinGuests.png](./011-account-pages-dark-30-_shot-checkinGuests.png)
![011-account-pages-dark-30-_screenshot.png](./011-account-pages-dark-30-_screenshot.png)


## Казус 31: pricingBasePrice in the dark theme (/app/pricing/pricingBasePrice)

_Нов в този пуск._

**Какво се обърка**

```
Error: pricingBasePrice: no part of the page stays light in the dark theme

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "grid header ×10 (rgba(241, 245, 249, 0.04))",
+ ]
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: PRICING › Base Price — https://hostify.bioseek.eu/app/pricing/pricingBasePrice
3. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „pricingBasePrice in the dark theme (/app/pricing/pricingBasePrice)“.

**Скрийншоти**

![011-account-pages-dark-31-_shot-pricingBasePrice.png](./011-account-pages-dark-31-_shot-pricingBasePrice.png)
![011-account-pages-dark-31-_screenshot.png](./011-account-pages-dark-31-_screenshot.png)


## Казус 32: pricingFees in the dark theme (/app/pricing/pricingFees)

_Нов в този пуск._

**Какво се обърка**

```
TimeoutError: page.goto: Timeout 60000ms exceeded.
Call log:
  - navigating to "https://hostify.bioseek.eu/app/", waiting until "domcontentloaded"

```

**Как да се възпроизведе**

1. Спек `tests/e2e/011-account-pages-dark.spec.ts`, проверка „pricingFees in the dark theme (/app/pricing/pricingFees)“.

---

Какво проверява спекът: 011 — every page of the ACCOUNT menu in the DARK theme (the sweep of 010, the theme switched on first).
