# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 006-platform-admin-users.spec.ts >> 006 platform admin › users >> the Create user form opens, every tab is presentable, an empty Save is refused
- Location: tests/e2e/006-platform-admin-users.spec.ts:17:9

# Error details

```
Error: platform-user-form: the screen is not presentable (5):
- [error/field-parts] "Account": the parts of one field do not match — input 40px, button 34px @ [data-test=tenant] div.ant-space-compact.css-ry7cab
- [error/field-parts] "Role": the parts of one field do not match — input 40px, button 34px @ [data-test=role] div.ant-space-compact.css-ry7cab
- [error/field-parts] "Default account": the parts of one field do not match — input 40px, button 34px @ [data-test=defaultAccount] div.ant-space-compact.css-ry7cab
- [error/field-parts] "Owner": the parts of one field do not match — input 40px, button 34px @ [data-test=owner] div.ant-space-compact.css-ry7cab
- [error/field-height] "Password" is 56px tall — the form's fields are 40px @ [data-test=section-info] span.ant-input-affix-wrapper.ant-input-affix-wrapper-lg
```

# Page snapshot

```yaml
- generic [ref=e1]:
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
            - generic [ref=e50]: Platform Admin
            - button "left" [ref=e51]:
              - img "left" [ref=e53]:
                - img [ref=e54]
          - generic [ref=e57]:
            - link "Accounts" [ref=e58] [cursor=pointer]:
              - /url: /app/platformAdmin/tenants
              - generic [ref=e59]: Accounts
            - link "Users" [ref=e60] [cursor=pointer]:
              - /url: /app/platformAdmin/users
              - generic [ref=e61]: Users
            - link "User roles" [ref=e62] [cursor=pointer]:
              - /url: /app/platformAdmin/securityGroups
              - generic [ref=e63]: User roles
      - generic [ref=e64]:
        - generic [ref=e66] [cursor=pointer]:
          - generic [ref=e67]:
            - img [ref=e69]:
              - img [ref=e70]
            - superscript [ref=e72]:
              - generic [ref=e74]: "1"
          - generic [ref=e75]: Notifications
        - generic [ref=e76]:
          - button "Collapse menu" [expanded] [ref=e77] [cursor=pointer]:
            - img "double-left" [ref=e78]:
              - img [ref=e79]
          - button "v 1.0.5" [ref=e81] [cursor=pointer]
    - generic [ref=e82]:
      - banner [ref=e83]:
        - button "arrow-left" [ref=e84] [cursor=pointer]:
          - img "arrow-left" [ref=e86]:
            - img [ref=e87]
        - img "user" [ref=e90]:
          - img [ref=e91]
        - generic [ref=e93]:
          - navigation [ref=e94]:
            - list [ref=e95]:
              - listitem [ref=e96]:
                - link "Platform Admin" [ref=e98] [cursor=pointer]:
                  - /url: /app/platformAdmin
              - listitem [ref=e99]: /
              - listitem [ref=e100]:
                - link "Users" [ref=e102] [cursor=pointer]:
                  - /url: /app/platformAdmin/users
          - generic [ref=e103]: People who can sign in, with their roles and status
        - button "search Search everything… ⌘K" [ref=e104] [cursor=pointer]:
          - img "search" [ref=e105]:
            - img [ref=e106]
          - generic [ref=e108]: Search everything…
          - generic [ref=e109]: ⌘K
        - button "Audit log" [ref=e110] [cursor=pointer]:
          - img "audit" [ref=e111]:
            - img [ref=e112]
        - button "Dark theme" [ref=e114] [cursor=pointer]:
          - img "moon" [ref=e116]:
            - img [ref=e117]
        - generic [ref=e119] [cursor=pointer]:
          - img "user" [ref=e122]:
            - img [ref=e123]
          - generic [ref=e126]: admin
      - generic [ref=e129]:
        - generic [ref=e130]:
          - tablist [ref=e131]:
            - generic [ref=e133]:
              - generic [ref=e134] [cursor=pointer]:
                - tab "Default" [selected] [ref=e135]:
                  - generic [ref=e136]: Default
                - button "remove" [ref=e137]
              - generic [ref=e138] [cursor=pointer]:
                - tab "Active" [ref=e139]:
                  - generic [ref=e140]: Active
                - button "remove" [ref=e141]
              - generic [ref=e142] [cursor=pointer]:
                - tab "Deactivated" [ref=e143]:
                  - generic [ref=e144]: Deactivated
                - button "remove" [ref=e145]
              - generic [ref=e146] [cursor=pointer]:
                - tab "Invited" [ref=e147]:
                  - generic [ref=e148]: Invited
                - button "remove" [ref=e149]
          - generic:
            - generic:
              - tabpanel "Default"
        - generic [ref=e151]:
          - generic [ref=e152] [cursor=pointer]:
            - generic [ref=e153]: User
            - generic [ref=e154]: "11"
            - generic [ref=e155]: in this view
          - generic [ref=e156] [cursor=pointer]:
            - generic [ref=e157]:
              - text: By User status
              - generic [ref=e158]: SPLIT
            - generic [ref=e159]:
              - 'generic "Active: 9" [ref=e160]'
              - 'generic "Invited: 1" [ref=e161]'
            - generic [ref=e162]:
              - generic [ref=e163]:
                - text: Active
                - strong [ref=e165]: "9"
              - generic [ref=e166]:
                - text: Invited
                - strong [ref=e168]: "1"
          - generic [ref=e169] [cursor=pointer]:
            - generic [ref=e170]:
              - text: By Listing scope mode
              - generic [ref=e171]: SPLIT
            - 'generic "All: 10" [ref=e173]'
            - generic [ref=e175]:
              - text: All
              - strong [ref=e177]: "10"
        - generic [ref=e180]:
          - generic [ref=e181]:
            - generic [ref=e183]:
              - generic [ref=e184]:
                - img "search" [ref=e185]:
                  - img [ref=e186]
                - textbox "Search" [ref=e188]: qa.admin@hostify-qa.test
                - button "close Clear all" [ref=e189] [cursor=pointer]:
                  - img "close" [ref=e191]:
                    - img [ref=e192]
                  - generic [ref=e194]: Clear all
                - button "book Save as" [ref=e195] [cursor=pointer]:
                  - img "book" [ref=e197]:
                    - img [ref=e198]
                  - generic [ref=e200]: Save as
              - button "plus-circle Create a new user" [ref=e201] [cursor=pointer]:
                - img "plus-circle" [ref=e203]:
                  - img [ref=e204]
                - generic [ref=e207]: Create a new user
              - button "export Export down" [ref=e208] [cursor=pointer]:
                - generic [ref=e209]:
                  - img "export" [ref=e211]:
                    - img [ref=e212]
                  - generic [ref=e214]: Export
                  - img "down" [ref=e216]:
                    - img [ref=e217]
              - button "layout Customize view" [ref=e219] [cursor=pointer]:
                - img "layout" [ref=e221]:
                  - img [ref=e222]
                - generic [ref=e224]: Customize view
            - generic [ref=e225]:
              - table [ref=e227]:
                - rowgroup [ref=e241]:
                  - row "Name Email search Account Role filter Listing scope mode Last login at User status Phone search" [ref=e242]:
                    - columnheader [ref=e243]
                    - columnheader "Name" [ref=e244] [cursor=pointer]:
                      - generic [ref=e245]:
                        - generic [ref=e247]:
                          - generic [ref=e248]: Name
                          - generic [ref=e250]:
                            - img [ref=e251]:
                              - img [ref=e252]
                            - img [ref=e254]:
                              - img [ref=e255]
                        - button "search" [ref=e257]:
                          - button "search" [ref=e258]:
                            - img "search" [ref=e260]:
                              - img [ref=e261]
                    - columnheader "Email search" [ref=e264]:
                      - generic [ref=e265]:
                        - generic [ref=e266]: Email
                        - button "search" [ref=e267] [cursor=pointer]:
                          - button "search" [ref=e268]:
                            - img "search" [ref=e270]:
                              - img [ref=e271]
                    - columnheader "Account" [ref=e274] [cursor=pointer]:
                      - generic [ref=e275]:
                        - generic [ref=e277]:
                          - generic [ref=e278]: Account
                          - generic [ref=e280]:
                            - img [ref=e281]:
                              - img [ref=e282]
                            - img [ref=e284]:
                              - img [ref=e285]
                        - button "filter" [ref=e287]:
                          - button "filter" [ref=e288]:
                            - img "filter" [ref=e290]:
                              - img [ref=e291]
                    - columnheader "Role filter" [ref=e294]:
                      - generic [ref=e295]:
                        - generic [ref=e296]: Role
                        - button "filter" [ref=e297] [cursor=pointer]:
                          - button "filter" [ref=e298]:
                            - img "filter" [ref=e300]:
                              - img [ref=e301]
                    - columnheader "Listing scope mode" [ref=e304] [cursor=pointer]:
                      - generic [ref=e305]:
                        - generic [ref=e307]:
                          - generic [ref=e308]: Listing scope mode
                          - generic [ref=e310]:
                            - img [ref=e311]:
                              - img [ref=e312]
                            - img [ref=e314]:
                              - img [ref=e315]
                        - button "filter" [ref=e317]:
                          - button "filter" [ref=e318]:
                            - img "filter" [ref=e320]:
                              - img [ref=e321]
                    - columnheader "Last login at" [ref=e324] [cursor=pointer]:
                      - generic [ref=e325]:
                        - generic [ref=e327]:
                          - generic [ref=e328]: Last login at
                          - generic [ref=e330]:
                            - img [ref=e331]:
                              - img [ref=e332]
                            - img [ref=e334]:
                              - img [ref=e335]
                        - button "filter" [ref=e337]:
                          - button "filter" [ref=e338]:
                            - img "filter" [ref=e340]:
                              - img [ref=e341]
                    - columnheader "User status" [ref=e344] [cursor=pointer]:
                      - generic [ref=e345]:
                        - generic [ref=e347]:
                          - generic [ref=e348]: User status
                          - generic [ref=e350]:
                            - img [ref=e351]:
                              - img [ref=e352]
                            - img [ref=e354]:
                              - img [ref=e355]
                        - button "filter" [ref=e357]:
                          - button "filter" [ref=e358]:
                            - img "filter" [ref=e360]:
                              - img [ref=e361]
                    - columnheader "Phone search" [ref=e364]:
                      - generic [ref=e365]:
                        - generic [ref=e366]: Phone
                        - button "search" [ref=e367] [cursor=pointer]:
                          - button "search" [ref=e368]:
                            - img "search" [ref=e370]:
                              - img [ref=e371]
                    - columnheader [ref=e374]
                    - columnheader [ref=e376]
                    - columnheader [ref=e378]
              - table [ref=e380]:
                - rowgroup [ref=e393]:
                  - generic [ref=e394]:
                    - generic [ref=e396]:
                      - generic [ref=e397]: Name
                      - generic [ref=e399]:
                        - img [ref=e400]:
                          - img [ref=e401]
                        - img [ref=e403]:
                          - img [ref=e404]
                    - button [ref=e406] [cursor=pointer]:
                      - button [ref=e407]:
                        - img [ref=e409]:
                          - img [ref=e410]
                  - generic [ref=e412]:
                    - generic [ref=e413]: Email
                    - button [ref=e414] [cursor=pointer]:
                      - button [ref=e415]:
                        - img [ref=e417]:
                          - img [ref=e418]
                  - generic [ref=e420]:
                    - generic [ref=e422]:
                      - generic [ref=e423]: Account
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
                    - generic [ref=e439]: Role
                    - button [ref=e440] [cursor=pointer]:
                      - button [ref=e441]:
                        - img [ref=e443]:
                          - img [ref=e444]
                  - generic [ref=e446]:
                    - generic [ref=e448]:
                      - generic [ref=e449]: Listing scope mode
                      - generic [ref=e451]:
                        - img [ref=e452]:
                          - img [ref=e453]
                        - img [ref=e455]:
                          - img [ref=e456]
                    - button [ref=e458] [cursor=pointer]:
                      - button [ref=e459]:
                        - img [ref=e461]:
                          - img [ref=e462]
                  - generic [ref=e464]:
                    - generic [ref=e466]:
                      - generic [ref=e467]: Last login at
                      - generic [ref=e469]:
                        - img [ref=e470]:
                          - img [ref=e471]
                        - img [ref=e473]:
                          - img [ref=e474]
                    - button [ref=e476] [cursor=pointer]:
                      - button [ref=e477]:
                        - img [ref=e479]:
                          - img [ref=e480]
                  - generic [ref=e482]:
                    - generic [ref=e484]:
                      - generic [ref=e485]: User status
                      - generic [ref=e487]:
                        - img [ref=e488]:
                          - img [ref=e489]
                        - img [ref=e491]:
                          - img [ref=e492]
                    - button [ref=e494] [cursor=pointer]:
                      - button [ref=e495]:
                        - img [ref=e497]:
                          - img [ref=e498]
                  - generic [ref=e500]:
                    - generic [ref=e501]: Phone
                    - button [ref=e502] [cursor=pointer]:
                      - button [ref=e503]:
                        - img [ref=e505]:
                          - img [ref=e506]
                  - row "Select row 1 QA QA Admin qa.admin@hostify-qa.test QA Automation Admin All 06-11-202609:38 Active menu" [ref=e508]:
                    - cell "Select row 1" [ref=e509]:
                      - radio "Select row 1" [ref=e512] [cursor=pointer]
                    - cell "QA QA Admin" [ref=e513]:
                      - generic [ref=e515]:
                        - generic [ref=e518]: QA
                        - link "QA Admin" [ref=e523] [cursor=pointer]:
                          - /url: /app/platformAdmin/users/614d3d67-77d4-4351-abf8-90443678862d
                          - generic [ref=e525]: QA Admin
                    - cell "qa.admin@hostify-qa.test" [ref=e526]:
                      - generic [ref=e528]:
                        - mark [ref=e529]: qa.admin
                        - text: "@"
                        - mark [ref=e530]: hostify
                        - text: "-"
                        - mark [ref=e531]: qa.test
                    - cell "QA Automation" [ref=e532]:
                      - link "QA Automation" [ref=e536] [cursor=pointer]:
                        - /url: /app/platformAdmin/tenants/f2b3ad65-0d9a-4992-929c-3abe4823df98
                        - generic [ref=e538]: QA Automation
                    - cell "Admin" [ref=e539]:
                      - generic [ref=e540]: Admin
                    - cell "All" [ref=e541]:
                      - generic [ref=e543]:
                        - img [ref=e544]
                        - text: All
                    - cell "06-11-202609:38" [ref=e546]:
                      - generic [ref=e548]: 06-11-202609:38
                    - cell "Active" [ref=e549]:
                      - generic [ref=e551]:
                        - img [ref=e552]
                        - text: Active
                    - cell [ref=e554]
                    - cell "menu" [ref=e555]:
                      - button "menu" [ref=e558] [cursor=pointer]:
                        - img "menu" [ref=e560]:
                          - img [ref=e561]
                    - cell [ref=e563]
                  - row "Select row 2 QR QA Revenue Manager qa.revenue.manager@hostify-qa.test QA Automation Revenue Manager All 05-11-202613:47 Active menu" [ref=e564]:
                    - cell "Select row 2" [ref=e565]:
                      - radio "Select row 2" [ref=e568] [cursor=pointer]
                    - cell "QR QA Revenue Manager" [ref=e569]:
                      - generic [ref=e571]:
                        - generic [ref=e574]: QR
                        - link "QA Revenue Manager" [ref=e579] [cursor=pointer]:
                          - /url: /app/platformAdmin/users/9125084e-caff-4a2b-90df-2a7503490af4
                          - generic [ref=e581]: QA Revenue Manager
                    - cell "qa.revenue.manager@hostify-qa.test" [ref=e582]:
                      - generic [ref=e584]:
                        - text: qa.revenue.manager@
                        - mark [ref=e585]: hostify
                        - text: "-"
                        - mark [ref=e586]: qa.test
                    - cell "QA Automation" [ref=e587]:
                      - link "QA Automation" [ref=e591] [cursor=pointer]:
                        - /url: /app/platformAdmin/tenants/f2b3ad65-0d9a-4992-929c-3abe4823df98
                        - generic [ref=e593]: QA Automation
                    - cell "Revenue Manager" [ref=e594]:
                      - generic [ref=e595]: Revenue Manager
                    - cell "All" [ref=e596]:
                      - generic [ref=e598]:
                        - img [ref=e599]
                        - text: All
                    - cell "05-11-202613:47" [ref=e601]:
                      - generic [ref=e603]: 05-11-202613:47
                    - cell "Active" [ref=e604]:
                      - generic [ref=e606]:
                        - img [ref=e607]
                        - text: Active
                    - cell [ref=e609]
                    - cell "menu" [ref=e610]:
                      - button "menu" [ref=e613] [cursor=pointer]:
                        - img "menu" [ref=e615]:
                          - img [ref=e616]
                    - cell [ref=e618]
                  - row "Select row 3 QB QA Booking Agent qa.booking.agent@hostify-qa.test QA Automation Booking Agent All 05-11-202613:47 Active menu" [ref=e619]:
                    - cell "Select row 3" [ref=e620]:
                      - radio "Select row 3" [ref=e623] [cursor=pointer]
                    - cell "QB QA Booking Agent" [ref=e624]:
                      - generic [ref=e626]:
                        - generic [ref=e629]: QB
                        - link "QA Booking Agent" [ref=e634] [cursor=pointer]:
                          - /url: /app/platformAdmin/users/23fdc801-a003-4f2b-be20-b8552b2d8c51
                          - generic [ref=e636]: QA Booking Agent
                    - cell "qa.booking.agent@hostify-qa.test" [ref=e637]:
                      - generic [ref=e639]:
                        - text: qa.booking.agent@
                        - mark [ref=e640]: hostify
                        - text: "-"
                        - mark [ref=e641]: qa.test
                    - cell "QA Automation" [ref=e642]:
                      - link "QA Automation" [ref=e646] [cursor=pointer]:
                        - /url: /app/platformAdmin/tenants/f2b3ad65-0d9a-4992-929c-3abe4823df98
                        - generic [ref=e648]: QA Automation
                    - cell "Booking Agent" [ref=e649]:
                      - generic [ref=e650]: Booking Agent
                    - cell "All" [ref=e651]:
                      - generic [ref=e653]:
                        - img [ref=e654]
                        - text: All
                    - cell "05-11-202613:47" [ref=e656]:
                      - generic [ref=e658]: 05-11-202613:47
                    - cell "Active" [ref=e659]:
                      - generic [ref=e661]:
                        - img [ref=e662]
                        - text: Active
                    - cell [ref=e664]
                    - cell "menu" [ref=e665]:
                      - button "menu" [ref=e668] [cursor=pointer]:
                        - img "menu" [ref=e670]:
                          - img [ref=e671]
                    - cell [ref=e673]
                  - row "Select row 4 QM QA Manager qa.manager@hostify-qa.test QA Automation Manager All 05-11-202613:47 Active menu" [ref=e674]:
                    - cell "Select row 4" [ref=e675]:
                      - radio "Select row 4" [ref=e678] [cursor=pointer]
                    - cell "QM QA Manager" [ref=e679]:
                      - generic [ref=e681]:
                        - generic [ref=e684]: QM
                        - link "QA Manager" [ref=e689] [cursor=pointer]:
                          - /url: /app/platformAdmin/users/05c50912-014e-4a25-bc5a-62d2376cff44
                          - generic [ref=e691]: QA Manager
                    - cell "qa.manager@hostify-qa.test" [ref=e692]:
                      - generic [ref=e694]:
                        - text: qa.manager@
                        - mark [ref=e695]: hostify
                        - text: "-"
                        - mark [ref=e696]: qa.test
                    - cell "QA Automation" [ref=e697]:
                      - link "QA Automation" [ref=e701] [cursor=pointer]:
                        - /url: /app/platformAdmin/tenants/f2b3ad65-0d9a-4992-929c-3abe4823df98
                        - generic [ref=e703]: QA Automation
                    - cell "Manager" [ref=e704]:
                      - generic [ref=e705]: Manager
                    - cell "All" [ref=e706]:
                      - generic [ref=e708]:
                        - img [ref=e709]
                        - text: All
                    - cell "05-11-202613:47" [ref=e711]:
                      - generic [ref=e713]: 05-11-202613:47
                    - cell "Active" [ref=e714]:
                      - generic [ref=e716]:
                        - img [ref=e717]
                        - text: Active
                    - cell [ref=e719]
                    - cell "menu" [ref=e720]:
                      - button "menu" [ref=e723] [cursor=pointer]:
                        - img "menu" [ref=e725]:
                          - img [ref=e726]
                    - cell [ref=e728]
                  - row "Select row 5 QT QA Team Supervisor qa.team.supervisor@hostify-qa.test QA Automation Team Supervisor All 05-11-202613:47 Active menu" [ref=e729]:
                    - cell "Select row 5" [ref=e730]:
                      - radio "Select row 5" [ref=e733] [cursor=pointer]
                    - cell "QT QA Team Supervisor" [ref=e734]:
                      - generic [ref=e736]:
                        - generic [ref=e739]: QT
                        - link "QA Team Supervisor" [ref=e744] [cursor=pointer]:
                          - /url: /app/platformAdmin/users/5dccc544-6a62-4bdd-bfc9-d97c70d938b1
                          - generic [ref=e746]: QA Team Supervisor
                    - cell "qa.team.supervisor@hostify-qa.test" [ref=e747]:
                      - generic [ref=e749]:
                        - text: qa.team.supervisor@
                        - mark [ref=e750]: hostify
                        - text: "-"
                        - mark [ref=e751]: qa.test
                    - cell "QA Automation" [ref=e752]:
                      - link "QA Automation" [ref=e756] [cursor=pointer]:
                        - /url: /app/platformAdmin/tenants/f2b3ad65-0d9a-4992-929c-3abe4823df98
                        - generic [ref=e758]: QA Automation
                    - cell "Team Supervisor" [ref=e759]:
                      - generic [ref=e760]: Team Supervisor
                    - cell "All" [ref=e761]:
                      - generic [ref=e763]:
                        - img [ref=e764]
                        - text: All
                    - cell "05-11-202613:47" [ref=e766]:
                      - generic [ref=e768]: 05-11-202613:47
                    - cell "Active" [ref=e769]:
                      - generic [ref=e771]:
                        - img [ref=e772]
                        - text: Active
                    - cell [ref=e774]
                    - cell "menu" [ref=e775]:
                      - button "menu" [ref=e778] [cursor=pointer]:
                        - img "menu" [ref=e780]:
                          - img [ref=e781]
                    - cell [ref=e783]
                  - row "Select row 6 QH QA Housekeeper qa.housekeeper@hostify-qa.test QA Automation Housekeeper All 05-11-202613:48 Active menu" [ref=e784]:
                    - cell "Select row 6" [ref=e785]:
                      - radio "Select row 6" [ref=e788] [cursor=pointer]
                    - cell "QH QA Housekeeper" [ref=e789]:
                      - generic [ref=e791]:
                        - generic [ref=e794]: QH
                        - link "QA Housekeeper" [ref=e799] [cursor=pointer]:
                          - /url: /app/platformAdmin/users/17e72ec0-eae7-40e9-9ff7-61f0fbd5361e
                          - generic [ref=e801]: QA Housekeeper
                    - cell "qa.housekeeper@hostify-qa.test" [ref=e802]:
                      - generic [ref=e804]:
                        - text: qa.housekeeper@
                        - mark [ref=e805]: hostify
                        - text: "-"
                        - mark [ref=e806]: qa.test
                    - cell "QA Automation" [ref=e807]:
                      - link "QA Automation" [ref=e811] [cursor=pointer]:
                        - /url: /app/platformAdmin/tenants/f2b3ad65-0d9a-4992-929c-3abe4823df98
                        - generic [ref=e813]: QA Automation
                    - cell "Housekeeper" [ref=e814]:
                      - generic [ref=e815]: Housekeeper
                    - cell "All" [ref=e816]:
                      - generic [ref=e818]:
                        - img [ref=e819]
                        - text: All
                    - cell "05-11-202613:48" [ref=e821]:
                      - generic [ref=e823]: 05-11-202613:48
                    - cell "Active" [ref=e824]:
                      - generic [ref=e826]:
                        - img [ref=e827]
                        - text: Active
                    - cell [ref=e829]
                    - cell "menu" [ref=e830]:
                      - button "menu" [ref=e833] [cursor=pointer]:
                        - img "menu" [ref=e835]:
                          - img [ref=e836]
                    - cell [ref=e838]
                  - row "Select row 7 QA QA Accountant qa.accountant@hostify-qa.test QA Automation Accountant All 05-11-202613:47 Active menu" [ref=e839]:
                    - cell "Select row 7" [ref=e840]:
                      - radio "Select row 7" [ref=e843] [cursor=pointer]
                    - cell "QA QA Accountant" [ref=e844]:
                      - generic [ref=e846]:
                        - generic [ref=e849]: QA
                        - link "QA Accountant" [ref=e854] [cursor=pointer]:
                          - /url: /app/platformAdmin/users/6938c21f-7c9a-4c09-a787-2945b20e9c0b
                          - generic [ref=e856]: QA Accountant
                    - cell "qa.accountant@hostify-qa.test" [ref=e857]:
                      - generic [ref=e859]:
                        - text: qa.accountant@
                        - mark [ref=e860]: hostify
                        - text: "-"
                        - mark [ref=e861]: qa.test
                    - cell "QA Automation" [ref=e862]:
                      - link "QA Automation" [ref=e866] [cursor=pointer]:
                        - /url: /app/platformAdmin/tenants/f2b3ad65-0d9a-4992-929c-3abe4823df98
                        - generic [ref=e868]: QA Automation
                    - cell "Accountant" [ref=e869]:
                      - generic [ref=e870]: Accountant
                    - cell "All" [ref=e871]:
                      - generic [ref=e873]:
                        - img [ref=e874]
                        - text: All
                    - cell "05-11-202613:47" [ref=e876]:
                      - generic [ref=e878]: 05-11-202613:47
                    - cell "Active" [ref=e879]:
                      - generic [ref=e881]:
                        - img [ref=e882]
                        - text: Active
                    - cell [ref=e884]
                    - cell "menu" [ref=e885]:
                      - button "menu" [ref=e888] [cursor=pointer]:
                        - img "menu" [ref=e890]:
                          - img [ref=e891]
                    - cell [ref=e893]
                  - row "Select row 8 C Chavdar chavdar@hostify.com Chavdar Houses Admin All Invited menu mail Resend" [ref=e894]:
                    - cell "Select row 8" [ref=e895]:
                      - radio "Select row 8" [ref=e898] [cursor=pointer]
                    - cell "C Chavdar" [ref=e899]:
                      - generic [ref=e901]:
                        - generic [ref=e904]: C
                        - link "Chavdar" [ref=e909] [cursor=pointer]:
                          - /url: /app/platformAdmin/users/33642408-565f-47b5-b3f6-3e259c8e1d9b
                          - generic [ref=e911]: Chavdar
                    - cell "chavdar@hostify.com" [ref=e912]:
                      - generic [ref=e914]:
                        - text: chavdar@
                        - mark [ref=e915]: hostify.com
                    - cell "Chavdar Houses" [ref=e916]:
                      - link "Chavdar Houses" [ref=e920] [cursor=pointer]:
                        - /url: /app/platformAdmin/tenants/92e8a39a-ed61-4fc1-b57a-9b15c4d5d0df
                        - generic [ref=e922]: Chavdar Houses
                    - cell "Admin" [ref=e923]:
                      - generic [ref=e924]: Admin
                    - cell "All" [ref=e925]:
                      - generic [ref=e927]:
                        - img [ref=e928]
                        - text: All
                    - cell [ref=e930]
                    - cell "Invited" [ref=e931]:
                      - generic [ref=e933]:
                        - img [ref=e934]
                        - text: Invited
                    - cell [ref=e936]
                    - cell "menu" [ref=e937]:
                      - button "menu" [ref=e940] [cursor=pointer]:
                        - img "menu" [ref=e942]:
                          - img [ref=e943]
                    - cell "mail Resend" [ref=e945]:
                      - button "mail Resend" [ref=e947] [cursor=pointer]:
                        - img "mail" [ref=e949]:
                          - img [ref=e950]
                        - generic [ref=e952]: Resend
                  - row "Select row 9 RG Rossen Genchev rosen1@hostify.com Rossen Houses Admin All 02-11-202613:42 Active menu" [ref=e953]:
                    - cell "Select row 9" [ref=e954]:
                      - radio "Select row 9" [ref=e957] [cursor=pointer]
                    - cell "RG Rossen Genchev" [ref=e958]:
                      - generic [ref=e960]:
                        - generic [ref=e963]: RG
                        - link "Rossen Genchev" [ref=e968] [cursor=pointer]:
                          - /url: /app/platformAdmin/users/a02168f2-afca-4e5b-94ec-165fa2f1760f
                          - generic [ref=e970]: Rossen Genchev
                    - cell "rosen1@hostify.com" [ref=e971]:
                      - generic [ref=e973]:
                        - text: rosen1@
                        - mark [ref=e974]: hostify.com
                    - cell "Rossen Houses" [ref=e975]:
                      - link "Rossen Houses" [ref=e979] [cursor=pointer]:
                        - /url: /app/platformAdmin/tenants/6932c00f-cb60-4599-80e7-ebd6758399a5
                        - generic [ref=e981]: Rossen Houses
                    - cell "Admin" [ref=e982]:
                      - generic [ref=e983]: Admin
                    - cell "All" [ref=e984]:
                      - generic [ref=e986]:
                        - img [ref=e987]
                        - text: All
                    - cell "02-11-202613:42" [ref=e989]:
                      - generic [ref=e991]: 02-11-202613:42
                    - cell "Active" [ref=e992]:
                      - generic [ref=e994]:
                        - img [ref=e995]
                        - text: Active
                    - cell [ref=e997]
                    - cell "menu" [ref=e998]:
                      - button "menu" [ref=e1001] [cursor=pointer]:
                        - img "menu" [ref=e1003]:
                          - img [ref=e1004]
                    - cell [ref=e1006]
                  - row "Select row 10 MV Mihaela Vasileva mihaela@hostify.com Demo account Admin All Active menu" [ref=e1007]:
                    - cell "Select row 10" [ref=e1008]:
                      - radio "Select row 10" [ref=e1011] [cursor=pointer]
                    - cell "MV Mihaela Vasileva" [ref=e1012]:
                      - generic [ref=e1014]:
                        - generic [ref=e1017]: MV
                        - link "Mihaela Vasileva" [ref=e1022] [cursor=pointer]:
                          - /url: /app/platformAdmin/users/d48f8709-ec08-4159-8d6f-d18da17eff69
                          - generic [ref=e1024]: Mihaela Vasileva
                    - cell "mihaela@hostify.com" [ref=e1025]:
                      - generic [ref=e1027]:
                        - text: mihaela@
                        - mark [ref=e1028]: hostify.com
                    - cell "Demo account" [ref=e1029]:
                      - link "Demo account" [ref=e1033] [cursor=pointer]:
                        - /url: /app/platformAdmin/tenants/fdf7397b-696a-4ffd-b1c7-86b33a8dbd52
                        - generic [ref=e1035]: Demo account
                    - cell "Admin" [ref=e1036]:
                      - generic [ref=e1037]: Admin
                    - cell "All" [ref=e1038]:
                      - generic [ref=e1040]:
                        - img [ref=e1041]
                        - text: All
                    - cell [ref=e1043]
                    - cell "Active" [ref=e1044]:
                      - generic [ref=e1046]:
                        - img [ref=e1047]
                        - text: Active
                    - cell [ref=e1049]
                    - cell "menu" [ref=e1050]:
                      - button "menu" [ref=e1053] [cursor=pointer]:
                        - img "menu" [ref=e1055]:
                          - img [ref=e1056]
                    - cell [ref=e1058]
          - list [ref=e1059]:
            - listitem [ref=e1060]: "Total: 11"
            - listitem "Previous Page" [ref=e1061]:
              - button "left" [disabled] [ref=e1062]:
                - img "left" [ref=e1063]:
                  - img [ref=e1064]
            - listitem "1" [ref=e1066] [cursor=pointer]:
              - generic [ref=e1067]: "1"
            - listitem "2" [ref=e1068] [cursor=pointer]:
              - generic [ref=e1069]: "2"
            - listitem "Next Page" [ref=e1070] [cursor=pointer]:
              - button "right" [ref=e1071]:
                - img "right" [ref=e1072]:
                  - img [ref=e1073]
            - listitem [ref=e1075]:
              - generic [ref=e1076]:
                - generic "10 / page" [ref=e1077]:
                  - text: 10 / page
                  - combobox "Page Size" [ref=e1078]
                - img "down" [ref=e1080]:
                  - img [ref=e1081]
  - dialog "Create user Cancel Save 3" [ref=e1084]:
    - generic [ref=e1088]:
      - heading "Create user" [level=2] [ref=e1091]
      - generic [ref=e1092]:
        - button "Cancel" [ref=e1093] [cursor=pointer]
        - button "Save 3" [ref=e1094] [cursor=pointer]:
          - text: Save
          - generic [ref=e1095]: "3"
    - generic [ref=e1097]:
      - generic [ref=e1098]:
        - button "Info" [ref=e1099] [cursor=pointer]
        - button "Scope" [ref=e1100] [cursor=pointer]
        - button "Owner portal" [ref=e1101] [cursor=pointer]
        - button "Access" [ref=e1102] [cursor=pointer]
      - generic [ref=e1103]:
        - img [ref=e1104]
        - generic [ref=e1106]: 3 fields are required before this record can be saved.
      - generic [ref=e1107]:
        - generic [ref=e1108]:
          - generic [ref=e1110]: Info
          - generic [ref=e1112]:
            - generic [ref=e1115]:
              - generic [ref=e1117]: "* Account"
              - generic [ref=e1123] [cursor=pointer]:
                - combobox "* Account" [ref=e1125]
                - button "search" [ref=e1127]:
                  - img "search" [ref=e1129]:
                    - img [ref=e1130]
            - generic [ref=e1132]:
              - generic [ref=e1134]:
                - generic [ref=e1136]:
                  - text: "*"
                  - generic [ref=e1138]: Name
                - textbox "* Name" [ref=e1142]
              - generic [ref=e1144]:
                - generic [ref=e1146]:
                  - text: "*"
                  - generic [ref=e1148]: Email
                - textbox "* Email" [ref=e1152]
            - generic [ref=e1153]:
              - generic [ref=e1155]:
                - generic [ref=e1159]: Phone
                - textbox "Phone" [ref=e1163]
              - generic [ref=e1165]:
                - generic [ref=e1169]: Ui language
                - generic [ref=e1173] [cursor=pointer]:
                  - combobox "Ui language" [ref=e1175]
                  - img "down" [ref=e1177]:
                    - img [ref=e1178]
            - generic [ref=e1180]:
              - generic [ref=e1182]:
                - generic [ref=e1184]: "* Role"
                - generic [ref=e1190] [cursor=pointer]:
                  - combobox "* Role" [ref=e1192]
                  - button "search" [ref=e1194]:
                    - img "search" [ref=e1196]:
                      - img [ref=e1197]
              - generic [ref=e1200]:
                - generic [ref=e1204]: User status
                - generic [ref=e1208] [cursor=pointer]:
                  - combobox "User status" [ref=e1210]
                  - img "down" [ref=e1212]:
                    - img [ref=e1213]
            - button "cloud-upload Click or drop here to upload a file Profile photo Drag a photo here or click to choose one (JPG or PNG)." [ref=e1223] [cursor=pointer]:
              - generic [ref=e1225]:
                - generic [ref=e1227]:
                  - img "cloud-upload" [ref=e1228]:
                    - img [ref=e1229]
                  - generic [ref=e1232]: Click or drop here to upload a file
                - generic [ref=e1233]:
                  - generic [ref=e1234]: Profile photo
                  - generic [ref=e1235]: Drag a photo here or click to choose one (JPG or PNG).
            - generic [ref=e1236]:
              - generic [ref=e1237]:
                - textbox [ref=e1238]
                - textbox [ref=e1239]
              - generic [ref=e1241]:
                - generic "Password" [ref=e1243]
                - generic [ref=e1247]:
                  - textbox "Password" [ref=e1248]
                  - generic [ref=e1249]:
                    - button "Show" [ref=e1250] [cursor=pointer]:
                      - img "eye-invisible" [ref=e1251]:
                        - img [ref=e1252]
                    - button "reload" [ref=e1255] [cursor=pointer]:
                      - img "reload" [ref=e1257]:
                        - img [ref=e1258]
        - generic [ref=e1260]:
          - generic [ref=e1262]: Scope
          - generic [ref=e1264]:
            - generic [ref=e1267]:
              - generic [ref=e1271]: Listing scope mode
              - generic [ref=e1275] [cursor=pointer]:
                - combobox "Listing scope mode" [ref=e1277]
                - img "down" [ref=e1279]:
                  - img [ref=e1280]
            - generic [ref=e1284]:
              - generic [ref=e1286]: Default account
              - generic [ref=e1292] [cursor=pointer]:
                - combobox "Default account" [ref=e1294]
                - button "search" [ref=e1296]:
                  - img "search" [ref=e1298]:
                    - img [ref=e1299]
        - generic [ref=e1301]:
          - generic [ref=e1303]: Owner portal
          - generic [ref=e1306]:
            - generic [ref=e1308]:
              - generic [ref=e1310]: Owner
              - generic [ref=e1316] [cursor=pointer]:
                - combobox "Owner" [ref=e1318]
                - button "search" [ref=e1320]:
                  - img "search" [ref=e1322]:
                    - img [ref=e1323]
            - generic [ref=e1326]:
              - generic [ref=e1330]: Portal access status
              - generic [ref=e1334] [cursor=pointer]:
                - combobox "Portal access status" [ref=e1336]
                - img "down" [ref=e1338]:
                  - img [ref=e1339]
        - generic [ref=e1341]:
          - generic [ref=e1343]: Access
          - generic [ref=e1345]:
            - generic [ref=e1348]:
              - generic "Suspended" [ref=e1350]
              - switch "Suspended" [ref=e1354] [cursor=pointer]
            - generic [ref=e1357]:
              - generic [ref=e1359]:
                - generic "Reporting access" [ref=e1361]
                - switch "Reporting access" [ref=e1365] [cursor=pointer]
              - generic [ref=e1369]:
                - generic "Invitation expires at" [ref=e1371]
                - generic [ref=e1376]:
                  - textbox "Invitation expires at" [ref=e1377]:
                    - /placeholder: Select date
                  - generic:
                    - img:
                      - img
```

