# 102-role-access — права по роли — всяка роля от 100 вижда точно своите страници, отваря ги без 403 и не вижда чуждите

- Пуск: 2026-11-16_16-03-20 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.15
- Спек: `tests/e2e/102-role-access.spec.ts`
- Казуси: 3 от 3 проверки

## Казус 1: manager: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused

_Нов в този пуск._

**Какво се обърка**

```
Error: expect(received).resolves.toBeTruthy()

Received promise rejected instead of resolved
Rejected to value: [Error: submenu node "unifiedInbox"·
expect(locator).toBeVisible() failed·
Locator:  locator('.cc-submenu-slide-panel').locator('[data-test="unifiedInbox"]')
Expected: visible
Received: hidden
Timeout:  30000ms·
Call log:
  - submenu node "unifiedInbox" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="unifiedInbox"]')
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като manager на акаунта (qa.manager@hostify-qa.test).
2. Меню: OTHER FEATURES › Settings › Calendar Service › iCal blocks — https://hostify.bioseek.eu/app/ourFeatures/ourSettings/calendarService/icalBlocks
3. Спек `tests/e2e/102-role-access.spec.ts`, проверка „manager: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused“ — стъпките:
4. the live menu holds exactly the pages the inventory gives the role
5. dashboards (/app/dashboards)
6. inbox › unifiedInbox (/app/inbox/unifiedInbox)
7. inbox › inboxThreads (/app/inbox/inboxThreads)
8. inbox › inboxAiRuns (/app/inbox/inboxAiRuns)
9. inbox › messageTemplates (/app/inbox/messageTemplates)
10. inbox › emailTemplates (/app/inbox/emailTemplates)
11. inbox › emailLogs (/app/inbox/emailLogs)
12. inbox › inboxTags (/app/inbox/inboxTags)
13. multiCalendar (/app/multiCalendar)
14. operations › tasks (/app/operations/tasks)
15. operations › housekeepingBoard (/app/operations/housekeepingBoard)
16. operations › taskDashboard (/app/operations/taskDashboard)
17. operations › taskIssues (/app/operations/taskIssues)
18. operations › myTasks (/app/operations/myTasks)
19. operations › taskTemplates (/app/operations/taskTemplates)
20. operations › defaultAssignments (/app/operations/defaultAssignments)
21. operations › taskTeams (/app/operations/taskTeams)
22. operations › taskNotificationSettings (/app/operations/taskNotificationSettings)
23. operations › calendar (/app/operations/calendar)
24. operations › taskExpenses (/app/operations/taskExpenses)
25. reservationsMenu › reservations (/app/reservationsMenu/reservations)
26. reservationsMenu › reservationAlterations (/app/reservationsMenu/reservationAlterations)
27. reservationsMenu › reservationImports (/app/reservationsMenu/reservationImports)
28. listingsMenu › listings (/app/listingsMenu/listings)
29. listingsMenu › listingFaqs (/app/listingsMenu/listingFaqs)
30. listingsMenu › guidebookTemplates (/app/listingsMenu/guidebookTemplates)
31. listingsMenu › listingUnits (/app/listingsMenu/listingUnits)
32. listingsMenu › listingBuildings (/app/listingsMenu/listingBuildings)
33. listingsMenu › listingLinks (/app/listingsMenu/listingLinks)
34. listingsMenu › listingPolicies (/app/listingsMenu/listingPolicies)
35. guests (/app/guests)
36. every column has a header and the actions column is the last one
37. reporting › reportingOverview (/app/reporting/reportingOverview)
38. reporting › pivotGrid (/app/reporting/pivotGrid)
39. reporting › inboxReports (/app/reporting/inboxReports)
40. reporting › reportingHousekeeping (/app/reporting/reportingHousekeeping)
41. reporting › channelHealth (/app/reporting/channelHealth)
42. reporting › reportingReviews (/app/reporting/reportingReviews)
43. reporting › guestCheckins (/app/reporting/guestCheckins)
44. reporting › checkinGuests (/app/reporting/checkinGuests)
45. pricing › pricingBasePrice (/app/pricing/pricingBasePrice)
46. pricing › pricingFees (/app/pricing/pricingFees)
47. pricing › pricingTaxes (/app/pricing/pricingTaxes)
48. pricing › pricingExtras (/app/pricing/pricingExtras)
49. pricing › pricingCosts (/app/pricing/pricingCosts)
50. pricing › taxRules (/app/pricing/taxRules)
51. ownersMenu › ownerStatements (/app/ownersMenu/ownerStatements)
52. ownersMenu › ownerPayments (/app/ownersMenu/ownerPayments)
53. ownersMenu › owners (/app/ownersMenu/owners)
54. ownersMenu › ownerContracts (/app/ownersMenu/ownerContracts)
55. ownersMenu › ownerContractTemplates (/app/ownersMenu/ownerContractTemplates)
56. ownersMenu › ownerPnl (/app/ownersMenu/ownerPnl)
57. ownersMenu › generalLedger (/app/ownersMenu/generalLedger)
58. ownersMenu › ledgerAccounts (/app/ownersMenu/ledgerAccounts)
59. finance › invoices (/app/finance/invoices)
60. finance › expenses (/app/finance/expenses)
61. finance › costCategories (/app/finance/costCategories)
62. finance › paymentTransactions (/app/finance/paymentTransactions)
63. automations › automationsHub (/app/automations/automationsHub)
64. automations › autoMessageRules (/app/automations/autoMessageRules)
65. automations › autoPaymentRules (/app/automations/autoPaymentRules)
66. automations › autoPricingRules (/app/automations/autoPricingRules)
67. automations › autoTaskRules (/app/automations/autoTaskRules)
68. automations › autoInvoiceRules (/app/automations/autoInvoiceRules)
69. automations › massMessages (/app/automations/massMessages)
70. automations › automationRuns (/app/automations/automationRuns)
71. channelManager › channelsHub (/app/channelManager/channelsHub)
72. channelManager › channelAccounts (/app/channelManager/channelAccounts)
73. channelManager › channelConnectWizard (/app/channelManager/channelConnectWizard)
74. channelManager › channelListings (/app/channelManager/channelListings)
75. channelManager › channelProperties (/app/channelManager/channelProperties)
76. channelManager › channelRatePlans (/app/channelManager/channelRatePlans)
77. channelManager › channelListingPromotions (/app/channelManager/channelListingPromotions)
78. channelManager › airbnbOpportunities (/app/channelManager/airbnbOpportunities)
79. channelManager › channelCommands (/app/channelManager/channelCommands)
80. channelManager › channelInboundEvents (/app/channelManager/channelInboundEvents)
81. apps › appCenter (/app/apps/appCenter)
82. apps › paymentProcessorAccounts (/app/apps/paymentProcessorAccounts)
83. apps › bookingApiClients (/app/apps/bookingApiClients)
84. apps › ownerPortalRoles (/app/apps/ownerPortalRoles)
85. apps › checkinFormTemplates (/app/apps/checkinFormTemplates)
86. apps › complianceConnections (/app/apps/complianceConnections)
87. apps › complianceSubmissions (/app/apps/complianceSubmissions)
88. ourFeatures › ourReporting › reportsOverview (/app/ourFeatures/ourReporting/reportsOverview)
89. ourFeatures › ourReporting › reportRuns (/app/ourFeatures/ourReporting/reportRuns)
90. ourFeatures › ourReporting › reportDefinitions (/app/ourFeatures/ourReporting/reportDefinitions)
91. ourFeatures › ourReporting › reportCategories (/app/ourFeatures/ourReporting/reportCategories)
92. ourFeatures › ourReporting › reservationNights (/app/ourFeatures/ourReporting/reservationNights)
93. ourFeatures › ourReporting › kpiDefinitions (/app/ourFeatures/ourReporting/kpiDefinitions)
94. ourFeatures › ourOwners › ownerStatementRuns (/app/ourFeatures/ourOwners/ownerStatementRuns)
95. ourFeatures › ourOwners › sepaPayoutBatches (/app/ourFeatures/ourOwners/sepaPayoutBatches)
96. ourFeatures › ourOwners › eInvoiceSubmissions (/app/ourFeatures/ourOwners/eInvoiceSubmissions)
97. ourFeatures › ownersSettings › vendors (/app/ourFeatures/ownersSettings/vendors)
98. every column has a header and the actions column is the last one
99. ourFeatures › ownersSettings › printTemplates (/app/ourFeatures/ownersSettings/printTemplates)
100. ourFeatures › ownersSettings › vendorContracts (/app/ourFeatures/ownersSettings/vendorContracts)
101. ourFeatures › ownersSettings › fiscalSeriesList (/app/ourFeatures/ownersSettings/fiscalSeriesList)
102. ourFeatures › ownersSettings › taxJurisdictions (/app/ourFeatures/ownersSettings/taxJurisdictions)
103. ourFeatures › ownersSettings › costCategorySettings (/app/ourFeatures/ownersSettings/costCategorySettings)
104. ourFeatures › ourFinance › creditCards (/app/ourFeatures/ourFinance/creditCards)
105. ourFeatures › ourSettings › brands (/app/ourFeatures/ourSettings/brands)
106. ourFeatures › ourSettings › accountGenealogy (/app/ourFeatures/ourSettings/accountGenealogy)
107. ourFeatures › ourSettings › inboxAiSettings (/app/ourFeatures/ourSettings/inboxAiSettings)
108. ourFeatures › ourSettings › documents (/app/ourFeatures/ourSettings/documents)
109. ourFeatures › ourSettings › documentCustomFields (/app/ourFeatures/ourSettings/documentCustomFields)
110. ourFeatures › ourSettings › histories (/app/ourFeatures/ourSettings/histories)
111. ourFeatures › ourSettings › engineHealth (/app/ourFeatures/ourSettings/engineHealth)
112. every column has a header and the actions column is the last one
113. ourFeatures › ourSettings › calUpdateLogs (/app/ourFeatures/ourSettings/calUpdateLogs)
114. ourFeatures › ourSettings › changeAnnouncements (/app/ourFeatures/ourSettings/changeAnnouncements)
115. ourFeatures › ourSettings › calendarService › calWarnings (/app/ourFeatures/ourSettings/calendarService/calWarnings)
116. every column has a header and the actions column is the last one
117. ourFeatures › ourSettings › calendarService › icalSubscriptions (/app/ourFeatures/ourSettings/calendarService/icalSubscriptions)
118. ourFeatures › ourSettings › calendarService › icalExportFeeds (/app/ourFeatures/ourSettings/calendarService/icalExportFeeds)
119. ourFeatures › ourSettings › calendarService › availabilityDependencies (/app/ourFeatures/ourSettings/calendarService/availabilityDependencies)
120. ourFeatures › ourSettings › calendarService › pricingDependencies (/app/ourFeatures/ourSettings/calendarService/pricingDependencies)
121. ourFeatures › ourSettings › calendarService › ratePlans (/app/ourFeatures/ourSettings/calendarService/ratePlans)
122. ourFeatures › ourSettings › calendarService › calStretches (/app/ourFeatures/ourSettings/calendarService/calStretches)
123. ourFeatures › ourSettings › calendarService › calReservations (/app/ourFeatures/ourSettings/calendarService/calReservations)
124. ourFeatures › ourSettings › calendarService › deferredWrites (/app/ourFeatures/ourSettings/calendarService/deferredWrites)
125. ourFeatures › ourSettings › calendarService › engineAlerts (/app/ourFeatures/ourSettings/calendarService/engineAlerts)
126. ourFeatures › ourSettings › calendarService › dailyViews (/app/ourFeatures/ourSettings/calendarService/dailyViews)
127. ourFeatures › ourSettings › calendarService › monthlyViews (/app/ourFeatures/ourSettings/calendarService/monthlyViews)
128. ourFeatures › ourSettings › calendarService › websiteStatsList (/app/ourFeatures/ourSettings/calendarService/websiteStatsList)
129. ourFeatures › ourSettings › calendarService › icalBlocks (/app/ourFeatures/ourSettings/calendarService/icalBlocks)
130. settings › reportingSettingsList (/app/settings/reportingSettingsList)
131. settings › companies (/app/settings/companies)
132. settings › contacts (/app/settings/contacts)
133. settings › reservationSources (/app/settings/reservationSources)
134. settings › settingsFormulas (/app/settings/settingsFormulas)
135. settings › savedReplies (/app/settings/savedReplies)
136. settings › messagingSettings (/app/settings/messagingSettings)
137. settings › transactionTags (/app/settings/transactionTags)
138. settings › listingTags (/app/settings/listingTags)
139. settings › customFields (/app/settings/customFields)
140. settings › settingsFees (/app/settings/settingsFees)
141. settings › settingsExtras (/app/settings/settingsExtras)
142. settings › settingsTaxes (/app/settings/settingsTaxes)
143. settings › vatRates (/app/settings/vatRates)
144. settings › settingsCosts (/app/settings/settingsCosts)
145. settings › feeItemSettings (/app/settings/feeItemSettings)
146. settings › vatRateSettings (/app/settings/vatRateSettings)
147. settings › paymentSchedules (/app/settings/paymentSchedules)
148. settings › bookingSites (/app/settings/bookingSites)
149. settings › listingGroups (/app/settings/listingGroups)
150. settings › syncActivities (/app/settings/syncActivities)
151. the administrator's pages, by their address, show "Page not found" and no data

**Скрийншоти**

![102-role-access-1-shot-manager-unifiedInbox.png](./102-role-access-1-shot-manager-unifiedInbox.png)
![102-role-access-1-shot-manager-inboxThreads.png](./102-role-access-1-shot-manager-inboxThreads.png)
![102-role-access-1-shot-manager-inboxAiRuns.png](./102-role-access-1-shot-manager-inboxAiRuns.png)
![102-role-access-1-shot-manager-messageTemplates.png](./102-role-access-1-shot-manager-messageTemplates.png)
![102-role-access-1-shot-manager-emailTemplates.png](./102-role-access-1-shot-manager-emailTemplates.png)
![102-role-access-1-shot-manager-emailLogs.png](./102-role-access-1-shot-manager-emailLogs.png)
![102-role-access-1-shot-manager-inboxTags.png](./102-role-access-1-shot-manager-inboxTags.png)
![102-role-access-1-shot-manager-tasks.png](./102-role-access-1-shot-manager-tasks.png)
![102-role-access-1-shot-manager-housekeepingBoard.png](./102-role-access-1-shot-manager-housekeepingBoard.png)
![102-role-access-1-shot-manager-taskDashboard.png](./102-role-access-1-shot-manager-taskDashboard.png)
![102-role-access-1-shot-manager-taskIssues.png](./102-role-access-1-shot-manager-taskIssues.png)
![102-role-access-1-shot-manager-myTasks.png](./102-role-access-1-shot-manager-myTasks.png)
![102-role-access-1-shot-manager-taskTemplates.png](./102-role-access-1-shot-manager-taskTemplates.png)
![102-role-access-1-shot-manager-defaultAssignments.png](./102-role-access-1-shot-manager-defaultAssignments.png)
![102-role-access-1-shot-manager-taskTeams.png](./102-role-access-1-shot-manager-taskTeams.png)
![102-role-access-1-shot-manager-taskNotificationSettings.png](./102-role-access-1-shot-manager-taskNotificationSettings.png)
![102-role-access-1-shot-manager-calendar.png](./102-role-access-1-shot-manager-calendar.png)
![102-role-access-1-shot-manager-taskExpenses.png](./102-role-access-1-shot-manager-taskExpenses.png)
![102-role-access-1-shot-manager-reservations.png](./102-role-access-1-shot-manager-reservations.png)
![102-role-access-1-shot-manager-reservationAlterations.png](./102-role-access-1-shot-manager-reservationAlterations.png)
![102-role-access-1-shot-manager-reservationImports.png](./102-role-access-1-shot-manager-reservationImports.png)
![102-role-access-1-shot-manager-listings.png](./102-role-access-1-shot-manager-listings.png)
![102-role-access-1-shot-manager-listingFaqs.png](./102-role-access-1-shot-manager-listingFaqs.png)
![102-role-access-1-shot-manager-guidebookTemplates.png](./102-role-access-1-shot-manager-guidebookTemplates.png)
![102-role-access-1-shot-manager-listingUnits.png](./102-role-access-1-shot-manager-listingUnits.png)
![102-role-access-1-shot-manager-listingBuildings.png](./102-role-access-1-shot-manager-listingBuildings.png)
![102-role-access-1-shot-manager-listingLinks.png](./102-role-access-1-shot-manager-listingLinks.png)
![102-role-access-1-shot-manager-listingPolicies.png](./102-role-access-1-shot-manager-listingPolicies.png)
![102-role-access-1-shot-manager-reportingOverview.png](./102-role-access-1-shot-manager-reportingOverview.png)
![102-role-access-1-shot-manager-pivotGrid.png](./102-role-access-1-shot-manager-pivotGrid.png)
![102-role-access-1-shot-manager-inboxReports.png](./102-role-access-1-shot-manager-inboxReports.png)
![102-role-access-1-shot-manager-reportingHousekeeping.png](./102-role-access-1-shot-manager-reportingHousekeeping.png)
![102-role-access-1-shot-manager-channelHealth.png](./102-role-access-1-shot-manager-channelHealth.png)
![102-role-access-1-shot-manager-reportingReviews.png](./102-role-access-1-shot-manager-reportingReviews.png)
![102-role-access-1-shot-manager-guestCheckins.png](./102-role-access-1-shot-manager-guestCheckins.png)
![102-role-access-1-shot-manager-checkinGuests.png](./102-role-access-1-shot-manager-checkinGuests.png)
![102-role-access-1-shot-manager-pricingBasePrice.png](./102-role-access-1-shot-manager-pricingBasePrice.png)
![102-role-access-1-shot-manager-pricingFees.png](./102-role-access-1-shot-manager-pricingFees.png)
![102-role-access-1-shot-manager-pricingTaxes.png](./102-role-access-1-shot-manager-pricingTaxes.png)
![102-role-access-1-shot-manager-pricingExtras.png](./102-role-access-1-shot-manager-pricingExtras.png)
![102-role-access-1-shot-manager-pricingCosts.png](./102-role-access-1-shot-manager-pricingCosts.png)
![102-role-access-1-shot-manager-taxRules.png](./102-role-access-1-shot-manager-taxRules.png)
![102-role-access-1-shot-manager-ownerStatements.png](./102-role-access-1-shot-manager-ownerStatements.png)
![102-role-access-1-shot-manager-ownerPayments.png](./102-role-access-1-shot-manager-ownerPayments.png)
![102-role-access-1-shot-manager-owners.png](./102-role-access-1-shot-manager-owners.png)
![102-role-access-1-shot-manager-ownerContracts.png](./102-role-access-1-shot-manager-ownerContracts.png)
![102-role-access-1-shot-manager-ownerContractTemplates.png](./102-role-access-1-shot-manager-ownerContractTemplates.png)
![102-role-access-1-shot-manager-ownerPnl.png](./102-role-access-1-shot-manager-ownerPnl.png)
![102-role-access-1-shot-manager-generalLedger.png](./102-role-access-1-shot-manager-generalLedger.png)
![102-role-access-1-shot-manager-ledgerAccounts.png](./102-role-access-1-shot-manager-ledgerAccounts.png)
![102-role-access-1-shot-manager-invoices.png](./102-role-access-1-shot-manager-invoices.png)
![102-role-access-1-shot-manager-expenses.png](./102-role-access-1-shot-manager-expenses.png)
![102-role-access-1-shot-manager-costCategories.png](./102-role-access-1-shot-manager-costCategories.png)
![102-role-access-1-shot-manager-paymentTransactions.png](./102-role-access-1-shot-manager-paymentTransactions.png)
![102-role-access-1-shot-manager-automationsHub.png](./102-role-access-1-shot-manager-automationsHub.png)
![102-role-access-1-shot-manager-autoMessageRules.png](./102-role-access-1-shot-manager-autoMessageRules.png)
![102-role-access-1-shot-manager-autoPaymentRules.png](./102-role-access-1-shot-manager-autoPaymentRules.png)
![102-role-access-1-shot-manager-autoPricingRules.png](./102-role-access-1-shot-manager-autoPricingRules.png)
![102-role-access-1-shot-manager-autoTaskRules.png](./102-role-access-1-shot-manager-autoTaskRules.png)
![102-role-access-1-shot-manager-autoInvoiceRules.png](./102-role-access-1-shot-manager-autoInvoiceRules.png)
![102-role-access-1-shot-manager-massMessages.png](./102-role-access-1-shot-manager-massMessages.png)
![102-role-access-1-shot-manager-automationRuns.png](./102-role-access-1-shot-manager-automationRuns.png)
![102-role-access-1-shot-manager-channelsHub.png](./102-role-access-1-shot-manager-channelsHub.png)
![102-role-access-1-shot-manager-channelAccounts.png](./102-role-access-1-shot-manager-channelAccounts.png)
![102-role-access-1-shot-manager-channelConnectWizard.png](./102-role-access-1-shot-manager-channelConnectWizard.png)
![102-role-access-1-shot-manager-channelListings.png](./102-role-access-1-shot-manager-channelListings.png)
![102-role-access-1-shot-manager-channelProperties.png](./102-role-access-1-shot-manager-channelProperties.png)
![102-role-access-1-shot-manager-channelRatePlans.png](./102-role-access-1-shot-manager-channelRatePlans.png)
![102-role-access-1-shot-manager-channelListingPromotions.png](./102-role-access-1-shot-manager-channelListingPromotions.png)
![102-role-access-1-shot-manager-airbnbOpportunities.png](./102-role-access-1-shot-manager-airbnbOpportunities.png)
![102-role-access-1-shot-manager-channelCommands.png](./102-role-access-1-shot-manager-channelCommands.png)
![102-role-access-1-shot-manager-channelInboundEvents.png](./102-role-access-1-shot-manager-channelInboundEvents.png)
![102-role-access-1-shot-manager-appCenter.png](./102-role-access-1-shot-manager-appCenter.png)
![102-role-access-1-shot-manager-paymentProcessorAccounts.png](./102-role-access-1-shot-manager-paymentProcessorAccounts.png)
![102-role-access-1-shot-manager-bookingApiClients.png](./102-role-access-1-shot-manager-bookingApiClients.png)
![102-role-access-1-shot-manager-ownerPortalRoles.png](./102-role-access-1-shot-manager-ownerPortalRoles.png)
![102-role-access-1-shot-manager-checkinFormTemplates.png](./102-role-access-1-shot-manager-checkinFormTemplates.png)
![102-role-access-1-shot-manager-complianceConnections.png](./102-role-access-1-shot-manager-complianceConnections.png)
![102-role-access-1-shot-manager-complianceSubmissions.png](./102-role-access-1-shot-manager-complianceSubmissions.png)
![102-role-access-1-shot-manager-reportingSettingsList.png](./102-role-access-1-shot-manager-reportingSettingsList.png)
![102-role-access-1-shot-manager-companies.png](./102-role-access-1-shot-manager-companies.png)
![102-role-access-1-shot-manager-contacts.png](./102-role-access-1-shot-manager-contacts.png)
![102-role-access-1-shot-manager-reservationSources.png](./102-role-access-1-shot-manager-reservationSources.png)
![102-role-access-1-shot-manager-settingsFormulas.png](./102-role-access-1-shot-manager-settingsFormulas.png)
![102-role-access-1-shot-manager-savedReplies.png](./102-role-access-1-shot-manager-savedReplies.png)
![102-role-access-1-shot-manager-messagingSettings.png](./102-role-access-1-shot-manager-messagingSettings.png)
![102-role-access-1-shot-manager-transactionTags.png](./102-role-access-1-shot-manager-transactionTags.png)
![102-role-access-1-shot-manager-listingTags.png](./102-role-access-1-shot-manager-listingTags.png)
![102-role-access-1-shot-manager-customFields.png](./102-role-access-1-shot-manager-customFields.png)
![102-role-access-1-shot-manager-settingsFees.png](./102-role-access-1-shot-manager-settingsFees.png)
![102-role-access-1-shot-manager-settingsExtras.png](./102-role-access-1-shot-manager-settingsExtras.png)
![102-role-access-1-shot-manager-settingsTaxes.png](./102-role-access-1-shot-manager-settingsTaxes.png)
![102-role-access-1-shot-manager-vatRates.png](./102-role-access-1-shot-manager-vatRates.png)
![102-role-access-1-shot-manager-settingsCosts.png](./102-role-access-1-shot-manager-settingsCosts.png)
![102-role-access-1-shot-manager-feeItemSettings.png](./102-role-access-1-shot-manager-feeItemSettings.png)
![102-role-access-1-shot-manager-vatRateSettings.png](./102-role-access-1-shot-manager-vatRateSettings.png)
![102-role-access-1-shot-manager-paymentSchedules.png](./102-role-access-1-shot-manager-paymentSchedules.png)
![102-role-access-1-shot-manager-bookingSites.png](./102-role-access-1-shot-manager-bookingSites.png)
![102-role-access-1-shot-manager-listingGroups.png](./102-role-access-1-shot-manager-listingGroups.png)
![102-role-access-1-shot-manager-syncActivities.png](./102-role-access-1-shot-manager-syncActivities.png)
![102-role-access-1-screenshot.png](./102-role-access-1-screenshot.png)


## Казус 2: bookingAgent: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused

_Нов в този пуск._

**Какво се обърка**

```
Error: expect(received).resolves.toBeTruthy()

