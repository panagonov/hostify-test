# Версия 1.0.15 — какво е ново

- Предишна версия с пуск на тестовете: 1.0.14
- Прочетено от GET /version/changelog на 2026-11-16T07:14:43.690Z

## 1.0.15 — Channel bookings are applied many times faster, in their order, and never lost or doubled (2026-11-12)

This release reworks how the bookings, changes and cancellations that the sales channels send are received and applied. They are received in three queues — bookings, prices and listing content — so prices and content never hold bookings back; each is applied in the order it arrived; one server applies about 100 bookings a second (it was about 10); and a booking that cannot be applied at once is tried again until it is, never dropped and never stored twice.

New and changed:
- Channels: every event a channel sends is received and answered one by one — stored, already received, refused with its reason, or to be sent again later — in three queues (bookings, prices, content), so a busy price feed never slows the bookings down.
- Channels: a booking, its changes and its cancellation are applied in the order they arrived, also when they arrive together; a change or a cancellation is never applied before its booking.
- Channels: one server applies about 100 channel bookings a second; several servers share the work by account.
- Channels: a booking that cannot be applied at once (a moment of overload, another update of the same booking in progress) is tried again automatically — after 15 seconds, then less often, at most every 15 minutes — until it is applied; it is never given up. The inbound events show its attempts and when it is tried next.
- Channels: every booking channel plugin has the same structure, and the Channel Hub coordinates their deliveries — it keeps every event before the site is answered and checks every day that nothing it delivered was lost.
- Reservations: a booking channel's changes and cancellations reach the calendar and close or open the dates on the other channels faster.
- Automations: an account without automation rules is no longer slowed by their planning; a rule switched on applies to the next booking at once.
- Imports: a row refused during a bulk change says why, as a single change does.
- The server can run in several processes on one machine.
- Internal: a load test of the database alone, to measure its limits.

Fixed:
- Reservations: two bookings created at the same moment could get the same reservation code → every code is given once, also under heavy load.
- Calendar: a channel booking whose calendar update failed was shown as applied, and its dates stayed open on the other channels → it stays to be applied and is tried again until the calendar holds it.
- Channels: two deliveries of the same booking at the same moment could create two reservations → there is one reservation per booking.
- Channels: a booking that failed for a moment (a busy database) stayed failed for good → it is tried again automatically.
- Channels: a cancellation arriving in the same delivery as its booking could be applied first, and the booking came back → they are applied in their order.
- Channels: a new booking could wait up to 10 seconds before it was applied → it is applied at once.
- System: a few internal data stores could not be fully set up on a single-server installation → they are set up correctly.

- **perf(channels):** 100 channel bookings a second on one server process — and the server channel audit fixed
- **test(channels):** a load bench of Elasticsearch alone
- **fix(crud):** a row the bulk write refuses says why
- **feat(server):** the API in several processes (API_WORKERS)
- **fix(codes):** records created at the same moment no longer get the same code
- **fix(database):** no index replica a one-node cluster can never place
- **chore(channels):** the Channel Hub's comments in English
- **fix(database):** no index replica a one-node cluster can never place
- **build:** build-engine 1.5.190, build-config 1.0.97 — the channel lanes and a fast channel booking
- **feat(channels):** one structure for the 16 channel plugins, the coordinator in the Channel Hub
- **feat(channels):** three lanes for the channel intake, a channel booking 25x faster, the lanes shared by the servers
- **docs(channels):** the coordinator, the one structure of the channel plugins, the load tests and the path of a booking

---

Правило: преди пуск на нова версия агентът чете този файл, казва кои страници и спекове засягат промените (по имена на менюта, същности и поправки) и ги пуска първи; познатите казуси от предишната версия се проверяват дали са отстранени.
