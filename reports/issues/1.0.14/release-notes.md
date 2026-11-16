# Версия 1.0.14 — какво е ново

- Предишна версия с пуск на тестовете: 1.0.10
- Прочетено от GET /version/changelog на 2026-11-12T08:10:08.536Z

## 1.0.14 — The plugins run again, and every booking channel with its plugin can be connected (2026-11-10)

- Plugins: after 1.0.12 the plugins did not start — their container tried to run the booking channels, which run on Cloudflare → it leaves them out and every plugin runs again.

- **fix(plugins):** the plugins container starts again — it leaves out the plugins that run on Cloudflare
- **fix(plugins):** the plugins container starts again — it leaves out the plugins that run on Cloudflare

## 1.0.13 — Every booking channel with its plugin can be connected from Channels (2026-11-10)

Channels now offers every booking site that has its plugin, and the connect wizard opens the site's own sign-in.

New and changed:
- Channels: Agoda, Google Vacation Rentals, Holidu, HomeToGo, HousingAnywhere, Marriott Homes & Villas, Plum Guide, Rentals United, Simplex, SiteMinder, TripAdvisor and Uniplaces are offered once their plugin is registered — their tiles are no longer grey and open the connect wizard. A site without a plugin stays grey.
- Behind the scenes: the 16 channel plugins and the channel hub are registered with this server.

Fixed:
- Channels › connect wizard: a registered channel plugin was not found, so the wizard showed a test screen instead of the site's sign-in → it opens the plugin's own connect page.

- **docs(channels):** the channel plugins are registered with production
- **chore(channels):** the production channel plugins' partner records
- **feat(channels):** a channel with a registered plugin is offered on Channels; the connect wizard finds its plugin
- **feat(channels):** a channel with a registered plugin is offered on Channels; the connect wizard finds its plugin

## 1.0.12 — The release of the booking channels can be installed: the server image builds again (2026-11-10)

Release 1.0.11 could not be installed: the server image stopped while building the plugin toolkit, so 1.0.10 kept running. This release fixes the build; everything 1.0.11 brought — the booking channels as plugins, plugins and channels for every role, safer sign-in, exact links in AI replies and the certain deletion of a guest's check-in files — arrives with it.

Fixed:
- Installing the release: the plugin toolkit did not build because the new "Booking channel" plugin category had no line in its setup wizard → it builds, and the server image with it.


## 1.0.11 — Booking channels as plugins, plugins and channels for every role, and safer sign-in (2026-11-10)

This release brings the booking channels as plugins of their own — Airbnb, Booking.com, VRBO, Expedia, Google, Agoda, Holidu and the other sites — with the guests' messages of those sites in the Inbox, and lets every person of an account use the installed plugins and see the channels of the properties they work with, while the administrator and the manager set them up. Sign-in and access checks are stricter, an AI reply allows only exact links, and a guest's check-in files are deleted for certain when the guest is anonymised.

New and changed:
- Channels: each booking site is connected through its own plugin; a channel listing's settings show what the site takes, a rate plan's card names its channel.
- Channels: every person of the account sees the channels of the properties they work with; only the administrator and the manager change a channel's settings and start Sync now, Full sync, Push update, imports and Airbnb's opportunities — for everyone else those buttons are off and a line says who sets the channel up.
- Channels: a channel can be switched per account — off, a trial run that only records what it would send, or live — and switched back at any time.
- Pricing › connected pricing tools (PriceLabs, Beyond …): their price changes are stored as soon as they arrive and delivered to the calendar in batches, so none is lost when many come at once.
- Reservations: a stay from a booking site keeps the site's source, the guest's address, the amounts and the fields as the site gave them; a site's cancellation keeps its money and a site's payout lines arrive with the stay.
- Inbox: a guest's e-mail from Agoda, Plum Guide, TripAdvisor (Holiday Lettings), Expedia or Holidu lands on the stay's conversation, without the site's template; a reply goes back through the site's relay address.
- Inbox: replies to Airbnb and Booking.com guests go through the site, with an image; the site's copy of a reply no longer appears as a second message, and a line under a sent reply tells when the site took the text but refused the image.
- App Center and plugins: every person of the account uses the plugins installed for the properties they see; only the administrator and the manager install, configure and switch them on or off. A person who only uses a plugin does not see its settings values.
- Settings › Roles: the stored roles and a role an account creates get these rules.
- Sign-in: when the access state cannot be checked, the app says so and offers to try again instead of letting the person in; an idle session ends exactly at its timeout; a session waiting for its two-factor code reaches nothing else; password changes are refused while the account's password rules cannot be read.
- Inbox › AI replies: a link in an AI reply is allowed only when it is exactly one of the allowed addresses; payment links are kept exactly as they are.
- Guests › Check-in: when a guest is anonymised or a check-in is removed, its files are deleted for certain, retried until the storage confirms, and a clean-up that is still pending is reported.
- Behind the scenes: the documentation of the PMS behind stage1, the automated checks updated to the pages as they are now, the Codex entry point.

