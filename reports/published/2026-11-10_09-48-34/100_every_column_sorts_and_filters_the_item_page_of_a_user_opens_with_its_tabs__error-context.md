# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 100-settings-users.spec.ts >> 100 settings › users >> every column sorts and filters; the item page of a user opens with its tabs
- Location: tests/e2e/100-settings-users.spec.ts:127:9

# Error details

```
Error: rows after filtering "Email" by "supervisor" (a value of the first row)

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

```
Error: a row left after filtering "Role" by "Supervisor"

expect(received).toContain(expected) // indexOf

Expected substring: "supervisor"
Received string:    "revenue manager"
```

```
Error: a row left after filtering "Role" by "Supervisor"

expect(received).toContain(expected) // indexOf

Expected substring: "supervisor"
Received string:    "manager"
```

```
Error: a row left after filtering "Role" by "Supervisor"

expect(received).toContain(expected) // indexOf

Expected substring: "supervisor"
Received string:    "housekeeper"
```

```
Error: a row left after filtering "Role" by "Supervisor"

expect(received).toContain(expected) // indexOf

Expected substring: "supervisor"
Received string:    "housekeeper"
```

```
Error: a row left after filtering "Role" by "Supervisor"

expect(received).toContain(expected) // indexOf

Expected substring: "supervisor"
Received string:    "booking agent"
```

```
Error: a row left after filtering "Role" by "Supervisor"

expect(received).toContain(expected) // indexOf

Expected substring: "supervisor"
Received string:    "admin"
```

```
Error: a row left after filtering "Role" by "Supervisor"

expect(received).toContain(expected) // indexOf

