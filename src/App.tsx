import { useEffect, useState } from "react";
import ABC from "./components/ABC";
import Letter from "./components/Letter";
import LetterModel from "./components/LetterModel";
import LetterOfABCModel from "./components/LetterOfABCModel";
import Hangman from "./components/Hangman";

function App() {
  const [wordLetters, setWordLetters] = useState<LetterModel[]>([]);

  // külső hívást nem csináltam, csak létrehoztam egy pár szavas tömböt,
  //de egyébként itt egy fetch - nek kellene szerepelnie
  const wordList = [
    "ablakkeret",
    "programozó",
    "népszavazás",
    "törökfürdő",
    "várárok",
    "terepjáró",
    "rakodómunkás",
  ];

  const abc = [
    "A",
    "Á",
    "B",
    "C",
    "D",
    "E",
    "É",
    "F",
    "G",
    "H",
    "I",
    "Í",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "Ó",
    "Ö",
    "Ő",
    "P",
    "R",
    "S",
    "T",
    "U",
    "Ú",
    "Ü",
    "Ű",
    "V",
    "Y",
    "Z",
  ];
  // az ABC alapján a választható betű objektumok létrehozása. Az id azért lehet az index,
  //mert a program közben sem a betűk sorrendje nem változik, sem törlés, sem hozzáadás
  //nem történik, így az index egyértelmű azonosítást jelent, nincs szükség egyedi id létrehozására.
  // Ez érvényes lesz a letterList-re és wordLetters-re is.
  const abcObjects = abc.map((item, index) => ({
    id: index,
    value: item,
    state: "game_over",
  }));

  const [letterList, setLetterList] = useState<LetterOfABCModel[]>(abcObjects);
  const [counter, setCounter] = useState<number>(0);
  const [win, setWin] = useState(false);

  // új játék kérése gomb: indítja a játékot, és resetel mindent, ha vége az adott játéknak
  const handleNewGame = () => {
    let index = Math.floor(Math.random() * wordList.length);
    let randomWord = wordList[index].toUpperCase();
    let letters = randomWord.split("");
    setWordLetters(
      letters.map((item, index) => ({
        id: index,
        letter: item,
        isVisible: false,
        gameOver: false,
      }))
    );
    setLetterList((letterList) =>
      letterList.map((item) => ({ ...item, state: "choosable" }))
    );
    setCounter(0);
    setWin(false);
  };

  // egy betű kiválasztásakor ellenőrzi, hogy tartalmazza-e a szó a betűt, majd ennek megfeleően
  // állítja be a szóban és a betű gombokon is a státuszokat, továbbá ellenőrzi,
  //hogy nincs-e vége a játéknak, és állít a hibaszámlálón
  const handleChoosedLetter = (letter: string) => {
    setWordLetters((wordLetters) =>
      wordLetters.map((item) =>
        item.letter === letter ? { ...item, isVisible: true } : item
      )
    );
    if (wordLetters.some((item) => item.letter === letter)) {
      setLetterList((letterList) =>
        letterList.map((item) =>
          item.value === letter ? { ...item, state: "correct" } : item
        )
      );
    } else {
      setLetterList((letterList) =>
        letterList.map((item) =>
          item.value === letter ? { ...item, state: "wrong" } : item
        )
      );
      setCounter((counter) => counter + 1);
    }
    handleGameOver();
  };
  // Játék vége ellenőrzés ( vesztes): ha a hibák száma eléri határértéket, akkor game over
  const handleGameOver = () => {
    if (counter === 9) {
      setLetterList((letterList) =>
        letterList.map((item) =>
          item.state === "choosable" ? { ...item, state: "game_over" } : item
        )
      );
      setWordLetters((wordLetters) =>
        wordLetters.map((item) =>
          !item.isVisible ? { ...item, isVisible: true, gameOver: true } : item
        )
      );
    }
  };

  // játék vége ellenőrzés ( nyertes) : egy Effect hook hívja meg, mert értéke egy másik
  // hooktól függ, de azonos funkcióvan nem ellenőrizhető azok egyidejűsége miatt
  const handleWin = () => {
    if (
      wordLetters.every((item) => item.isVisible) &&
      !wordLetters.some((item) => item.gameOver)
    ) {
      setLetterList((letterList) =>
        letterList.map((item) =>
          item.state === "choosable" ? { ...item, state: "game_over" } : item
        )
      );

      if (wordLetters.length > 0) setWin(true);
    }
  };
  // meghívja a nyerést ellenőrző függvényt minden betűválasztás után
  useEffect(() => {
    handleWin();
  }, [wordLetters]);

  return (
    <div className="container-fluid">
      <div className="row mx-0">
        <div className="col d-flex flex-column align-items-center me-5 ms-5">
          <h1 className="mt-4">Hangman Game</h1>
          <button
            className="btn btn-outline-secondary my-4 btn_newGame"
            onClick={handleNewGame}
          >
            New Game
          </button>
          <div className="choosen-word my-2">
            {wordLetters.map((item) => (
              <Letter key={item.id} letter={item} />
            ))}
          </div>
          <ABC
            letterList={letterList}
            handleChoosedLetter={handleChoosedLetter}
          />
          {counter === 10 && (
            <h2 className="mt-3 fs-1 game_over">GAME OVER!!!</h2>
          )}
          {win && <h2 className="mt-3 fs-1 winner">YOU WON!</h2>}
        </div>

        <div className="col">
          <Hangman counter={counter} />
        </div>
      </div>
    </div>
  );
}

export default App;
