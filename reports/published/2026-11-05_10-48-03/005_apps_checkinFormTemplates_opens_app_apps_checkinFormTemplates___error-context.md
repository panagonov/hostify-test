# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 005-platform-pages.spec.ts >> 005 platform pages >> apps › checkinFormTemplates opens (/app/apps/checkinFormTemplates)
- Location: tests/e2e/005-platform-pages.spec.ts:28:13

# Error details

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 403 @ https://hostify.bioseek.eu/api/automationApp/state
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e5]:
    - link "logo" [ref=e7] [cursor=pointer]:
      - /url: /app/platformDashboard/
      - img "logo" [ref=e8]
    - generic [ref=e9]:
      - generic [ref=e11]:
        - link [ref=e12] [cursor=pointer]:
          - /url: /app/platformDashboard
          - img [ref=e16]:
            - img [ref=e17]
        - img [ref=e23] [cursor=pointer]:
          - img [ref=e24]
        - img [ref=e30] [cursor=pointer]:
          - img [ref=e31]
        - img [ref=e37] [cursor=pointer]:
          - img [ref=e38]
        - img [ref=e44] [cursor=pointer]:
          - img [ref=e45]
      - generic [ref=e48]:
        - generic [ref=e49] [cursor=pointer]:
          - generic [ref=e50]: Apps
          - button "left" [ref=e51]:
            - img "left" [ref=e53]:
              - img [ref=e54]
        - generic [ref=e57]:
          - link "App Center" [ref=e58] [cursor=pointer]:
            - /url: /app/apps/appCenter
            - generic [ref=e59]: App Center
          - link "Partner apps" [ref=e60] [cursor=pointer]:
            - /url: /app/apps/partners
            - generic [ref=e61]: Partner apps
          - link "Payment processors" [ref=e62] [cursor=pointer]:
            - /url: /app/apps/paymentProcessorAccounts
            - generic [ref=e63]: Payment processors
          - link "Booking API" [ref=e64] [cursor=pointer]:
            - /url: /app/apps/bookingApiClients
            - generic [ref=e65]: Booking API
          - link "Owner portal roles" [ref=e66] [cursor=pointer]:
            - /url: /app/apps/ownerPortalRoles
            - generic [ref=e67]: Owner portal roles
          - link "Online check-in" [active] [ref=e68] [cursor=pointer]:
            - /url: /app/apps/checkinFormTemplates
            - generic [ref=e69]: Online check-in
          - link "Compliance connections" [ref=e70] [cursor=pointer]:
            - /url: /app/apps/complianceConnections
            - generic [ref=e71]: Compliance connections
          - link "Requests status" [ref=e72] [cursor=pointer]:
            - /url: /app/apps/complianceSubmissions
            - generic [ref=e73]: Requests status
    - generic [ref=e74]:
      - generic [ref=e76] [cursor=pointer]:
        - generic [ref=e77]:
          - img [ref=e79]:
            - img [ref=e80]
          - superscript [ref=e82]:
            - generic [ref=e84]: "1"
        - generic [ref=e85]: Notifications
      - generic [ref=e86]:
        - button "Collapse menu" [expanded] [ref=e87] [cursor=pointer]:
          - img "double-left" [ref=e88]:
            - img [ref=e89]
        - button "v 1.0.3" [ref=e91] [cursor=pointer]
  - generic [ref=e92]:
    - banner [ref=e93]:
      - button "arrow-left" [ref=e94] [cursor=pointer]:
        - img "arrow-left" [ref=e96]:
          - img [ref=e97]
      - img "form" [ref=e100]:
        - img [ref=e101]
      - generic [ref=e104]:
        - navigation [ref=e105]:
          - list [ref=e106]:
            - listitem [ref=e107]:
              - link "Apps" [ref=e109] [cursor=pointer]:
                - /url: /app/apps
            - listitem [ref=e110]: /
            - listitem [ref=e111]:
              - link "Online check-in" [ref=e113] [cursor=pointer]:
                - /url: /app/apps/checkinFormTemplates
        - generic [ref=e114]: Online check-in forms guests fill in before arrival
      - button "search Search everything… ⌘K" [ref=e115] [cursor=pointer]:
        - img "search" [ref=e116]:
          - img [ref=e117]
        - generic [ref=e119]: Search everything…
        - generic [ref=e120]: ⌘K
      - button "Audit log" [ref=e121] [cursor=pointer]:
        - img "audit" [ref=e122]:
          - img [ref=e123]
      - button "Dark theme" [ref=e125] [cursor=pointer]:
        - img "moon" [ref=e127]:
          - img [ref=e128]
      - generic [ref=e130] [cursor=pointer]:
        - img "user" [ref=e133]:
          - img [ref=e134]
        - generic [ref=e137]: admin
    - generic [ref=e140]:
      - button "Add card 0 / 5" [ref=e142] [cursor=pointer]:
        - generic [ref=e143]: Add card
        - generic [ref=e144]: 0 / 5
      - generic [ref=e147]:
        - generic [ref=e148]:
          - generic [ref=e150]:
            - generic [ref=e151]:
              - img "search" [ref=e152]:
                - img [ref=e153]
              - textbox "Search" [ref=e155]
            - button "plus-circle Create a new checkin form template" [ref=e156] [cursor=pointer]:
              - img "plus-circle" [ref=e158]:
                - img [ref=e159]
              - generic [ref=e162]: Create a new checkin form template
            - button "export Export down" [ref=e163] [cursor=pointer]:
              - generic [ref=e164]:
                - img "export" [ref=e166]:
                  - img [ref=e167]
                - generic [ref=e169]: Export
                - img "down" [ref=e171]:
                  - img [ref=e172]
            - button "layout Customize view" [ref=e174] [cursor=pointer]:
              - img "layout" [ref=e176]:
                - img [ref=e177]
              - generic [ref=e179]: Customize view
          - generic [ref=e180]:
            - table [ref=e182]:
              - rowgroup [ref=e194]:
                - row "Name Form Preset Assigned Listings filter Guest form languages filter Verification mode Active Date updated" [ref=e195]:
                  - columnheader [ref=e196]
                  - columnheader "Name" [ref=e197] [cursor=pointer]:
                    - generic [ref=e198]:
                      - generic [ref=e200]:
                        - generic [ref=e201]: Name
                        - generic [ref=e203]:
                          - img [ref=e204]:
                            - img [ref=e205]
                          - img [ref=e207]:
                            - img [ref=e208]
                      - button "search" [ref=e210]:
                        - button "search" [ref=e211]:
                          - img "search" [ref=e213]:
                            - img [ref=e214]
                  - columnheader "Form Preset" [ref=e217] [cursor=pointer]:
                    - generic [ref=e218]:
                      - generic [ref=e220]:
                        - generic [ref=e221]: Form Preset
                        - generic [ref=e223]:
                          - img [ref=e224]:
                            - img [ref=e225]
                          - img [ref=e227]:
                            - img [ref=e228]
                      - button "filter" [ref=e230]:
                        - button "filter" [ref=e231]:
                          - img "filter" [ref=e233]:
                            - img [ref=e234]
                  - columnheader "Assigned Listings filter" [ref=e237]:
                    - generic [ref=e238]:
                      - generic [ref=e239]: Assigned Listings
                      - button "filter" [ref=e240] [cursor=pointer]:
                        - button "filter" [ref=e241]:
                          - img "filter" [ref=e243]:
                            - img [ref=e244]
                  - columnheader "Guest form languages filter" [ref=e247]:
                    - generic [ref=e248]:
                      - generic [ref=e249]: Guest form languages
                      - button "filter" [ref=e250] [cursor=pointer]:
                        - button "filter" [ref=e251]:
                          - img "filter" [ref=e253]:
                            - img [ref=e254]
                  - columnheader "Verification mode" [ref=e257] [cursor=pointer]:
                    - generic [ref=e258]:
                      - generic [ref=e260]:
                        - generic [ref=e261]: Verification mode
                        - generic [ref=e263]:
                          - img [ref=e264]:
                            - img [ref=e265]
                          - img [ref=e267]:
                            - img [ref=e268]
                      - button "filter" [ref=e270]:
                        - button "filter" [ref=e271]:
                          - img "filter" [ref=e273]:
                            - img [ref=e274]
                  - columnheader "Active" [ref=e277] [cursor=pointer]:
                    - generic [ref=e278]:
                      - generic [ref=e280]:
                        - generic [ref=e281]: Active
                        - generic [ref=e283]:
                          - img [ref=e284]:
                            - img [ref=e285]
                          - img [ref=e287]:
                            - img [ref=e288]
                      - button "filter" [ref=e290]:
                        - button "filter" [ref=e291]:
                          - img "filter" [ref=e293]:
                            - img [ref=e294]
                  - columnheader "Date updated" [ref=e297] [cursor=pointer]:
                    - generic [ref=e298]:
                      - generic [ref=e300]:
                        - generic [ref=e301]: Date updated
                        - generic [ref=e303]:
                          - img [ref=e304]:
                            - img [ref=e305]
                          - img [ref=e307]:
                            - img [ref=e308]
                      - button "filter" [ref=e310]:
                        - button "filter" [ref=e311]:
                          - img "filter" [ref=e313]:
                            - img [ref=e314]
                  - columnheader [ref=e317]
                  - columnheader [ref=e319]
            - table [ref=e321]:
              - rowgroup [ref=e332]:
                - generic [ref=e333]:
                  - generic [ref=e335]:
                    - generic [ref=e336]: Name
                    - generic [ref=e338]:
                      - img [ref=e339]:
                        - img [ref=e340]
                      - img [ref=e342]:
                        - img [ref=e343]
                  - button [ref=e345] [cursor=pointer]:
                    - button [ref=e346]:
                      - img [ref=e348]:
                        - img [ref=e349]
                - generic [ref=e351]:
                  - generic [ref=e353]:
                    - generic [ref=e354]: Form Preset
                    - generic [ref=e356]:
                      - img [ref=e357]:
                        - img [ref=e358]
                      - img [ref=e360]:
                        - img [ref=e361]
                  - button [ref=e363] [cursor=pointer]:
                    - button [ref=e364]:
                      - img [ref=e366]:
                        - img [ref=e367]
                - generic [ref=e369]:
                  - generic [ref=e370]: Assigned Listings
                  - button [ref=e371] [cursor=pointer]:
                    - button [ref=e372]:
                      - img [ref=e374]:
                        - img [ref=e375]
                - generic [ref=e377]:
                  - generic [ref=e378]: Guest form languages
                  - button [ref=e379] [cursor=pointer]:
                    - button [ref=e380]:
                      - img [ref=e382]:
                        - img [ref=e383]
                - generic [ref=e385]:
                  - generic [ref=e387]:
                    - generic [ref=e388]: Verification mode
                    - generic [ref=e390]:
                      - img [ref=e391]:
                        - img [ref=e392]
                      - img [ref=e394]:
                        - img [ref=e395]
                  - button [ref=e397] [cursor=pointer]:
                    - button [ref=e398]:
                      - img [ref=e400]:
                        - img [ref=e401]
                - generic [ref=e403]:
                  - generic [ref=e405]:
                    - generic [ref=e406]: Active
                    - generic [ref=e408]:
                      - img [ref=e409]:
                        - img [ref=e410]
                      - img [ref=e412]:
                        - img [ref=e413]
                  - button [ref=e415] [cursor=pointer]:
                    - button [ref=e416]:
                      - img [ref=e418]:
                        - img [ref=e419]
                - generic [ref=e421]:
                  - generic [ref=e423]:
                    - generic [ref=e424]: Date updated
                    - generic [ref=e426]:
                      - img [ref=e427]:
                        - img [ref=e428]
                      - img [ref=e430]:
                        - img [ref=e431]
                  - button [ref=e433] [cursor=pointer]:
                    - button [ref=e434]:
                      - img [ref=e436]:
                        - img [ref=e437]
                - row "Select row 1 Colombia – SIRE / TRA Colombia – SIRE / TRA English Español Português Automatic No 05-11-2026 menu" [ref=e439]:
                  - cell "Select row 1" [ref=e440]:
                    - radio "Select row 1" [ref=e443] [cursor=pointer]
                  - cell "Colombia – SIRE / TRA" [ref=e444]:
                    - link "Colombia – SIRE / TRA" [ref=e448] [cursor=pointer]:
                      - /url: /app/apps/checkinFormTemplates/Yroeq6EBTQeRW773ZhjG
                      - generic [ref=e450]: Colombia – SIRE / TRA
                  - cell "Colombia – SIRE / TRA" [ref=e451]:
                    - generic [ref=e453]:
                      - img [ref=e454]
                      - text: Colombia – SIRE / TRA
                  - cell [ref=e456]
                  - cell "English Español Português" [ref=e457]:
                    - generic [ref=e459]:
                      - generic [ref=e461]: English
                      - generic [ref=e463]: Español
                      - generic [ref=e465]: Português
                  - cell "Automatic" [ref=e466]:
                    - generic [ref=e468]:
                      - img [ref=e469]
                      - text: Automatic
                  - cell "No" [ref=e471]:
                    - generic [ref=e473]: "No"
                  - cell "05-11-2026" [ref=e474]:
                    - generic [ref=e476]: 05-11-2026
                  - cell "menu" [ref=e477]:
                    - button "menu" [ref=e480] [cursor=pointer]:
                      - img "menu" [ref=e482]:
                        - img [ref=e483]
                - row "Select row 2 Bulgaria – ESTI Bulgaria – ESTI English Български Deutsch Français Automatic No 05-11-2026 menu" [ref=e485]:
                  - cell "Select row 2" [ref=e486]:
                    - radio "Select row 2" [ref=e489] [cursor=pointer]
                  - cell "Bulgaria – ESTI" [ref=e490]:
                    - link "Bulgaria – ESTI" [ref=e494] [cursor=pointer]:
                      - /url: /app/apps/checkinFormTemplates/Yboeq6EBTQeRW773Zhin
                      - generic [ref=e496]: Bulgaria – ESTI
                  - cell "Bulgaria – ESTI" [ref=e497]:
                    - generic [ref=e499]:
                      - img [ref=e500]
                      - text: Bulgaria – ESTI
                  - cell [ref=e502]
                  - cell "English Български Deutsch Français" [ref=e503]:
                    - generic [ref=e505]:
                      - generic [ref=e507]: English
                      - generic [ref=e509]: Български
                      - generic [ref=e511]: Deutsch
                      - generic [ref=e513]: Français
                  - cell "Automatic" [ref=e514]:
                    - generic [ref=e516]:
                      - img [ref=e517]
                      - text: Automatic
                  - cell "No" [ref=e519]:
                    - generic [ref=e521]: "No"
                  - cell "05-11-2026" [ref=e522]:
                    - generic [ref=e524]: 05-11-2026
                  - cell "menu" [ref=e525]:
                    - button "menu" [ref=e528] [cursor=pointer]:
                      - img "menu" [ref=e530]:
                        - img [ref=e531]
                - row "Select row 3 Portugal – AIMA (ex-SEF) Portugal – AIMA (ex-SEF) English Português Español Français Automatic No 05-11-2026 menu" [ref=e533]:
                  - cell "Select row 3" [ref=e534]:
                    - radio "Select row 3" [ref=e537] [cursor=pointer]
                  - cell "Portugal – AIMA (ex-SEF)" [ref=e538]:
                    - link "Portugal – AIMA (ex-SEF)" [ref=e542] [cursor=pointer]:
                      - /url: /app/apps/checkinFormTemplates/YLoeq6EBTQeRW773ZhiC
                      - generic [ref=e544]: Portugal – AIMA (ex-SEF)
                  - cell "Portugal – AIMA (ex-SEF)" [ref=e545]:
                    - generic [ref=e547]:
                      - img [ref=e548]
                      - text: Portugal – AIMA (ex-SEF)
                  - cell [ref=e550]
                  - cell "English Português Español Français" [ref=e551]:
                    - generic [ref=e553]:
                      - generic [ref=e555]: English
                      - generic [ref=e557]: Português
                      - generic [ref=e559]: Español
                      - generic [ref=e561]: Français
                  - cell "Automatic" [ref=e562]:
                    - generic [ref=e564]:
                      - img [ref=e565]
                      - text: Automatic
                  - cell "No" [ref=e567]:
                    - generic [ref=e569]: "No"
                  - cell "05-11-2026" [ref=e570]:
                    - generic [ref=e572]: 05-11-2026
                  - cell "menu" [ref=e573]:
                    - button "menu" [ref=e576] [cursor=pointer]:
                      - img "menu" [ref=e578]:
                        - img [ref=e579]
                - row "Select row 4 Spain – SES.Hospedajes Spain – SES.Hospedajes English Español Français Português Deutsch Italiano Automatic No 05-11-2026 menu" [ref=e581]:
                  - cell "Select row 4" [ref=e582]:
                    - radio "Select row 4" [ref=e585] [cursor=pointer]
                  - cell "Spain – SES.Hospedajes" [ref=e586]:
                    - link "Spain – SES.Hospedajes" [ref=e590] [cursor=pointer]:
                      - /url: /app/apps/checkinFormTemplates/X7oeq6EBTQeRW773ZhhP
                      - generic [ref=e592]: Spain – SES.Hospedajes
                  - cell "Spain – SES.Hospedajes" [ref=e593]:
                    - generic [ref=e595]:
                      - img [ref=e596]
                      - text: Spain – SES.Hospedajes
                  - cell [ref=e598]
                  - cell "English Español Français Português Deutsch Italiano" [ref=e599]:
                    - generic [ref=e601]:
                      - generic [ref=e603]: English
                      - generic [ref=e605]: Español
                      - generic [ref=e607]: Français
                      - generic [ref=e609]: Português
                      - generic [ref=e611]: Deutsch
                      - generic [ref=e613]: Italiano
                  - cell "Automatic" [ref=e614]:
                    - generic [ref=e616]:
                      - img [ref=e617]
                      - text: Automatic
                  - cell "No" [ref=e619]:
                    - generic [ref=e621]: "No"
                  - cell "05-11-2026" [ref=e622]:
                    - generic [ref=e624]: 05-11-2026
                  - cell "menu" [ref=e625]:
                    - button "menu" [ref=e628] [cursor=pointer]:
                      - img "menu" [ref=e630]:
                        - img [ref=e631]
                - row "Select row 5 Colombia – SIRE / TRA Colombia – SIRE / TRA English Español Português Automatic No 02-11-2026 menu" [ref=e633]:
                  - cell "Select row 5" [ref=e634]:
                    - radio "Select row 5" [ref=e637] [cursor=pointer]
                  - cell "Colombia – SIRE / TRA" [ref=e638]:
                    - link "Colombia – SIRE / TRA" [ref=e642] [cursor=pointer]:
                      - /url: /app/apps/checkinFormTemplates/47l6m6EBTQeRW773sX9X
                      - generic [ref=e644]: Colombia – SIRE / TRA
                  - cell "Colombia – SIRE / TRA" [ref=e645]:
                    - generic [ref=e647]:
                      - img [ref=e648]
                      - text: Colombia – SIRE / TRA
                  - cell [ref=e650]
                  - cell "English Español Português" [ref=e651]:
                    - generic [ref=e653]:
                      - generic [ref=e655]: English
                      - generic [ref=e657]: Español
                      - generic [ref=e659]: Português
                  - cell "Automatic" [ref=e660]:
                    - generic [ref=e662]:
                      - img [ref=e663]
                      - text: Automatic
                  - cell "No" [ref=e665]:
                    - generic [ref=e667]: "No"
                  - cell "02-11-2026" [ref=e668]:
                    - generic [ref=e670]: 02-11-2026
                  - cell "menu" [ref=e671]:
                    - button "menu" [ref=e674] [cursor=pointer]:
                      - img "menu" [ref=e676]:
                        - img [ref=e677]
                - row "Select row 6 Bulgaria – ESTI Bulgaria – ESTI English Български Deutsch Français Automatic No 02-11-2026 menu" [ref=e679]:
                  - cell "Select row 6" [ref=e680]:
                    - radio "Select row 6" [ref=e683] [cursor=pointer]
                  - cell "Bulgaria – ESTI" [ref=e684]:
                    - link "Bulgaria – ESTI" [ref=e688] [cursor=pointer]:
                      - /url: /app/apps/checkinFormTemplates/4rl6m6EBTQeRW773sX82
                      - generic [ref=e690]: Bulgaria – ESTI
                  - cell "Bulgaria – ESTI" [ref=e691]:
                    - generic [ref=e693]:
                      - img [ref=e694]
                      - text: Bulgaria – ESTI
                  - cell [ref=e696]
                  - cell "English Български Deutsch Français" [ref=e697]:
                    - generic [ref=e699]:
                      - generic [ref=e701]: English
                      - generic [ref=e703]: Български
                      - generic [ref=e705]: Deutsch
                      - generic [ref=e707]: Français
                  - cell "Automatic" [ref=e708]:
                    - generic [ref=e710]:
                      - img [ref=e711]
                      - text: Automatic
                  - cell "No" [ref=e713]:
                    - generic [ref=e715]: "No"
                  - cell "02-11-2026" [ref=e716]:
                    - generic [ref=e718]: 02-11-2026
                  - cell "menu" [ref=e719]:
                    - button "menu" [ref=e722] [cursor=pointer]:
                      - img "menu" [ref=e724]:
                        - img [ref=e725]
                - row "Select row 7 Portugal – AIMA (ex-SEF) Portugal – AIMA (ex-SEF) English Português Español Français Automatic No 02-11-2026 menu" [ref=e727]:
                  - cell "Select row 7" [ref=e728]:
                    - radio "Select row 7" [ref=e731] [cursor=pointer]
                  - cell "Portugal – AIMA (ex-SEF)" [ref=e732]:
                    - link "Portugal – AIMA (ex-SEF)" [ref=e736] [cursor=pointer]:
                      - /url: /app/apps/checkinFormTemplates/4bl6m6EBTQeRW773sX8Z
                      - generic [ref=e738]: Portugal – AIMA (ex-SEF)
                  - cell "Portugal – AIMA (ex-SEF)" [ref=e739]:
                    - generic [ref=e741]:
                      - img [ref=e742]
                      - text: Portugal – AIMA (ex-SEF)
                  - cell [ref=e744]
                  - cell "English Português Español Français" [ref=e745]:
                    - generic [ref=e747]:
                      - generic [ref=e749]: English
                      - generic [ref=e751]: Português
                      - generic [ref=e753]: Español
                      - generic [ref=e755]: Français
                  - cell "Automatic" [ref=e756]:
                    - generic [ref=e758]:
                      - img [ref=e759]
                      - text: Automatic
                  - cell "No" [ref=e761]:
                    - generic [ref=e763]: "No"
                  - cell "02-11-2026" [ref=e764]:
                    - generic [ref=e766]: 02-11-2026
                  - cell "menu" [ref=e767]:
                    - button "menu" [ref=e770] [cursor=pointer]:
                      - img "menu" [ref=e772]:
                        - img [ref=e773]
                - row "Select row 8 Spain – SES.Hospedajes Spain – SES.Hospedajes English Español Français Português Deutsch Italiano Automatic No 02-11-2026 menu" [ref=e775]:
                  - cell "Select row 8" [ref=e776]:
                    - radio "Select row 8" [ref=e779] [cursor=pointer]
                  - cell "Spain – SES.Hospedajes" [ref=e780]:
                    - link "Spain – SES.Hospedajes" [ref=e784] [cursor=pointer]:
                      - /url: /app/apps/checkinFormTemplates/4Ll6m6EBTQeRW773sH_d
                      - generic [ref=e786]: Spain – SES.Hospedajes
                  - cell "Spain – SES.Hospedajes" [ref=e787]:
                    - generic [ref=e789]:
                      - img [ref=e790]
                      - text: Spain – SES.Hospedajes
                  - cell [ref=e792]
                  - cell "English Español Français Português Deutsch Italiano" [ref=e793]:
                    - generic [ref=e795]:
                      - generic [ref=e797]: English
                      - generic [ref=e799]: Español
                      - generic [ref=e801]: Français
                      - generic [ref=e803]: Português
                      - generic [ref=e805]: Deutsch
                      - generic [ref=e807]: Italiano
                  - cell "Automatic" [ref=e808]:
                    - generic [ref=e810]:
                      - img [ref=e811]
                      - text: Automatic
                  - cell "No" [ref=e813]:
                    - generic [ref=e815]: "No"
                  - cell "02-11-2026" [ref=e816]:
                    - generic [ref=e818]: 02-11-2026
                  - cell "menu" [ref=e819]:
                    - button "menu" [ref=e822] [cursor=pointer]:
                      - img "menu" [ref=e824]:
                        - img [ref=e825]
                - row "Select row 9 Colombia – SIRE / TRA Colombia – SIRE / TRA English Español Português Automatic No 29-10-2026 menu" [ref=e827]:
                  - cell "Select row 9" [ref=e828]:
                    - radio "Select row 9" [ref=e831] [cursor=pointer]
                  - cell "Colombia – SIRE / TRA" [ref=e832]:
                    - link "Colombia – SIRE / TRA" [ref=e836] [cursor=pointer]:
                      - /url: /app/apps/checkinFormTemplates/UriCiKEBTQeRW773vc6j
                      - generic [ref=e838]: Colombia – SIRE / TRA
                  - cell "Colombia – SIRE / TRA" [ref=e839]:
                    - generic [ref=e841]:
                      - img [ref=e842]
                      - text: Colombia – SIRE / TRA
                  - cell [ref=e844]
                  - cell "English Español Português" [ref=e845]:
                    - generic [ref=e847]:
                      - generic [ref=e849]: English
                      - generic [ref=e851]: Español
                      - generic [ref=e853]: Português
                  - cell "Automatic" [ref=e854]:
                    - generic [ref=e856]:
                      - img [ref=e857]
                      - text: Automatic
                  - cell "No" [ref=e859]:
                    - generic [ref=e861]: "No"
                  - cell "29-10-2026" [ref=e862]:
                    - generic [ref=e864]: 29-10-2026
                  - cell "menu" [ref=e865]:
                    - button "menu" [ref=e868] [cursor=pointer]:
                      - img "menu" [ref=e870]:
                        - img [ref=e871]
                - row "Select row 10 Bulgaria – ESTI Bulgaria – ESTI English Български Deutsch Français Automatic No 29-10-2026 menu" [ref=e873]:
                  - cell "Select row 10" [ref=e874]:
                    - radio "Select row 10" [ref=e877] [cursor=pointer]
                  - cell "Bulgaria – ESTI" [ref=e878]:
                    - link "Bulgaria – ESTI" [ref=e882] [cursor=pointer]:
                      - /url: /app/apps/checkinFormTemplates/UbiCiKEBTQeRW773vc6D
                      - generic [ref=e884]: Bulgaria – ESTI
                  - cell "Bulgaria – ESTI" [ref=e885]:
                    - generic [ref=e887]:
                      - img [ref=e888]
                      - text: Bulgaria – ESTI
                  - cell [ref=e890]
                  - cell "English Български Deutsch Français" [ref=e891]:
                    - generic [ref=e893]:
                      - generic [ref=e895]: English
                      - generic [ref=e897]: Български
                      - generic [ref=e899]: Deutsch
                      - generic [ref=e901]: Français
                  - cell "Automatic" [ref=e902]:
                    - generic [ref=e904]:
                      - img [ref=e905]
                      - text: Automatic
                  - cell "No" [ref=e907]:
                    - generic [ref=e909]: "No"
                  - cell "29-10-2026" [ref=e910]:
                    - generic [ref=e912]: 29-10-2026
                  - cell "menu" [ref=e913]:
                    - button "menu" [ref=e916] [cursor=pointer]:
                      - img "menu" [ref=e918]:
                        - img [ref=e919]
        - list [ref=e921]:
          - listitem [ref=e922]: "Total: 16"
          - listitem "Previous Page" [ref=e923]:
            - button "left" [disabled] [ref=e924]:
              - img "left" [ref=e925]:
                - img [ref=e926]
          - listitem "1" [ref=e928] [cursor=pointer]:
            - generic [ref=e929]: "1"
          - listitem "2" [ref=e930] [cursor=pointer]:
            - generic [ref=e931]: "2"
          - listitem "Next Page" [ref=e932] [cursor=pointer]:
            - button "right" [ref=e933]:
              - img "right" [ref=e934]:
                - img [ref=e935]
          - listitem [ref=e937]:
            - generic [ref=e938]:
              - generic "10 / page" [ref=e939]:
                - text: 10 / page
                - combobox "Page Size" [ref=e940]
              - img "down" [ref=e942]:
                - img [ref=e943]
