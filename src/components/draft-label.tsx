import { faHammer, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  isDraft: boolean;
};

const DraftLabel = ({ isDraft }: Props) => {
  return (
    <>
      {isDraft && (
        <div
          className="absolute right-0 top-0 z-10 w-8 rounded-bl-md rounded-tr-md bg-indigo-700 text-center"
          title="Work in progress"
        >
          <FontAwesomeIcon icon={faHammer} />
        </div>
      )}
    </>
  );
};

export default DraftLabel;
