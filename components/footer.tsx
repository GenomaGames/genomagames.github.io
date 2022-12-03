import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {}

const Footer: React.JSXElementConstructor<Props> = () => {
  return (
    <footer className="mt-auto h-12 w-full bg-gradient-to-br from-slate-800 to-gray-900 shadow-md shadow-black">
      <div className="container mx-auto flex h-full max-w-5xl items-center px-4">
        <div className="text-xs text-slate-400">
          {process.env.NEXT_PUBLIC_COPYRIGHT}
        </div>
        <a
          className="ml-auto flex h-8 w-8 items-center justify-center justify-self-end rounded bg-emerald-800"
          href="#top"
        >
          <FontAwesomeIcon icon={faArrowUp} />
          <span className="sr-only">Scroll to top</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
