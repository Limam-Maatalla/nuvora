import { analyticsConfig } from './analyticsConfig.js';
import { mockAnalyticsProvider } from './mockAnalyticsProvider.js';
// Replace this adapter with authenticated backend calls before production use.
export const analyticsService = { provider: analyticsConfig.provider, getOverview:()=>mockAnalyticsProvider.getOverview(), getWeeklyVisitors:()=>mockAnalyticsProvider.getWeeklyVisitors(), getActivity:()=>mockAnalyticsProvider.getActivity(), getDevices:()=>mockAnalyticsProvider.getDevices() };