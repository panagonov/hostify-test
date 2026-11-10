# Проверка на бъговете от 1.0.5 срещу версия 1.0.10

- Дата: 2026-11-09, 12:09–13:26 (локално време)
- Среда: продукция, **https://hostify.bioseek.eu/app/** (API `https://hostify.bioseek.eu/api`)
- Версия: **1.0.10** — `POST /api/user/login` и `GET /version/changelog` отговарят `1.0.10` (издадена 2026-11-09 07:53 UTC); всеки пуск по-долу я е записал в `summary.json`
- Тестовете: това хранилище, клон `main`, commit `a78ff9e`, без промени по спековете. Изключение са двата пуска в 12:39–12:41, направени с временна локална промяна (виж „Условна проверка на QA-12 и QA-13“); след тях промяната е върната и `git diff tests/` е празен. От 13:22 тестовете съдържат одобрената от QA поправка на `filterColumn` (`tests/helpers/checks.ts`, +5 реда, още не е commit-ната)
- Акаунт: „QA Automation“ (№1), режим `--tenant continue` (без изтриване, 002 отпада)
- Браузър: видим Chromium, един worker

## Пусканията

| Пуск | Спек | Резултат | Отчет |
|---|---|---|---|
| 2026-11-09_12-09-16 | 005-platform-pages | 34/34 минаха | `reports/runs/2026-11-09_12-09-16/summary.md` |
| 2026-11-09_12-13-04 | 006-platform-admin-users (1-во) | 0/1 — падна | `reports/issues/1.0.10/2026-11-09 12:13/` |
| 2026-11-09_12-13-55 | 006-platform-admin-users (2-ро) | 0/1 — падна, същата грешка | `reports/issues/1.0.10/2026-11-09 12:13/` |
| 2026-11-09_12-15-04 | 110-settings-listing-tags (1-во) | 1 мина, 1 падна, 3 пропуснати | `reports/issues/1.0.10/2026-11-09 12:15/` |
| 2026-11-09_12-16-41 | 110-settings-listing-tags (2-ро) | 1 мина, 1 падна (друга грешка), 3 пропуснати | `reports/issues/1.0.10/2026-11-09 12:16/` |
| 2026-11-09_12-21-50 | 110-settings-listing-tags (3-то, по искане на QA) | 2 минаха, 1 падна (филтъра на Date created), 2 пропуснати | `reports/issues/1.0.10/2026-11-09 12:21/` |
| 2026-11-09_12-39-36 | 006-platform-admin-users (условно: QA-14 игнорирана) | 1/1 мина | `reports/runs/2026-11-09_12-39-36/summary.md` |
| 2026-11-09_12-40-20 | 110-settings-listing-tags (условно: QA-14 игнорирана, `--grep-invert "every column sorts"`) | 4/4 минаха | `reports/runs/2026-11-09_12-40-20/summary.md` |
| 2026-11-09_13-22-14 | 110-settings-listing-tags, цял, с поправения `filterColumn` (1-во) | 1 мина, 1 падна (QA-14), 3 пропуснати | `reports/issues/1.0.10/2026-11-09 13:22/` |
| 2026-11-09_13-24-12 | 110-settings-listing-tags, цял, с поправения `filterColumn` (2-ро) | **5/5 минаха**, без нито една конзолна грешка | `reports/runs/2026-11-09_13-24-12/summary.md` |

## Резултат по бъгове

