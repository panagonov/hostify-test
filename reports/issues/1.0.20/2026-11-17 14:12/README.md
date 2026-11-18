# Казуси от пуска 2026-11-17 14:12 — версия 1.0.20

- Версия на приложението: **1.0.20** (първи пуск за тази версия)
- Пуск: 2026-11-17_14-12-09 (`reports/runs/2026-11-17_14-12-09/summary.md`) — ПРЕКЪСНАТ
- Спекове в пуска: 001-super-admin-login, 002-qa-account, 003-admin-login, 005-platform-pages, 006-platform-admin-users, 007-platform-support-pages, 008-platform-pages-dark, 010-account-pages, 011-account-pages-dark, 100-settings-users, 101-navbar-support-assistant, 102-role-access, 103-channels-by-role, 104-apps-by-role, 105-platform-account-users, 110-settings-listing-tags, 111-user-telemetry

| Спек | Описание | Казуси | Нови | Файл |
|---|---|---|---|---|
| 005-platform-pages | проверка на навбар менютата на платформената конзола (всяка страница се отваря и се оглежда) | 1 | 1 | `005-platform-pages.md` |
| 007-platform-support-pages | поддръжката в платформената конзола — Support people, Queue и Proposals се отварят и се оглеждат | 2 | 2 | `007-platform-support-pages.md` |
| 008-platform-pages-dark | тъмната тема на платформената конзола — всяка страница се отваря, оглежда се и нищо не остава светло | 1 | 1 | `008-platform-pages-dark.md` |
| 010-account-pages | проверка на навбар менютата на акаунта (всяка страница се отваря и се оглежда) | 12 | 12 | `010-account-pages.md` |
| 011-account-pages-dark | тъмната тема на акаунта — всяка страница се отваря, оглежда се и нищо не остава светло | 1 | 1 | `011-account-pages-dark.md` |

## ⚠ Пуск с толериран QA-227

Известните симптоми на тези бъгове се броят, не карат проверката да пада; никой бъг не е потвърден в този пуск.

