# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 005-platform-pages.spec.ts >> 005 platform pages >> apps › bookingApiClients opens (/app/apps/bookingApiClients)
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
          - link "Booking API" [active] [ref=e64] [cursor=pointer]:
            - /url: /app/apps/bookingApiClients
            - generic [ref=e65]: Booking API
          - link "Owner portal roles" [ref=e66] [cursor=pointer]:
            - /url: /app/apps/ownerPortalRoles
            - generic [ref=e67]: Owner portal roles
          - link "Online check-in" [ref=e68] [cursor=pointer]:
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
      - img "api" [ref=e100]:
        - img [ref=e101]
      - generic [ref=e103]:
        - navigation [ref=e104]:
          - list [ref=e105]:
            - listitem [ref=e106]:
              - link "Apps" [ref=e108] [cursor=pointer]:
                - /url: /app/apps
            - listitem [ref=e109]: /
            - listitem [ref=e110]:
              - link "Booking API" [ref=e112] [cursor=pointer]:
                - /url: /app/apps/bookingApiClients
        - generic [ref=e113]: Websites that take direct bookings through the booking API
      - button "search Search everything… ⌘K" [ref=e114] [cursor=pointer]:
        - img "search" [ref=e115]:
          - img [ref=e116]
        - generic [ref=e118]: Search everything…
        - generic [ref=e119]: ⌘K
      - button "Audit log" [ref=e120] [cursor=pointer]:
        - img "audit" [ref=e121]:
          - img [ref=e122]
      - button "Dark theme" [ref=e124] [cursor=pointer]:
        - img "moon" [ref=e126]:
          - img [ref=e127]
      - generic [ref=e129] [cursor=pointer]:
        - img "user" [ref=e132]:
          - img [ref=e133]
        - generic [ref=e136]: admin
    - generic [ref=e139]:
      - generic [ref=e140]:
        - tablist [ref=e141]:
          - generic [ref=e143]:
            - generic [ref=e144] [cursor=pointer]:
              - tab "Default" [selected] [ref=e145]:
                - generic [ref=e146]: Default
              - button "remove" [ref=e147]
            - generic [ref=e148] [cursor=pointer]:
              - tab "Active" [ref=e149]:
                - generic [ref=e150]: Active
              - button "remove" [ref=e151]
            - generic [ref=e152] [cursor=pointer]:
              - tab "Draft" [ref=e153]:
                - generic [ref=e154]: Draft
              - button "remove" [ref=e155]
            - generic [ref=e156] [cursor=pointer]:
              - tab "Suspended" [ref=e157]:
                - generic [ref=e158]: Suspended
              - button "remove" [ref=e159]
        - generic:
          - generic:
            - tabpanel "Default"
      - button "Add card 0 / 5" [ref=e161] [cursor=pointer]:
        - generic [ref=e162]: Add card
        - generic [ref=e163]: 0 / 5
      - generic [ref=e166]:
        - generic [ref=e167]:
          - generic [ref=e169]:
            - generic [ref=e170]:
              - img "search" [ref=e171]:
                - img [ref=e172]
              - textbox "Search" [ref=e174]
            - button "plus-circle Create a new booking site" [ref=e175] [cursor=pointer]:
              - img "plus-circle" [ref=e177]:
                - img [ref=e178]
              - generic [ref=e181]: Create a new booking site
            - button "export Export down" [ref=e182] [cursor=pointer]:
              - generic [ref=e183]:
                - img "export" [ref=e185]:
                  - img [ref=e186]
                - generic [ref=e188]: Export
                - img "down" [ref=e190]:
                  - img [ref=e191]
            - button "layout Customize view" [ref=e193] [cursor=pointer]:
              - img "layout" [ref=e195]:
                - img [ref=e196]
              - generic [ref=e198]: Customize view
          - generic [ref=e199]:
            - table [ref=e201]:
              - rowgroup [ref=e220]:
                - row "Favicon Logo Name Site type Brand Status Listings mode Listings filter Multi-Unit mode Long Term mode Reservation mode Payment Last call Date created" [ref=e221]:
                  - columnheader [ref=e222]
                  - columnheader "Favicon" [ref=e223]: Favicon
                  - columnheader "Logo" [ref=e225]: Logo
                  - columnheader "Name" [ref=e227] [cursor=pointer]:
                    - generic [ref=e228]:
                      - generic [ref=e230]:
                        - generic [ref=e231]: Name
                        - generic [ref=e233]:
                          - img [ref=e234]:
                            - img [ref=e235]
                          - img [ref=e237]:
                            - img [ref=e238]
                      - button "search" [ref=e240]:
                        - button "search" [ref=e241]:
                          - img "search" [ref=e243]:
                            - img [ref=e244]
                  - columnheader "Site type" [ref=e247] [cursor=pointer]:
                    - generic [ref=e248]:
                      - generic [ref=e250]:
                        - generic [ref=e251]: Site type
                        - generic [ref=e253]:
                          - img [ref=e254]:
                            - img [ref=e255]
                          - img [ref=e257]:
                            - img [ref=e258]
                      - button "filter" [ref=e260]:
                        - button "filter" [ref=e261]:
                          - img "filter" [ref=e263]:
                            - img [ref=e264]
                  - columnheader "Brand" [ref=e267] [cursor=pointer]:
                    - generic [ref=e268]:
                      - generic [ref=e270]:
                        - generic [ref=e271]: Brand
                        - generic [ref=e273]:
                          - img [ref=e274]:
                            - img [ref=e275]
                          - img [ref=e277]:
                            - img [ref=e278]
                      - button "filter" [ref=e280]:
                        - button "filter" [ref=e281]:
                          - img "filter" [ref=e283]:
                            - img [ref=e284]
                  - columnheader "Status" [ref=e287] [cursor=pointer]:
                    - generic [ref=e288]:
                      - generic [ref=e290]:
                        - generic [ref=e291]: Status
                        - generic [ref=e293]:
                          - img [ref=e294]:
                            - img [ref=e295]
                          - img [ref=e297]:
                            - img [ref=e298]
                      - button "filter" [ref=e300]:
                        - button "filter" [ref=e301]:
                          - img "filter" [ref=e303]:
                            - img [ref=e304]
                  - columnheader "Listings mode" [ref=e307] [cursor=pointer]:
                    - generic [ref=e308]:
                      - generic [ref=e310]:
                        - generic [ref=e311]: Listings mode
                        - generic [ref=e313]:
                          - img [ref=e314]:
                            - img [ref=e315]
                          - img [ref=e317]:
                            - img [ref=e318]
                      - button "filter" [ref=e320]:
                        - button "filter" [ref=e321]:
                          - img "filter" [ref=e323]:
                            - img [ref=e324]
                  - columnheader "Listings filter" [ref=e327]:
                    - generic [ref=e328]:
                      - generic [ref=e329]: Listings
                      - button "filter" [ref=e330] [cursor=pointer]:
                        - button "filter" [ref=e331]:
                          - img "filter" [ref=e333]:
                            - img [ref=e334]
                  - columnheader "Multi-Unit mode" [ref=e337] [cursor=pointer]:
                    - generic [ref=e338]:
                      - generic [ref=e340]:
                        - generic [ref=e341]: Multi-Unit mode
                        - generic [ref=e343]:
                          - img [ref=e344]:
                            - img [ref=e345]
                          - img [ref=e347]:
                            - img [ref=e348]
                      - button "filter" [ref=e350]:
                        - button "filter" [ref=e351]:
                          - img "filter" [ref=e353]:
                            - img [ref=e354]
                  - columnheader "Long Term mode" [ref=e357] [cursor=pointer]:
                    - generic [ref=e358]:
                      - generic [ref=e360]:
                        - generic [ref=e361]: Long Term mode
                        - generic [ref=e363]:
                          - img [ref=e364]:
                            - img [ref=e365]
                          - img [ref=e367]:
                            - img [ref=e368]
                      - button "filter" [ref=e370]:
                        - button "filter" [ref=e371]:
                          - img "filter" [ref=e373]:
                            - img [ref=e374]
                  - columnheader "Reservation mode" [ref=e377] [cursor=pointer]:
                    - generic [ref=e378]:
                      - generic [ref=e380]:
                        - generic [ref=e381]: Reservation mode
                        - generic [ref=e383]:
                          - img [ref=e384]:
                            - img [ref=e385]
                          - img [ref=e387]:
                            - img [ref=e388]
                      - button "filter" [ref=e390]:
                        - button "filter" [ref=e391]:
                          - img "filter" [ref=e393]:
                            - img [ref=e394]
                  - columnheader "Payment" [ref=e397] [cursor=pointer]:
                    - generic [ref=e398]:
                      - generic [ref=e400]:
                        - generic [ref=e401]: Payment
                        - generic [ref=e403]:
                          - img [ref=e404]:
                            - img [ref=e405]
                          - img [ref=e407]:
                            - img [ref=e408]
                      - button "filter" [ref=e410]:
                        - button "filter" [ref=e411]:
                          - img "filter" [ref=e413]:
                            - img [ref=e414]
                  - columnheader "Last call" [ref=e417] [cursor=pointer]:
                    - generic [ref=e418]:
                      - generic [ref=e420]:
                        - generic [ref=e421]: Last call
                        - generic [ref=e423]:
                          - img [ref=e424]:
                            - img [ref=e425]
                          - img [ref=e427]:
                            - img [ref=e428]
                      - button "filter" [ref=e430]:
                        - button "filter" [ref=e431]:
                          - img "filter" [ref=e433]:
                            - img [ref=e434]
                  - columnheader "Date created" [ref=e437] [cursor=pointer]:
                    - generic [ref=e438]:
                      - generic [ref=e440]:
                        - generic [ref=e441]: Date created
                        - generic [ref=e443]:
                          - img [ref=e444]:
                            - img [ref=e445]
                          - img [ref=e447]:
                            - img [ref=e448]
                      - button "filter" [ref=e450]:
                        - button "filter" [ref=e451]:
                          - img "filter" [ref=e453]:
                            - img [ref=e454]
                  - columnheader [ref=e457]
                  - columnheader [ref=e459]
            - table [ref=e461]:
              - rowgroup [ref=e479]:
                - generic [ref=e480]:
                  - generic [ref=e482]:
                    - generic [ref=e483]: Name
                    - generic [ref=e485]:
                      - img [ref=e486]:
                        - img [ref=e487]
                      - img [ref=e489]:
                        - img [ref=e490]
                  - button [ref=e492] [cursor=pointer]:
                    - button [ref=e493]:
                      - img [ref=e495]:
                        - img [ref=e496]
                - generic [ref=e498]:
                  - generic [ref=e500]:
                    - generic [ref=e501]: Site type
                    - generic [ref=e503]:
                      - img [ref=e504]:
                        - img [ref=e505]
                      - img [ref=e507]:
                        - img [ref=e508]
                  - button [ref=e510] [cursor=pointer]:
                    - button [ref=e511]:
                      - img [ref=e513]:
                        - img [ref=e514]
                - generic [ref=e516]:
                  - generic [ref=e518]:
                    - generic [ref=e519]: Brand
                    - generic [ref=e521]:
                      - img [ref=e522]:
                        - img [ref=e523]
                      - img [ref=e525]:
                        - img [ref=e526]
                  - button [ref=e528] [cursor=pointer]:
                    - button [ref=e529]:
                      - img [ref=e531]:
                        - img [ref=e532]
                - generic [ref=e534]:
                  - generic [ref=e536]:
                    - generic [ref=e537]: Status
                    - generic [ref=e539]:
                      - img [ref=e540]:
                        - img [ref=e541]
                      - img [ref=e543]:
                        - img [ref=e544]
                  - button [ref=e546] [cursor=pointer]:
                    - button [ref=e547]:
                      - img [ref=e549]:
                        - img [ref=e550]
                - generic [ref=e552]:
                  - generic [ref=e554]:
                    - generic [ref=e555]: Listings mode
                    - generic [ref=e557]:
                      - img [ref=e558]:
                        - img [ref=e559]
                      - img [ref=e561]:
                        - img [ref=e562]
                  - button [ref=e564] [cursor=pointer]:
                    - button [ref=e565]:
                      - img [ref=e567]:
                        - img [ref=e568]
                - generic [ref=e570]:
                  - generic [ref=e571]: Listings
                  - button [ref=e572] [cursor=pointer]:
                    - button [ref=e573]:
                      - img [ref=e575]:
                        - img [ref=e576]
                - generic [ref=e578]:
                  - generic [ref=e580]:
                    - generic [ref=e581]: Multi-Unit mode
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
                  - generic [ref=e598]:
                    - generic [ref=e599]: Long Term mode
                    - generic [ref=e601]:
                      - img [ref=e602]:
                        - img [ref=e603]
                      - img [ref=e605]:
                        - img [ref=e606]
                  - button [ref=e608] [cursor=pointer]:
                    - button [ref=e609]:
                      - img [ref=e611]:
                        - img [ref=e612]
                - generic [ref=e614]:
                  - generic [ref=e616]:
                    - generic [ref=e617]: Reservation mode
                    - generic [ref=e619]:
                      - img [ref=e620]:
                        - img [ref=e621]
                      - img [ref=e623]:
                        - img [ref=e624]
                  - button [ref=e626] [cursor=pointer]:
                    - button [ref=e627]:
                      - img [ref=e629]:
                        - img [ref=e630]
                - generic [ref=e632]:
                  - generic [ref=e634]:
                    - generic [ref=e635]: Payment
                    - generic [ref=e637]:
                      - img [ref=e638]:
                        - img [ref=e639]
                      - img [ref=e641]:
                        - img [ref=e642]
                  - button [ref=e644] [cursor=pointer]:
                    - button [ref=e645]:
                      - img [ref=e647]:
                        - img [ref=e648]
                - generic [ref=e650]:
                  - generic [ref=e652]:
                    - generic [ref=e653]: Last call
                    - generic [ref=e655]:
                      - img [ref=e656]:
                        - img [ref=e657]
                      - img [ref=e659]:
                        - img [ref=e660]
                  - button [ref=e662] [cursor=pointer]:
                    - button [ref=e663]:
                      - img [ref=e665]:
                        - img [ref=e666]
                - generic [ref=e668]:
                  - generic [ref=e670]:
                    - generic [ref=e671]: Date created
                    - generic [ref=e673]:
                      - img [ref=e674]:
                        - img [ref=e675]
                      - img [ref=e677]:
                        - img [ref=e678]
                  - button [ref=e680] [cursor=pointer]:
                    - button [ref=e681]:
                      - img [ref=e683]:
                        - img [ref=e684]
                - row "Select row 1 www.sunnystays.test Sunny Stays Lisbon Active Entered by Sofia Almeida All Instant None 05-10-202611:56 02-11-202614:03 menu" [ref=e686]:
                  - cell "Select row 1" [ref=e687]:
                    - radio "Select row 1" [ref=e690] [cursor=pointer]
                  - cell [ref=e691]:
                    - img [ref=e694]
                  - cell [ref=e695]:
                    - img [ref=e698]
                  - cell "www.sunnystays.test" [ref=e699]:
                    - link "www.sunnystays.test" [ref=e703] [cursor=pointer]:
                      - /url: /app/apps/bookingApiClients/bookingApiClient-1-6932c00f-cb60-4599-80e7-ebd6758399a5
                      - generic [ref=e705]: www.sunnystays.test
                  - cell [ref=e706]
                  - cell "Sunny Stays Lisbon" [ref=e707]:
                    - generic [ref=e710]: Sunny Stays Lisbon
                  - cell "Active Entered by Sofia Almeida" [ref=e711]:
                    - generic [ref=e712]:
                      - generic [ref=e715]:
                        - img [ref=e716]
                        - text: Active
                      - button "Entered by Sofia Almeida":
                        - generic:
                          - generic: SA
                  - cell "All" [ref=e718]:
                    - generic [ref=e720]:
                      - img [ref=e721]
                      - text: All
                  - cell [ref=e723]
                  - cell [ref=e724]
                  - cell [ref=e725]
                  - cell "Instant" [ref=e726]:
                    - generic [ref=e728]:
                      - img [ref=e729]
                      - text: Instant
                  - cell "None" [ref=e731]:
                    - generic [ref=e733]:
                      - img [ref=e734]
                      - text: None
                  - cell "05-10-202611:56" [ref=e736]:
                    - generic [ref=e738]: 05-10-202611:56
                  - cell "02-11-202614:03" [ref=e739]:
                    - generic [ref=e741]: 02-11-202614:03
                  - cell "menu" [ref=e742]:
                    - button "menu" [ref=e745] [cursor=pointer]:
                      - img "menu" [ref=e747]:
                        - img [ref=e748]
                - row "Select row 2 www.sunnystays.test Sunny Stays Lisbon Active Entered by Sofia Almeida All Instant None 05-10-202611:56 29-10-202618:40 menu" [ref=e750]:
                  - cell "Select row 2" [ref=e751]:
                    - radio "Select row 2" [ref=e754] [cursor=pointer]
                  - cell [ref=e755]:
                    - img [ref=e758]
                  - cell [ref=e759]:
                    - img [ref=e762]
                  - cell "www.sunnystays.test" [ref=e763]:
                    - link "www.sunnystays.test" [ref=e767] [cursor=pointer]:
                      - /url: /app/apps/bookingApiClients/bookingApiClient-1-92e8a39a-ed61-4fc1-b57a-9b15c4d5d0df
                      - generic [ref=e769]: www.sunnystays.test
                  - cell [ref=e770]
                  - cell "Sunny Stays Lisbon" [ref=e771]:
                    - generic [ref=e774]: Sunny Stays Lisbon
                  - cell "Active Entered by Sofia Almeida" [ref=e775]:
                    - generic [ref=e776]:
                      - generic [ref=e779]:
                        - img [ref=e780]
                        - text: Active
                      - button "Entered by Sofia Almeida":
                        - generic:
                          - generic: SA
                  - cell "All" [ref=e782]:
                    - generic [ref=e784]:
                      - img [ref=e785]
                      - text: All
                  - cell [ref=e787]
                  - cell [ref=e788]
                  - cell [ref=e789]
                  - cell "Instant" [ref=e790]:
                    - generic [ref=e792]:
                      - img [ref=e793]
                      - text: Instant
                  - cell "None" [ref=e795]:
                    - generic [ref=e797]:
                      - img [ref=e798]
                      - text: None
                  - cell "05-10-202611:56" [ref=e800]:
                    - generic [ref=e802]: 05-10-202611:56
                  - cell "29-10-202618:40" [ref=e803]:
                    - generic [ref=e805]: 29-10-202618:40
                  - cell "menu" [ref=e806]:
                    - button "menu" [ref=e809] [cursor=pointer]:
                      - img "menu" [ref=e811]:
                        - img [ref=e812]
                - row "Select row 3 www.sunnystays.test Sunny Stays Lisbon Active Entered by Sofia Almeida All Instant None 05-10-202611:56 29-10-202615:41 menu" [ref=e814]:
                  - cell "Select row 3" [ref=e815]:
                    - radio "Select row 3" [ref=e818] [cursor=pointer]
                  - cell [ref=e819]:
                    - img [ref=e822]
                  - cell [ref=e823]:
                    - img [ref=e826]
                  - cell "www.sunnystays.test" [ref=e827]:
                    - link "www.sunnystays.test" [ref=e831] [cursor=pointer]:
                      - /url: /app/apps/bookingApiClients/bookingApiClient-1-fdf7397b-696a-4ffd-b1c7-86b33a8dbd52
                      - generic [ref=e833]: www.sunnystays.test
                  - cell [ref=e834]
                  - cell "Sunny Stays Lisbon" [ref=e835]:
                    - generic [ref=e838]: Sunny Stays Lisbon
                  - cell "Active Entered by Sofia Almeida" [ref=e839]:
                    - generic [ref=e840]:
                      - generic [ref=e843]:
                        - img [ref=e844]
                        - text: Active
                      - button "Entered by Sofia Almeida":
                        - generic:
                          - generic: SA
                  - cell "All" [ref=e846]:
                    - generic [ref=e848]:
                      - img [ref=e849]
                      - text: All
                  - cell [ref=e851]
                  - cell [ref=e852]
                  - cell [ref=e853]
                  - cell "Instant" [ref=e854]:
                    - generic [ref=e856]:
                      - img [ref=e857]
                      - text: Instant
                  - cell "None" [ref=e859]:
                    - generic [ref=e861]:
                      - img [ref=e862]
                      - text: None
                  - cell "05-10-202611:56" [ref=e864]:
                    - generic [ref=e866]: 05-10-202611:56
                  - cell "29-10-202615:41" [ref=e867]:
                    - generic [ref=e869]: 29-10-202615:41
                  - cell "menu" [ref=e870]:
                    - button "menu" [ref=e873] [cursor=pointer]:
                      - img "menu" [ref=e875]:
                        - img [ref=e876]
        - list [ref=e878]:
          - listitem [ref=e879]: "Total: 3"
          - listitem "Previous Page" [ref=e880]:
            - button "left" [disabled] [ref=e881]:
              - img "left" [ref=e882]:
                - img [ref=e883]
          - listitem "1" [ref=e885] [cursor=pointer]:
            - generic [ref=e886]: "1"
          - listitem "Next Page" [ref=e887]:
            - button "right" [disabled] [ref=e888]:
              - img "right" [ref=e889]:
                - img [ref=e890]
          - listitem [ref=e892]:
            - generic [ref=e893]:
              - generic "10 / page" [ref=e894]:
                - text: 10 / page
                - combobox "Page Size" [ref=e895]
              - img "down" [ref=e897]:
                - img [ref=e898]
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