| Бъг | Описание | Резултат в 1.0.6 | Резултат в 1.0.10 | Статус | Бележка |
|---|---|---|---|---|---|
| QA-1 | App Center: 403 от `POST /automationApp/state` за суперадминистратора | мина | мина, без 403 | Фикснат | 005 › appCenter opens |
| QA-2 | Booking API clients: същият 403 | мина | мина | Фикснат | 005 › bookingApiClients opens |
| QA-3 | Check-in form templates: същият 403 | мина | мина | Фикснат | 005 › checkinFormTemplates opens |
| QA-4 | Compliance connections: същият 403 | мина | мина | Фикснат | 005 › complianceConnections opens |
| QA-5 | Compliance submissions: същият 403 | мина | мина | Фикснат | 005 › complianceSubmissions opens |
| QA-6 | Console actions: 404 „Cannot POST /tenant/search“ | мина | мина, без 404 | Фикснат | 005 › consoleActions opens |
| QA-7 | Owner portal roles: същият 403 | мина | мина | Фикснат | 005 › ownerPortalRoles opens |
| QA-8 | Partners: същият 403 | мина | мина | Фикснат | 005 › partners opens |
| QA-9 | Payment processor accounts: същият 403 | мина | мина | Фикснат | 005 › paymentProcessorAccounts opens |
| QA-10 | Platform dashboard не отговори за 60 s | мина | мина | Фикснат | Беше declined (еднократно, по време на деплой); проверката е зелена и в 1.0.10 |
| QA-11 | Create на таговете беше покрит от диалога „Demo data is ready“ | смесено: падна 15:29 (диалогът) и 16:46 (`Failed to fetch`), мина 15:31 | 1-во: падна на `[dashboard] decorator load failed — Failed to fetch`; 2-ро: падна на `socket hang up` при вход в API-то; **3-то: мина** | Фикснат | Беше declined (дефект на теста). В 3-тото пускане трите тага са създадени през формата и бутонът Create не е покрит от диалога. Първите два неуспеха са по други причини (QA-14 и QA-69) |
| QA-12 | Филтърът на колона Description с цялото описание оставя и чужди тагове | не е проверен (падна веднъж по друга причина, иначе пропуснат) | не е проверен и в трите пускания — пропуснат: в 1-во и 2-ро падна „three tags are created…“, в 3-то падна „every column sorts and filters…“ (филтъра на Date created, QA-70); условно (12:40, QA-14 игнорирана): мина; 13:22 (цял 110): пропусната — падна „three tags…“ на QA-14; **13:24 (цял 110, без игнориране): мина** | Фикснат | Филтърът с цялото описание оставя само своя таг. Потвърдено формално в пуска 2026-11-09_13-24-12: всички 5 проверки на 110 са зелени и няма конзолни грешки. Runner-ът премести бъга в `bugs/verified/` |
| QA-13 | Формата Create user: лупата 34px до поле 40px, полето Password 56px | смесено: падна 14:07, 14:39, 16:46, мина 17:43 | 1-во и 2-ро: падна на `[dashboard] decorator load failed — Failed to fetch` | Фикснат — условно | Формата се отваря и е измерена: сондата за подредбата на формата **не намира** разлики във височините (Account / Role с лупа и Password са с височината на полето — скрийншот — снимката е махната от QA). **Условно (12:39, QA-14 игнорирана): мина** — сондата на формата е чиста. В пуска се появи грешката на QA-14 (`[dashboard] decorator load failed`) и без временното игнориране проверката щеше да е червена. Файлът остава в `bugs/verified/` (runner-ът не го е местил) |

Обобщение: **12 фикснати** (QA-1…QA-12), **1 фикснат условно** (QA-13 — проверката минава само при временно игнорирана грешка на QA-14), **0 още не са фикснати**, **0 регресии**. Формално непотвърден остава QA-13, докато QA-14 не е поправен.

## Пречките

1. **`[dashboard] decorator load failed — TypeError: Failed to fetch`** (`console.error` в `main.2463612a.js`). Появи се в
   3 от 5-те червени пуска (006 ×2, 110 1-во); в 1.0.6 беше `[dashboard] definition load failed`. Това е известният
   QA-14 (`bugs/new/`), а QA-22 и QA-66 са отхвърлени като негови дубликати. Грешката е на таблото при напускане на
   страницата, не на формите, които проверяваме. Докато не е поправена, проверката на 006 остава червена независимо от
   QA-13, а 110 пада на нея, когато се появи (в 3-тото пускане на 110 не се появи). Резюме за програмиста — в края.
2. **`apiRequestContext.post: socket hang up`** при `POST /api/user/login` (110, 2-ро пускане, 1,3 s след началото).
   Входът на теста в API-то е прекъснат от сървъра, още преди формата да се отвори. Runner-ът го записа като нов бъг
   QA-69. В 3-тото пускане входът мина нормално, затова QA-69 е **отхвърлен от QA като мрежова нестабилност**
   (еднократен socket hang up) и е в `bugs/declined/` с причината.
