import { faHammer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  isDraft: boolean;
};

const DraftLabel = ({ isDraft }: Props) => {
  return (
    <>
      {isDraft && (
        <div
          className="absolute top-0 right-0 z-10 w-8 rounded-tr-md rounded-bl-md bg-indigo-700 text-center"
          title="Work in progress"
        >
          <FontAwesomeIcon icon={faHammer} />
        </div>
      )}
    </>
  );
};

export default DraftLabel;
