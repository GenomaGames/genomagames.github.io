/// <reference types="next-images" />

// https://next-intl-docs.vercel.app/docs/workflows/typescript
type Messages = typeof import("./i18n/en.json");
declare interface IntlMessages extends Messages {}
