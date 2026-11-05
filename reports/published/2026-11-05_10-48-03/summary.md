# QA run 2026-11-05_10-48-03

- Application: https://hostify.bioseek.eu
- Started: 2026-11-05T10:48:03.611Z, finished: 2026-11-05T10:50:00.604Z
- Result: **failed** — 25 passed, 9 failed, 0 skipped of 34

## Failures

### 005 005-platform-pages.spec.ts › 005 platform pages › platformLogs › consoleActions opens (/app/platformLogs/consoleActions)

**What went wrong**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 404 @ https://hostify.bioseek.eu/api/tenant/search
```
- the server answered: POST 404 — `/api/tenant/search`

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the super administrator (alarm@mail.bg).
2. Menu: platformLogs › Console actions — https://hostify.bioseek.eu/app/platformLogs/consoleActions
3. Open the browser's developer tools › Network: the request(s) above answer as reported.

**The spec**: 005 — every page of the PLATFORM console opens for the super administrator.

**Screenshots**

- `005_platformLogs_consoleActions_opens_app_platformLogs_consoleActions___shot-consoleActions.png`
- `005_platformLogs_consoleActions_opens_app_platformLogs_consoleActions___screenshot.png`

- file: `tests/e2e/005-platform-pages.spec.ts`, status: failed (1 s)

### 005 005-platform-pages.spec.ts › 005 platform pages › apps › appCenter opens (/app/apps/appCenter)

**What went wrong**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 403 @ https://hostify.bioseek.eu/api/automationApp/state
```
- the server answered: POST 403 — `/api/automationApp/state`

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the super administrator (alarm@mail.bg).
2. Menu: Apps › App Center — https://hostify.bioseek.eu/app/apps/appCenter
3. Open the browser's developer tools › Network: the request(s) above answer as reported.

**The spec**: 005 — every page of the PLATFORM console opens for the super administrator.

**Screenshots**

- `005_apps_appCenter_opens_app_apps_appCenter___shot-appCenter.png`
- `005_apps_appCenter_opens_app_apps_appCenter___screenshot.png`

- file: `tests/e2e/005-platform-pages.spec.ts`, status: failed (1 s)

### 005 005-platform-pages.spec.ts › 005 platform pages › apps › partners opens (/app/apps/partners)

**What went wrong**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 403 @ https://hostify.bioseek.eu/api/automationApp/state
```
- the server answered: POST 403 — `/api/automationApp/state`

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the super administrator (alarm@mail.bg).
2. Menu: Apps › Partner apps — https://hostify.bioseek.eu/app/apps/partners
3. Open the browser's developer tools › Network: the request(s) above answer as reported.

**The spec**: 005 — every page of the PLATFORM console opens for the super administrator.

**Screenshots**

- `005_apps_partners_opens_app_apps_partners___shot-partners.png`
- `005_apps_partners_opens_app_apps_partners___screenshot.png`

- file: `tests/e2e/005-platform-pages.spec.ts`, status: failed (1 s)

### 005 005-platform-pages.spec.ts › 005 platform pages › apps › paymentProcessorAccounts opens (/app/apps/paymentProcessorAccounts)

**What went wrong**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 403 @ https://hostify.bioseek.eu/api/automationApp/state
```
- the server answered: POST 403 — `/api/automationApp/state`

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the super administrator (alarm@mail.bg).
2. Menu: Apps › Payment processors — https://hostify.bioseek.eu/app/apps/paymentProcessorAccounts
3. Open the browser's developer tools › Network: the request(s) above answer as reported.

**The spec**: 005 — every page of the PLATFORM console opens for the super administrator.

**Screenshots**

- `005_apps_paymentProcessorAccounts_opens_app_apps_paymentProcessorAccounts___shot-paymentProcessorAccounts.png`
- `005_apps_paymentProcessorAccounts_opens_app_apps_paymentProcessorAccounts___screenshot.png`

- file: `tests/e2e/005-platform-pages.spec.ts`, status: failed (2 s)

### 005 005-platform-pages.spec.ts › 005 platform pages › apps › bookingApiClients opens (/app/apps/bookingApiClients)

