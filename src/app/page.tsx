import { redirect } from "next/navigation";

import { defaultLocale } from "@/src/i18n";

interface Props {}

const IndexPage: React.JSXElementConstructor<Props> = (props: Props) => {
  redirect(`/${defaultLocale}`);
};

export default IndexPage;
