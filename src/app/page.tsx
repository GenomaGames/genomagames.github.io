import { defaultLocale } from "@/src/i18n";
import { redirect } from "next/navigation";

interface Props {}

const IndexPage: React.JSXElementConstructor<Props> = (props: Props) => {
  redirect(`/${defaultLocale}`);
};

export default IndexPage;
