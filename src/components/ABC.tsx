import LetterOfABCModel from "./LetterOfABCModel";
import LetterOfABC from "./LetterOfABC";

interface Props {
  letterList: LetterOfABCModel[];

  handleChoosedLetter: (letter: string) => void;
}

const ABC = ({ letterList, handleChoosedLetter }: Props) => {
  return (
    <div className="d-flex mt-5 flex-wrap justify-content-center letter_container">
      {letterList.map((item) => (
        <LetterOfABC
          key={item.id}
          handleChoosedLetter={handleChoosedLetter}
          letter={item.value}
          status={item.state}
        />
      ))}
    </div>
  );
};

export default ABC;