Expected substring: "supervisor"
Received string:    "accountant"
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e5]:
    - link "logo" [ref=e7] [cursor=pointer]:
      - /url: /app/dashboards/
      - img "logo" [ref=e8]
    - generic [ref=e9]:
      - generic [ref=e11]:
        - link [ref=e12] [cursor=pointer]:
          - /url: /app/dashboards
          - img [ref=e16]:
            - img [ref=e17]
        - img [ref=e23] [cursor=pointer]:
          - img [ref=e24]
        - link [ref=e26] [cursor=pointer]:
          - /url: /app/multiCalendar
          - img [ref=e30]:
            - img [ref=e31]
        - img [ref=e37] [cursor=pointer]:
          - img [ref=e38]
        - img [ref=e44] [cursor=pointer]:
          - img [ref=e45]
        - img [ref=e51] [cursor=pointer]:
          - img [ref=e52]
        - link [ref=e54] [cursor=pointer]:
          - /url: /app/guests
          - img [ref=e58]:
            - img [ref=e59]
        - img [ref=e65] [cursor=pointer]:
          - img [ref=e66]
        - img [ref=e72] [cursor=pointer]:
          - img [ref=e73]
        - img [ref=e79] [cursor=pointer]:
          - img [ref=e80]
        - img [ref=e86] [cursor=pointer]:
          - img [ref=e87]
        - img [ref=e93] [cursor=pointer]:
          - img [ref=e94]
        - img [ref=e100] [cursor=pointer]:
          - img [ref=e101]
        - img [ref=e107] [cursor=pointer]:
          - img [ref=e108]
        - img [ref=e114] [cursor=pointer]:
          - img [ref=e115]
        - img [ref=e121] [cursor=pointer]:
          - img [ref=e122]
        - img "hdd" [ref=e128] [cursor=pointer]:
          - img [ref=e129]
        - img "audit" [ref=e135] [cursor=pointer]:
          - img [ref=e136]
        - img [ref=e142] [cursor=pointer]:
          - img [ref=e143]
      - generic [ref=e146]:
        - generic [ref=e147] [cursor=pointer]:
          - generic [ref=e148]: Settings
          - button "left" [ref=e149]:
            - img "left" [ref=e151]:
              - img [ref=e152]
        - generic [ref=e155]:
          - link "Account" [ref=e156] [cursor=pointer]:
            - /url: /app/settings/accountProfile
            - generic [ref=e157]: Account
          - link "Reporting" [ref=e158] [cursor=pointer]:
            - /url: /app/settings/reportingSettingsList
            - generic [ref=e159]: Reporting
          - link "Users" [ref=e160] [cursor=pointer]:
            - /url: /app/settings/users
            - generic [ref=e161]: Users
          - link "Process rules" [ref=e162] [cursor=pointer]:
            - /url: /app/settings/workflowDefinitions
            - generic [ref=e163]: Process rules
          - link "Data shape" [ref=e164] [cursor=pointer]:
            - /url: /app/settings/dataShape
            - generic [ref=e165]: Data shape
          - link "User roles" [ref=e166] [cursor=pointer]:
            - /url: /app/settings/securityGroups
            - generic [ref=e167]: User roles
          - link "Security" [ref=e168] [cursor=pointer]:
            - /url: /app/settings/securitySettings
            - generic [ref=e169]: Security
          - link "Companies" [ref=e170] [cursor=pointer]:
            - /url: /app/settings/companies
            - generic [ref=e171]: Companies
          - link "Contacts" [ref=e172] [cursor=pointer]:
            - /url: /app/settings/contacts
            - generic [ref=e173]: Contacts
          - link "Reservation sources" [ref=e174] [cursor=pointer]:
            - /url: /app/settings/reservationSources
            - generic [ref=e175]: Reservation sources
          - link "Formulas" [ref=e176] [cursor=pointer]:
            - /url: /app/settings/settingsFormulas
            - generic [ref=e177]: Formulas
          - link "Saved replies" [ref=e178] [cursor=pointer]:
            - /url: /app/settings/savedReplies
            - generic [ref=e179]: Saved replies
          - link "Messaging" [ref=e180] [cursor=pointer]:
            - /url: /app/settings/messagingSettings
            - generic [ref=e181]: Messaging
          - link "Transaction tags" [ref=e182] [cursor=pointer]:
            - /url: /app/settings/transactionTags
            - generic [ref=e183]: Transaction tags
          - link "Listing tags" [ref=e184] [cursor=pointer]:
            - /url: /app/settings/listingTags
            - generic [ref=e185]: Listing tags
          - link "Custom fields" [ref=e186] [cursor=pointer]:
            - /url: /app/settings/customFields
            - generic [ref=e187]: Custom fields
          - link "Fees" [ref=e188] [cursor=pointer]:
            - /url: /app/settings/settingsFees
            - generic [ref=e189]: Fees
          - link "Extras" [ref=e190] [cursor=pointer]:
            - /url: /app/settings/settingsExtras
            - generic [ref=e191]: Extras
          - link "Taxes" [ref=e192] [cursor=pointer]:
            - /url: /app/settings/settingsTaxes
            - generic [ref=e193]: Taxes
          - link "VATs" [ref=e194] [cursor=pointer]:
            - /url: /app/settings/vatRates
            - generic [ref=e195]: VATs
          - link "Costs" [ref=e196] [cursor=pointer]:
            - /url: /app/settings/settingsCosts
            - generic [ref=e197]: Costs
          - link "Fee settings" [ref=e198] [cursor=pointer]:
            - /url: /app/settings/feeItemSettings
            - generic [ref=e199]: Fee settings
          - link "VAT rate settings" [ref=e200] [cursor=pointer]:
            - /url: /app/settings/vatRateSettings
            - generic [ref=e201]: VAT rate settings
          - link "Payment schedules" [ref=e202] [cursor=pointer]:
            - /url: /app/settings/paymentSchedules
            - generic [ref=e203]: Payment schedules
          - link "Booking Sites" [ref=e204] [cursor=pointer]:
            - /url: /app/settings/bookingSites
            - generic [ref=e205]: Booking Sites
          - link "Multi Unit" [ref=e206] [cursor=pointer]:
            - /url: /app/settings/listingGroups
            - generic [ref=e207]: Multi Unit
          - link "Notifications" [ref=e208] [cursor=pointer]:
            - /url: /app/settings/notificationSettings
            - generic [ref=e209]: Notifications
          - link "Activity Log" [ref=e210] [cursor=pointer]:
            - /url: /app/settings/syncActivities
            - generic [ref=e211]: Activity Log
          - link "Privacy (GDPR)" [ref=e212] [cursor=pointer]:
            - /url: /app/settings/privacySettings
            - generic [ref=e213]: Privacy (GDPR)
          - link "Billing" [ref=e214] [cursor=pointer]:
            - /url: /app/settings/accountBilling
            - generic [ref=e215]: Billing
          - link "Demo data" [ref=e216] [cursor=pointer]:
            - /url: /app/settings/demoData
            - generic [ref=e217]: Demo data
    - generic [ref=e218]:
      - generic [ref=e219]:
        - generic [ref=e220] [cursor=pointer]:
          - img [ref=e223]:
            - img [ref=e224]
          - generic [ref=e226]: Support
        - generic [ref=e227] [cursor=pointer]:
          - img [ref=e230]:
            - img [ref=e231]
          - generic [ref=e233]: Notifications
      - generic [ref=e234]:
        - button "Collapse menu" [expanded] [ref=e235] [cursor=pointer]:
          - img "double-left" [ref=e236]:
            - img [ref=e237]
        - button "v 1.0.10" [ref=e239] [cursor=pointer]
  - generic [ref=e240]:
    - banner [ref=e241]:
      - button "arrow-left" [ref=e242] [cursor=pointer]:
        - img "arrow-left" [ref=e244]:
          - img [ref=e245]
      - img "user" [ref=e248]:
        - img [ref=e249]
      - generic [ref=e251]:
        - navigation [ref=e252]:
          - list [ref=e253]:
            - listitem [ref=e254]:
              - link "Settings" [ref=e256] [cursor=pointer]:
                - /url: /app/settings
            - listitem [ref=e257]: /
            - listitem [ref=e258]:
              - link "Users" [ref=e260] [cursor=pointer]:
                - /url: /app/settings/users
        - generic [ref=e261]: People who can sign in, with their roles and status
      - button "search Search everything… ⌘K" [ref=e262] [cursor=pointer]:
        - img "search" [ref=e263]:
          - img [ref=e264]
        - generic [ref=e266]: Search everything…
        - generic [ref=e267]: ⌘K
      - button "Dark theme" [ref=e268] [cursor=pointer]:
        - img "moon" [ref=e270]:
          - img [ref=e271]
      - generic [ref=e273] [cursor=pointer]:
        - img "user" [ref=e276]:
          - img [ref=e277]
        - generic [ref=e280]: QA Admin
    - generic [ref=e283]:
      - generic [ref=e284]:
        - tablist [ref=e285]:
          - generic [ref=e287]:
            - generic [ref=e288] [cursor=pointer]:
              - tab "Default" [selected] [ref=e289]:
                - generic [ref=e290]: Default
              - button "remove" [ref=e291]
            - generic [ref=e292] [cursor=pointer]:
              - tab "Active" [ref=e293]:
                - generic [ref=e294]: Active
              - button "remove" [ref=e295]
            - generic [ref=e296] [cursor=pointer]:
              - tab "Deactivated" [ref=e297]:
                - generic [ref=e298]: Deactivated
              - button "remove" [ref=e299]
            - generic [ref=e300] [cursor=pointer]:
              - tab "Invited" [ref=e301]:
                - generic [ref=e302]: Invited
              - button "remove" [ref=e303]
        - generic:
          - generic:
            - tabpanel "Default"
      - generic [ref=e305]:
        - generic [ref=e306] [cursor=pointer]:
          - generic [ref=e307]: User
          - generic [ref=e308]: "8"
          - generic [ref=e309]: in this view
        - generic [ref=e310] [cursor=pointer]:
          - generic [ref=e311]:
            - text: By User status
            - generic [ref=e312]: SPLIT
          - generic [ref=e313]:
            - 'generic "Active: 7" [ref=e314]'
            - 'generic "Invited: 1" [ref=e315]'
          - generic [ref=e316]:
            - generic [ref=e317]:
              - text: Active
              - strong [ref=e319]: "7"
            - generic [ref=e320]:
              - text: Invited
              - strong [ref=e322]: "1"
        - generic [ref=e323] [cursor=pointer]:
          - generic [ref=e324]:
            - text: By Listing scope mode
            - generic [ref=e325]: SPLIT
          - 'generic "All: 8" [ref=e327]'
          - generic [ref=e329]:
            - text: All
            - strong [ref=e331]: "8"
      - generic [ref=e334]:
        - generic [ref=e335]:
          - generic [ref=e337]:
            - generic [ref=e338]:
              - img "search" [ref=e339]:
                - img [ref=e340]
              - textbox "Search" [ref=e342]
            - button "plus-circle Create a new user" [ref=e343] [cursor=pointer]:
              - img "plus-circle" [ref=e345]:
                - img [ref=e346]
              - generic [ref=e349]: Create a new user
            - button "export Export down" [ref=e350] [cursor=pointer]:
              - generic [ref=e351]:
                - img "export" [ref=e353]:
                  - img [ref=e354]
                - generic [ref=e356]: Export
                - img "down" [ref=e358]:
                  - img [ref=e359]
            - button "layout Customize view" [ref=e361] [cursor=pointer]:
              - img "layout" [ref=e363]:
                - img [ref=e364]
              - generic [ref=e366]: Customize view
          - generic [ref=e367]:
            - table [ref=e369]:
              - rowgroup [ref=e380]:
                - row "Name Email search Role filter Listing scope mode Last login at User status Phone search" [ref=e381]:
                  - columnheader [ref=e382]
                  - columnheader "Name" [ref=e383] [cursor=pointer]:
                    - generic [ref=e384]:
                      - generic [ref=e386]:
                        - generic [ref=e387]: Name
                        - generic [ref=e389]:
                          - img [ref=e390]:
                            - img [ref=e391]
                          - img [ref=e393]:
                            - img [ref=e394]
                      - button "search" [ref=e396]:
                        - button "search" [ref=e397]:
                          - img "search" [ref=e399]:
                            - img [ref=e400]
                  - columnheader "Email search" [ref=e403]:
                    - generic [ref=e404]:
                      - generic [ref=e405]: Email
                      - button "search" [ref=e406] [cursor=pointer]:
                        - button "search" [ref=e407]:
                          - img "search" [ref=e409]:
                            - img [ref=e410]
                  - columnheader "Role filter" [ref=e413]:
                    - generic [ref=e414]:
                      - generic [ref=e415]: Role
                      - button "filter" [ref=e416] [cursor=pointer]:
                        - button "filter" [ref=e417]:
                          - img "filter" [ref=e419]:
                            - img [ref=e420]
                  - columnheader "Listing scope mode" [ref=e423] [cursor=pointer]:
                    - generic [ref=e424]:
                      - generic [ref=e426]:
                        - generic [ref=e427]: Listing scope mode
                        - generic [ref=e429]:
                          - img [ref=e430]:
                            - img [ref=e431]
                          - img [ref=e433]:
                            - img [ref=e434]
                      - button "filter" [ref=e436]:
                        - button "filter" [ref=e437]:
                          - img "filter" [ref=e439]:
                            - img [ref=e440]
                  - columnheader "Last login at" [ref=e443] [cursor=pointer]:
                    - generic [ref=e444]:
                      - generic [ref=e446]:
                        - generic [ref=e447]: Last login at
                        - generic [ref=e449]:
                          - img [ref=e450]:
                            - img [ref=e451]
                          - img [ref=e453]:
                            - img [ref=e454]
                      - button "filter" [ref=e456]:
                        - button "filter" [ref=e457]:
                          - img "filter" [ref=e459]:
                            - img [ref=e460]
                  - columnheader "User status" [ref=e463] [cursor=pointer]:
                    - generic [ref=e464]:
                      - generic [ref=e466]:
                        - generic [ref=e467]: User status
                        - generic [ref=e469]:
                          - img [ref=e470]:
                            - img [ref=e471]
                          - img [ref=e473]:
                            - img [ref=e474]
                      - button "filter" [ref=e476]:
                        - button "filter" [ref=e477]:
                          - img "filter" [ref=e479]:
                            - img [ref=e480]
                  - columnheader "Phone search" [ref=e483]:
                    - generic [ref=e484]:
                      - generic [ref=e485]: Phone
                      - button "search" [ref=e486] [cursor=pointer]:
                        - button "search" [ref=e487]:
                          - img "search" [ref=e489]:
                            - img [ref=e490]
                  - columnheader [ref=e493]
            - table [ref=e496]:
              - rowgroup [ref=e507]:
                - generic [ref=e508]:
                  - generic [ref=e510]:
                    - generic [ref=e511]: Name
                    - generic [ref=e513]:
                      - img [ref=e514]:
                        - img [ref=e515]
                      - img [ref=e517]:
                        - img [ref=e518]
                  - button [ref=e520] [cursor=pointer]:
                    - button [ref=e521]:
                      - img [ref=e523]:
                        - img [ref=e524]
                - generic [ref=e526]:
                  - generic [ref=e527]: Email
                  - button [ref=e528] [cursor=pointer]:
                    - button [ref=e529]:
                      - img [ref=e531]:
                        - img [ref=e532]
                - generic [ref=e534]:
                  - generic [ref=e535]: Role
                  - button [ref=e536] [cursor=pointer]:
                    - button [ref=e537]:
                      - img [ref=e539]:
                        - img [ref=e540]
                - generic [ref=e542]:
                  - generic [ref=e544]:
                    - generic [ref=e545]: Listing scope mode
                    - generic [ref=e547]:
                      - img [ref=e548]:
                        - img [ref=e549]
                      - img [ref=e551]:
                        - img [ref=e552]
                  - button [ref=e554] [cursor=pointer]:
                    - button [ref=e555]:
                      - img [ref=e557]:
                        - img [ref=e558]
                - generic [ref=e560]:
                  - generic [ref=e562]:
                    - generic [ref=e563]: Last login at
                    - generic [ref=e565]:
                      - img [ref=e566]:
                        - img [ref=e567]
                      - img [ref=e569]:
                        - img [ref=e570]
                  - button [ref=e572] [cursor=pointer]:
                    - button [ref=e573]:
                      - img [ref=e575]:
                        - img [ref=e576]
                - generic [ref=e578]:
                  - generic [ref=e580]:
                    - generic [ref=e581]: User status
                    - generic [ref=e583]:
                      - img [ref=e584]:
                        - img [ref=e585]
                      - img [ref=e587]:
                        - img [ref=e588]
                  - button [ref=e590] [cursor=pointer]:
                    - button [ref=e591]:
                      - img [ref=e593]:
                        - img [ref=e594]
                - generic [ref=e596]:
                  - generic [ref=e597]: Phone
                  - button [ref=e598] [cursor=pointer]:
                    - button [ref=e599]:
                      - img [ref=e601]:
                        - img [ref=e602]
                - row "Select row 1 QI QA Invited Drag into the assistant — QA Invited qa.invited@hostify-qa.test Housekeeper All Invited copy mail edit delete" [ref=e604]:
                  - cell "Select row 1" [ref=e605]:
                    - radio "Select row 1" [ref=e608] [cursor=pointer]
                  - cell "QI QA Invited Drag into the assistant — QA Invited" [ref=e609]:
                    - generic [ref=e611]:
                      - generic [ref=e614]: QI
                      - generic [ref=e617]:
                        - link "QA Invited" [ref=e619] [cursor=pointer]:
                          - /url: /app/settings/users/9381e0d2-21c3-4550-88d6-abe8e635669a
                          - generic [ref=e621]: QA Invited
                        - generic "Drag into the assistant — QA Invited" [ref=e622]:
                          - img "holder" [ref=e623]:
                            - img [ref=e624]
                  - cell "qa.invited@hostify-qa.test" [ref=e626]:
                    - generic [ref=e628]: qa.invited@hostify-qa.test
                  - cell "Housekeeper" [ref=e629]:
                    - generic [ref=e630]: Housekeeper
                  - cell "All" [ref=e631]:
                    - generic [ref=e633]:
                      - img [ref=e634]
                      - text: All
                  - cell [ref=e636]
                  - cell "Invited" [ref=e637]:
                    - generic [ref=e639]:
                      - img [ref=e640]
                      - text: Invited
                  - cell [ref=e642]
                  - cell "copy mail edit delete" [ref=e643]:
                    - generic [ref=e646]:
                      - button "copy" [ref=e647] [cursor=pointer]:
                        - img "copy" [ref=e649]:
                          - img [ref=e650]
                      - button "mail" [ref=e652] [cursor=pointer]:
                        - img "mail" [ref=e654]:
                          - img [ref=e655]
                      - button "edit" [ref=e657] [cursor=pointer]:
                        - img "edit" [ref=e659]:
                          - img [ref=e660]
                      - button "delete" [ref=e662] [cursor=pointer]:
                        - img "delete" [ref=e664]:
                          - img [ref=e665]
                - row "Select row 2 QM QA Manager Drag into the assistant — QA Manager qa.manager@hostify-qa.test Manager All 10-11-202609:49 Active copy edit delete" [ref=e667]:
                  - cell "Select row 2" [ref=e668]:
                    - radio "Select row 2" [ref=e671] [cursor=pointer]
                  - cell "QM QA Manager Drag into the assistant — QA Manager" [ref=e672]:
                    - generic [ref=e674]:
                      - generic [ref=e677]: QM
                      - generic [ref=e680]:
                        - link "QA Manager" [ref=e682] [cursor=pointer]:
                          - /url: /app/settings/users/a20eafed-b958-4353-945a-2707ca85a320
                          - generic [ref=e684]: QA Manager
                        - generic "Drag into the assistant — QA Manager" [ref=e685]:
                          - img "holder" [ref=e686]:
                            - img [ref=e687]
                  - cell "qa.manager@hostify-qa.test" [ref=e689]:
                    - generic [ref=e691]: qa.manager@hostify-qa.test
                  - cell "Manager" [ref=e692]:
                    - generic [ref=e693]: Manager
                  - cell "All" [ref=e694]:
                    - generic [ref=e696]:
                      - img [ref=e697]
                      - text: All
                  - cell "10-11-202609:49" [ref=e699]:
                    - generic [ref=e701]: 10-11-202609:49
                  - cell "Active" [ref=e702]:
                    - generic [ref=e704]:
                      - img [ref=e705]
                      - text: Active
                  - cell [ref=e707]
                  - cell "copy edit delete" [ref=e708]:
                    - generic [ref=e711]:
                      - button "copy" [ref=e712] [cursor=pointer]:
                        - img "copy" [ref=e714]:
                          - img [ref=e715]
                      - button "edit" [ref=e717] [cursor=pointer]:
                        - img "edit" [ref=e719]:
                          - img [ref=e720]
                      - button "delete" [ref=e722] [cursor=pointer]:
                        - img "delete" [ref=e724]:
                          - img [ref=e725]
                - row "Select row 3 QR QA Revenue Manager Drag into the assistant — QA Revenue Manager qa.revenue.manager@hostify-qa.test Revenue Manager All 10-11-202609:49 Active copy edit delete" [ref=e727]:
                  - cell "Select row 3" [ref=e728]:
                    - radio "Select row 3" [ref=e731] [cursor=pointer]
                  - cell "QR QA Revenue Manager Drag into the assistant — QA Revenue Manager" [ref=e732]:
                    - generic [ref=e734]:
                      - generic [ref=e737]: QR
                      - generic [ref=e740]:
                        - link "QA Revenue Manager" [ref=e742] [cursor=pointer]:
                          - /url: /app/settings/users/13f4b3c0-a0b0-4736-83b4-0a17afdb6821
                          - generic [ref=e744]: QA Revenue Manager
                        - generic "Drag into the assistant — QA Revenue Manager" [ref=e745]:
                          - img "holder" [ref=e746]:
                            - img [ref=e747]
                  - cell "qa.revenue.manager@hostify-qa.test" [ref=e749]:
                    - generic [ref=e751]: qa.revenue.manager@hostify-qa.test
                  - cell "Revenue Manager" [ref=e752]:
                    - generic [ref=e753]: Revenue Manager
                  - cell "All" [ref=e754]:
                    - generic [ref=e756]:
                      - img [ref=e757]
                      - text: All
                  - cell "10-11-202609:49" [ref=e759]:
                    - generic [ref=e761]: 10-11-202609:49
                  - cell "Active" [ref=e762]:
                    - generic [ref=e764]:
                      - img [ref=e765]
                      - text: Active
                  - cell [ref=e767]
                  - cell "copy edit delete" [ref=e768]:
                    - generic [ref=e771]:
                      - button "copy" [ref=e772] [cursor=pointer]:
                        - img "copy" [ref=e774]:
                          - img [ref=e775]
                      - button "edit" [ref=e777] [cursor=pointer]:
                        - img "edit" [ref=e779]:
                          - img [ref=e780]
                      - button "delete" [ref=e782] [cursor=pointer]:
                        - img "delete" [ref=e784]:
                          - img [ref=e785]
                - row "Select row 4 QB QA Booking Agent Drag into the assistant — QA Booking Agent qa.booking.agent@hostify-qa.test Booking Agent All 10-11-202609:49 Active copy edit delete" [ref=e787]:
                  - cell "Select row 4" [ref=e788]:
                    - radio "Select row 4" [ref=e791] [cursor=pointer]
                  - cell "QB QA Booking Agent Drag into the assistant — QA Booking Agent" [ref=e792]:
                    - generic [ref=e794]:
                      - generic [ref=e797]: QB
                      - generic [ref=e800]:
                        - link "QA Booking Agent" [ref=e802] [cursor=pointer]:
                          - /url: /app/settings/users/5037b7a6-32c4-4ae0-9772-1ba9bbc0d024
                          - generic [ref=e804]: QA Booking Agent
                        - generic "Drag into the assistant — QA Booking Agent" [ref=e805]:
                          - img "holder" [ref=e806]:
                            - img [ref=e807]
                  - cell "qa.booking.agent@hostify-qa.test" [ref=e809]:
                    - generic [ref=e811]: qa.booking.agent@hostify-qa.test
                  - cell "Booking Agent" [ref=e812]:
                    - generic [ref=e813]: Booking Agent
                  - cell "All" [ref=e814]:
                    - generic [ref=e816]:
                      - img [ref=e817]
                      - text: All
                  - cell "10-11-202609:49" [ref=e819]:
                    - generic [ref=e821]: 10-11-202609:49
                  - cell "Active" [ref=e822]:
                    - generic [ref=e824]:
                      - img [ref=e825]
                      - text: Active
                  - cell [ref=e827]
                  - cell "copy edit delete" [ref=e828]:
                    - generic [ref=e831]:
                      - button "copy" [ref=e832] [cursor=pointer]:
                        - img "copy" [ref=e834]:
                          - img [ref=e835]
                      - button "edit" [ref=e837] [cursor=pointer]:
                        - img "edit" [ref=e839]:
                          - img [ref=e840]
                      - button "delete" [ref=e842] [cursor=pointer]:
                        - img "delete" [ref=e844]:
                          - img [ref=e845]
                - row "Select row 5 QA QA Accountant Drag into the assistant — QA Accountant qa.accountant@hostify-qa.test Accountant All 10-11-202609:49 Active copy edit delete" [ref=e847]:
                  - cell "Select row 5" [ref=e848]:
                    - radio "Select row 5" [ref=e851] [cursor=pointer]
                  - cell "QA QA Accountant Drag into the assistant — QA Accountant" [ref=e852]:
                    - generic [ref=e854]:
                      - generic [ref=e857]: QA
                      - generic [ref=e860]:
                        - link "QA Accountant" [ref=e862] [cursor=pointer]:
                          - /url: /app/settings/users/ef508936-c8d2-4bc1-ba90-4be1ac5d9093
                          - generic [ref=e864]: QA Accountant
                        - generic "Drag into the assistant — QA Accountant" [ref=e865]:
                          - img "holder" [ref=e866]:
                            - img [ref=e867]
                  - cell "qa.accountant@hostify-qa.test" [ref=e869]:
                    - generic [ref=e871]: qa.accountant@hostify-qa.test
                  - cell "Accountant" [ref=e872]:
                    - generic [ref=e873]: Accountant
                  - cell "All" [ref=e874]:
                    - generic [ref=e876]:
                      - img [ref=e877]
                      - text: All
                  - cell "10-11-202609:49" [ref=e879]:
                    - generic [ref=e881]: 10-11-202609:49
                  - cell "Active" [ref=e882]:
                    - generic [ref=e884]:
                      - img [ref=e885]
                      - text: Active
                  - cell [ref=e887]
                  - cell "copy edit delete" [ref=e888]:
                    - generic [ref=e891]:
                      - button "copy" [ref=e892] [cursor=pointer]:
                        - img "copy" [ref=e894]:
                          - img [ref=e895]
                      - button "edit" [ref=e897] [cursor=pointer]:
                        - img "edit" [ref=e899]:
                          - img [ref=e900]
                      - button "delete" [ref=e902] [cursor=pointer]:
                        - img "delete" [ref=e904]:
                          - img [ref=e905]
                - row "Select row 6 QT QA Team Supervisor Drag into the assistant — QA Team Supervisor qa.team.supervisor@hostify-qa.test Team Supervisor All 10-11-202609:49 Active copy edit delete" [ref=e907]:
                  - cell "Select row 6" [ref=e908]:
                    - radio "Select row 6" [ref=e911] [cursor=pointer]
                  - cell "QT QA Team Supervisor Drag into the assistant — QA Team Supervisor" [ref=e912]:
                    - generic [ref=e914]:
                      - generic [ref=e917]: QT
                      - generic [ref=e920]:
                        - link "QA Team Supervisor" [ref=e922] [cursor=pointer]:
                          - /url: /app/settings/users/9083bf65-6344-4897-a2e2-5cc8ccde295e
                          - generic [ref=e924]: QA Team Supervisor
                        - generic "Drag into the assistant — QA Team Supervisor" [ref=e925]:
                          - img "holder" [ref=e926]:
                            - img [ref=e927]
                  - cell "qa.team.supervisor@hostify-qa.test" [ref=e929]:
                    - generic [ref=e931]: qa.team.supervisor@hostify-qa.test
                  - cell "Team Supervisor" [ref=e932]:
                    - generic [ref=e933]: Team Supervisor
                  - cell "All" [ref=e934]:
                    - generic [ref=e936]:
                      - img [ref=e937]
                      - text: All
                  - cell "10-11-202609:49" [ref=e939]:
                    - generic [ref=e941]: 10-11-202609:49
                  - cell "Active" [ref=e942]:
                    - generic [ref=e944]:
                      - img [ref=e945]
                      - text: Active
                  - cell [ref=e947]
                  - cell "copy edit delete" [ref=e948]:
                    - generic [ref=e951]:
                      - button "copy" [ref=e952] [cursor=pointer]:
                        - img "copy" [ref=e954]:
                          - img [ref=e955]
                      - button "edit" [ref=e957] [cursor=pointer]:
                        - img "edit" [ref=e959]:
                          - img [ref=e960]
                      - button "delete" [ref=e962] [cursor=pointer]:
                        - img "delete" [ref=e964]:
                          - img [ref=e965]
                - row "Select row 7 QH QA Housekeeper Drag into the assistant — QA Housekeeper qa.housekeeper@hostify-qa.test Housekeeper All 10-11-202609:49 Active copy edit delete" [ref=e967]:
                  - cell "Select row 7" [ref=e968]:
                    - radio "Select row 7" [ref=e971] [cursor=pointer]
                  - cell "QH QA Housekeeper Drag into the assistant — QA Housekeeper" [ref=e972]:
                    - generic [ref=e974]:
                      - generic [ref=e977]: QH
                      - generic [ref=e980]:
                        - link "QA Housekeeper" [ref=e982] [cursor=pointer]:
                          - /url: /app/settings/users/accb717a-e91a-4ce2-8dd5-cd5e275731a6
                          - generic [ref=e984]: QA Housekeeper
                        - generic "Drag into the assistant — QA Housekeeper" [ref=e985]:
                          - img "holder" [ref=e986]:
                            - img [ref=e987]
                  - cell "qa.housekeeper@hostify-qa.test" [ref=e989]:
                    - generic [ref=e991]: qa.housekeeper@hostify-qa.test
                  - cell "Housekeeper" [ref=e992]:
                    - generic [ref=e993]: Housekeeper
                  - cell "All" [ref=e994]:
                    - generic [ref=e996]:
                      - img [ref=e997]
                      - text: All
                  - cell "10-11-202609:49" [ref=e999]:
                    - generic [ref=e1001]: 10-11-202609:49
                  - cell "Active" [ref=e1002]:
                    - generic [ref=e1004]:
                      - img [ref=e1005]
                      - text: Active
                  - cell [ref=e1007]
                  - cell "copy edit delete" [ref=e1008]:
                    - generic [ref=e1011]:
                      - button "copy" [ref=e1012] [cursor=pointer]:
                        - img "copy" [ref=e1014]:
                          - img [ref=e1015]
                      - button "edit" [ref=e1017] [cursor=pointer]:
                        - img "edit" [ref=e1019]:
                          - img [ref=e1020]
                      - button "delete" [ref=e1022] [cursor=pointer]:
                        - img "delete" [ref=e1024]:
                          - img [ref=e1025]
                - row "Select row 8 QA QA Admin Drag into the assistant — QA Admin qa.admin@hostify-qa.test Admin All 10-11-202609:50 Active copy edit delete" [ref=e1027]:
                  - cell "Select row 8" [ref=e1028]:
                    - radio "Select row 8" [ref=e1031] [cursor=pointer]
                  - cell "QA QA Admin Drag into the assistant — QA Admin" [ref=e1032]:
                    - generic [ref=e1034]:
                      - generic [ref=e1037]: QA
                      - generic [ref=e1040]:
                        - link "QA Admin" [ref=e1042] [cursor=pointer]:
                          - /url: /app/settings/users/614d3d67-77d4-4351-abf8-90443678862d
                          - generic [ref=e1044]: QA Admin
                        - generic "Drag into the assistant — QA Admin" [ref=e1045]:
                          - img "holder" [ref=e1046]:
                            - img [ref=e1047]
                  - cell "qa.admin@hostify-qa.test" [ref=e1049]:
                    - generic [ref=e1051]: qa.admin@hostify-qa.test
                  - cell "Admin" [ref=e1052]:
                    - generic [ref=e1053]: Admin
                  - cell "All" [ref=e1054]:
                    - generic [ref=e1056]:
                      - img [ref=e1057]
                      - text: All
                  - cell "10-11-202609:50" [ref=e1059]:
                    - generic [ref=e1061]: 10-11-202609:50
                  - cell "Active" [ref=e1062]:
                    - generic [ref=e1064]:
                      - img [ref=e1065]
                      - text: Active
                  - cell [ref=e1067]
                  - cell "copy edit delete" [ref=e1068]:
                    - generic [ref=e1071]:
                      - button "copy" [ref=e1072] [cursor=pointer]:
                        - img "copy" [ref=e1074]:
                          - img [ref=e1075]
                      - button "edit" [ref=e1077] [cursor=pointer]:
                        - img "edit" [ref=e1079]:
                          - img [ref=e1080]
                      - button "delete" [ref=e1082] [cursor=pointer]:
                        - img "delete" [ref=e1084]:
                          - img [ref=e1085]
        - list [ref=e1087]:
          - listitem [ref=e1088]: "Total: 8"
          - listitem "Previous Page" [ref=e1089]:
            - button "left" [disabled] [ref=e1090]:
              - img "left" [ref=e1091]:
                - img [ref=e1092]
          - listitem "1" [ref=e1094] [cursor=pointer]:
            - generic [ref=e1095]: "1"
          - listitem "Next Page" [ref=e1096]:
            - button "right" [disabled] [ref=e1097]:
              - img "right" [ref=e1098]:
                - img [ref=e1099]
          - listitem [ref=e1101]:
            - generic [ref=e1102]:
              - generic "10 / page" [ref=e1103]:
                - text: 10 / page
                - combobox "Page Size" [ref=e1104]
              - img "down" [ref=e1106]:
                - img [ref=e1107]
  - generic [ref=e1111]:
    - button "Assistant" [ref=e1112] [cursor=pointer]:
      - img "message" [ref=e1113]:
        - img [ref=e1114]
    - button "Audit log" [ref=e1116] [cursor=pointer]:
      - img "audit" [ref=e1117]:
        - img [ref=e1118]
