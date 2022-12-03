import Meta from "@/components/meta";
import Footer from "@/components/footer";
import Header from "@/components/header";

interface Props {
  preview?: boolean;
  children: React.ReactNode;
}

const Layout: React.JSXElementConstructor<Props> = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Meta />
      <div id="top"></div>
      <Header />
      <main className="mx-auto mt-16 px-5 pt-4 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
