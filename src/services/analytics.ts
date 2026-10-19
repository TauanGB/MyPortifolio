export type AnalyticsPreference = 'accepted' | 'rejected' | null;
type Events = {
  view_product: { product_id: 'petlife' | 'eg3' };
  click_product_demo: { product_id: 'petlife' | 'eg3' };
  click_contact: { channel: 'github' | 'linkedin' | 'instagram' | 'email' | 'whatsapp'; placement: string };
  view_technical: { placement: string };
};
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
const STORAGE_KEY = 'tauan.analytics-consent.v1';
const denied = { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };

function sanitizeUrl(value: string): string {
  try { const url = new URL(value); return url.origin + url.pathname; } catch { return ''; }
}

/** Dependencies make the consent lifecycle testable without making real network requests. */
export function createAnalyticsController(win: AnalyticsWindow, doc: Document, id: string, production: boolean) {
  const configured = production && /^G-[A-Z0-9]{6,}$/.test(id);
  const listeners = new Set<() => void>();
  let initialized = false;
  let pageViewed = false;
  let preference: AnalyticsPreference = readPreference();
  function readPreference(): AnalyticsPreference {
    try { const value = win.localStorage.getItem(STORAGE_KEY); return value === 'accepted' || value === 'rejected' ? value : null; }
    catch { return null; }
  }
  function disable(value: boolean) {
    (win as unknown as Record<string, unknown>)[`ga-disable-${id}`] = value;
  }
  function apply() {
    if (!configured) return;
    disable(preference !== 'accepted');
    if (preference !== 'accepted') {
      if (initialized) win.gtag?.('consent', 'update', denied);
      return;
    }
    if (!initialized) {
      initialized = true;
      win.dataLayer = win.dataLayer || [];
      win.gtag = function () { win.dataLayer!.push(arguments); };
      win.gtag('consent', 'default', denied);
      win.gtag('consent', 'update', { ...denied, analytics_storage: 'granted' });
      win.gtag('js', new Date());
      win.gtag('config', id, {
        send_page_view: false,
        page_location: sanitizeUrl(win.location.href),
        page_referrer: sanitizeUrl(doc.referrer),
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      const script = doc.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      doc.head.appendChild(script);
    } else {
      win.gtag?.('consent', 'update', { ...denied, analytics_storage: 'granted' });
    }
    if (!pageViewed) {
      pageViewed = true;
      win.gtag?.('event', 'page_view', {
        page_location: sanitizeUrl(win.location.href),
        page_referrer: sanitizeUrl(doc.referrer),
        page_title: 'Tauan Gomes | Desenvolvimento de software',
      });
    }
  }
  function update(value: AnalyticsPreference) {
    preference = value;
    apply();
    listeners.forEach(listener => listener());
  }
  win.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY || event.key === null) update(readPreference());
  });
  apply();
  return {
    configured,
    getPreference: () => preference,
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    setPreference(value: Exclude<AnalyticsPreference, null>) {
      try { win.localStorage.setItem(STORAGE_KEY, value); } catch { /* Choice still applies in this tab. */ }
      update(value);
    },
    trackEvent<K extends keyof Events>(event: K, params: Events[K]) {
      if (!configured || preference !== 'accepted' || !initialized) return;
      // Explicit allowlist also prevents accidental extra properties from reaching GA.
      const payload = 'product_id' in params
        ? { product_id: params.product_id }
        : 'channel' in params
          ? { channel: params.channel, placement: params.placement }
          : { placement: params.placement };
      win.gtag?.('event', event, payload);
    },
  };
}

const analytics = createAnalyticsController(window, document, import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || '', import.meta.env.PROD);
export const analyticsConfigured = analytics.configured;
export const getAnalyticsPreference = analytics.getPreference;
export const subscribeAnalyticsPreference = analytics.subscribe;
export const setAnalyticsPreference = analytics.setPreference;
export const trackEvent = analytics.trackEvent;

