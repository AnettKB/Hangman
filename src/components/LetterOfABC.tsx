interface Props {
  letter: string;
  handleChoosedLetter: (letter: string) => void;

  status: string;
}
const LetterOfABC = ({ letter, status, handleChoosedLetter }: Props) => {
  return (
    <button
      onClick={() => {
        handleChoosedLetter(letter);
      }}
      className={`letter_btn ${
        status === "correct" ? "btn_green" : status === "wrong" ? "btn_red" : ""
      }`}
      disabled={status !== "choosable"}
    >
      {letter}
    </button>
  );
};

export default LetterOfABC;