Fixed (found by the QA suite):
- QA-14 — Dashboards: leaving a dashboard while it was still loading showed an error → nothing is reported when the page is being left. Check: 002-qa-account „the QA account exists — created through the Accounts form when missing“.
- QA-36 — Reviews › Internal reviews › Dashboard: the Reviews icon of an account without channel reviews led to "Error 404" → it opens Internal reviews. Check: 010-account-pages „internalReviewsDashboard opens (/app/reviewsMenu/internalReviewsMenu/internalReviewsDashboard)“.
- QA-38 — Reviews: the same "Error 404" → Reviews opens. Check: 010-account-pages „reviews opens (/app/reviewsMenu/reviews)“.
- QA-61 — Reviews › Internal reviews: the same "Error 404" → the page opens. Check: 010-account-pages „internalReviews opens (/app/reviewsMenu/internalReviewsMenu/internalReviews)“.
- QA-52 — Settings › Users: the Role filter listed every person and the super administrator's Email filter did nothing → the column filters work; a new person's e-mail is refused when it differs from an existing one only in capital letters. Check: 100-settings-users „every column sorts and filters; the item page of a user opens with its tabs“.
- QA-75 — every page of a booking agent showed an access error and the agent could use no plugin → every role uses the installed plugins. Check: 101-navbar-support-assistant „a booking agent: „Support“ opens the assistant“.
- QA-85 — the theme switch: switching back to the light theme after the dark one was not kept → it is kept. Check: 111-user-telemetry „in the dark theme the Changes card and table are dark and readable; the theme goes back to light“.
- QA-90 — Platform Admin › Accounts › Users: with a search text the rows are ordered by relevance, not by the column — this is by design; the check now clears the search first. Check: 105-platform-account-users „the QA account's record page has a Users tab with exactly its people“.

Fixed:
- Channels › VRBO: a VRBO listing that went live kept its "not live yet" → it is cleared; a guest house gets VRBO's own code.

