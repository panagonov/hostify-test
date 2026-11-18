# Версия 1.0.20 — какво е ново

- Предишна версия с пуск на тестовете: 1.0.19
- Прочетено от GET /version/changelog на 2026-11-17T12:12:09.862Z

## 1.0.20 — The AI assistant asks for what it needs and changes several records in one confirmation (2026-11-17)

This release makes the AI assistant in the app more dependable with the requests customers used to send to support: it asks for a value you did not give instead of showing a confirmation that changes nothing, it no longer answers that it cannot change something it can, it changes records of different kinds in one confirmation and undoes them together, and when a guest joins a stay it raises the number of guests together with the extra charge. When the support team takes a report that something does not work, they now see what the person did just before. Live record updates reach only the server processes that need them, and the nights of a listing are no longer delayed after a server process stops.

New and changed:
- AI assistant: a request that changes records of different kinds — for example "a former employee: deactivate his user and remove him from the contacts" — is one confirmation card that lists every change; one click applies them all, and Undo reverts them together.
- AI assistant: "add 100 a night because one more person joined the stay" raises the number of guests on the stay together with the new charge.
- AI assistant: changing a colleague's sign-in e-mail — the assistant asks for the new address when you did not write it, and tells you to send the invitation again when the colleague has not accepted it yet.
- Support (help desk): when the support team takes a report that something does not work, the conversation carries an internal note with what the person did just before — the pages opened, the saves the platform refused, the error shown on screen. Only the support team sees the note.
- Audit log: the changes of one confirmation in the AI assistant are shown as one action.
- Servers: with several server processes, a live update of a record goes only to the processes that have someone to tell — less processor work and far less traffic between them.

Fixed:
- AI assistant: a request without the value it needs (a colleague's new e-mail) showed a confirmation card that changed nothing → the assistant asks for the missing value.
- AI assistant: it sometimes answered "I cannot edit user login details, please contact your account administrator" to a change it can make → it prepares the change.
- AI assistant: Undo of a record removed from the chat (a contact) answered that the record could not be restored → the record is created again with its details.
- Reporting: the nights of a listing could wait up to 10 minutes before they were built when a server process stopped in the middle of building them, or held them locked → they are built within seconds.

- **chore(build):** the build manifest of the release's build
- **fix(assistant):** a guest added to a stay raises the guest count; a former employee is one card — Intercom eval 38/38
- **fix(assistant):** a colleague's new sign-in e-mail is asked for, never refused — Intercom case A18-2 passes
- **docs(channels):** plan 11 refreshed — what is done closed, what is left in one list
- **docs(socket-frames):** the plan done — phase 3 removed; the day's progress in plan 11
- **test(support):** a problem report the desk takes gets the activity note — the Intercom failures traced step by step
- **docs(socket-frames):** phase 4 done, phase 3 deferred
- **fix(reports):** the nights of a listing locked by a stopping process wait seconds, not its lock's 5 minutes
- **fix(reports):** the nights of a listing another run held locked are built when its lock lapses
- **perf(socket-frames):** a record frame goes only to the API processes that use it
- **chore(analysis):** the channel server profile's traces stay local — out of git and ignored
- assistant improvement

---

Правило: преди пуск на нова версия агентът чете този файл, казва кои страници и спекове засягат промените (по имена на менюта, същности и поправки) и ги пуска първи; познатите казуси от предишната версия се проверяват дали са отстранени.
