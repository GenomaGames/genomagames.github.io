import { ParsedUrlQuery } from "node:querystring";

import { locales } from "@/src/i18n";

interface Params extends ParsedUrlQuery {
  locale: string;
}

interface Props extends React.PropsWithChildren {
  params: Params;
}

export const generateStaticParams = async (): Promise<Params[]> => {
  const staticParams: Params[] = locales.map((locale) => ({ locale }));

  return staticParams;
};

const LocaleLayout: React.JSXElementConstructor<Props> = ({
  children,
}: Props) => {
  return <>{children}</>;
};

export default LocaleLayout;
