/**
 * Channels and plugins: look, never act — an ABSOLUTE rule (the QA person, 2026-11-12; 2026-11-27 after 1.0.32, where
 * Synchronise, Push update and a new mapping or markup really reach the channel). Every write a channel action makes is
 * refused here, whoever tries it — the browser of a test (fixtures.ts aborts the request and fails the test with a STOP)
 * or the API helper (api.ts refuses to send it). Reads (GET) are never touched.
 *
 * The list is taken from the client's own API (1.0.35): the channel engine, the channel commands (pushUpdate, fullSync,
 * pullListings, publish, unlist, pullReservations, retrySync …), a channel account's Sync now, the mappings (channel
 * listings, properties, rate plans, promotions, availability periods), sync accounts and calendars, a plugin's operations,
 * install and enable, the import of a listing from a channel's link, the hand-over of a listing, and any write to a
 * plugin's own host.
 */
const CHANNEL_WRITES: RegExp[] = [
    /\/api\/channel(\/|\?|$)/i,
    /\/api\/channelAccount(\/|\?|$)/i,
    /\/api\/channelCommand(\/|\?|$)/i,
    /\/api\/channelListing(\/|\?|$)/i,
    /\/api\/channelListingPromotion(\/|\?|$)/i,
    /\/api\/channelProperty(\/|\?|$)/i,
    /\/api\/channelRatePlan(\/|\?|$)/i,
    /\/api\/channelAvailabilityPeriod(\/|\?|$)/i,
    /\/api\/channelClaim(\/|\?|$)/i,
    /\/api\/engine\/pushCalendarUpdate/i,
    /\/api\/syncAccount(\/|\?|$)/i,
    /\/api\/syncActivity\/retrySyncActivity/i,
    /\/api\/syncCalendar\//i,
    /\/api\/reservation\/channel\//i,
    /\/api\/listing\/importListingFromUrl/i,
    /\/api\/listing\/handOverManagementListing/i,
    /\/api\/bookingApiClient\/hostingSync/i,
    /\/api\/amenity\/importChannelCodes/i,
    /\/api\/complianceConnection\/pullListings/i,
    /\/api\/partner\/(executePartnerOperation|installPartnerDriver|uninstallPartnerDriver|publishPartnerApp|registerPartnerApp)/i,
    /\/api\/partnerEnabled(\/|\?|$)/i,
    /\/api\/partnerOperation(\/|\?|$)/i,
    /\/api\/paymentProcessorAccount\/connect/i,
    // a plugin's own host (the channel plugins, the plugin apps)
    /^https:\/\/[\w.-]+\.workers\.dev\//i,
    /^https:\/\/hostify-apps\.bioseek\.eu\//i
];

/** True when a request is a channel / plugin ACTION (a write) — never allowed in the QA account. */
export const isChannelAction = (method: string, url: string): boolean =>
    method.toUpperCase() !== 'GET' && method.toUpperCase() !== 'HEAD' && method.toUpperCase() !== 'OPTIONS' && CHANNEL_WRITES.some(r => r.test(url));
