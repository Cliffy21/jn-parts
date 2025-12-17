// Temporary shims for Vercel packages.
//
// Reason: `@vercel/analytics` (and sometimes `@vercel/speed-insights`) ship
// `.d.ts` files for subpath entrypoints like `@vercel/analytics/next`, but their
// `package.json` export map does not include a `types` condition for those
// subpaths. With TypeScript `moduleResolution: "bundler"`, this can surface as:
// "Cannot find module '@vercel/analytics/next' or its corresponding type declarations."
//
// These shims unblock typechecking without changing runtime behavior.

declare module "@vercel/analytics/next" {
  interface PageViewEvent {
    type: "pageview";
    url: string;
  }

  interface CustomEvent {
    type: "event";
    url: string;
  }

  export type BeforeSendEvent = PageViewEvent | CustomEvent;
  export type Mode = "auto" | "development" | "production";
  export type BeforeSend = (event: BeforeSendEvent) => BeforeSendEvent | null;

  export interface AnalyticsProps {
    beforeSend?: BeforeSend;
    debug?: boolean;
    mode?: Mode;
    scriptSrc?: string;
    endpoint?: string;
    dsn?: string;
  }

  export function Analytics(
    props: Omit<AnalyticsProps, "route" | "disableAutoTrack">,
  ): null;
}

declare module "@vercel/speed-insights/next" {
  export interface SpeedInsightsProps {
    debug?: boolean;
    // The package supports additional props; we only need a minimal surface for layout usage.
    [key: string]: unknown;
  }

  export function SpeedInsights(props: SpeedInsightsProps): null;
}