**What went wrong**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 403 @ https://hostify.bioseek.eu/api/automationApp/state
```
- the server answered: POST 403 — `/api/automationApp/state`

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the super administrator (alarm@mail.bg).
2. Menu: Apps › Booking API — https://hostify.bioseek.eu/app/apps/bookingApiClients
3. Open the browser's developer tools › Network: the request(s) above answer as reported.

**The spec**: 005 — every page of the PLATFORM console opens for the super administrator.

**Screenshots**

- `005_apps_bookingApiClients_opens_app_apps_bookingApiClients___shot-bookingApiClients.png`
- `005_apps_bookingApiClients_opens_app_apps_bookingApiClients___screenshot.png`

- file: `tests/e2e/005-platform-pages.spec.ts`, status: failed (2 s)

### 005 005-platform-pages.spec.ts › 005 platform pages › apps › ownerPortalRoles opens (/app/apps/ownerPortalRoles)

**What went wrong**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 403 @ https://hostify.bioseek.eu/api/automationApp/state
```
- the server answered: POST 403 — `/api/automationApp/state`

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the super administrator (alarm@mail.bg).
2. Menu: Apps › Owner portal roles — https://hostify.bioseek.eu/app/apps/ownerPortalRoles
3. Open the browser's developer tools › Network: the request(s) above answer as reported.

**The spec**: 005 — every page of the PLATFORM console opens for the super administrator.

**Screenshots**

- `005_apps_ownerPortalRoles_opens_app_apps_ownerPortalRoles___shot-ownerPortalRoles.png`
- `005_apps_ownerPortalRoles_opens_app_apps_ownerPortalRoles___screenshot.png`

- file: `tests/e2e/005-platform-pages.spec.ts`, status: failed (1 s)

### 005 005-platform-pages.spec.ts › 005 platform pages › apps › checkinFormTemplates opens (/app/apps/checkinFormTemplates)

**What went wrong**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 403 @ https://hostify.bioseek.eu/api/automationApp/state
```
- the server answered: POST 403 — `/api/automationApp/state`

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the super administrator (alarm@mail.bg).
2. Menu: Apps › Online check-in — https://hostify.bioseek.eu/app/apps/checkinFormTemplates
3. Open the browser's developer tools › Network: the request(s) above answer as reported.

**The spec**: 005 — every page of the PLATFORM console opens for the super administrator.

**Screenshots**

- `005_apps_checkinFormTemplates_opens_app_apps_checkinFormTemplates___shot-checkinFormTemplates.png`
- `005_apps_checkinFormTemplates_opens_app_apps_checkinFormTemplates___screenshot.png`

- file: `tests/e2e/005-platform-pages.spec.ts`, status: failed (1 s)

### 005 005-platform-pages.spec.ts › 005 platform pages › apps › complianceConnections opens (/app/apps/complianceConnections)

**What went wrong**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 403 @ https://hostify.bioseek.eu/api/automationApp/state
```
- the server answered: POST 403 — `/api/automationApp/state`

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the super administrator (alarm@mail.bg).
2. Menu: Apps › Compliance connections — https://hostify.bioseek.eu/app/apps/complianceConnections
3. Open the browser's developer tools › Network: the request(s) above answer as reported.

**The spec**: 005 — every page of the PLATFORM console opens for the super administrator.

**Screenshots**

- `005_apps_complianceConnections_opens_app_apps_complianceConnections___shot-complianceConnections.png`
- `005_apps_complianceConnections_opens_app_apps_complianceConnections___screenshot.png`

- file: `tests/e2e/005-platform-pages.spec.ts`, status: failed (1 s)

### 005 005-platform-pages.spec.ts › 005 platform pages › apps › complianceSubmissions opens (/app/apps/complianceSubmissions)

