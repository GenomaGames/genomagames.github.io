/// <reference types="next-images" />

// https://next-intl-docs.vercel.app/docs/workflows/typescript
type Messages = typeof import("./i18n/en.json");
type IntlMessages = Messages;

// The environment variables the site reads, named so they are typed properties
// instead of anonymous index-signature access. Each is optional because the key
// may be absent at runtime; reading it yields `string | undefined`, and every
// reader guards or defaults.
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_BASE_URL?: string;
    readonly NEXT_PUBLIC_DISQUS_SHORTNAME?: string;
    readonly NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?: string;
    readonly NEXT_PUBLIC_POSTS_PER_PAGE?: string;
    readonly NEXT_PUBLIC_SHOW_DRAFTS?: string;
    readonly NEXT_PUBLIC_SITE_DESCRIPTION?: string;
    readonly NEXT_PUBLIC_SITE_NAME?: string;
    readonly NEXT_PUBLIC_X_SHARE_POST_HASHTAGS?: string;
    readonly NEXT_PUBLIC_X_USERNAME?: string;
    readonly SUPABASE_URL?: string;
    readonly SUPABASE_SECRET_KEY?: string;
    readonly BREVO_API_KEY?: string;
    readonly BREVO_WEBHOOK_SECRET?: string;
    readonly BREVO_ALPHA_LIST_ID?: string;
    readonly BREVO_VERIFICATION_TEMPLATE_ID?: string;
  }
}