Received promise rejected instead of resolved
Rejected to value: [Error: submenu node "unifiedInbox"·
expect(locator).toBeVisible() failed·
Locator:  locator('.cc-submenu-slide-panel').locator('[data-test="unifiedInbox"]')
Expected: visible
Received: hidden
Timeout:  30000ms·
Call log:
  - submenu node "unifiedInbox" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="unifiedInbox"]')
```
- сървърът отговори: GET 403 — `/api/complianceConnection/search?size=100&page=1`
- конзола: Grid read failed for "history" requestFailed {message: Access denied, error: -1, code: 403} — `/app/static/js/main.c75d4ea9.js`
- сървърът отговори: GET 403 — `/api/history/search?page=1&size=10&lang=en&sort=date_created&sort=descend`
- конзола: Grid read failed for "changeAnnouncement" requestFailed {message: Access denied, error: -1, code: 403} — `/app/static/js/main.c75d4ea9.js`
- сървърът отговори: GET 403 — `/api/changeAnnouncement/search?page=1&size=10&lang=en`
- конзола: Grid read failed for "icalSubscription" requestFailed {message: Access denied, error: -1, code: 403} — `/app/static/js/main.c75d4ea9.js`
- сървърът отговори: GET 403 — `/api/icalSubscription/search?page=1&size=10&lang=en&sort=date_created&sort=descend`
- конзола: Grid read failed for "icalExportFeed" requestFailed {message: Access denied, error: -1, code: 403} — `/app/static/js/main.c75d4ea9.js`
- сървърът отговори: GET 403 — `/api/icalExportFeed/search?page=1&size=10&lang=en&sort=date_created&sort=descend`
- конзола: Grid read failed for "availabilityDependency" requestFailed {message: Access denied, error: -1, code: 403} — `/app/static/js/main.c75d4ea9.js`
- на екрана (histories): Forbidden -1Access denied
- на екрана (calUpdateLogs): Forbidden -1Access denied
- на екрана (changeAnnouncements): Forbidden -1Access denied
- на екрана (icalSubscriptions): Forbidden -1Access denied
- на екрана (icalExportFeeds): Forbidden -1Access denied
- на екрана (icalExportFeeds): Forbidden -1Access denied
- на екрана (availabilityDependencies): Forbidden -1Access denied
- на екрана (availabilityDependencies): Forbidden -1Access denied
- на екрана (pricingDependencies): Forbidden -1Access denied
- на екрана (pricingDependencies): Forbidden -1Access denied

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като bookingAgent на акаунта (qa.booking.agent@hostify-qa.test).
2. Меню: OTHER FEATURES › Settings › Calendar Service › iCal blocks — https://hostify.bioseek.eu/app/ourFeatures/ourSettings/calendarService/icalBlocks
3. Спек `tests/e2e/102-role-access.spec.ts`, проверка „bookingAgent: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused“ — стъпките:
4. the live menu holds exactly the pages the inventory gives the role
5. dashboards (/app/dashboards)
6. inbox › unifiedInbox (/app/inbox/unifiedInbox)
7. inbox › inboxThreads (/app/inbox/inboxThreads)
8. inbox › inboxAiRuns (/app/inbox/inboxAiRuns)
9. multiCalendar (/app/multiCalendar)
10. operations › tasks (/app/operations/tasks)
11. operations › housekeepingBoard (/app/operations/housekeepingBoard)
12. operations › taskIssues (/app/operations/taskIssues)
13. operations › calendar (/app/operations/calendar)
14. operations › taskExpenses (/app/operations/taskExpenses)
15. reservationsMenu › reservations (/app/reservationsMenu/reservations)
16. reservationsMenu › reservationAlterations (/app/reservationsMenu/reservationAlterations)
17. listingsMenu › listings (/app/listingsMenu/listings)
18. listingsMenu › listingUnits (/app/listingsMenu/listingUnits)
19. guests (/app/guests)
20. every column has a header and the actions column is the last one
21. finance › paymentTransactions (/app/finance/paymentTransactions)
22. automations › automationsHub (/app/automations/automationsHub)
23. automations › autoMessageRules (/app/automations/autoMessageRules)
24. automations › autoPaymentRules (/app/automations/autoPaymentRules)
25. automations › autoTaskRules (/app/automations/autoTaskRules)
26. automations › massMessages (/app/automations/massMessages)
27. automations › automationRuns (/app/automations/automationRuns)
28. channelManager › channelsHub (/app/channelManager/channelsHub)
29. channelManager › channelAccounts (/app/channelManager/channelAccounts)
30. channelManager › channelListings (/app/channelManager/channelListings)
31. channelManager › channelProperties (/app/channelManager/channelProperties)
32. channelManager › channelRatePlans (/app/channelManager/channelRatePlans)
33. channelManager › channelListingPromotions (/app/channelManager/channelListingPromotions)
34. channelManager › airbnbOpportunities (/app/channelManager/airbnbOpportunities)
35. channelManager › channelCommands (/app/channelManager/channelCommands)
36. apps › appCenter (/app/apps/appCenter)
37. apps › paymentProcessorAccounts (/app/apps/paymentProcessorAccounts)
38. apps › bookingApiClients (/app/apps/bookingApiClients)
39. apps › ownerPortalRoles (/app/apps/ownerPortalRoles)
40. apps › checkinFormTemplates (/app/apps/checkinFormTemplates)
41. apps › complianceConnections (/app/apps/complianceConnections)
42. apps › complianceSubmissions (/app/apps/complianceSubmissions)
43. ourFeatures › ourSettings › brands (/app/ourFeatures/ourSettings/brands)
44. ourFeatures › ourSettings › documents (/app/ourFeatures/ourSettings/documents)
45. ourFeatures › ourSettings › documentCustomFields (/app/ourFeatures/ourSettings/documentCustomFields)
46. ourFeatures › ourSettings › histories (/app/ourFeatures/ourSettings/histories)
47. ourFeatures › ourSettings › calUpdateLogs (/app/ourFeatures/ourSettings/calUpdateLogs)
48. ourFeatures › ourSettings › changeAnnouncements (/app/ourFeatures/ourSettings/changeAnnouncements)
49. ourFeatures › ourSettings › calendarService › calWarnings (/app/ourFeatures/ourSettings/calendarService/calWarnings)
50. every column has a header and the actions column is the last one
51. ourFeatures › ourSettings › calendarService › icalSubscriptions (/app/ourFeatures/ourSettings/calendarService/icalSubscriptions)
52. ourFeatures › ourSettings › calendarService › icalExportFeeds (/app/ourFeatures/ourSettings/calendarService/icalExportFeeds)
53. ourFeatures › ourSettings › calendarService › availabilityDependencies (/app/ourFeatures/ourSettings/calendarService/availabilityDependencies)
54. ourFeatures › ourSettings › calendarService › pricingDependencies (/app/ourFeatures/ourSettings/calendarService/pricingDependencies)
55. ourFeatures › ourSettings › calendarService › ratePlans (/app/ourFeatures/ourSettings/calendarService/ratePlans)
56. ourFeatures › ourSettings › calendarService › calStretches (/app/ourFeatures/ourSettings/calendarService/calStretches)
57. ourFeatures › ourSettings › calendarService › calReservations (/app/ourFeatures/ourSettings/calendarService/calReservations)
58. ourFeatures › ourSettings › calendarService › deferredWrites (/app/ourFeatures/ourSettings/calendarService/deferredWrites)
59. ourFeatures › ourSettings › calendarService › engineAlerts (/app/ourFeatures/ourSettings/calendarService/engineAlerts)
60. ourFeatures › ourSettings › calendarService › dailyViews (/app/ourFeatures/ourSettings/calendarService/dailyViews)
61. ourFeatures › ourSettings › calendarService › monthlyViews (/app/ourFeatures/ourSettings/calendarService/monthlyViews)
62. ourFeatures › ourSettings › calendarService › websiteStatsList (/app/ourFeatures/ourSettings/calendarService/websiteStatsList)
63. ourFeatures › ourSettings › calendarService › icalBlocks (/app/ourFeatures/ourSettings/calendarService/icalBlocks)
64. settings › reportingSettingsList (/app/settings/reportingSettingsList)
65. settings › contacts (/app/settings/contacts)
66. settings › reservationSources (/app/settings/reservationSources)
67. settings › savedReplies (/app/settings/savedReplies)
68. settings › transactionTags (/app/settings/transactionTags)
69. settings › customFields (/app/settings/customFields)
70. settings › syncActivities (/app/settings/syncActivities)
71. the administrator's pages, by their address, show "Page not found" and no data
72. Developer tools › Network: заявките по-горе отговарят така.
73. Developer tools › Console показва грешките по-горе.

**Скрийншоти**

![102-role-access-2-shot-bookingAgent-unifiedInbox.png](./102-role-access-2-shot-bookingAgent-unifiedInbox.png)
![102-role-access-2-shot-bookingAgent-inboxThreads.png](./102-role-access-2-shot-bookingAgent-inboxThreads.png)
![102-role-access-2-shot-bookingAgent-inboxAiRuns.png](./102-role-access-2-shot-bookingAgent-inboxAiRuns.png)
![102-role-access-2-shot-bookingAgent-tasks.png](./102-role-access-2-shot-bookingAgent-tasks.png)
![102-role-access-2-shot-bookingAgent-housekeepingBoard.png](./102-role-access-2-shot-bookingAgent-housekeepingBoard.png)
![102-role-access-2-shot-bookingAgent-taskIssues.png](./102-role-access-2-shot-bookingAgent-taskIssues.png)
![102-role-access-2-shot-bookingAgent-calendar.png](./102-role-access-2-shot-bookingAgent-calendar.png)
![102-role-access-2-shot-bookingAgent-taskExpenses.png](./102-role-access-2-shot-bookingAgent-taskExpenses.png)
![102-role-access-2-shot-bookingAgent-reservations.png](./102-role-access-2-shot-bookingAgent-reservations.png)
![102-role-access-2-shot-bookingAgent-reservationAlterations.png](./102-role-access-2-shot-bookingAgent-reservationAlterations.png)
![102-role-access-2-shot-bookingAgent-listings.png](./102-role-access-2-shot-bookingAgent-listings.png)
![102-role-access-2-shot-bookingAgent-listingUnits.png](./102-role-access-2-shot-bookingAgent-listingUnits.png)
![102-role-access-2-shot-bookingAgent-paymentTransactions.png](./102-role-access-2-shot-bookingAgent-paymentTransactions.png)
![102-role-access-2-shot-bookingAgent-automationsHub.png](./102-role-access-2-shot-bookingAgent-automationsHub.png)
![102-role-access-2-shot-bookingAgent-autoMessageRules.png](./102-role-access-2-shot-bookingAgent-autoMessageRules.png)
![102-role-access-2-shot-bookingAgent-autoPaymentRules.png](./102-role-access-2-shot-bookingAgent-autoPaymentRules.png)
![102-role-access-2-shot-bookingAgent-autoTaskRules.png](./102-role-access-2-shot-bookingAgent-autoTaskRules.png)
![102-role-access-2-shot-bookingAgent-massMessages.png](./102-role-access-2-shot-bookingAgent-massMessages.png)
![102-role-access-2-shot-bookingAgent-automationRuns.png](./102-role-access-2-shot-bookingAgent-automationRuns.png)
![102-role-access-2-shot-bookingAgent-channelsHub.png](./102-role-access-2-shot-bookingAgent-channelsHub.png)
![102-role-access-2-shot-bookingAgent-channelAccounts.png](./102-role-access-2-shot-bookingAgent-channelAccounts.png)
![102-role-access-2-shot-bookingAgent-channelListings.png](./102-role-access-2-shot-bookingAgent-channelListings.png)
![102-role-access-2-shot-bookingAgent-channelProperties.png](./102-role-access-2-shot-bookingAgent-channelProperties.png)
![102-role-access-2-shot-bookingAgent-channelRatePlans.png](./102-role-access-2-shot-bookingAgent-channelRatePlans.png)
![102-role-access-2-shot-bookingAgent-channelListingPromotions.png](./102-role-access-2-shot-bookingAgent-channelListingPromotions.png)
![102-role-access-2-shot-bookingAgent-airbnbOpportunities.png](./102-role-access-2-shot-bookingAgent-airbnbOpportunities.png)
![102-role-access-2-shot-bookingAgent-channelCommands.png](./102-role-access-2-shot-bookingAgent-channelCommands.png)
![102-role-access-2-shot-bookingAgent-appCenter.png](./102-role-access-2-shot-bookingAgent-appCenter.png)
![102-role-access-2-shot-bookingAgent-paymentProcessorAccounts.png](./102-role-access-2-shot-bookingAgent-paymentProcessorAccounts.png)
![102-role-access-2-shot-bookingAgent-bookingApiClients.png](./102-role-access-2-shot-bookingAgent-bookingApiClients.png)
![102-role-access-2-shot-bookingAgent-ownerPortalRoles.png](./102-role-access-2-shot-bookingAgent-ownerPortalRoles.png)
![102-role-access-2-shot-bookingAgent-checkinFormTemplates.png](./102-role-access-2-shot-bookingAgent-checkinFormTemplates.png)
![102-role-access-2-shot-bookingAgent-complianceConnections.png](./102-role-access-2-shot-bookingAgent-complianceConnections.png)
![102-role-access-2-shot-bookingAgent-complianceSubmissions.png](./102-role-access-2-shot-bookingAgent-complianceSubmissions.png)
![102-role-access-2-shot-bookingAgent-histories.png](./102-role-access-2-shot-bookingAgent-histories.png)
![102-role-access-2-shot-bookingAgent-calUpdateLogs.png](./102-role-access-2-shot-bookingAgent-calUpdateLogs.png)
![102-role-access-2-shot-bookingAgent-changeAnnouncements.png](./102-role-access-2-shot-bookingAgent-changeAnnouncements.png)
![102-role-access-2-shot-bookingAgent-icalSubscriptions.png](./102-role-access-2-shot-bookingAgent-icalSubscriptions.png)
![102-role-access-2-shot-bookingAgent-icalExportFeeds.png](./102-role-access-2-shot-bookingAgent-icalExportFeeds.png)
![102-role-access-2-shot-bookingAgent-availabilityDependencies.png](./102-role-access-2-shot-bookingAgent-availabilityDependencies.png)
![102-role-access-2-shot-bookingAgent-pricingDependencies.png](./102-role-access-2-shot-bookingAgent-pricingDependencies.png)
![102-role-access-2-shot-bookingAgent-ratePlans.png](./102-role-access-2-shot-bookingAgent-ratePlans.png)
![102-role-access-2-shot-bookingAgent-deferredWrites.png](./102-role-access-2-shot-bookingAgent-deferredWrites.png)
![102-role-access-2-shot-bookingAgent-engineAlerts.png](./102-role-access-2-shot-bookingAgent-engineAlerts.png)
![102-role-access-2-shot-bookingAgent-dailyViews.png](./102-role-access-2-shot-bookingAgent-dailyViews.png)
![102-role-access-2-shot-bookingAgent-websiteStatsList.png](./102-role-access-2-shot-bookingAgent-websiteStatsList.png)
![102-role-access-2-shot-bookingAgent-icalBlocks.png](./102-role-access-2-shot-bookingAgent-icalBlocks.png)
![102-role-access-2-shot-bookingAgent-reportingSettingsList.png](./102-role-access-2-shot-bookingAgent-reportingSettingsList.png)
![102-role-access-2-shot-bookingAgent-contacts.png](./102-role-access-2-shot-bookingAgent-contacts.png)
![102-role-access-2-shot-bookingAgent-reservationSources.png](./102-role-access-2-shot-bookingAgent-reservationSources.png)
![102-role-access-2-shot-bookingAgent-savedReplies.png](./102-role-access-2-shot-bookingAgent-savedReplies.png)
![102-role-access-2-shot-bookingAgent-transactionTags.png](./102-role-access-2-shot-bookingAgent-transactionTags.png)
![102-role-access-2-shot-bookingAgent-customFields.png](./102-role-access-2-shot-bookingAgent-customFields.png)
![102-role-access-2-shot-bookingAgent-syncActivities.png](./102-role-access-2-shot-bookingAgent-syncActivities.png)
![102-role-access-2-screenshot.png](./102-role-access-2-screenshot.png)


## Казус 3: housekeeper: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused

_Нов в този пуск._

**Какво се обърка**

```
TimeoutError: locator.click: Timeout 20000ms exceeded.
Call log:
  - waiting for locator('.cc-sidebar').locator('[data-test="tasks"]')

```

**Как да се възпроизведе**

1. Страница: https://hostify.bioseek.eu/app/listingsMenu/listings
2. Спек `tests/e2e/102-role-access.spec.ts`, проверка „housekeeper: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused“ — стъпките:
3. the live menu holds exactly the pages the inventory gives the role

**Скрийншоти**

![102-role-access-3-screenshot.png](./102-role-access-3-screenshot.png)


---

Какво проверява спекът: 102 — every role of the QA account sees its own pages, opens them without a refusal, and is refused the others.