**What went wrong**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 403 @ https://hostify.bioseek.eu/api/automationApp/state
```
- the server answered: POST 403 — `/api/automationApp/state`

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the super administrator (alarm@mail.bg).
2. Menu: Apps › Requests status — https://hostify.bioseek.eu/app/apps/complianceSubmissions
3. Open the browser's developer tools › Network: the request(s) above answer as reported.

**The spec**: 005 — every page of the PLATFORM console opens for the super administrator.

**Screenshots**

- `005_apps_complianceSubmissions_opens_app_apps_complianceSubmissions___shot-complianceSubmissions.png`
- `005_apps_complianceSubmissions_opens_app_apps_complianceSubmissions___screenshot.png`

- file: `tests/e2e/005-platform-pages.spec.ts`, status: failed (2 s)

## Browser console

### 005 005-platform-pages.spec.ts › 005 platform pages › platformLogs › consoleActions opens (/app/platformLogs/consoleActions)

- [api.status] POST 404 @ /api/tenant/search

### 005 005-platform-pages.spec.ts › 005 platform pages › apps › appCenter opens (/app/apps/appCenter)

- [api.status] POST 403 @ /api/automationApp/state

### 005 005-platform-pages.spec.ts › 005 platform pages › apps › partners opens (/app/apps/partners)

- [api.status] POST 403 @ /api/automationApp/state

### 005 005-platform-pages.spec.ts › 005 platform pages › apps › paymentProcessorAccounts opens (/app/apps/paymentProcessorAccounts)

- [api.status] POST 403 @ /api/automationApp/state

### 005 005-platform-pages.spec.ts › 005 platform pages › apps › bookingApiClients opens (/app/apps/bookingApiClients)

- [api.status] POST 403 @ /api/automationApp/state

### 005 005-platform-pages.spec.ts › 005 platform pages › apps › ownerPortalRoles opens (/app/apps/ownerPortalRoles)

- [api.status] POST 403 @ /api/automationApp/state

### 005 005-platform-pages.spec.ts › 005 platform pages › apps › checkinFormTemplates opens (/app/apps/checkinFormTemplates)

- [api.status] POST 403 @ /api/automationApp/state

### 005 005-platform-pages.spec.ts › 005 platform pages › apps › complianceConnections opens (/app/apps/complianceConnections)

- [api.status] POST 403 @ /api/automationApp/state

### 005 005-platform-pages.spec.ts › 005 platform pages › apps › complianceSubmissions opens (/app/apps/complianceSubmissions)

- [api.status] POST 403 @ /api/automationApp/state

## Visual review (what the eye must judge)

### users

- [warn/spinner] 1 spinner(s) still turning

### securityGroups

- [warn/empty-column] columns with no value in any row: #4

### cityNightsLimits

- [warn/empty-column] columns with no value in any row: #4

### revenueFormulas

- [warn/spinner] 1 spinner(s) still turning

### hostifyCustomerPlans

- [warn/empty-column] columns with no value in any row: Minimum fee, #8

### channels

- [warn/empty-column] columns with no value in any row: Expected initial sync hours, #11

### syncErrorGuides

- [warn/empty-column] columns with no value in any row: #6

### amenities

- [warn/empty-column] columns with no value in any row: #8

### propertyTypes

- [warn/empty-column] columns with no value in any row: #6

### userActions

- [warn/empty-column] columns with no value in any row: Staff, Account, Error message, #9

### financeLogs

- [warn/spinner] 1 spinner(s) still turning

### staffSessions

- [warn/empty-column] columns with no value in any row: Reason, #8

### engineJobRuns

- [warn/empty-column] columns with no value in any row: Correlation id, #7

### paymentProcessorAccounts

- [warn/empty-column] columns with no value in any row: Account currency, Listings

### bookingApiClients

- [warn/empty-column] columns with no value in any row: Site type, Listings, Multi-Unit mode, Long Term mode, #15

### ownerPortalRoles

- [warn/empty-column] columns with no value in any row: #6

### checkinFormTemplates

- [warn/empty-column] columns with no value in any row: Assigned Listings, #8

### complianceConnections

- [warn/empty-column] columns with no value in any row: #9

### complianceSubmissions

- [warn/empty-column] columns with no value in any row: #17

### low-contrast: 221 unique texts on 34 surfaces

- "v 1.0.3" 4.16:1 (rgb(136, 136, 136) on rgb(40, 40, 40)) @ span.cc-sidebar-footer__version.cc-sidebar-footer__version--link — 34 surface(s)
- "Search everything…" 3.1:1 (rgb(141, 141, 166) on rgb(250, 250, 251)) @ span.aero-gs-trigger-text — 34 surface(s)
- "⌘K" 3.23:1 (rgb(141, 141, 166) on rgb(255, 255, 255)) @ span.aero-gs-kbd — 34 surface(s)
- "Export" 3.52:1 (rgb(22, 127, 252) on rgb(245, 245, 245)) @ div.ant-space-item — 27 surface(s)
- "Customize view" 3.52:1 (rgb(22, 127, 252) on rgb(245, 245, 245)) @ span — 27 surface(s)
- "0 / 5" 3.31:1 (rgba(0, 0, 0, 0.45) on rgb(245, 245, 245)) @ span.cnt — 22 surface(s)
- "Name" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 21 surface(s)
- "App settings" 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 15 surface(s)
- "Account" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 9 surface(s)
- "Billing" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 9 surface(s)
- "Apps" 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 8 surface(s)
- "Logs" 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 7 surface(s)
- "Date created" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 5 surface(s)
- "Code" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 4 surface(s)
- "Platform Admin" 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 3 surface(s): tenants, users, securityGroups
- "Channel" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 3 surface(s): revenueFormulas, hostifyBillingRules, syncErrorGuides
- "Category" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 3 surface(s): channels, syncErrorGuides, amenities
- "Mode" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 3 surface(s): staffSessions, paymentProcessorAccounts, complianceConnections
- "Clear all" 3.36:1 (rgb(140, 140, 140) on rgb(255, 255, 255)) @ span — 2 surface(s): tenants, users
- "Save as" 3.84:1 (rgb(255, 255, 255) on rgb(22, 127, 252)) @ span — 2 surface(s): tenants, users
- "Active" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 2 surface(s): cityNightsLimits, propertyTypes
- "Listing" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 2 surface(s): revenueFormulas, hostifyListingPlans
- "Plan" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 2 surface(s): hostifyCustomerPlans, hostifyListingPlans
- "Kind" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 2 surface(s): hostifyBillingItems, backgroundJobs
- "Country" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 2 surface(s): hostifyBillingProfiles, complianceConnections
- "Staff" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 2 surface(s): userActions, staffSessions
- "in this view" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ div.sum-sub — 2 surface(s): engineJobRuns, complianceSubmissions
- "SPLIT" 3.45:1 (rgb(22, 127, 252) on rgb(230, 245, 255)) @ span.agg-tag — 2 surface(s): engineJobRuns, complianceSubmissions
- "Status" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 2 surface(s): customerMigrations, complianceConnections
- "Dashboard" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 1 surface(s): platformDashboard
- "The state of the platform across every account" 3.36:1 (rgb(140, 140, 140) on rgb(255, 255, 255)) @ span.navigator-description — 1 surface(s): platformDashboard
- "Where the accounts stand, how the platform grows a" 2.8:1 (rgb(138, 147, 175) on rgb(245, 245, 245)) @ div.hydra-dashboard-group-description — 1 surface(s): platformDashboard
- "Accounts" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 1 surface(s): platformDashboard
- "Active accounts" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 1 surface(s): platformDashboard
- "On trial" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 1 surface(s): platformDashboard
- "Warned or blocked" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 1 surface(s): platformDashboard
- "New accounts" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 1 surface(s): platformDashboard
- "Active listings" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 1 surface(s): platformDashboard
- "Active users" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 1 surface(s): platformDashboard
- "Reservations" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 1 surface(s): platformDashboard
- "The high is 3 at Oct 2026." 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-dashboard-widget-observation.is-openable — 1 surface(s): platformDashboard
- "Accounts" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 1 surface(s): tenants
- "Every customer account on the platform" 3.36:1 (rgb(140, 140, 140) on rgb(255, 255, 255)) @ span.navigator-description — 1 surface(s): tenants
- "Create a new tenant" 3.84:1 (rgb(255, 255, 255) on rgb(22, 127, 252)) @ span — 1 surface(s): tenants
- "Account email" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 1 surface(s): tenants
- "Account type" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 1 surface(s): tenants
- "Parent account" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 1 surface(s): tenants
- "Users" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 1 surface(s): users
- "People who can sign in, with their roles and statu" 3.36:1 (rgb(140, 140, 140) on rgb(255, 255, 255)) @ span.navigator-description — 1 surface(s): users
- "Create a new user" 3.84:1 (rgb(255, 255, 255) on rgb(22, 127, 252)) @ span — 1 surface(s): users
- "Email" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 1 surface(s): users
- "Role" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 1 surface(s): users
- "User roles" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 1 surface(s): securityGroups
- "Roles that define what each user can see and chang" 3.36:1 (rgb(140, 140, 140) on rgb(255, 255, 255)) @ span.navigator-description — 1 surface(s): securityGroups
- "Create a new security group" 3.84:1 (rgb(255, 255, 255) on rgb(22, 127, 252)) @ span — 1 surface(s): securityGroups
- "All tenants" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 1 surface(s): securityGroups
- "Default rights" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 1 surface(s): securityGroups
- "Exceptions to default" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ th.ant-table-cell.rightsExceptions — 1 surface(s): securityGroups
- "Denied" 3.35:1 (rgb(255, 0, 0) on rgb(255, 229, 229)) @ span — 1 surface(s): securityGroups
- "Amenity: Read" 3.34:1 (rgb(212, 107, 8) on rgb(255, 247, 230)) @ span.ant-tag.ant-tag-filled — 1 surface(s): securityGroups
- … 161 more (summary.json)

### cut-text: 10 unique texts on 6 surfaces

- "User status" @ span.ant-table-column-title — 1 surface(s): users
- "Fee type" @ span.ant-table-column-title — 1 surface(s): hostifyBillingItems
- "Expected initial sync hours" @ span.ant-table-column-title — 1 surface(s): channels
- "Webhook healthy" @ span.ant-table-column-title — 1 surface(s): paymentProcessorAccounts
- "Multi-Unit mode" @ span.ant-table-column-title — 1 surface(s): bookingApiClients
- "Listing" @ span.ant-table-column-title — 1 surface(s): complianceSubmissions
- "Alfama Studio" @ span — 1 surface(s): complianceSubmissions
- "Graça Viewpoint Duplex" @ span — 1 surface(s): complianceSubmissions
- "Intendente Aparthotel" @ span — 1 surface(s): complianceSubmissions
- "Eixample Modernist Flat" @ span — 1 surface(s): complianceSubmissions

## Every test

| № | Test | Status | s | Console | Findings |
|---|---|---|---|---|---|
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformDashboard opens (/app/platformDashboard) | passed | 1 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformAdmin › tenants opens (/app/platformAdmin/tenants) | passed | 1 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformAdmin › users opens (/app/platformAdmin/users) | passed | 1 | 0 | 17 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformAdmin › securityGroups opens (/app/platformAdmin/securityGroups) | passed | 1 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › cityNightsLimits opens (/app/platformSettings/cityNightsLimits) | passed | 1 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › revenueFormulas opens (/app/platformSettings/revenueFormulas) | passed | 1 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › platformBilling › activeRuListings opens (/app/platformSettings/platformBilling/activeRuListings) | passed | 21 | 0 | 10 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › platformBilling › hostifyBills opens (/app/platformSettings/platformBilling/hostifyBills) | passed | 1 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › platformBilling › hostifyCustomerPlans opens (/app/platformSettings/platformBilling/hostifyCustomerPlans) | passed | 1 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › platformBilling › hostifyPlans opens (/app/platformSettings/platformBilling/hostifyPlans) | passed | 1 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › platformBilling › hostifyListingPlans opens (/app/platformSettings/platformBilling/hostifyListingPlans) | passed | 1 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › platformBilling › hostifyBillingRules opens (/app/platformSettings/platformBilling/hostifyBillingRules) | passed | 1 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › platformBilling › hostifyBillingItems opens (/app/platformSettings/platformBilling/hostifyBillingItems) | passed | 1 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › platformBilling › hostifyBillingProfiles opens (/app/platformSettings/platformBilling/hostifyBillingProfiles) | passed | 1 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › platformBilling › hostifyBillingSettingsList opens (/app/platformSettings/platformBilling/hostifyBillingSettingsList) | passed | 1 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › channels opens (/app/platformSettings/channels) | passed | 1 | 0 | 18 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › syncErrorGuides opens (/app/platformSettings/syncErrorGuides) | passed | 1 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › amenities opens (/app/platformSettings/amenities) | passed | 1 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › propertyTypes opens (/app/platformSettings/propertyTypes) | passed | 1 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformLogs › userActions opens (/app/platformLogs/userActions) | passed | 1 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformLogs › financeLogs opens (/app/platformLogs/financeLogs) | passed | 1 | 0 | 13 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformLogs › staffSessions opens (/app/platformLogs/staffSessions) | passed | 1 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformLogs › engineJobRuns opens (/app/platformLogs/engineJobRuns) | passed | 1 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformLogs › backgroundJobs opens (/app/platformLogs/backgroundJobs) | passed | 1 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformLogs › customerMigrations opens (/app/platformLogs/customerMigrations) | passed | 1 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformLogs › consoleActions opens (/app/platformLogs/consoleActions) | failed | 1 | 1 | 8 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › apps › appCenter opens (/app/apps/appCenter) | failed | 1 | 1 | 10 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › apps › partners opens (/app/apps/partners) | failed | 1 | 1 | 7 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › apps › paymentProcessorAccounts opens (/app/apps/paymentProcessorAccounts) | failed | 2 | 1 | 18 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › apps › bookingApiClients opens (/app/apps/bookingApiClients) | failed | 2 | 1 | 18 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › apps › ownerPortalRoles opens (/app/apps/ownerPortalRoles) | failed | 1 | 1 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › apps › checkinFormTemplates opens (/app/apps/checkinFormTemplates) | failed | 1 | 1 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › apps › complianceConnections opens (/app/apps/complianceConnections) | failed | 1 | 1 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › apps › complianceSubmissions opens (/app/apps/complianceSubmissions) | failed | 2 | 1 | 28 |