- **feat(channels):** the channel pages — connect a site through its plugin, its settings, and actions only for who sets it up
- **feat(channels):** the channel plugins reply to guests, keep a 7-day log in KV and go on Cloudflare per environment
- **fix(QA-75):** the installed plugins are used by every role; the administrator and the manager install them
- **fix(security):** the client stays blocked until access is verified
- **fix(QA-85):** the switch back to the light theme is kept on the person
- **fix(QA-36,QA-38,QA-61):** the Reviews icon of an account without channel reviews opens Internal reviews
- **chore(build):** the lock files carry the packages' versions; the build manifest of the last build
- **chore:** the Codex entry point
- **test(e2e):** the checks follow the pages as they are now
- **docs(legacy):** pms-ci4, the code behind stage1 — where it is and what it holds
- **feat(channels):** the channel Workers on Cloudflare — the plan, and a plugin image that leaves them out
- **fix(check-in):** a guest's check-in files are deleted for certain when the guest is anonymised
- **feat(channels):** every person of the account sees the channels; the administrator and the manager set them up
- **feat(inbox):** booking sites' guest e-mails land on their stay; replies through Airbnb and Booking.com are kept as sent
- **fix(QA-75):** the installed plugins are used by every role; the administrator and the manager install them
- **feat(channels):** the host side of the channel plugins — intake, reservations, listings and catalogs
- **fix(inbox AI):** a link in an AI reply is allowed only when it is exactly one of the allowed addresses
- **fix(security):** access is refused when it cannot be verified; idle timeout and pending MFA enforced exactly
- **fix(QA-85):** the switch back to the light theme is kept on the person
- **fix(QA-36,QA-38,QA-61):** the Reviews icon of an account without channel reviews opens Internal reviews
- **fix(QA-52):** the users grid keeps its column filters; a new person's e-mail is checked with the case ignored
- **feat(channels):** Ф5 — ten more channel plugins; the channel layer follows the calendar spec on horizons and retries
- **fix(channels):** a VRBO listing that went live clears its "not live yet"; the VRBO code of a guest house
- **feat(partners):** Ф6 — the pricing agents' calendar writes stored before they are answered, merged and delivered
- **feat(channels):** Ф3б, Ф4 and Ф7 — VRBO, Expedia, HomeToGo, Google; Booking.com completed; switches per account
- **feat(channels):** Ф3 — the Booking.com plugin; the channel layer polls and keeps no cards
- **feat(channels):** Ф2б — the hub carries out and reports its own commands, fees and calendar reads
- **feat(channels):** one database for every channel Worker, tables named after the Worker (DC-07)
- **feat(channels):** channel workers on Cloudflare — the channel layer, the Channel Hub and the Airbnb plugin

## Поправени бъгове според версията

- **QA-14** — 002-qa-account: the QA account exists — created through the Accounts form when missing — сега в `bugs/for-verification/1.0.6--002-qa-account--the-qa-account-exists-created-through-the-accounts--3c7e0bf2.md`
- **QA-36** — 010-account-pages: internalReviewsDashboard opens (/app/reviewsMenu/internalReviewsMenu/internalReviewsDashboard) — сега в `bugs/for-verification/1.0.6--010-account-pages--internalreviewsdashboard-opens-app-reviewsmenu-int--15a8ac5b.md`
- **QA-38** — 010-account-pages: reviews opens (/app/reviewsMenu/reviews) — сега в `bugs/for-verification/1.0.6--010-account-pages--reviews-opens-app-reviewsmenu-reviews--0b1052b9.md`
- **QA-61** — 010-account-pages: internalReviews opens (/app/reviewsMenu/internalReviewsMenu/internalReviews) — сега в `bugs/for-verification/1.0.6--010-account-pages--internalreviews-opens-app-reviewsmenu-internalrevi--615985e2.md`
- **QA-52** — 100-settings-users: every column sorts and filters; the item page of a user opens with its tabs — сега в `bugs/for-verification/1.0.6--100-settings-users--every-column-sorts-and-filters-the-item-page-of-a---fa434cb4.md`
- **QA-75** — 101-navbar-support-assistant: a booking agent: „Support“ opens the assistant — сега в `bugs/for-verification/1.0.10--101-navbar-support-assistant--a-booking-agent-support-opens-the-assistant--61655659.md`
- **QA-85** — 111-user-telemetry: in the dark theme the Changes card and table are dark and readable; the theme goes back to light — сега в `bugs/for-verification/1.0.10--111-user-telemetry--in-the-dark-theme-the-changes-card-and-table-are-d--10c5c296.md`
- **QA-90** — 105-platform-account-users: the QA account's record page has a Users tab with exactly its people — сега в `bugs/for-verification/1.0.10--105-platform-account-users--the-qa-account-s-record-page-has-a-users-tab-with---c9ea398c.md`

Спековете на тези бъгове се пускат първи; бъг в `for-verification` се проверява с приоритет, бъг в друго състояние — казва се на човека.

---

Правило: преди пуск на нова версия агентът чете този файл, казва кои страници и спекове засягат промените (по имена на менюта, същности и поправки) и ги пуска първи; познатите казуси от предишната версия се проверяват дали са отстранени.