3. **Филтърът на колона Date created** (110 › „every column sorts and filters; the item page opens with its tabs“,
   3-то пускане, бъг QA-70, после отхвърлен като дефект на теста). Филтърът се отваря като период (начална → крайна дата) с календар. Проверката
   обаче не го разпозна като период: написа „2026“ в началната дата и не можа да натисне „Apply“, защото календарът
   покриваше бутона (`ant-picker-header-next-btn … intercepts pointer events`, таймаут 20 s). На 1.0.6 (пуск
   2026-11-06_15-31-09) същата стъпка „filter the column "Date created" by "2026"“ **мина**. Скрийншот:
   `reports/issues/1.0.10/2026-11-09 12:21/110-settings-listing-tags-1-screenshot.png`.

## Тестове, които може да са остарели заради 1.0.10

- **110 › „every column sorts and filters; the item page opens with its tabs“ — ОСТАРЯЛ ТЕСТ (решение на QA).**
  QA провери ръчно в Settings › Listing tags: филтърът на Date created работи, периодът се избира и Apply се натиска.
  На 1.0.6 проверката е разпознавала филтъра като период и го е прескачала с Escape (`grid-columns.json` на пуска
  2026-11-06_15-31-09: `filter-date`). На 1.0.10 не го разпознава: `tests/helpers/checks.ts` → `filterColumn` търси
  `.ant-picker` в падащото меню, а менюто на гридовете е променено в 1.0.10. QA-70 е отхвърлен като дефект на теста.
  **Поправено (одобрено от QA):** причината е изпреварване, не ново име на класа. `filterColumn` проверяваше за `.ant-picker`
  веднага щом рамката на менюто стане видима, а в 1.0.10 съдържанието се появява малко по-късно (в trace-а на пуск
  12:21 броят е 0, а около 0,5 s по-късно календарът вече е там). Поправката изчаква в менюто да се появи видима контрола
  и едва тогава разпознава вида филтър (`tests/helpers/checks.ts`, +5 реда). `npm run qa:check` минава. В пуска
  2026-11-09_13-24-12 проверката е зелена и Date created отново е разпознат като период (`filter-date`), както в 1.0.6.
  Поправката не е commit-ната.
- Platform Admin › Users: „Resend invitation“ става действие на реда (до 006, но 006 проверява формата, не реда) — не засяга резултатите.

## Какво се промени в `bugs/`

- **Нов бъг, после отхвърлен:** QA-69 — създаден в `bugs/new/` (пуск 12:16, `socket hang up` при вход в API-то) и
  **преместен в `bugs/declined/`** от QA (12:25) като мрежова нестабилност:
  `bugs/declined/1.0.10--110-settings-listing-tags--three-tags-are-created-through-the-form-and-appear--823206c8.md`
  (добавени `## Fix` с причината и ред в `## История`).
- **Нов бъг, после отхвърлен:** QA-70 — създаден в `bugs/new/` (пуск 12:21, филтърът на Date created) и **преместен в
  `bugs/declined/`** от QA (12:39) като дефект на теста (остарял `filterColumn` след промените в гридовете в 1.0.10):
  `bugs/declined/1.0.10--110-settings-listing-tags--every-column-sorts-and-filters-the-item-page-opens--0c4e3d8b.md`
  (добавени `## Fix` с причината и ред в `## История`).
- **QA-12:** runner-ът го премести във `verified/` след условния пуск 12:40. QA го **върна в `bugs/for-verification/`**
  (12:42) с бележка в историята, че проверката мина само при временно игнорирана QA-14. В пуска 13:24 (цял 110, без игнориране)
  проверката мина и runner-ът го **премести в `bugs/verified/`**: `bugs/verified/1.0.5--110-settings-listing-tags--filtering-the-description-column-by-the-whole-desc--173e90f6.md`.
- **QA-66** (declined, дубликат на QA-14) получи още един ред „видян отново“ (пуск 13:22).
- **Добавен ред „видян отново“ (без преместване):**
  - QA-22 (declined, дубликат на QA-14) — `bugs/declined/1.0.6--006-platform-admin-users--…--65338037.md`: два реда (12:13 и 12:14).
  - QA-66 (declined, дубликат на QA-14) — `bugs/declined/1.0.6--110-settings-listing-tags--three-tags-are-created…--f91dd733.md`: един ред (12:16).
- **Други преместени:** няма. QA-1…QA-9 и QA-13 остават в `verified/`, а QA-10 и QA-11 — в `declined/`.
- `bugs/index.html` е пренаписан от runner-а.
- Нищо не е commit-нато, push-нато или публикувано.

## Условна проверка на QA-12 и QA-13 (QA-14 временно игнорирана)

По одобрение на QA, без commit:

