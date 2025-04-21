import { redirect } from "next/navigation";

import { routing } from "@/src/i18n/routing";

interface Props {}

const IndexPage: React.JSXElementConstructor<Props> = (props: Props) => {
  redirect(`/${routing.defaultLocale}`);
};

export default IndexPage;
