import {test, expect} from '../helpers/fixtures';
import {formJourney, cleanBefore} from '../helpers/journey';
import {qaName} from '../fixtures/test-data';

/**
 * 202 — Settings › Fees, Extras, Taxes, Costs: one fee item of each kind through the shared form „Create fee item“.
 * @qa-description: Settings › Fees / Extras / Taxes / Costs — по една позиция от всеки вид през формата: отказ на празна, езиците, правилата, запис, четене през API, редакция, изтриване
 * @qa-level: regression
 *
 * Proves, for each of the four pages: an empty form is refused (Name (en), Type, Charge type, Status required); the
 * language tabs open; „QA Fee Cleaning“ (a fee, per stay, 30), „QA Extra Breakfast“ (an extra, per guest a night, 10),
 * „QA Tax City“ (a tax, per person a night, 2, cap 2 nights, exempt under 2 years) and „QA Cost Linen“ (a cost, 5) are saved
 * — the API gives back the same; the row's Edit changes the amount and the API shows it; the row's Remove deletes it.
 * A fee item is a catalogue entry: it reaches a listing only through the listing's fees or a template (220, 222) — none
 * here. „Exclude direct stays“ stays off; nothing is made a default.
 * Creates: feeItem ×4 (removed at the end). Needs: 003 green.
 */
const SPEC = '202';
const ENTITY = 'feeItem';
const ITEMS = [
    {page: 'settingsFees', name: qaName('Fee Cleaning'), type: /^Fee$/i, charge: /^Per stay$/i, amount: '30', edited: '35'},
    {page: 'settingsExtras', name: qaName('Extra Breakfast'), type: /^Extra$/i, charge: /^Per guest night$/i, amount: '10', edited: '12'},
    {page: 'settingsTaxes', name: qaName('Tax City'), type: /^Tax$/i, charge: /^Per guest night$/i, amount: '2', edited: '3', cap: '2', exemptUnder: '2'},
    {page: 'settingsCosts', name: qaName('Cost Linen'), type: /^Cost$/i, charge: /^Per stay$/i, amount: '5', edited: '6'}
];

test.describe('202 settings › fee items', () => {
    test.setTimeout(420_000);
    test.beforeAll(async () => { for (const p of ['QA Fee', 'QA Extra', 'QA Tax', 'QA Cost']) await cleanBefore(ENTITY, SPEC, p); });

    for (const item of ITEMS) {
        test(`${item.page}: "${item.name}" goes through the fee item form`, async ({page, signInAs, adminApi}, testInfo) => {
            await formJourney(page, signInAs, adminApi, testInfo, {
                spec: SPEC, entity: ENTITY, menu: ['settings', item.page], // Extras / Taxes open the shared page of fee items filtered by their type (1.0.36)
                url: new RegExp(`/app/settings/(${item.page}|feeItems\\?.*feeItemType=)`),
                path: `/settings/${item.page}`, createTitle: 'Create fee item', editTitle: new RegExp(`fee item|${item.name}`, 'i'),
                required: ['feeItemType', 'chargeType', 'status'], name: item.name, nameField: 'name_en',
                fill: async form => {
                    for (const tab of ['es', 'fr', 'pt', 'en']) await form.root.getByRole('tab', {name: new RegExp(`Name \\(${tab}\\)`)}).click();
                    await form.fill('name_en', item.name);
                    testInfo.annotations.push({type: 'Type / Charge type', description: `${await form.pickFirst('feeItemType', item.type)} / ${await form.pickFirst('chargeType', item.charge)}`});
                    await form.pickFirst('status', /Active/i);
                    await form.fillByLabel('Default amount', item.amount);
                    await form.setSwitch('excludeDirect', false);
                    if (item.cap) await form.fillByLabel('Cap (nights)', item.cap);
                    if (item.exemptUnder) await form.fillByLabel('Exempt under age', item.exemptUnder);
                },
                saved: r => {
                    const json = JSON.stringify(r);
                    expect(r.name_en ?? r.name, 'Name (en)').toBe(item.name);
                    expect(json, `Default amount ${item.amount}`).toMatch(new RegExp(`"(defaultAmount|amount)"\\s*:\\s*(\\{"value"\\s*:\\s*)?${item.amount}\\b`));
                    expect(Boolean(r.excludeDirect), 'Exclude direct stays stays OFF').toBe(false);
                    if (item.cap) expect(json, `Cap (nights) ${item.cap}`).toMatch(new RegExp(`"cap(Nights)?"\\s*:\\s*${item.cap}\\b`));
                },
                edit: async form => form.fillByLabel('Default amount', item.edited),
                edited: r => expect(JSON.stringify(r), `the edited Default amount ${item.edited}`).toMatch(new RegExp(`"(defaultAmount|amount)"\\s*:\\s*(\\{"value"\\s*:\\s*)?${item.edited}\\b`))
            });
        });
    }
});
