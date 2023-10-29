interface Props {
  counter: number;
}
const Hangman = ({ counter }: Props) => {
  return (
    <>
      <div className="mb-5 mt-5">
        {counter >= 1 && (
          <div className="base">
            {counter >= 3 && <div className="horizontal"></div>}
            {counter >= 2 && <div className="vertical"></div>}
            {counter >= 4 && <div className="rope"></div>}
            {counter >= 5 && <div className="head"></div>}
            {counter >= 6 && <div className="body"></div>}
            {counter >= 7 && <div className="left-arm"></div>}
            {counter >= 8 && <div className="right-arm"></div>}
            {counter >= 9 && <div className="left-leg"></div>}
            {counter === 10 && <div className="right-leg"></div>}
          </div>
        )}
      </div>
    </>
  );
};

export default Hangman;
