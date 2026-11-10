# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 111-user-telemetry.spec.ts >> 111 user › telemetry >> in the dark theme the Changes card and table are dark and readable; the theme goes back to light
- Location: tests/e2e/111-user-telemetry.spec.ts:139:9

# Error details

```
Error: the switch back to light through the theme button is saved for the person — the server still said "dark", so the next sign-in is dark again

expect(received).toBe(expected) // Object.is equality

Expected: "light"
Received: "dark"
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
        - generic "Drag into the assistant — QA Admin" [ref=e247]:
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
              - listitem [ref=e261]: /
              - listitem [ref=e262]:
                - link "Telemetry" [ref=e264] [cursor=pointer]:
                  - /url: /app/settings/users/614d3d67-77d4-4351-abf8-90443678862d/telemetry
          - generic [ref=e265]: People who can sign in, with their roles and status
        - button "search Search everything… ⌘K" [ref=e266] [cursor=pointer]:
          - img "search" [ref=e267]:
            - img [ref=e268]
          - generic [ref=e270]: Search everything…
          - generic [ref=e271]: ⌘K
        - button "Dark theme" [ref=e272] [cursor=pointer]:
          - img "moon" [ref=e274]:
            - img [ref=e275]
        - generic [ref=e277] [cursor=pointer]:
          - img "user" [ref=e280]:
            - img [ref=e281]
          - generic [ref=e284]: QA Admin
      - generic [ref=e286]:
        - generic [ref=e287]:
          - heading "QA Admin" [level=2] [ref=e288]
          - generic "Drag into the assistant — QA Admin" [ref=e289]:
            - img "holder" [ref=e290]:
              - img [ref=e291]
        - generic [ref=e293]:
          - tablist [ref=e294]:
            - generic [ref=e296]:
              - tab "Info" [ref=e298] [cursor=pointer]
              - tab "Telemetry" [selected] [ref=e300] [cursor=pointer]
              - tab "Audit log" [ref=e302] [cursor=pointer]
          - tabpanel "Telemetry" [ref=e305]:
            - generic [ref=e307]:
              - generic [ref=e308]:
                - tablist [ref=e311]:
                  - tab "Last 7 days" [ref=e312] [cursor=pointer]
                  - tab "Last 30 days" [selected] [ref=e313] [cursor=pointer]
                  - tab "Last 90 days" [ref=e314] [cursor=pointer]
                  - tab "All time" [ref=e315] [cursor=pointer]
                  - tab "calendar" [ref=e316] [cursor=pointer]:
                    - img "calendar" [ref=e317]:
                      - img [ref=e318]
                  - button "Your own periods — add, rename or remove" [ref=e320] [cursor=pointer]:
                    - img "plus" [ref=e321]:
                      - img [ref=e322]
                - generic [ref=e325]:
                  - button "download Export" [ref=e326] [cursor=pointer]:
                    - img "download" [ref=e328]:
                      - img [ref=e329]
                    - generic [ref=e331]: Export
                  - button "edit Edit" [ref=e334] [cursor=pointer]:
                    - img "edit" [ref=e336]:
                      - img [ref=e337]
                    - generic [ref=e339]: Edit
              - generic [ref=e343]:
                - generic [ref=e347] [cursor=pointer]:
                  - generic [ref=e348]: Actions
                  - generic [ref=e349]:
                    - generic [ref=e350]: "7.5"
                    - generic [ref=e351]: K
                  - generic [ref=e353]: everything this person did in the period
                - generic [ref=e357] [cursor=pointer]:
                  - generic [ref=e358]: Records opened
                  - generic [ref=e360]: "75"
                  - generic [ref=e362]: records looked at
                - generic [ref=e366] [cursor=pointer]:
                  - generic [ref=e367]: Changes
                  - generic [ref=e369]: "123"
                  - generic [ref=e371]: records they created or edited
                - generic [ref=e375] [cursor=pointer]:
                  - generic [ref=e376]: Searches
                  - generic [ref=e378]: "218"
                  - generic [ref=e380]: times they looked for something
                - generic [ref=e384] [cursor=pointer]:
                  - generic [ref=e385]: Errors
                  - generic [ref=e387]: "38"
                  - generic [ref=e389]: errors their browser reported
                - generic [ref=e393] [cursor=pointer]:
                  - generic [ref=e394]: Sessions
                  - generic [ref=e396]: "775"
                  - generic [ref=e398]: times they came to work
                - generic "The high is 3.6K at 06-11-2026." [ref=e400]:
                  - generic [ref=e402]: Activity by day
                  - button "The high is 3.6K at 06-11-2026." [ref=e409] [cursor=pointer]
                - generic "Page opened is the largest at 3.3K." [ref=e411]:
                  - generic [ref=e413]: What they do
                  - button "Page opened is the largest at 3.3K." [ref=e420] [cursor=pointer]
                - generic "User is the largest at 321." [ref=e422]:
                  - generic [ref=e424]: Where they work
                  - button "User is the largest at 321." [ref=e431] [cursor=pointer]
                - generic [ref=e433]:
                  - generic [ref=e434]:
                    - generic [ref=e435]: Sessions
                    - generic [ref=e436]: every session, newest first
                  - generic [ref=e438]:
                    - generic [ref=e443]:
                      - table [ref=e445]:
                        - rowgroup [ref=e452]:
                          - row "Session Actions Started Last seen" [ref=e453]:
                            - columnheader "Session" [ref=e454]
                            - columnheader "Actions" [ref=e455]
                            - columnheader "Started" [ref=e456]
                            - columnheader "Last seen" [ref=e457]
                            - columnheader [ref=e458]
                      - table [ref=e460]:
                        - rowgroup [ref=e466]:
                          - row "desktop · 1.0.10 · Windows · 2026-11-10 13:04 Drag into the assistant — desktop · 1.0.10 · Windows · 2026-11-10 13:04 5 10-11-2026 13:04 10-11-2026 13:04" [ref=e467] [cursor=pointer]:
                            - cell "desktop · 1.0.10 · Windows · 2026-11-10 13:04 Drag into the assistant — desktop · 1.0.10 · Windows · 2026-11-10 13:04" [ref=e468]:
                              - generic [ref=e469]:
                                - generic [ref=e470]: desktop · 1.0.10 · Windows · 2026-11-10 13:04
                                - generic "Drag into the assistant — desktop · 1.0.10 · Windows · 2026-11-10 13:04" [ref=e471]:
                                  - img "holder" [ref=e472]:
                                    - img [ref=e473]
                            - cell "5" [ref=e475]
                            - cell "10-11-2026 13:04" [ref=e476]
                            - cell "10-11-2026 13:04" [ref=e477]
                          - row "desktop · 1.0.10 · Windows · 2026-11-10 13:04 Drag into the assistant — desktop · 1.0.10 · Windows · 2026-11-10 13:04 5 10-11-2026 13:04 10-11-2026 13:04" [ref=e478] [cursor=pointer]:
                            - cell "desktop · 1.0.10 · Windows · 2026-11-10 13:04 Drag into the assistant — desktop · 1.0.10 · Windows · 2026-11-10 13:04" [ref=e479]:
                              - generic [ref=e480]:
                                - generic [ref=e481]: desktop · 1.0.10 · Windows · 2026-11-10 13:04
                                - generic "Drag into the assistant — desktop · 1.0.10 · Windows · 2026-11-10 13:04" [ref=e482]:
                                  - img "holder" [ref=e483]:
                                    - img [ref=e484]
                            - cell "5" [ref=e486]
                            - cell "10-11-2026 13:04" [ref=e487]
                            - cell "10-11-2026 13:04" [ref=e488]
                          - row "desktop · 1.0.10 · Windows · 2026-11-10 13:04 Drag into the assistant — desktop · 1.0.10 · Windows · 2026-11-10 13:04 7 10-11-2026 13:04 10-11-2026 13:04" [ref=e489] [cursor=pointer]:
                            - cell "desktop · 1.0.10 · Windows · 2026-11-10 13:04 Drag into the assistant — desktop · 1.0.10 · Windows · 2026-11-10 13:04" [ref=e490]:
                              - generic [ref=e491]:
                                - generic [ref=e492]: desktop · 1.0.10 · Windows · 2026-11-10 13:04
                                - generic "Drag into the assistant — desktop · 1.0.10 · Windows · 2026-11-10 13:04" [ref=e493]:
                                  - img "holder" [ref=e494]:
                                    - img [ref=e495]
                            - cell "7" [ref=e497]
                            - cell "10-11-2026 13:04" [ref=e498]
                            - cell "10-11-2026 13:04" [ref=e499]
                          - row "desktop · 1.0.10 · Windows · 2026-11-10 13:03 Drag into the assistant — desktop · 1.0.10 · Windows · 2026-11-10 13:03 5 10-11-2026 13:03 10-11-2026 13:04" [ref=e500] [cursor=pointer]:
                            - cell "desktop · 1.0.10 · Windows · 2026-11-10 13:03 Drag into the assistant — desktop · 1.0.10 · Windows · 2026-11-10 13:03" [ref=e501]:
                              - generic [ref=e502]:
                                - generic [ref=e503]: desktop · 1.0.10 · Windows · 2026-11-10 13:03
                                - generic "Drag into the assistant — desktop · 1.0.10 · Windows · 2026-11-10 13:03" [ref=e504]:
                                  - img "holder" [ref=e505]:
                                    - img [ref=e506]
                            - cell "5" [ref=e508]
                            - cell "10-11-2026 13:03" [ref=e509]
                            - cell "10-11-2026 13:04" [ref=e510]
                          - row "desktop · 1.0.10 · Windows · 2026-11-10 13:03 Drag into the assistant — desktop · 1.0.10 · Windows · 2026-11-10 13:03 5 10-11-2026 13:03 10-11-2026 13:03" [ref=e511] [cursor=pointer]:
                            - cell "desktop · 1.0.10 · Windows · 2026-11-10 13:03 Drag into the assistant — desktop · 1.0.10 · Windows · 2026-11-10 13:03" [ref=e512]:
                              - generic [ref=e513]:
                                - generic [ref=e514]: desktop · 1.0.10 · Windows · 2026-11-10 13:03
                                - generic "Drag into the assistant — desktop · 1.0.10 · Windows · 2026-11-10 13:03" [ref=e515]:
                                  - img "holder" [ref=e516]:
                                    - img [ref=e517]
                            - cell "5" [ref=e519]
                            - cell "10-11-2026 13:03" [ref=e520]
                            - cell "10-11-2026 13:03" [ref=e521]
                          - row "desktop · 1.0.10 · Windows · 2026-11-10 13:03 Drag into the assistant — desktop · 1.0.10 · Windows · 2026-11-10 13:03 10 10-11-2026 13:03 10-11-2026 13:03" [ref=e522] [cursor=pointer]:
                            - cell "desktop · 1.0.10 · Windows · 2026-11-10 13:03 Drag into the assistant — desktop · 1.0.10 · Windows · 2026-11-10 13:03" [ref=e523]:
                              - generic [ref=e524]:
                                - generic [ref=e525]: desktop · 1.0.10 · Windows · 2026-11-10 13:03
                                - generic "Drag into the assistant — desktop · 1.0.10 · Windows · 2026-11-10 13:03" [ref=e526]:
                                  - img "holder" [ref=e527]:
                                    - img [ref=e528]
                            - cell "10" [ref=e530]
                            - cell "10-11-2026 13:03" [ref=e531]
                            - cell "10-11-2026 13:03" [ref=e532]
                    - generic [ref=e534]:
                      - generic [ref=e535]: Sessions
                      - generic [ref=e536]: "6"
                - generic [ref=e538]:
                  - generic [ref=e539]:
                    - generic [ref=e540]: Actions
                    - generic [ref=e541]: every action, newest first — press the kind to see what was searched for or what went wrong
                  - table [ref=e550]:
                    - rowgroup [ref=e556]:
                      - row "When What Screen Record kind" [ref=e557]:
                        - columnheader "When" [ref=e558]
                        - columnheader "What" [ref=e559]
                        - columnheader "Screen" [ref=e560]
                        - columnheader "Record kind" [ref=e561]
                    - rowgroup [ref=e562]:
                      - row "10-11-2026 13:04 Session ended — —" [ref=e563]:
                        - cell "10-11-2026 13:04" [ref=e564]
                        - cell "Session ended" [ref=e565]:
                          - generic [ref=e566]: Session ended
                        - cell "—" [ref=e567]
                        - cell "—" [ref=e568]
                      - row "10-11-2026 13:04 Page opened /app/dashboards/ —" [ref=e569]:
                        - cell "10-11-2026 13:04" [ref=e570]
                        - cell "Page opened" [ref=e571]:
                          - generic [ref=e572]: Page opened
                        - cell /app/dashboards/ [ref=e573]
                        - cell "—" [ref=e574]
                      - row "10-11-2026 13:04 Application started — —" [ref=e575]:
                        - cell "10-11-2026 13:04" [ref=e576]
                        - cell "Application started" [ref=e577]:
                          - generic [ref=e578]: Application started
                        - cell "—" [ref=e579]
                        - cell "—" [ref=e580]
                      - row "10-11-2026 13:04 Signed in /app/ —" [ref=e581]:
                        - cell "10-11-2026 13:04" [ref=e582]
                        - cell "Signed in" [ref=e583]:
                          - generic [ref=e584]: Signed in
                        - cell /app/ [ref=e585]
                        - cell "—" [ref=e586]
                      - row "10-11-2026 13:04 Page opened /app/ —" [ref=e587]:
                        - cell "10-11-2026 13:04" [ref=e588]
                        - cell "Page opened" [ref=e589]:
                          - generic [ref=e590]: Page opened
                        - cell /app/ [ref=e591]
                        - cell "—" [ref=e592]
                      - row "10-11-2026 13:04 Session ended — —" [ref=e593]:
                        - cell "10-11-2026 13:04" [ref=e594]
                        - cell "Session ended" [ref=e595]:
                          - generic [ref=e596]: Session ended
                        - cell "—" [ref=e597]
                        - cell "—" [ref=e598]
                      - row "10-11-2026 13:04 Page opened /app/dashboards/ —" [ref=e599]:
                        - cell "10-11-2026 13:04" [ref=e600]
                        - cell "Page opened" [ref=e601]:
                          - generic [ref=e602]: Page opened
                        - cell /app/dashboards/ [ref=e603]
                        - cell "—" [ref=e604]
                      - row "10-11-2026 13:04 Page opened /app/ —" [ref=e605]:
                        - cell "10-11-2026 13:04" [ref=e606]
                        - cell "Page opened" [ref=e607]:
                          - generic [ref=e608]: Page opened
                        - cell /app/ [ref=e609]
                        - cell "—" [ref=e610]
                      - row "10-11-2026 13:04 Application started — —" [ref=e611]:
                        - cell "10-11-2026 13:04" [ref=e612]
                        - cell "Application started" [ref=e613]:
                          - generic [ref=e614]: Application started
                        - cell "—" [ref=e615]
                        - cell "—" [ref=e616]
                      - row "10-11-2026 13:04 Signed in /app/ —" [ref=e617]:
                        - cell "10-11-2026 13:04" [ref=e618]
                        - cell "Signed in" [ref=e619]:
                          - generic [ref=e620]: Signed in
                        - cell /app/ [ref=e621]
                        - cell "—" [ref=e622]
                - generic [ref=e624]:
                  - generic [ref=e625]:
                    - generic [ref=e626]: Changes
                    - generic [ref=e627]: what they created, edited or removed — press the action to see the record, or field by field what changed
                  - table [ref=e636]:
                    - rowgroup [ref=e641]:
                      - row "When What Record kind Record" [ref=e642]:
                        - columnheader "When" [ref=e643]
                        - columnheader "What" [ref=e644]
                        - columnheader "Record kind" [ref=e645]
                        - columnheader "Record" [ref=e646]
                    - rowgroup [ref=e647]:
                      - row "10-11-2026 11:45 Create Listing tag QA Tag Retired" [ref=e648]:
                        - cell "10-11-2026 11:45" [ref=e649]
                        - cell "Create" [ref=e650]:
                          - generic [ref=e651] [cursor=pointer]: Create
                        - cell "Listing tag" [ref=e652]:
                          - generic [ref=e653]: Listing tag
                        - cell "QA Tag Retired" [ref=e654]
                      - row "10-11-2026 11:45 Create Listing tag QA Tag Pet friendly" [ref=e655]:
                        - cell "10-11-2026 11:45" [ref=e656]
                        - cell "Create" [ref=e657]:
                          - generic [ref=e658] [cursor=pointer]: Create
                        - cell "Listing tag" [ref=e659]:
                          - generic [ref=e660]: Listing tag
                        - cell "QA Tag Pet friendly" [ref=e661]
                      - row "10-11-2026 11:45 Create Listing tag QA Tag Sea view" [ref=e662]:
                        - cell "10-11-2026 11:45" [ref=e663]
                        - cell "Create" [ref=e664]:
                          - generic [ref=e665] [cursor=pointer]: Create
                        - cell "Listing tag" [ref=e666]:
                          - generic [ref=e667]: Listing tag
                        - cell "QA Tag Sea view" [ref=e668]
                      - row "10-11-2026 11:44 Remove Listing tag QA Tag Retired" [ref=e669]:
                        - cell "10-11-2026 11:44" [ref=e670]
                        - cell "Remove" [ref=e671]:
                          - generic [ref=e672] [cursor=pointer]: Remove
                        - cell "Listing tag" [ref=e673]:
                          - generic [ref=e674]: Listing tag
                        - cell "QA Tag Retired" [ref=e675]
                      - row "10-11-2026 11:44 Remove Listing tag QA Tag Pet friendly" [ref=e676]:
                        - cell "10-11-2026 11:44" [ref=e677]
                        - cell "Remove" [ref=e678]:
                          - generic [ref=e679] [cursor=pointer]: Remove
                        - cell "Listing tag" [ref=e680]:
                          - generic [ref=e681]: Listing tag
                        - cell "QA Tag Pet friendly" [ref=e682]
                      - row "10-11-2026 11:44 Remove Listing tag QA Tag Sea view" [ref=e683]:
                        - cell "10-11-2026 11:44" [ref=e684]
                        - cell "Remove" [ref=e685]:
                          - generic [ref=e686] [cursor=pointer]: Remove
                        - cell "Listing tag" [ref=e687]:
                          - generic [ref=e688]: Listing tag
                        - cell "QA Tag Sea view" [ref=e689]
                      - row "10-11-2026 11:36 Create Listing tag QA Tag Retired" [ref=e690]:
                        - cell "10-11-2026 11:36" [ref=e691]
                        - cell "Create" [ref=e692]:
                          - generic [ref=e693] [cursor=pointer]: Create
                        - cell "Listing tag" [ref=e694]:
                          - generic [ref=e695]: Listing tag
                        - cell "QA Tag Retired" [ref=e696]
                      - row "10-11-2026 11:36 Create Listing tag QA Tag Pet friendly" [ref=e697]:
                        - cell "10-11-2026 11:36" [ref=e698]
                        - cell "Create" [ref=e699]:
                          - generic [ref=e700] [cursor=pointer]: Create
                        - cell "Listing tag" [ref=e701]:
                          - generic [ref=e702]: Listing tag
                        - cell "QA Tag Pet friendly" [ref=e703]
                      - row "10-11-2026 11:35 Create Listing tag QA Tag Sea view" [ref=e704]:
                        - cell "10-11-2026 11:35" [ref=e705]
                        - cell "Create" [ref=e706]:
                          - generic [ref=e707] [cursor=pointer]: Create
                        - cell "Listing tag" [ref=e708]:
                          - generic [ref=e709]: Listing tag
                        - cell "QA Tag Sea view" [ref=e710]
                      - row "10-11-2026 11:35 Remove Listing tag QA Tag Retired" [ref=e711]:
                        - cell "10-11-2026 11:35" [ref=e712]
                        - cell "Remove" [ref=e713]:
                          - generic [ref=e714] [cursor=pointer]: Remove
                        - cell "Listing tag" [ref=e715]:
                          - generic [ref=e716]: Listing tag
                        - cell "QA Tag Retired" [ref=e717]
    - generic [ref=e720]:
      - button "Assistant" [ref=e721] [cursor=pointer]:
        - img "message" [ref=e722]:
          - img [ref=e723]
      - button "Audit log" [ref=e725] [cursor=pointer]:
        - img "audit" [ref=e726]:
          - img [ref=e727]
  - tooltip "Dark theme" [ref=e730]
```

