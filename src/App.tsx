import { useState } from "react";
import "./App.css";

import Slot from "./components/Slot";

export type ColorsType = "black" | "white" | "green" | "yellow";

const PLAYER_INITIAL_SCORE = 10;
const MACHINE_INITIAL_SCORE = 20;
const COST_OF_PLAY = 1;
const COLORS = ["black", "white", "green", "yellow"];

function App() {
  const [slotsState, setSlotsState] = useState<ColorsType[]>([
    "black",
    "black",
    "black",
    "black",
  ]);

  const [playerScore, setPlayerScore] = useState(PLAYER_INITIAL_SCORE);
  const [machineScore, setMachineScore] = useState(MACHINE_INITIAL_SCORE);
  const [freePlays, setFreePlays] = useState(0);

  const checkJackPot = (slots: ColorsType[]) =>
    slots.every((v) => v == slots[0]);

  const checkUniqueColor = (slots: ColorsType[]) =>
    new Set(slots).size == slots.length;

  const checkAdjacent = (slots: ColorsType[]) => {
    {
      for (let i = 0; i < slots.length - 1; i++) {
        if (slots[i] == slots[i + 1]) return true;
      }

      return false;
    }
  };

  const playRound = () => {
    if (freePlays) {
      setFreePlays((f) => f - 1);
    } else {
      if (playerScore <= 0) {
        alert("not enough points");
        return;
      }
      setPlayerScore((p) => p - COST_OF_PLAY);
    }

    // the chalenge was not clear if we should add a point if played with free play 
    // so i assumed yes to keep the game flowing 
    setMachineScore((m) => m + COST_OF_PLAY);


    const slots = slotsState.map(
      () => COLORS[Math.floor(Math.random() * COLORS.length)] as ColorsType
    );

    const isJackPot = checkJackPot(slots);

    if (isJackPot) {
      setPlayerScore((p) => p + machineScore);
      setMachineScore(0);

      alert(`jackpot!! you have won ${machineScore} points`);
    }

    const isUnique = checkUniqueColor(slots);
    if (isUnique) {
      const half = machineScore / 2;
      setPlayerScore((p) => p + half);
      setMachineScore(half);

      alert(
        `you have achived a unique set and you are being rewarded with ${half} points`
      );
    }

    const isAdjacent = checkAdjacent(slots);

    if (isAdjacent) {
      const prize = 5 * COST_OF_PLAY;

      if (machineScore > prize) {
        setPlayerScore((p) => p + prize);
        setMachineScore((m) => m - prize);

        alert(
          `you have achived an adjacent set you are being rewarded ${prize} points`
        );
      } else {
        const reward = machineScore;
        const diff = prize - machineScore;

        setFreePlays((f) => f + diff);
        setPlayerScore((p) => p + reward);
        setMachineScore(0);

        alert(
          `you have won ${prize} points but the machine does not have enought points for reward so you will be rewarded with \n - ${reward} points. \n -${diff} free plays`
        );
      }
    }

    setSlotsState(slots);
  };

  return (
    <div className="App">
      <header>
        <h1>Machine Score: {machineScore}</h1>
        <h1>Free Plays: {freePlays} </h1>
        <h1>Player Score: {playerScore}</h1>
      </header>
      <div className="button">
        <button onClick={playRound}>play</button>
      </div>
      <div className="slot-machine">
        {slotsState.map((slot) => (
          <Slot color={slot} />
        ))}
      </div>
    </div>
  );
}

export default App;