1. Временна локална промяна в `tests/helpers/console.ts` → `blocking()`: от грешките, които провалят теста, е изключен
   САМО `console.error`, започващ с `[dashboard] (decorator|definition) load failed TypeError: Failed to fetch`. Всичко
   останало (други грешки, 4xx/5xx, неуспешни заявки, сондата) проваля теста както обикновено.
2. `node tools/qa.mjs run --only 006 --tenant continue`: пуск 2026-11-09_12-39-36, **1/1 мина**. Грешката на таблото
   (`decorator load failed`) се появи и беше игнорирана. Сондата на формата Create user е без разлики във височините.
3. `node tools/qa.mjs run --only 110 --tenant continue -- --grep-invert "every column sorts"`: пуск 2026-11-09_12-40-20,
   **4/4 минаха**. „filtering the Description column…“ (QA-12) мина. В нея се появи `definition load failed`, която беше игнорирана.
   Броят на таговете в акаунта е точно 3.
4. `git checkout -- tests/helpers/console.ts` → `git diff tests/` е празен. Нищо не е commit-нато.

Извод: дефектите на QA-12 и QA-13 не се възпроизвеждат в 1.0.10. И в двата пуска единствената причина за червен
резултат би била QA-14.

## QA-14 — резюме за програмиста

**Грешката:** след входа приложението отваря таблото (`/app/platformDashboard/` за суперадминистратора,
`/app/dashboards/` за администратора на акаунта). Когато човекът (тестът) отиде на друга страница, преди таблото да е
заредило, заявката на таблото се прекъсва и клиентът я записва като **`console.error`**:

```
[dashboard] decorator load failed TypeError: Failed to fetch      (1.0.10, main.2463612a.js)
[dashboard] definition load failed TypeError: Failed to fetch     (1.0.6,  main.40ca681e.js)
```

В 1.0.6 trace-ът показва прекъсната `GET /api/dashboardDefinition/search…`. В същия момент има и `console.warning`
от другите части на навбара, които също губят заявката си: `[AlertsMenuCount]`, `[InboxMenuCount]`, `[ReviewsMenuChannels]`,
`[hydraPartner] navbarExtensionLoader failed`, `[hydraPartner] the plugin surfaces were not read` — все `TypeError: Failed to fetch`.
Заявка, прекъсната от навигацията (`AbortError` / fetch, спрян при напускане), не е грешка. Тя не трябва да стига до
`console.error`, а по-добре да се отменя изрично при напускане на страницата (AbortController).

**Къде се появява:** на страницата на таблото, в мига, в който се напуска:
- `/app/platformDashboard/` (суперадминистратор) → после Platform Admin › Users, Platform Admin › Accounts;
- `/app/dashboards/` (администратор на акаунт) → после Settings › Listing tags.

Не се появява всеки път. Зависи от това дали таблото е заредило, преди да се смени страницата.

**Кои проверки блокира** (червени единствено заради нея):

| Спек › проверка | Пускове |
|---|---|
| 002-qa-account › the QA account exists — created through the Accounts form when missing | 1.0.6: 13:43, 16:46 |
| 006-platform-admin-users › the Create user form opens, every tab is presentable, an empty Save is refused | 1.0.6: 14:39, 16:46 · 1.0.10: 12:13 ×2, 12:39 (игнорирана) |
| 110-settings-listing-tags › three tags are created through the form and appear in the grid | 1.0.6: 16:46 · 1.0.10: 12:15, 13:22 |
| 110-settings-listing-tags › filtering the Description column by the whole description of one tag leaves only that tag | 1.0.6: 15:31 · 1.0.10: 12:40 (игнорирана) |

Заради нея не може да се потвърди формално поправката на **QA-13** (формата Create user, 006). Пречи и на **QA-12** (филтърът
Description, 110): когато падне „three tags are created…“, следващите проверки на 110 се пропускат. QA-12 беше
потвърден едва в пуск, в който грешката случайно не се появи (13:24); в 13:22 тя отново спря 110. Дубликатите
QA-22 (006) и QA-66 (110) са отхвърлени и сочат към QA-14.

## Следваща задача (идея, записана по искане на QA)

Истински тест за филтъра за период на Date created в Settings › Listing tags: избор на период в календара, Apply и
проверка, че в грида остават само таговете, създадени в този период. Сега проверката на колоните само разпознава
периода и го затваря с Escape, без да го пробва.