| Спек | Проверка | Толерирани |
|---|---|---|
| 005-platform-pages | appCenter opens (/app/apps/appCenter) | 52 |
| 005-platform-pages | partners opens (/app/apps/partners) | 29 |
| 005-platform-pages | paymentProcessorAccounts opens (/app/apps/paymentProcessorAccounts) | 52 |
| 005-platform-pages | bookingApiClients opens (/app/apps/bookingApiClients) | 52 |
| 005-platform-pages | ownerPortalRoles opens (/app/apps/ownerPortalRoles) | 52 |
| 005-platform-pages | checkinFormTemplates opens (/app/apps/checkinFormTemplates) | 52 |
| 005-platform-pages | complianceConnections opens (/app/apps/complianceConnections) | 52 |
| 005-platform-pages | complianceSubmissions opens (/app/apps/complianceSubmissions) | 52 |
| 008-platform-pages-dark | appCenter in the dark theme (/app/apps/appCenter) | 52 |
| 008-platform-pages-dark | partners in the dark theme (/app/apps/partners) | 28 |
| 008-platform-pages-dark | paymentProcessorAccounts in the dark theme (/app/apps/paymentProcessorAccounts) | 52 |
| 008-platform-pages-dark | bookingApiClients in the dark theme (/app/apps/bookingApiClients) | 52 |
| 008-platform-pages-dark | ownerPortalRoles in the dark theme (/app/apps/ownerPortalRoles) | 52 |
| 008-platform-pages-dark | checkinFormTemplates in the dark theme (/app/apps/checkinFormTemplates) | 52 |
| 008-platform-pages-dark | complianceConnections in the dark theme (/app/apps/complianceConnections) | 52 |
| 008-platform-pages-dark | complianceSubmissions in the dark theme (/app/apps/complianceSubmissions) | 52 |
| 010-account-pages | appCenter opens (/app/apps/appCenter) | 16 |
| 010-account-pages | paymentProcessorAccounts opens (/app/apps/paymentProcessorAccounts) | 34 |
| 010-account-pages | bookingApiClients opens (/app/apps/bookingApiClients) | 52 |
| 010-account-pages | apiKeys opens (/app/apps/apiKeys) | 52 |
| 010-account-pages | webhookSubscriptions opens (/app/apps/webhookSubscriptions) | 52 |
| 010-account-pages | webhookDeliveries opens (/app/apps/webhookDeliveries) | 52 |
| 010-account-pages | ownerPortalRoles opens (/app/apps/ownerPortalRoles) | 52 |
| 010-account-pages | checkinFormTemplates opens (/app/apps/checkinFormTemplates) | 52 |
| 010-account-pages | complianceConnections opens (/app/apps/complianceConnections) | 52 |
| 010-account-pages | complianceSubmissions opens (/app/apps/complianceSubmissions) | 52 |
| 010-account-pages | accountProfile opens (/app/settings/accountProfile) | 67 |
| 010-account-pages | reportingSettingsList opens (/app/settings/reportingSettingsList) | 6 |
| 010-account-pages | users opens (/app/settings/users) | 78 |
| 010-account-pages | workflowDefinitions opens (/app/settings/workflowDefinitions) | 78 |
| 010-account-pages | dataShape opens (/app/settings/dataShape) | 78 |
| 010-account-pages | securityGroups opens (/app/settings/securityGroups) | 78 |
| 010-account-pages | securitySettings opens (/app/settings/securitySettings) | 78 |
| 010-account-pages | companies opens (/app/settings/companies) | 78 |
| 010-account-pages | contacts opens (/app/settings/contacts) | 78 |
| 010-account-pages | reservationSources opens (/app/settings/reservationSources) | 78 |
| 010-account-pages | settingsFormulas opens (/app/settings/settingsFormulas) | 70 |
| 010-account-pages | savedReplies opens (/app/settings/savedReplies) | 78 |
| 010-account-pages | messagingSettings opens (/app/settings/messagingSettings) | 78 |
| 010-account-pages | transactionTags opens (/app/settings/transactionTags) | 78 |
| 010-account-pages | listingTags opens (/app/settings/listingTags) | 78 |
| 010-account-pages | customFields opens (/app/settings/customFields) | 78 |
| 010-account-pages | settingsFees opens (/app/settings/settingsFees) | 78 |
| 010-account-pages | settingsExtras opens (/app/settings/settingsExtras) | 78 |
| 010-account-pages | settingsTaxes opens (/app/settings/settingsTaxes) | 78 |
| 010-account-pages | vatRates opens (/app/settings/vatRates) | 78 |
| 010-account-pages | settingsCosts opens (/app/settings/settingsCosts) | 78 |
| 010-account-pages | feeItemSettings opens (/app/settings/feeItemSettings) | 78 |
| 010-account-pages | vatRateSettings opens (/app/settings/vatRateSettings) | 78 |
| 010-account-pages | paymentSchedules opens (/app/settings/paymentSchedules) | 78 |
| 010-account-pages | bookingSites opens (/app/settings/bookingSites) | 78 |
| 010-account-pages | listingGroups opens (/app/settings/listingGroups) | 78 |
| 010-account-pages | notificationSettings opens (/app/settings/notificationSettings) | 78 |
| 010-account-pages | syncActivities opens (/app/settings/syncActivities) | 78 |
| 010-account-pages | privacySettings opens (/app/settings/privacySettings) | 78 |
| 010-account-pages | accountBilling opens (/app/settings/accountBilling) | 78 |
| 010-account-pages | demoData opens (/app/settings/demoData) | 64 |
| 011-account-pages-dark | appCenter in the dark theme (/app/apps/appCenter) | 13 |
| 011-account-pages-dark | paymentProcessorAccounts in the dark theme (/app/apps/paymentProcessorAccounts) | 13 |
| 011-account-pages-dark | bookingApiClients in the dark theme (/app/apps/bookingApiClients) | 31 |
| 011-account-pages-dark | apiKeys in the dark theme (/app/apps/apiKeys) | 31 |
| 011-account-pages-dark | webhookSubscriptions in the dark theme (/app/apps/webhookSubscriptions) | 31 |
| 011-account-pages-dark | webhookDeliveries in the dark theme (/app/apps/webhookDeliveries) | 31 |
| 011-account-pages-dark | ownerPortalRoles in the dark theme (/app/apps/ownerPortalRoles) | 31 |
| 011-account-pages-dark | checkinFormTemplates in the dark theme (/app/apps/checkinFormTemplates) | 31 |
| 011-account-pages-dark | complianceConnections in the dark theme (/app/apps/complianceConnections) | 31 |
| 011-account-pages-dark | complianceSubmissions in the dark theme (/app/apps/complianceSubmissions) | 31 |
| 011-account-pages-dark | accountProfile in the dark theme (/app/settings/accountProfile) | 78 |
| 011-account-pages-dark | users in the dark theme (/app/settings/users) | 78 |
| 011-account-pages-dark | workflowDefinitions in the dark theme (/app/settings/workflowDefinitions) | 78 |
| 011-account-pages-dark | dataShape in the dark theme (/app/settings/dataShape) | 78 |
| 011-account-pages-dark | securityGroups in the dark theme (/app/settings/securityGroups) | 78 |
| 011-account-pages-dark | securitySettings in the dark theme (/app/settings/securitySettings) | 78 |
| 011-account-pages-dark | companies in the dark theme (/app/settings/companies) | 78 |
| 011-account-pages-dark | contacts in the dark theme (/app/settings/contacts) | 78 |
| 011-account-pages-dark | reservationSources in the dark theme (/app/settings/reservationSources) | 78 |
| 011-account-pages-dark | settingsFormulas in the dark theme (/app/settings/settingsFormulas) | 78 |
| 011-account-pages-dark | savedReplies in the dark theme (/app/settings/savedReplies) | 78 |
| 011-account-pages-dark | messagingSettings in the dark theme (/app/settings/messagingSettings) | 78 |
| 011-account-pages-dark | transactionTags in the dark theme (/app/settings/transactionTags) | 78 |
| 011-account-pages-dark | listingTags in the dark theme (/app/settings/listingTags) | 78 |
| 011-account-pages-dark | customFields in the dark theme (/app/settings/customFields) | 78 |
| 011-account-pages-dark | settingsFees in the dark theme (/app/settings/settingsFees) | 76 |
| 011-account-pages-dark | settingsExtras in the dark theme (/app/settings/settingsExtras) | 76 |
| 011-account-pages-dark | settingsTaxes in the dark theme (/app/settings/settingsTaxes) | 76 |
| 011-account-pages-dark | vatRates in the dark theme (/app/settings/vatRates) | 78 |
| 011-account-pages-dark | settingsCosts in the dark theme (/app/settings/settingsCosts) | 78 |
| 011-account-pages-dark | feeItemSettings in the dark theme (/app/settings/feeItemSettings) | 78 |
| 011-account-pages-dark | vatRateSettings in the dark theme (/app/settings/vatRateSettings) | 78 |
| 011-account-pages-dark | paymentSchedules in the dark theme (/app/settings/paymentSchedules) | 78 |
| 011-account-pages-dark | bookingSites in the dark theme (/app/settings/bookingSites) | 78 |
| 011-account-pages-dark | listingGroups in the dark theme (/app/settings/listingGroups) | 78 |
| 011-account-pages-dark | notificationSettings in the dark theme (/app/settings/notificationSettings) | 78 |
| 011-account-pages-dark | syncActivities in the dark theme (/app/settings/syncActivities) | 78 |
| 011-account-pages-dark | privacySettings in the dark theme (/app/settings/privacySettings) | 78 |
| 011-account-pages-dark | accountBilling in the dark theme (/app/settings/accountBilling) | 78 |
| 011-account-pages-dark | demoData in the dark theme (/app/settings/demoData) | 78 |
| 100-settings-users | the Users page opens through the menu and the Create form behaves | 78 |

Всеки файл описва какво се е объркало, как се възпроизвежда и кои скрийншоти да се гледат. Папката се подава на агента в проекта Hostify за анализ и поправка.
