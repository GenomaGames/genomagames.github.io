import { redirect } from "next/navigation";

import { routing } from "@/src/i18n/routing";

type Props = object;

const IndexPage: React.JSXElementConstructor<Props> = (_props: Props) => {
  redirect(`/${routing.defaultLocale}`);
};

export default IndexPage;