# Test source

```ts
  232 |         }
  233 |         const totalText = text(document.querySelector('.ant-pagination-total-text'));
  234 |         table = {columns: ths.length, rows: rows.length, total: totalText ? Number((totalText.match(/\d[\d\s]*/) || [''])[0].replace(/\s/g, '')) || null : null, emptyColumns};
  235 |     }
  236 |     // ── form layout ─────────────────────────────────────────────────────────
  237 |     // A form's single-line fields share ONE height (antd's size: 40 px large, 32 middle) — a field taller or shorter
  238 |     // than the others does not follow the form's layout. A compound field (an input joined with a button: the Search
  239 |     // field of a relation, `.ant-space-compact`) is ONE control — its parts have the same height and the same top.
  240 |     const SINGLE_LINE = '.ant-input-affix-wrapper:not(.ant-input-textarea-affix-wrapper), input.ant-input, .ant-select:not(.ant-select-multiple), .ant-picker, .ant-input-number-affix-wrapper, .ant-input-number';
  241 |     const fieldHeights: RawProbe['fieldHeights'] = [];
  242 |     const fieldParts: RawProbe['fieldParts'] = [];
  243 |     const labelOf = (item: Element): string => text(item.querySelector('.ant-form-item-label')).replace(/\s*\*\s*$/, '') ||
  244 |         (item.querySelector('[data-test]')?.getAttribute('data-test') || '');
  245 |     for (const form of visibleQ('.ant-form')) {
  246 |         if (form.closest('.ant-table, .ant-dropdown, .ant-popover')) continue;
  247 |         // the form's own items: not a nested form's, not an item inside another item, not an editable table's cells
  248 |         const items = visibleQ('.ant-form-item', form).filter(item => item.closest('.ant-form') === form && !item.closest('.ant-table') &&
  249 |             !item.parentElement?.closest('.ant-form-item'));
  250 |         const fields: {label: string; height: number; at: string}[] = [];
  251 |         for (const item of items) {
  252 |             const content = item.querySelector('.ant-form-item-control-input-content');
  253 |             // the outermost single-line control of the item (document order: an ancestor comes before its descendants)
  254 |             const control = content ? q(SINGLE_LINE, content).find(isVisible) : undefined;
  255 |             if (control) fields.push({label: labelOf(item), height: Math.round(control.getBoundingClientRect().height), at: where(control)});
  256 |             for (const group of visibleQ('.ant-space-compact, .ant-input-group', item)) {
  257 |                 const parts = Array.from(group.children).filter(isVisible).map(part => ({
  258 |                     kind: part.matches('.ant-btn, button') ? 'button' : part.matches('.ant-select') ? 'select' : 'input',
  259 |                     rect: part.getBoundingClientRect()
  260 |                 }));
  261 |                 if (parts.length < 2) continue;
  262 |                 const heights = parts.map(p => Math.round(p.rect.height));
  263 |                 const tops = parts.map(p => Math.round(p.rect.top));
  264 |                 if (Math.max(...heights) - Math.min(...heights) > 2 || Math.max(...tops) - Math.min(...tops) > 2)
  265 |                     fieldParts.push({label: labelOf(item), parts: parts.map((p, i) => `${p.kind} ${heights[i]}px`).join(', '), at: where(group)});
  266 |             }
  267 |         }
  268 |         // the form's height is the one most of its fields have; a tie (or fewer than three fields) judges nothing
  269 |         const counts = new Map<number, number>();
  270 |         for (const f of fields) counts.set(f.height, (counts.get(f.height) || 0) + 1);
  271 |         const ranked = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  272 |         if (fields.length < 3 || !ranked.length || ranked[0][1] < 2 || (ranked[1] && ranked[1][1] === ranked[0][1])) continue;
  273 |         const expected = ranked[0][0];
  274 |         for (const f of fields) if (Math.abs(f.height - expected) > 2) fieldHeights.push({...f, expected});
  275 |     }
  276 | 
  277 |     const tabs = visibleQ("[data-test^='tab-']").map(t => (t.getAttribute('data-test') || '').slice(4));
  278 |     const main = document.querySelector('.siteContent, .ant-layout-content, main, .contentContainer') || document.querySelector('#root');
  279 |     const mainText = main ? text(main) : '';
  280 | 
  281 |     return {
  282 |         title: document.title, url: location.href, rawKeys: rawKeys.slice(0, 20), bareValues: bareValues.slice(0, 20),
  283 |         brokenImages: brokenImages.slice(0, 10), hOverflow, results, notifications, messages, loginModal, connectionError, spinners, modals,
  284 |         cutText, lowContrast, table, fieldHeights: fieldHeights.slice(0, 15), fieldParts: fieldParts.slice(0, 15), tabs, mainElements: main ? q('*', main).filter(isVisible).length : 0, mainTextLength: mainText.length
  285 |     };
  286 | }
  287 | 
  288 | const slug = (value: string): string => value.replace(/[^\w-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70);
  289 | 
  290 | /** Measures the open screen, writes its screenshot and `probe-<surface>.json`, returns the findings. */
  291 | export async function probePage(page: Page, testInfo: TestInfo, surface: string, options: {expectLogin?: boolean; expectModal?: boolean} = {}): Promise<ProbeResult> {
  292 |     // a drawer or a modal slides in (~300 ms): a screenshot before it settles shows the page without it
  293 |     await page.waitForTimeout(400);
  294 |     const file = testInfo.outputPath(`shot-${slug(surface)}.png`);
  295 |     await page.screenshot({path: file, animations: 'disabled', fullPage: false}).catch(() => undefined);
  296 |     await testInfo.attach(`shot-${slug(surface)}.png`, {path: file, contentType: 'image/png'}).catch(() => undefined);
  297 | 
  298 |     const raw = await page.evaluate(domProbe) as RawProbe;
  299 |     const findings: Finding[] = [];
  300 |     if (raw.connectionError) findings.push({severity: 'blocker', tag: 'connection-error', message: 'the "connection error" dialog is open'});
  301 |     if (raw.loginModal && !options.expectLogin) findings.push({severity: 'blocker', tag: 'login-modal', message: 'the login form covers the page: no session'});
  302 |     for (const r of raw.results) if (r.status && /error|404|403|500|warning/.test(r.status)) findings.push({severity: 'blocker', tag: `result-${r.status}`, message: r.title || `ant-result ${r.status}`});
  303 |     for (const n of raw.notifications) findings.push({severity: 'error', tag: 'error-notification', message: n});
  304 |     for (const m of raw.messages) findings.push({severity: 'error', tag: 'error-message', message: m});
  305 |     for (const k of raw.rawKeys) findings.push({severity: 'error', tag: 'raw-key', message: `untranslated: "${k}"`});
  306 |     for (const b of raw.bareValues) findings.push({severity: 'error', tag: 'bare-value', message: `"${b}" printed on the screen`});
  307 |     for (const i of raw.brokenImages) findings.push({severity: 'error', tag: 'broken-image', message: i});
  308 |     for (const p of raw.fieldParts) findings.push({severity: 'error', tag: 'field-parts', message: `"${p.label}": the parts of one field do not match — ${p.parts}`, at: p.at});
  309 |     for (const f of raw.fieldHeights) findings.push({severity: 'error', tag: 'field-height', message: `"${f.label}" is ${f.height}px tall — the form's fields are ${f.expected}px`, at: f.at});
  310 |     if (raw.hOverflow) findings.push({severity: 'warn', tag: 'h-overflow', message: `the page scrolls sideways: ${raw.hOverflow.scrollWidth}px in a ${raw.hOverflow.innerWidth}px window`});
  311 |     if (raw.spinners > 0) findings.push({severity: 'warn', tag: 'spinner', message: `${raw.spinners} spinner(s) still turning`});
  312 |     if (!options.expectModal) for (const m of raw.modals) findings.push({severity: 'warn', tag: 'modal-on-load', message: `a dialog is open on the page: "${m}"`});
  313 |     if (raw.table && raw.table.emptyColumns.length) findings.push({severity: 'warn', tag: 'empty-column', message: `columns with no value in any row: ${raw.table.emptyColumns.join(', ')}`});
  314 |     for (const c of raw.cutText) findings.push({severity: 'review', tag: 'cut-text', message: `"${c.text}"`, at: c.at});
  315 |     for (const c of raw.lowContrast) findings.push({severity: 'review', tag: 'low-contrast', message: `"${c.text}" ${c.ratio}:1 (${c.fg} on ${c.bg})`, at: c.at});
  316 |     if (raw.mainElements < 5 && raw.mainTextLength < 20 && !raw.loginModal) findings.push({severity: 'error', tag: 'blank', message: 'the content area is empty'});
  317 | 
  318 |     const result: ProbeResult = {
  319 |         surface, url: raw.url, title: raw.title, findings, screenshot: `shot-${slug(surface)}.png`,
  320 |         table: raw.table, tabs: raw.tabs,
  321 |         stats: {cutText: raw.cutText.length, lowContrast: raw.lowContrast.length, rawKeys: raw.rawKeys.length, spinners: raw.spinners}
  322 |     };
  323 |     await testInfo.attach(`probe-${slug(surface)}.json`, {body: JSON.stringify(result, null, 2), contentType: 'application/json'});
  324 |     return result;
  325 | }
  326 | 
  327 | /** Fails on what a client would not accept; `review` findings fail only in strict mode. */
  328 | export const expectPresentable = (result: ProbeResult): void => {
  329 |     const failing = result.findings.filter(f => f.severity === 'blocker' || f.severity === 'error' || (CONFIG.strictVisual && f.severity === 'review'));
  330 |     if (!failing.length) return;
  331 |     const lines = failing.slice(0, 12).map(f => `- [${f.severity}/${f.tag}] ${f.message}${f.at ? ` @ ${f.at}` : ''}`);
> 332 |     throw new Error(`${result.surface}: the screen is not presentable (${failing.length}):\n${lines.join('\n')}`);
      |           ^ Error: platform-user-form: the screen is not presentable (5):
  333 | };
  334 | 
```