```

# Test source

```ts
  18  |     page: string
  19  | }
  20  | 
  21  | /** Noise no page can avoid — never a finding. */
  22  | const IGNORE: RegExp[] = [
  23  |     /Download the React DevTools/i,
  24  |     /favicon\.ico/i,
  25  |     /ResizeObserver loop/i,
  26  |     /WebSocket .*(closed|failed)/i,
  27  |     /net::ERR_ABORTED/i,
  28  |     /\[antd: Message\]/i, // the app's own message hints
  29  |     // the browser's own line for a 4xx / 5xx answer or a failed request — the same event is recorded as `api.status`
  30  |     // / `request.failed` with its URL and status, and judged by the status rule, not as a console error
  31  |     /^Failed to load resource:/i,
  32  |     // the client logs antd's validation outcome of a refused save ({message: Required field, errorFields: …}) as a
  33  |     // console error; a spec submits an empty form on purpose to see the validation speak
  34  |     /^\{message: Required field/i
  35  | ];
  36  | 
  37  | const isNoise = (text: string): boolean => IGNORE.some(re => re.test(text));
  38  | 
  39  | export class ConsoleCollector {
  40  |     readonly records: ConsoleRecord[] = [];
  41  |     private readonly seen = new Set<string>();
  42  |     private readonly off: Array<() => void> = [];
  43  | 
  44  |     constructor(private readonly page: Page) {
  45  |         const listen = (event: string, handler: (...args: any[]) => void) => {
  46  |             (page as any).on(event, handler);
  47  |             this.off.push(() => (page as any).off(event, handler));
  48  |         };
  49  |         listen('console', (message: any) => {
  50  |             const type = message.type();
  51  |             if (type !== 'error' && type !== 'warning') return;
  52  |             const text = message.text();
  53  |             if (isNoise(text)) return;
  54  |             this.add({kind: type === 'error' ? 'console.error' : 'console.warning', text: text.slice(0, 1500), url: message.location()?.url});
  55  |         });
  56  |         listen('pageerror', (error: any) => {
  57  |             this.add({kind: 'pageerror', text: `${error.message}\n${(error.stack || '').slice(0, 1500)}`});
  58  |         });
  59  |         listen('requestfailed', (req: any) => {
  60  |             const text = req.failure()?.errorText || 'failed';
  61  |             if (isNoise(text)) return;
  62  |             this.add({kind: 'request.failed', text, url: req.url()});
  63  |         });
  64  |         listen('response', async (res: any) => {
  65  |             const url = res.url();
  66  |             if (!url.includes('/api/')) return;
  67  |             const status = res.status();
  68  |             if (status >= 400) {
  69  |                 this.add({kind: 'api.status', text: `${res.request().method()} ${status}`, url, status});
  70  |                 return;
  71  |             }
  72  |             // a Hydra API answer is JSON; {success: false} with a 200 is a refusal the UI may have swallowed
  73  |             const type = res.headers()['content-type'] || '';
  74  |             if (!type.includes('json')) return;
  75  |             try {
  76  |                 const body = await res.json();
  77  |                 if (body && typeof body === 'object' && body.success === false)
  78  |                     this.add({kind: 'api.failure', text: `${res.request().method()} success:false ${body.message || ''}`.trim(), url, status});
  79  |             } catch { /* not JSON after all, or the body is gone */ }
  80  |         });
  81  |     }
  82  | 
  83  |     /** Stops listening — a shared page (the sweeps) gets a new collector per test and must not keep the old ones. */
  84  |     dispose(): void {
  85  |         while (this.off.length) this.off.pop()!();
  86  |     }
  87  | 
  88  |     private add(record: Omit<ConsoleRecord, 'at' | 'page'>): void {
  89  |         const key = `${record.kind}|${record.text.slice(0, 200)}|${record.url || ''}`;
  90  |         if (this.seen.has(key)) return;
  91  |         this.seen.add(key);
  92  |         this.records.push({...record, at: new Date().toISOString(), page: this.page.url()});
  93  |     }
  94  | 
  95  |     /** What fails a journey: uncaught exceptions, console errors, every API answer of 4xx / 5xx or `success: false`, a
  96  |      *  failed request. A page that asks the server for something it refuses or does not have is a defect to REPORT —
  97  |      *  the suite never explains it away. Warnings fail only with QA_FAIL_ON_WARNINGS=1. */
  98  |     blocking(): ConsoleRecord[] {
  99  |         return this.records.filter(r =>
  100 |             r.kind === 'pageerror'
  101 |             || r.kind === 'console.error'
  102 |             || r.kind === 'api.status'
  103 |             || r.kind === 'api.failure'
  104 |             || r.kind === 'request.failed'
  105 |             || (CONFIG.failOnWarnings && r.kind === 'console.warning'));
  106 |     }
  107 | 
  108 |     async attach(testInfo: TestInfo): Promise<void> {
  109 |         await testInfo.attach('console.json', {body: JSON.stringify(this.records, null, 2), contentType: 'application/json'});
  110 |     }
  111 | }
  112 | 
  113 | /** Fails the journey on what the browser reported; the full list is already attached. */
  114 | export const assertClean = (collector: ConsoleCollector): void => {
  115 |     const blocking = collector.blocking();
  116 |     if (!blocking.length) return;
  117 |     const lines = blocking.slice(0, 10).map(r => `- [${r.kind}] ${r.text.split('\n')[0].slice(0, 200)}${r.url ? ` @ ${r.url}` : ''}`);
> 118 |     throw new Error(`The page reported ${blocking.length} error(s) — API answers, failed requests, console errors:\n${lines.join('\n')}`);
      |           ^ Error: The page reported 1 error(s) — API answers, failed requests, console errors:
  119 | };
  120 | 
```