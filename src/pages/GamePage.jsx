// css import
import '../index.css'

// react functionalities import 
import { useParams } from 'react-router-dom';
import { useState } from 'react';


// pages import


// components import
import Navbar from '../components/Navbar';
import GameArea from '../components/GameArea';


// hooks import


function GamePage() {

  const { difficulty } = useParams(); 
  let [leftMouseDownFlag, setLeftMouseDownFlag] = useState(false);
  let [rightMouseDownFlag, setRightMouseDownFlag] = useState(false);
  let [clearLeftFlag, setClearLeftFlag] = useState(false);
  let [clearRightFlag, setClearRightFlag] = useState(false);

  const handleLeftMouseDrag = (flag) => {
    setLeftMouseDownFlag(flag);
  }

  const handleRightMouseDrag = (flag) => {
    setRightMouseDownFlag(flag);
  }

  const handleMouseUp = () => {
    setTimeout(()=>{
      setRightMouseDownFlag(false);
      setLeftMouseDownFlag(false);
      setClearRightFlag(false);
      setClearLeftFlag(false);
    },10);
  }

  const handleClearLeft = (flag) => {
    setClearLeftFlag(flag);
  }

  const handleClearRight = (flag) => {
    setClearRightFlag(flag);
  }

  const handleRightClick = (e) => {
    e.preventDefault();
  }

  return (
    <div className='game-page-outer' onMouseUp={handleMouseUp} onContextMenu={handleRightClick}>
      <Navbar />
      <GameArea
        difficulty = {difficulty}
        puzzleType='random'
        leftMouseDownFlag={leftMouseDownFlag}
        rightMouseDownFlag={rightMouseDownFlag}
        updateLeft={(flag) => handleLeftMouseDrag(flag)}
        updateRight={(flag) => handleRightMouseDrag(flag)}
        clearLeftFlag={clearLeftFlag}
        clearRightFlag={clearRightFlag}
        updateClearLeft={(flag) => {handleClearLeft(flag)}}
        updateClearRight={(flag) => {handleClearRight(flag)}}
      />
    </div>
  );
}

export default GamePage;
