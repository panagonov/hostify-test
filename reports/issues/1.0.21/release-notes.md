# Версия 1.0.21 — какво е ново

- Предишна версия с пуск на тестовете: 1.0.20
- Прочетено от GET /version/changelog на 2026-11-18T13:45:41.252Z

## 1.0.21 — New Reservation Details page, one-row calendar, safer cancelling and cancellation alerts (2026-11-18)

This release makes cancelling a reservation safe and simple — through the AI assistant, for Booking.com reservations and with an alert when a channel does not confirm it — sends calendar changes to the channels within seconds, opens a reservation on a new Reservation Details page, fits the calendar's controls on one row, and lets the support team work inside a customer's account on the case they were given.

New and changed:
- Reservations › a reservation › Info: the page opens as Reservation Details — the listing, the guest and the booking code at the top with every action of the stay in the "…" menu, then the Finance, Channel info, Check-in details, Reviews, Tasks, Automations and All details cards. The planned arrival and departure, the guests and the notes are edited in place.
- Calendar: the toolbar fits on one row — search, views, filters, Find availability, ‹ Today ›, Sync, Legend, View and More. The legend shows and hides with the Legend button; in a narrow window the words give way to icons.
- Calendar › a reservation's panel: the head shows "Reservation #" with the booking code and a link to the reservation's page; the actions take at most two rows.
- Reservations: a stay can be cancelled until its check-in day. After that Cancel is no longer offered — a stay under way is shortened by changing its departure date, and a stay that did not take place is marked as a no-show. A cancellation that comes from a channel is applied as before.
- AI assistant: "cancel this booking" works the way customers ask — by the booking code (in capitals or not), a link to the reservation, the reservation open on the screen, the guest's name, the listing and the dates, or the owner's name for an owner stay. When several bookings fit, it asks which one; it never cancels a stay that is under way or has ended, and offers to shorten it or to mark it as a no-show instead.
- AI features (guest messages, review replies, listing import, owner questions, the assistant and the support answers) run on newer, faster AI models.
- Support: a support person who works on a customer's case sees that account's pages and works only within the cases assigned to them.
- Dark theme: the calendar, the icons of the right-hand panel and the logo follow the dark theme.
- Reservations › Cancel: a Booking.com reservation is cancelled in Hostify at once and its nights are freed, as in the previous Hostify. Booking.com takes no cancellation from the host, so the booking stays on Booking.com until the guest cancels it there or you request the cancellation in the Booking.com extranet; the AI assistant, the phone app and blocking a period say so.
- Notifications: when a channel does not confirm a cancellation — it refuses it, or does not answer within 15 minutes — the person who cancelled and the account's administrators, managers and booking agents are told at once, with the booking code, the guest, the listing, the dates and what to do. The stay keeps its nights until it is cancelled; the alert closes by itself when it is.
- The assistant's handling of real customer requests is now checked automatically through the screen, on an account with the demo data.
- The automatic checks remove everything they create and run against the secured database.

Fixed:
- AI assistant: asking to cancel a booking by a code that is not in the account could propose cancelling another guest's stay that had already ended → it now says the code was not found and proposes nothing.
- AI assistant: asking to cancel a booking that was cancelled already — by its code or the guest's name — could answer that the booking was not found, or ask which of the guest's bookings to cancel → it says the booking is cancelled already and when; beside an active booking of the same guest it proposes the active one.
- Reservations: a stay that had already ended could still be cancelled, and a refund was proposed → the stay can no longer be cancelled; it can be marked as a no-show.
- Platform admin › Users: a support person could not be created and could not sign in → the support person is created and signs in.
- Calendar and channels: a change of nights — a cancellation, a new booking, a block — could reach the channels only up to 10 minutes later → it goes out within a few seconds.
- Reservations › a reservation: the page opened on Nights, so the notice that a stay is cancelled was not in sight → a reservation opens on its Info tab.
- Reservations › a reservation: in a narrow window the tabs fell to a second row → they stay on one row, the rest in the "…" menu.
- Calendar: ‹ Today › and the other button groups looked like separate rounded buttons → each group is one control again.

- **fix(calendar):** a change of nights reaches the channels within seconds, not at the next 10-minute tick
- **fix(assistant):** a booking cancelled already is said so, never offered again (A01-2)
- **docs(intercom-assistant):** Booking.com cancelled as in the original; the gates on the secured Elasticsearch
- **test(gates):** every test script takes Elasticsearch from the server's .env — its address, user and TLS
- **feat(reservations):** a Booking.com reservation is cancelled in Hostify at once, as in the original
- **feat(reservations):** a Booking.com reservation is cancelled in Hostify at once, as in the original
- **docs(intercom-assistant):** what a cancellation sets off, checked end to end (D20)
- **test(data):** the removal of a test's data reaches the secured Elasticsearch (TLS with its own CA)
- **feat(reservations):** a cancellation the channel did not confirm is told to the account at once
- **fix(reservations):** a reservation opens on its Info tab, with the notice that it is cancelled in sight (client 1.5.144)
- **fix(reservations):** a reservation opens on its Info tab, with the notice that it is cancelled in sight (client 1.5.144)
- **chore(build):** the build manifest of the release build
- **fix(theme):** a record's tabs on one row, a compact button group as one control, the right dock and the logo in the dark theme (client 1.5.143)
- **feat(calendar):** the calendar's toolbar on one row, and the calendar in the dark theme (client 1.5.143)
- **fix(theme):** a record's tabs on one row, a compact button group as one control, the right dock and the logo in the dark theme (client 1.5.143)
- **feat(calendar):** the calendar's toolbar on one row, and the calendar in the dark theme (client 1.5.143)
- **feat(reservations):** a reservation's Info tab is the new Reservation Details page (client 1.5.143)
- **feat(reservations):** a reservation's Info tab is the new Reservation Details page (client 1.5.143)
- **feat(calendar):** the calendar's reservation panel redesigned — its code in the head, the actions on two rows, Cancel only until check-in (client 1.5.142)
- **feat(calendar):** the calendar's reservation panel redesigned — its code in the head, the actions on two rows, Cancel only until check-in (client 1.5.142)
- **feat(ai):** the AI features on newer, faster AI models (build-config 1.0.133)
- **feat(assistant):** cancelling a reservation the way customers ask — by code, link, name, listing and dates, tested through the screen
- **fix(reservations):** a stay is cancelled only until its check-in day — under way it is shortened, ended it is a no-show (hostifyReservations 1.38.0, 1.39.0)
- **feat(support):** a support person who works on a case sees the account's pages (client 1.5.141)
- **chore(build):** the build manifest of the last build
- **feat(support):** a support person works in the account's pages within a case — tests, texts and decisions
- **test(assistant):** the Intercom cases A08-2, A18-2, A24-1 and A04-1 through the assistant panel
- **fix(security):** a support person can be created and sign in — a platform person, out of the account password policy

---

Правило: преди пуск на нова версия агентът чете този файл, казва кои страници и спекове засягат промените (по имена на менюта, същности и поправки) и ги пуска първи; познатите казуси от предишната версия се проверяват дали са отстранени.
