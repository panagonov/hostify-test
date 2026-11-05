# Версия 1.0.5 — какво е ново

- Предишна версия с пуск на тестовете: 1.0.3
- Прочетено от GET /version/changelog на 2026-11-05T14:59:49.921Z

## 1.0.5 — Usage telemetry: what each person actually does, on their own page (2026-11-05)

The platform now records what people do in it — and shows it where the question is asked: on the person.

A Telemetry tab on a person's page (Platform Admin ▸ Users, and Settings ▸ Users for an account
administrator) answers "what does this person actually do":

- six figures for the chosen period — actions, records opened, changes, searches, errors, sessions;
- their activity by day, what kinds of thing they do, and which records they work with;
- their sessions, each with the device, the operating system and the version of the application;
- every action, newest first. A press on the kind of an action that has more to say opens it: the words
  typed into a list, the message the browser reported;
- every change they made, newest first. A press on the action shows the card of the record as it was
  created, or — for an edit — field by field what changed, old value to new, with the values drawn exactly
  as the record's own screen draws them.

Three Usage pages list the same stream across the account: Events, Sessions and the counted periods.

What is recorded: a page opened, a record opened, a tab of a record, a menu entry pressed, a side panel
opened, a search in a list, an error in the browser, the start and the end of a session. What is NOT: the
contents of records, field values, keystrokes, screenshots, IP addresses. A raw row carries the person's
identifier and the account, nothing else of them; raw rows are kept 90 days and the counted periods for good.

Who sees what: the people who administer the account see everybody's activity; everybody else sees their own
and nobody else's. Reading a change shows only the fields that reader may see — the rest is counted, never
shown.

Recording costs the person nothing: the client collects for about ten seconds and sends one batch, the
server only queues it, and a collector writes the queue in bulk on its own clock.

- Usage telemetry in action: a Telemetry tab on every person, on the main Elasticsearch (build-config 1.0.62 → 1.0.70)
- server 1.0.4 — the version the merge commit 5fd0bfc8 is titled after
- 1.0.4 - the build engine moved to origin/master 1.5.163 and its merge checklists done in the project (build-config 1.0.62)

---

Правило: преди пуск на нова версия агентът чете този файл, казва кои страници и спекове засягат промените (по имена на менюта, същности и поправки) и ги пуска първи; познатите казуси от предишната версия се проверяват дали са отстранени.