# Test source

```ts
  80  |             const before = page.url();
  81  |             await telemetry.openChangeDetail(telemetry.changeRow(TAG_NAMES[0]));
  82  |             await expect(telemetry.changeDetail, 'the detail names the tag').toContainText(TAG_NAMES[0]);
  83  |             await expect(page).toHaveURL(before);
  84  |             await telemetry.closeChangeDetail();
  85  |         });
  86  | 
  87  |         try {
  88  |             for (const period of ['Last 7 days', 'All time']) {
  89  |                 await test.step(`the period ${period} keeps the tags`, async () => {
  90  |                     await telemetry.pickPeriod(period);
  91  |                     await expect(telemetry.card('Changes')).toBeVisible();
  92  |                     await expectTagsInChanges(telemetry, adminApi);
  93  |                 });
  94  |             }
  95  |         } finally {
  96  |             await telemetry.pickPeriod('Last 30 days');
  97  |         }
  98  |     });
  99  | 
  100 |     test('a person\'s session is named with the time of their own device (Pacific/Auckland), not UTC', async ({browser, page, signInAs}, testInfo) => {
  101 |         const agent = credentialsOf('bookingAgent');
  102 |         let signedInAt = new Date();
  103 |         await test.step(`the booking agent signs in from a browser in ${AUCKLAND}`, async () => {
  104 |             const context = await browser.newContext({baseURL: testInfo.project.use.baseURL, viewport: testInfo.project.use.viewport, timezoneId: AUCKLAND});
  105 |             try {
  106 |                 const away = await context.newPage();
  107 |                 const login = new LoginPage(away);
  108 |                 await login.navigate();
  109 |                 signedInAt = new Date();
  110 |                 await login.login(agent.email, agent.password);
  111 |                 expect(await away.evaluate(() => Intl.DateTimeFormat().resolvedOptions().timeZone), 'the browser\'s clock is Auckland').toBe(AUCKLAND);
  112 |             } finally {
  113 |                 await context.close();
  114 |             }
  115 |         });
  116 |         const expected = TelemetryTab.clockIn(signedInAt, AUCKLAND);
  117 |         const utc = TelemetryTab.clockIn(signedInAt, 'UTC');
  118 |         await signInAs('admin');
  119 |         const grid = new GridPage(page, 'user');
  120 |         await grid.goto('/settings/users');
  121 |         await grid.waitLoaded();
  122 |         await grid.clearFilters();
  123 |         let telemetry = await openTelemetry(page, grid, activeTenant().userEmail(QA_USERS.bookingAgent.email), testInfo);
  124 |         const fmt = (minutes: number) => new Date(minutes * 60_000).toISOString().slice(0, 16).replace('T', ' ');
  125 |         let newest = '';
  126 |         // the session reaches the telemetry within a minute or so: the tab is reopened until it is there
  127 |         await expect.poll(async () => {
  128 |             newest = (await telemetry.sessionNames())[0] || '';
  129 |             const clock = TelemetryTab.sessionClock(newest);
  130 |             if (clock !== null && Math.abs(clock - expected) <= 2) return 'Auckland';
  131 |             await page.reload();
  132 |             telemetry = new TelemetryTab(page);
  133 |             await telemetry.waitLoaded();
  134 |             return newest;
  135 |         }, {message: `the newest session is named with the time of Auckland (${fmt(expected)}), not UTC (${fmt(utc)})`, timeout: 120_000, intervals: [5_000, 10_000, 15_000]}).toBe('Auckland');
  136 |         testInfo.annotations.push({type: 'session', description: `${newest} — Auckland ${fmt(expected)}, UTC ${fmt(utc)}`});
  137 |     });
  138 | 
  139 |     test('in the dark theme the Changes card and table are dark and readable; the theme goes back to light', async ({page, signInAs}, testInfo) => {
  140 |         const admin = credentialsOf('admin');
  141 |         await signInAs('admin');
  142 |         const theme = new ThemeSwitch(page);
  143 |         // the start is light, on the page and for the person (a run that broke before its cleanup may have left dark)
  144 |         await theme.ensureLight();
  145 |         if ((await ThemeSwitch.savedTheme(admin)) === 'dark') await ThemeSwitch.restoreLight(admin);
  146 |         const grid = new GridPage(page, 'user');
  147 |         await grid.goto('/settings/users');
  148 |         await grid.waitLoaded();
  149 |         await grid.clearFilters();
  150 |         const telemetry = await openTelemetry(page, grid, activeTenant().adminEmail, testInfo);
  151 |         const lightChanges = await TelemetryTab.background(telemetry.widget('Changes'));
  152 |         let saved = '';
  153 |         try {
  154 |             await theme.toDark();
  155 |             await telemetry.waitLoaded();
  156 |             const table = await TelemetryTab.background(telemetry.widget('Changes'));
  157 |             const card = await TelemetryTab.background(telemetry.cardWidget('Changes'));
  158 |             const other = await TelemetryTab.background(telemetry.widget('Sessions'));
  159 |             testInfo.annotations.push({type: 'dark-theme', description: `Changes table ${table}, Changes card ${card}, Sessions ${other} (light: ${lightChanges})`});
  160 |             expect.soft(ThemeSwitch.luminance(table), `the Changes table is dark (${table}), not left white`).toBeLessThan(0.2);
  161 |             expect.soft(ThemeSwitch.luminance(card), `the Changes card is dark (${card})`).toBeLessThan(0.2);
  162 |             expect.soft(table, 'the Changes table has the background of the other widgets').toBe(other);
  163 |             expect.soft(card, 'the Changes card has the background of the other widgets').toBe(other);
  164 |             // the probe measures the contrast of every text: the dark Changes must stay readable
  165 |             expectPresentable(await probePage(page, testInfo, 'telemetry-dark'));
  166 |         } finally {
  167 |             // ALWAYS back to light: by the button as a person does it, then — when the server did not keep it — the
  168 |             // cleanup through the API, so the administrator never stays dark
  169 |             await theme.ensureLight();
  170 |             await page.waitForTimeout(3_000);
  171 |             saved = await ThemeSwitch.savedTheme(admin);
  172 |             if (saved === 'dark') await ThemeSwitch.restoreLight(admin);
  173 |         }
  174 |         expect(await ThemeSwitch.savedTheme(admin), 'the administrator ends in the light theme (the cleanup)').not.toBe('dark');
  175 |         await test.step('after a reload the theme is still light', async () => {
  176 |             await page.reload();
  177 |             await new TelemetryTab(page).waitLoaded();
  178 |             expect(await theme.isDark(), 'the page is light after a reload').toBe(false);
  179 |         });
> 180 |         expect(saved, 'the switch back to light through the theme button is saved for the person — the server still said "dark", so the next sign-in is dark again').toBe('light');
      |                                                                                                                                                                      ^ Error: the switch back to light through the theme button is saved for the person — the server still said "dark", so the next sign-in is dark again
  181 |     });
  182 | 
  183 |     test('the super administrator sees the same Changes on the person\'s page of Platform Admin Users', async ({page, signInAs, adminApi}, testInfo) => {
  184 |         await signInAs('superAdmin');
  185 |         const users = new UsersPage(page);
  186 |         await users.navigate();
  187 |         const email = activeTenant().adminEmail;
  188 |         try {
  189 |             // the local part only ("qa.admin"): the whole address also finds every person whose address holds "hostify" — people of other accounts
  190 |             await users.search(email.split('@')[0]);
  191 |             const telemetry = await openTelemetry(page, users, email, testInfo);
  192 |             expectPresentable(await probePage(page, testInfo, 'telemetry-platform'));
  193 |             await expectTagsInChanges(telemetry, adminApi);
  194 |         } finally {
  195 |             await users.navigate();
  196 |             await users.clearFilters();
  197 |             // the page ends on the QA account's administrator, not on the list of every account's people: the report's
  198 |             // last screenshot shows no one of another account (the QA person, 2026-11-10)
  199 |             await users.goto(`/platformAdmin/users/${adminApi.user.id}/info`);
  200 |         }
  201 |     });
  202 | });
  203 | 
```