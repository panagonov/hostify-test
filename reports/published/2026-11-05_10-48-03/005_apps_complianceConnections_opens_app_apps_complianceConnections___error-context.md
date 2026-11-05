# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 005-platform-pages.spec.ts >> 005 platform pages >> apps › complianceConnections opens (/app/apps/complianceConnections)
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
          - link "Online check-in" [ref=e68] [cursor=pointer]:
            - /url: /app/apps/checkinFormTemplates
            - generic [ref=e69]: Online check-in
          - link "Compliance connections" [active] [ref=e70] [cursor=pointer]:
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
      - img "safety-certificate" [ref=e100]:
        - img [ref=e101]
      - generic [ref=e103]:
        - navigation [ref=e104]:
          - list [ref=e105]:
            - listitem [ref=e106]:
              - link "Apps" [ref=e108] [cursor=pointer]:
                - /url: /app/apps
            - listitem [ref=e109]: /
            - listitem [ref=e110]:
              - link "Compliance connections" [ref=e112] [cursor=pointer]:
                - /url: /app/apps/complianceConnections
        - generic [ref=e113]: Connections to police and tourism guest registers
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
              - tab "AIMA / SIBA (PT)" [ref=e149]:
                - generic [ref=e150]: AIMA / SIBA (PT)
              - button "remove" [ref=e151]
            - generic [ref=e152] [cursor=pointer]:
              - tab "ESTI (BG)" [ref=e153]:
                - generic [ref=e154]: ESTI (BG)
              - button "remove" [ref=e155]
            - generic [ref=e156] [cursor=pointer]:
              - tab "SES.Hospedajes (ES)" [ref=e157]:
                - generic [ref=e158]: SES.Hospedajes (ES)
              - button "remove" [ref=e159]
            - generic [ref=e160] [cursor=pointer]:
              - tab "SIRE (CO)" [ref=e161]:
                - generic [ref=e162]: SIRE (CO)
              - button "remove" [ref=e163]
            - generic [ref=e164] [cursor=pointer]:
              - tab "TRA (CO)" [ref=e165]:
                - generic [ref=e166]: TRA (CO)
              - button "remove" [ref=e167]
        - generic:
          - generic:
            - tabpanel "Default"
      - button "Add card 0 / 5" [ref=e169] [cursor=pointer]:
        - generic [ref=e170]: Add card
        - generic [ref=e171]: 0 / 5
      - generic [ref=e174]:
        - generic [ref=e175]:
          - generic [ref=e177]:
            - generic [ref=e178]:
              - img "search" [ref=e179]:
                - img [ref=e180]
              - textbox "Search" [ref=e182]
            - button "plus-circle Create a new compliance connection" [ref=e183] [cursor=pointer]:
              - img "plus-circle" [ref=e185]:
                - img [ref=e186]
              - generic [ref=e189]: Create a new compliance connection
            - button "export Export down" [ref=e190] [cursor=pointer]:
              - generic [ref=e191]:
                - img "export" [ref=e193]:
                  - img [ref=e194]
                - generic [ref=e196]: Export
                - img "down" [ref=e198]:
                  - img [ref=e199]
            - button "layout Customize view" [ref=e201] [cursor=pointer]:
              - img "layout" [ref=e203]:
                - img [ref=e204]
              - generic [ref=e206]: Customize view
          - generic [ref=e207]:
            - table [ref=e209]:
              - rowgroup [ref=e222]:
                - row "Integration name Authority Country Mode Status Listings Active Last validated" [ref=e223]:
                  - columnheader [ref=e224]
                  - columnheader "Integration name" [ref=e225] [cursor=pointer]:
                    - generic [ref=e226]:
                      - generic [ref=e228]:
                        - generic [ref=e229]: Integration name
                        - generic [ref=e231]:
                          - img [ref=e232]:
                            - img [ref=e233]
                          - img [ref=e235]:
                            - img [ref=e236]
                      - button "search" [ref=e238]:
                        - button "search" [ref=e239]:
                          - img "search" [ref=e241]:
                            - img [ref=e242]
                  - columnheader "Authority" [ref=e245] [cursor=pointer]:
                    - generic [ref=e246]:
                      - generic [ref=e248]:
                        - generic [ref=e249]: Authority
                        - generic [ref=e251]:
                          - img [ref=e252]:
                            - img [ref=e253]
                          - img [ref=e255]:
                            - img [ref=e256]
                      - button "filter" [ref=e258]:
                        - button "filter" [ref=e259]:
                          - img "filter" [ref=e261]:
                            - img [ref=e262]
                  - columnheader "Country" [ref=e265] [cursor=pointer]:
                    - generic [ref=e266]:
                      - generic [ref=e268]:
                        - generic [ref=e269]: Country
                        - generic [ref=e271]:
                          - img [ref=e272]:
                            - img [ref=e273]
                          - img [ref=e275]:
                            - img [ref=e276]
                      - button "filter" [ref=e278]:
                        - button "filter" [ref=e279]:
                          - img "filter" [ref=e281]:
                            - img [ref=e282]
                  - columnheader "Mode" [ref=e285] [cursor=pointer]:
                    - generic [ref=e286]:
                      - generic [ref=e288]:
                        - generic [ref=e289]: Mode
                        - generic [ref=e291]:
                          - img [ref=e292]:
                            - img [ref=e293]
                          - img [ref=e295]:
                            - img [ref=e296]
                      - button "filter" [ref=e298]:
                        - button "filter" [ref=e299]:
                          - img "filter" [ref=e301]:
                            - img [ref=e302]
                  - columnheader "Status" [ref=e305] [cursor=pointer]:
                    - generic [ref=e306]:
                      - generic [ref=e308]:
                        - generic [ref=e309]: Status
                        - generic [ref=e311]:
                          - img [ref=e312]:
                            - img [ref=e313]
                          - img [ref=e315]:
                            - img [ref=e316]
                      - button "filter" [ref=e318]:
                        - button "filter" [ref=e319]:
                          - img "filter" [ref=e321]:
                            - img [ref=e322]
                  - columnheader "Listings" [ref=e325] [cursor=pointer]:
                    - generic [ref=e326]:
                      - generic [ref=e328]:
                        - generic [ref=e329]: Listings
                        - generic [ref=e331]:
                          - img [ref=e332]:
                            - img [ref=e333]
                          - img [ref=e335]:
                            - img [ref=e336]
                      - button "filter" [ref=e338]:
                        - button "filter" [ref=e339]:
                          - img "filter" [ref=e341]:
                            - img [ref=e342]
                  - columnheader "Active" [ref=e345] [cursor=pointer]:
                    - generic [ref=e346]:
                      - generic [ref=e348]:
                        - generic [ref=e349]: Active
                        - generic [ref=e351]:
                          - img [ref=e352]:
                            - img [ref=e353]
                          - img [ref=e355]:
                            - img [ref=e356]
                      - button "filter" [ref=e358]:
                        - button "filter" [ref=e359]:
                          - img "filter" [ref=e361]:
                            - img [ref=e362]
                  - columnheader "Last validated" [ref=e365] [cursor=pointer]:
                    - generic [ref=e366]:
                      - generic [ref=e368]:
                        - generic [ref=e369]: Last validated
                        - generic [ref=e371]:
                          - img [ref=e372]:
                            - img [ref=e373]
                          - img [ref=e375]:
                            - img [ref=e376]
                      - button "filter" [ref=e378]:
                        - button "filter" [ref=e379]:
                          - img "filter" [ref=e381]:
                            - img [ref=e382]
                  - columnheader [ref=e385]
                  - columnheader [ref=e387]
            - table [ref=e389]:
              - rowgroup [ref=e401]:
                - generic [ref=e402]:
                  - generic [ref=e404]:
                    - generic [ref=e405]: Integration name
                    - generic [ref=e407]:
                      - img [ref=e408]:
                        - img [ref=e409]
                      - img [ref=e411]:
                        - img [ref=e412]
                  - button [ref=e414] [cursor=pointer]:
                    - button [ref=e415]:
                      - img [ref=e417]:
                        - img [ref=e418]
                - generic [ref=e420]:
                  - generic [ref=e422]:
                    - generic [ref=e423]: Authority
                    - generic [ref=e425]:
                      - img [ref=e426]:
                        - img [ref=e427]
                      - img [ref=e429]:
                        - img [ref=e430]
                  - button [ref=e432] [cursor=pointer]:
                    - button [ref=e433]:
                      - img [ref=e435]:
                        - img [ref=e436]
                - generic [ref=e438]:
                  - generic [ref=e440]:
                    - generic [ref=e441]: Country
                    - generic [ref=e443]:
                      - img [ref=e444]:
                        - img [ref=e445]
                      - img [ref=e447]:
                        - img [ref=e448]
                  - button [ref=e450] [cursor=pointer]:
                    - button [ref=e451]:
                      - img [ref=e453]:
                        - img [ref=e454]
                - generic [ref=e456]:
                  - generic [ref=e458]:
                    - generic [ref=e459]: Mode
                    - generic [ref=e461]:
                      - img [ref=e462]:
                        - img [ref=e463]
                      - img [ref=e465]:
                        - img [ref=e466]
                  - button [ref=e468] [cursor=pointer]:
                    - button [ref=e469]:
                      - img [ref=e471]:
                        - img [ref=e472]
                - generic [ref=e474]:
                  - generic [ref=e476]:
                    - generic [ref=e477]: Status
                    - generic [ref=e479]:
                      - img [ref=e480]:
                        - img [ref=e481]
                      - img [ref=e483]:
                        - img [ref=e484]
                  - button [ref=e486] [cursor=pointer]:
                    - button [ref=e487]:
                      - img [ref=e489]:
                        - img [ref=e490]
                - generic [ref=e492]:
                  - generic [ref=e494]:
                    - generic [ref=e495]: Listings
                    - generic [ref=e497]:
                      - img [ref=e498]:
                        - img [ref=e499]
                      - img [ref=e501]:
                        - img [ref=e502]
                  - button [ref=e504] [cursor=pointer]:
                    - button [ref=e505]:
                      - img [ref=e507]:
                        - img [ref=e508]
                - generic [ref=e510]:
                  - generic [ref=e512]:
                    - generic [ref=e513]: Active
                    - generic [ref=e515]:
                      - img [ref=e516]:
                        - img [ref=e517]
                      - img [ref=e519]:
                        - img [ref=e520]
                  - button [ref=e522] [cursor=pointer]:
                    - button [ref=e523]:
                      - img [ref=e525]:
                        - img [ref=e526]
                - generic [ref=e528]:
                  - generic [ref=e530]:
                    - generic [ref=e531]: Last validated
                    - generic [ref=e533]:
                      - img [ref=e534]:
                        - img [ref=e535]
                      - img [ref=e537]:
                        - img [ref=e538]
                  - button [ref=e540] [cursor=pointer]:
                    - button [ref=e541]:
                      - img [ref=e543]:
                        - img [ref=e544]
                - row "Select row 1 SES.Hospedajes · Baiona (Pontevedra) SES.Hospedajes (ES) Spain Web service Active 3 Yes 05-10-2026 menu" [ref=e546]:
                  - cell "Select row 1" [ref=e547]:
                    - radio "Select row 1" [ref=e550] [cursor=pointer]
                  - cell "SES.Hospedajes · Baiona (Pontevedra)" [ref=e551]:
                    - link "SES.Hospedajes · Baiona (Pontevedra)" [ref=e555] [cursor=pointer]:
                      - /url: /app/apps/complianceConnections/complianceConnection-1-6932c00f-cb60-4599-80e7-ebd6758399a5
                      - generic [ref=e557]: SES.Hospedajes · Baiona (Pontevedra)
                  - cell "SES.Hospedajes (ES)" [ref=e558]:
                    - generic [ref=e560]:
                      - img [ref=e561]
                      - text: SES.Hospedajes (ES)
                  - cell "Spain" [ref=e563]:
                    - generic [ref=e566]: Spain
                  - cell "Web service" [ref=e567]:
                    - generic [ref=e569]:
                      - img [ref=e570]
                      - text: Web service
                  - cell "Active" [ref=e572]:
                    - generic [ref=e574]:
                      - img [ref=e575]
                      - text: Active
                  - cell "3" [ref=e577]:
                    - generic [ref=e578]: "3"
                  - cell "Yes" [ref=e579]:
                    - generic [ref=e581]: "Yes"
                  - cell "05-10-2026" [ref=e582]:
                    - generic [ref=e584]: 05-10-2026
                  - cell "menu" [ref=e585]:
                    - button "menu" [ref=e588] [cursor=pointer]:
                      - img "menu" [ref=e590]:
                        - img [ref=e591]
                - row "Select row 2 AIMA / SIBA · Sunny Stays Lisbon AIMA / SIBA (PT) Portugal Web service Active 12 Yes 05-10-2026 menu" [ref=e593]:
                  - cell "Select row 2" [ref=e594]:
                    - radio "Select row 2" [ref=e597] [cursor=pointer]
                  - cell "AIMA / SIBA · Sunny Stays Lisbon" [ref=e598]:
                    - link "AIMA / SIBA · Sunny Stays Lisbon" [ref=e602] [cursor=pointer]:
                      - /url: /app/apps/complianceConnections/complianceConnection-2-6932c00f-cb60-4599-80e7-ebd6758399a5
                      - generic [ref=e604]: AIMA / SIBA · Sunny Stays Lisbon
                  - cell "AIMA / SIBA (PT)" [ref=e605]:
                    - generic [ref=e607]:
                      - img [ref=e608]
                      - text: AIMA / SIBA (PT)
                  - cell "Portugal" [ref=e610]:
                    - generic [ref=e613]: Portugal
                  - cell "Web service" [ref=e614]:
                    - generic [ref=e616]:
                      - img [ref=e617]
                      - text: Web service
                  - cell "Active" [ref=e619]:
                    - generic [ref=e621]:
                      - img [ref=e622]
                      - text: Active
                  - cell "12" [ref=e624]:
                    - generic [ref=e625]: "12"
                  - cell "Yes" [ref=e626]:
                    - generic [ref=e628]: "Yes"
                  - cell "05-10-2026" [ref=e629]:
                    - generic [ref=e631]: 05-10-2026
                  - cell "menu" [ref=e632]:
                    - button "menu" [ref=e635] [cursor=pointer]:
                      - img "menu" [ref=e637]:
                        - img [ref=e638]
                - row "Select row 3 SES.Hospedajes · Baiona (Pontevedra) SES.Hospedajes (ES) Spain Web service Active 3 Yes 05-10-2026 menu" [ref=e640]:
                  - cell "Select row 3" [ref=e641]:
                    - radio "Select row 3" [ref=e644] [cursor=pointer]
                  - cell "SES.Hospedajes · Baiona (Pontevedra)" [ref=e645]:
                    - link "SES.Hospedajes · Baiona (Pontevedra)" [ref=e649] [cursor=pointer]:
                      - /url: /app/apps/complianceConnections/complianceConnection-1-92e8a39a-ed61-4fc1-b57a-9b15c4d5d0df
                      - generic [ref=e651]: SES.Hospedajes · Baiona (Pontevedra)
                  - cell "SES.Hospedajes (ES)" [ref=e652]:
                    - generic [ref=e654]:
                      - img [ref=e655]
                      - text: SES.Hospedajes (ES)
                  - cell "Spain" [ref=e657]:
                    - generic [ref=e660]: Spain
                  - cell "Web service" [ref=e661]:
                    - generic [ref=e663]:
                      - img [ref=e664]
                      - text: Web service
                  - cell "Active" [ref=e666]:
                    - generic [ref=e668]:
                      - img [ref=e669]
                      - text: Active
                  - cell "3" [ref=e671]:
                    - generic [ref=e672]: "3"
                  - cell "Yes" [ref=e673]:
                    - generic [ref=e675]: "Yes"
                  - cell "05-10-2026" [ref=e676]:
                    - generic [ref=e678]: 05-10-2026
                  - cell "menu" [ref=e679]:
                    - button "menu" [ref=e682] [cursor=pointer]:
                      - img "menu" [ref=e684]:
                        - img [ref=e685]
                - row "Select row 4 AIMA / SIBA · Sunny Stays Lisbon AIMA / SIBA (PT) Portugal Web service Active 12 Yes 05-10-2026 menu" [ref=e687]:
                  - cell "Select row 4" [ref=e688]:
                    - radio "Select row 4" [ref=e691] [cursor=pointer]
                  - cell "AIMA / SIBA · Sunny Stays Lisbon" [ref=e692]:
                    - link "AIMA / SIBA · Sunny Stays Lisbon" [ref=e696] [cursor=pointer]:
                      - /url: /app/apps/complianceConnections/complianceConnection-2-92e8a39a-ed61-4fc1-b57a-9b15c4d5d0df
                      - generic [ref=e698]: AIMA / SIBA · Sunny Stays Lisbon
                  - cell "AIMA / SIBA (PT)" [ref=e699]:
                    - generic [ref=e701]:
                      - img [ref=e702]
                      - text: AIMA / SIBA (PT)
                  - cell "Portugal" [ref=e704]:
                    - generic [ref=e707]: Portugal
                  - cell "Web service" [ref=e708]:
                    - generic [ref=e710]:
                      - img [ref=e711]
                      - text: Web service
                  - cell "Active" [ref=e713]:
                    - generic [ref=e715]:
                      - img [ref=e716]
                      - text: Active
                  - cell "12" [ref=e718]:
                    - generic [ref=e719]: "12"
                  - cell "Yes" [ref=e720]:
                    - generic [ref=e722]: "Yes"
                  - cell "05-10-2026" [ref=e723]:
                    - generic [ref=e725]: 05-10-2026
                  - cell "menu" [ref=e726]:
                    - button "menu" [ref=e729] [cursor=pointer]:
                      - img "menu" [ref=e731]:
                        - img [ref=e732]
                - row "Select row 5 SES.Hospedajes · Baiona (Pontevedra) SES.Hospedajes (ES) Spain Web service Active 3 Yes 05-10-2026 menu" [ref=e734]:
                  - cell "Select row 5" [ref=e735]:
                    - radio "Select row 5" [ref=e738] [cursor=pointer]
                  - cell "SES.Hospedajes · Baiona (Pontevedra)" [ref=e739]:
                    - link "SES.Hospedajes · Baiona (Pontevedra)" [ref=e743] [cursor=pointer]:
                      - /url: /app/apps/complianceConnections/complianceConnection-1-fdf7397b-696a-4ffd-b1c7-86b33a8dbd52
                      - generic [ref=e745]: SES.Hospedajes · Baiona (Pontevedra)
                  - cell "SES.Hospedajes (ES)" [ref=e746]:
                    - generic [ref=e748]:
                      - img [ref=e749]
                      - text: SES.Hospedajes (ES)
                  - cell "Spain" [ref=e751]:
                    - generic [ref=e754]: Spain
                  - cell "Web service" [ref=e755]:
                    - generic [ref=e757]:
                      - img [ref=e758]
                      - text: Web service
                  - cell "Active" [ref=e760]:
                    - generic [ref=e762]:
                      - img [ref=e763]
                      - text: Active
                  - cell "3" [ref=e765]:
                    - generic [ref=e766]: "3"
                  - cell "Yes" [ref=e767]:
                    - generic [ref=e769]: "Yes"
                  - cell "05-10-2026" [ref=e770]:
                    - generic [ref=e772]: 05-10-2026
                  - cell "menu" [ref=e773]:
                    - button "menu" [ref=e776] [cursor=pointer]:
                      - img "menu" [ref=e778]:
                        - img [ref=e779]
                - row "Select row 6 AIMA / SIBA · Sunny Stays Lisbon AIMA / SIBA (PT) Portugal Web service Active 12 Yes 05-10-2026 menu" [ref=e781]:
                  - cell "Select row 6" [ref=e782]:
                    - radio "Select row 6" [ref=e785] [cursor=pointer]
                  - cell "AIMA / SIBA · Sunny Stays Lisbon" [ref=e786]:
                    - link "AIMA / SIBA · Sunny Stays Lisbon" [ref=e790] [cursor=pointer]:
                      - /url: /app/apps/complianceConnections/complianceConnection-2-fdf7397b-696a-4ffd-b1c7-86b33a8dbd52
                      - generic [ref=e792]: AIMA / SIBA · Sunny Stays Lisbon
                  - cell "AIMA / SIBA (PT)" [ref=e793]:
                    - generic [ref=e795]:
                      - img [ref=e796]
                      - text: AIMA / SIBA (PT)
                  - cell "Portugal" [ref=e798]:
                    - generic [ref=e801]: Portugal
                  - cell "Web service" [ref=e802]:
                    - generic [ref=e804]:
                      - img [ref=e805]
                      - text: Web service
                  - cell "Active" [ref=e807]:
                    - generic [ref=e809]:
                      - img [ref=e810]
                      - text: Active
                  - cell "12" [ref=e812]:
                    - generic [ref=e813]: "12"
                  - cell "Yes" [ref=e814]:
                    - generic [ref=e816]: "Yes"
                  - cell "05-10-2026" [ref=e817]:
                    - generic [ref=e819]: 05-10-2026
                  - cell "menu" [ref=e820]:
                    - button "menu" [ref=e823] [cursor=pointer]:
                      - img "menu" [ref=e825]:
                        - img [ref=e826]
        - list [ref=e828]:
          - listitem [ref=e829]: "Total: 6"
          - listitem "Previous Page" [ref=e830]:
            - button "left" [disabled] [ref=e831]:
              - img "left" [ref=e832]:
                - img [ref=e833]
          - listitem "1" [ref=e835] [cursor=pointer]:
            - generic [ref=e836]: "1"
          - listitem "Next Page" [ref=e837]:
            - button "right" [disabled] [ref=e838]:
              - img "right" [ref=e839]:
                - img [ref=e840]
          - listitem [ref=e842]:
            - generic [ref=e843]:
              - generic "10 / page" [ref=e844]:
                - text: 10 / page
                - combobox "Page Size" [ref=e845]
              - img "down" [ref=e847]:
                - img [ref=e848]
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