```

# Test source

```ts
  1   | import {expect, test, type Locator, type Page, type TestInfo} from '@playwright/test';
  2   | import {GridPage, type GridColumn} from './page-objects/GridPage';
  3   | import {FormDrawer} from './page-objects/FormDrawer';
  4   | import {probePage, expectPresentable, type Finding} from './probe';
  5   | import {ApiHelper} from './api';
  6   | import {createdIn} from './state';
  7   | 
  8   | /**
  9   |  * The standard checks every page spec runs — written once, so a 1xx spec is the page's DATA and its own logic,
  10  |  * not a copy of the mechanics (docs/conventions.md → What every page gets).
  11  |  */
  12  | 
  13  | /** Sorts EVERY sortable column ascending and descending and checks the order; filters every filterable column by a
  14  |  *  value of the first row and checks the rows left. Returns what could not be checked (no value, an unknown filter). */
  15  | export async function checkGridColumns(grid: GridPage, testInfo: TestInfo, options: {skipSort?: string[]; skipFilter?: string[]} = {}): Promise<Finding[]> {
  16  |     const notes: Finding[] = [];
  17  |     await grid.waitLoaded();
  18  |     await grid.clearFilters();
  19  |     await checkGridLayout(grid);
  20  |     const columns = await grid.columns();
  21  |     expect(columns.length, 'the grid has columns').toBeGreaterThan(0);
  22  |     const rowsBefore = await grid.rows.count();
  23  |     if (rowsBefore < 2) {
  24  |         notes.push({severity: 'warn', tag: 'grid-too-small', message: `${rowsBefore} row(s): sorting and filtering cannot be judged`});
  25  |         await testInfo.attach('grid-columns.json', {body: JSON.stringify({columns, rows: rowsBefore, notes}, null, 2), contentType: 'application/json'});
  26  |         return notes;
  27  |     }
  28  |     for (const column of columns) {
  29  |         const label = column.label || column.key;
  30  |         if (column.sortable && !options.skipSort?.includes(column.key)) {
  31  |             for (const direction of ['ascend', 'descend'] as const) {
  32  |                 // soft: one column's defect must not hide the next column's — the test still fails at its end
  33  |                 await test.step(`sort the column "${label}" ${direction === 'ascend' ? 'ascending' : 'descending'} (click its header)`, async () => {
  34  |                     const sort = await grid.sortBy(column.key, direction);
  35  |                     expect.soft(sort, `the search request carries the sort of "${column.key}" ${direction}`).toMatch(new RegExp(`${column.key}`));
  36  |                     try {
  37  |                         GridPage.expectOrdered(await grid.cellTexts(column.key), direction, label);
  38  |                     } catch (e: any) {
  39  |                         expect.soft(e?.message || String(e), `the column "${label}" sorted ${direction}`).toBe('in order');
  40  |                     }
  41  |                 });
  42  |             }
  43  |         }
  44  |         if (column.filterable && !options.skipFilter?.includes(column.key)) {
  45  |             const sample = (await grid.cellTexts(column.key))[0] || '';
  46  |             if (!sample) {
  47  |                 notes.push({severity: 'warn', tag: 'filter-no-sample', message: `column "${label}": the first row has no value to filter by`});
  48  |                 continue;
  49  |             }
  50  |             // one WORD of the first row's value (the longest, 4+ letters): what a person types into a column filter
  51  |             const words = sample.split(/[^\p{L}\p{N}]+/u).filter(w => w.length >= 4);
  52  |             const value = (words.sort((a, b) => b.length - a.length)[0] || sample.split(/\s+/)[0]).slice(0, 40);
  53  |             await test.step(`filter the column "${label}" by "${value}" (its filter icon), then Clear all`, async () => {
  54  |                 const kind = await filterColumn(grid, column, value);
  55  |                 if (kind === 'date') {
  56  |                     await filterColumnByDay(grid, column, sample, notes);
  57  |                     return;
  58  |                 }
  59  |                 if (kind === 'unknown') {
  60  |                     notes.push({severity: 'warn', tag: 'filter-unknown', message: `column "${label}": a filter kind the check does not drive`});
  61  |                     return;
  62  |                 }
  63  |                 try {
  64  |                     const left = await grid.cellTexts(column.key);
  65  |                     expect.soft(left.length, `rows after filtering "${label}" by "${value}" (a value of the first row)`).toBeGreaterThan(0);
> 66  |                     for (const cell of left) expect.soft(cell.toLowerCase(), `a row left after filtering "${label}" by "${value}"`).toContain(value.toLowerCase());
      |                                                                                                                                     ^ Error: a row left after filtering "Role" by "Supervisor"
  67  |                 } finally {
  68  |                     // the filter lives in the user's saved view: a failed check must not leave it for the next spec
  69  |                     await grid.clearFilters();
  70  |                 }
  71  |             });
  72  |         }
  73  |     }
  74  |     await testInfo.attach('grid-columns.json', {body: JSON.stringify({columns, rows: rowsBefore, notes}, null, 2), contentType: 'application/json'});
  75  |     return notes;
  76  | }
  77  | 
  78  | /**
  79  |  * The grid keeps its columns in its layout (1.0.10 fix: "Resend invitation" was a column without a header after the
  80  |  * actions; Roles, Custom fields, iCal imports, Channel listings and the Activity log had an extra actions column):
  81  |  * every data column has a header, and the actions column — when there is one — is the LAST column (only the scroll
  82  |  * bar's placeholder may follow it). Soft: the rest of the grid's checks still run.
  83  |  */
  84  | export async function checkGridLayout(grid: GridPage): Promise<void> {
  85  |     await test.step('every column has a header and the actions column is the last one', async () => {
  86  |         const cells = await grid.headerCells();
  87  |         const columns = cells.filter(c => c.kind !== 'scrollbar');
  88  |         const describe = columns.map(c => c.kind === 'data' ? (c.label || `(no header: ${c.key || 'no key'})`) : `[${c.kind}]`).join(' | ');
  89  |         for (const c of columns.filter(c => c.kind === 'data'))
  90  |             expect.soft(c.label, `the column "${c.key || '(no key)'}" has a header — the columns: ${describe}`).not.toBe('');
  91  |         const actions = columns.findIndex(c => c.kind === 'actions');
  92  |         if (actions >= 0)
  93  |             expect.soft(columns.slice(actions + 1).map(c => c.label || c.key || '(no header)'), `no column after the actions column — the columns: ${describe}`).toEqual([]);
  94  |     });
  95  | }
  96  | 
  97  | /**
  98  |  * A date column's filter is a period: the period of ONE day — the day of the first row — must keep that row and
  99  |  * only rows of that day. A cell without a readable date is noted, not guessed.
  100 |  */
  101 | async function filterColumnByDay(grid: GridPage, column: GridColumn, sample: string, notes: Finding[]): Promise<void> {
  102 |     const label = column.label || column.key;
  103 |     const day = GridPage.dayOf(sample);
  104 |     if (day === null) {
  105 |         notes.push({severity: 'warn', tag: 'filter-date-unreadable', message: `column "${label}": "${sample}" holds no date the check reads`});
  106 |         return;
  107 |     }
  108 |     const d = new Date(day);
  109 |     try {
  110 |         await grid.filterByPeriod(column.key, d, d);
  111 |         await expect.soft(grid.filterTrigger(column.key), `the filter icon of "${label}" shows the filter is on`).toHaveClass(/active/);
  112 |         const left = await grid.cellTexts(column.key);
  113 |         expect.soft(left.length, `rows after filtering "${label}" by the day ${GridPage.isoDay(d)} (the first row's)`).toBeGreaterThan(0);
  114 |         for (const cell of left) expect.soft(GridPage.dayOf(cell), `a row left after filtering "${label}" by the day ${GridPage.isoDay(d)}: "${cell}"`).toBe(day);
  115 |     } finally {
  116 |         await grid.clearFilters();
  117 |     }
  118 | }
  119 | 
  120 | /** Drives the column's filter dropdown by what it shows: a text / number input, a list of options, or nothing known. */
  121 | async function filterColumn(grid: GridPage, column: GridColumn, value: string): Promise<'text' | 'number' | 'option' | 'date' | 'unknown'> {
  122 |     const page = grid.page;
  123 |     await grid.header(column.key).locator('.ant-table-filter-trigger').click();
  124 |     const dropdown = page.locator('.ant-table-filter-dropdown:visible').last();
  125 |     await expect(dropdown).toBeVisible({timeout: 15_000});
  126 |     // the dropdown's frame shows before its body (since 1.0.10 the filter body renders a moment later): wait for the
  127 |     // control the filter offers, or the kind below is judged on an empty body — a date range was then taken for text
  128 |     const control = dropdown.locator('.ant-picker, .ant-checkbox-wrapper, .ant-tree-node-content-wrapper, .ant-radio-wrapper, ' +
  129 |         '.ant-dropdown-menu-item, .ant-select, .ant-input-number-input, input, textarea').filter({visible: true});
  130 |     await expect(control.first()).toBeVisible({timeout: 15_000});
  131 |     // a date range is driven by the page spec itself (a period is a question of the page's data), not by a sample value
  132 |     if (await dropdown.locator('.ant-picker').count()) {
  133 |         await page.keyboard.press('Escape');
  134 |         return 'date';
  135 |     }
  136 |     // what the dropdown offers decides: a list of options (a lookup / relation), a select, numbers, or a text box —
  137 |     // in that order, because a select carries a hidden search <input> that no person types into
  138 |     const numberInputs = dropdown.locator('.ant-input-number-input');
  139 |     const listed = dropdown.locator('.ant-checkbox-wrapper, .ant-tree-node-content-wrapper, .ant-radio-wrapper, .ant-dropdown-menu-item');
  140 |     const select = dropdown.locator('.ant-select').first();
  141 |     const textInputs = dropdown.locator('input:visible:not([readonly]):not([type="search"]), textarea:visible');
  142 |     let kind: 'text' | 'number' | 'option' | 'unknown' = 'unknown';
  143 |     if (await listed.count() >= 1) {
  144 |         const match = listed.filter({hasText: value}).first();
  145 |         if (await match.count()) await match.click();
  146 |         else await listed.first().click();
  147 |         kind = 'option';
  148 |     } else if (await select.count() >= 1) {
  149 |         await select.click();
  150 |         const options = page.locator('.ant-select-dropdown:visible .ant-select-item-option');
  151 |         await expect(options.first()).toBeVisible({timeout: 15_000});
  152 |         const match = options.filter({hasText: value}).first();
  153 |         if (await match.count()) await match.click();
  154 |         else await options.first().click();
  155 |         await page.keyboard.press('Escape');
  156 |         kind = 'option';
  157 |     } else if (await numberInputs.count() >= 1 && /^\d/.test(value)) {
  158 |         const n = value.replace(/[^\d.-]/g, '');
  159 |         await numberInputs.first().fill(n);
  160 |         if (await numberInputs.count() >= 2) await numberInputs.nth(1).fill(n);
  161 |         kind = 'number';
  162 |     } else if (await textInputs.count() >= 1) {
  163 |         await textInputs.first().fill(value);
  164 |         kind = 'text';
  165 |     }
  166 |     if (kind === 'unknown') {
```