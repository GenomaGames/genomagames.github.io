import { ParsedUrlQuery } from "node:querystring";

import { setRequestLocale } from "next-intl/server";

import HomeDashboard from "./home-dashboard";

interface Params extends ParsedUrlQuery {
  locale: string;
}

interface Props {
  params: Promise<Params>;
}

const LayoutPage: React.JSXElementConstructor<Props> = async (props: Props) => {
  const { locale } = await props.params;

  setRequestLocale(locale);

  return <HomeDashboard />;
};

export default LayoutPage;
