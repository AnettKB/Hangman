import LetterModel from "./LetterModel";

interface Props {
  letter: LetterModel;
}
const Letter = ({ letter }: Props) => {
  return (
    <span className="fw-bold word_letters">
      {!letter.isVisible ? (
        <span>___</span>
      ) : (
        <span className={`${letter.gameOver ? "colored" : ""}`}>
          {letter.letter}
        </span>
      )}
    </span>
  );
};

export default Letter;
