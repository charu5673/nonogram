// css import
import '../index.css'

// react functionalities import 
import { useEffect, useCallback, useState } from 'react';

// pages import


// components import


// hooks import


function GameBoard({puzzleValue, updateGrid, winState, leftMouseDownFlag, rightMouseDownFlag, updateLeft, updateRight, clearRightFlag, updateClearRight, clearLeftFlag, updateClearLeft, handleGameState, gameState}) {

  return (
    <Board
      horizontalClues={puzzleValue.horizontalClues}
      verticalClues={puzzleValue.verticalClues}
      values={puzzleValue.values}
      updateGrid={(position,value,leftFlag) => updateGrid(position,value,leftFlag)}
      winState={winState}
      leftMouseDownFlag={leftMouseDownFlag}
      rightMouseDownFlag={rightMouseDownFlag}
      updateLeft={(flag) => updateLeft(flag)}
      updateRight={(flag) => updateRight(flag)}
      clearLeftFlag={clearLeftFlag}
      clearRightFlag={clearRightFlag}
      updateClearLeft={(flag) => {updateClearLeft(flag)}}
      updateClearRight={(flag) => {updateClearRight(flag)}}
      handleGameState={(flag) => {handleGameState(flag)}}
      gameState={gameState}
    />
  );
}

function Board({horizontalClues,verticalClues,values, updateGrid, winState, leftMouseDownFlag, rightMouseDownFlag, updateLeft, updateRight, clearRightFlag, updateClearRight, clearLeftFlag, updateClearLeft, handleGameState, gameState}) {
  
  let [rowStates, setRowStates] = useState(initClueState(horizontalClues.length));
  let [colStates, setColStates] = useState(initClueState(verticalClues.length));

  const checkRowState = useCallback((row) => {
    let clue = [...horizontalClues[row]];
    let curr = 0;
    let checkArr = [];
    for( let i = 0; i < values.length; i++ ) {
      if(values[row][i] == 1) {
        curr++;
      } else {
        if(curr > 0) {
          checkArr.push(curr);
          curr = 0;
        }
      }
    }
    if(curr > 0)
      checkArr.push(curr);
    if(checkArr.length != clue.length) {
      if(rowStates[row] == true) {
        const newRowStates = [...rowStates];
        newRowStates[row] = false;
        setRowStates(newRowStates);
      }
      return false;
    }
    for( let i = 0; i < checkArr.length; i++ ) {
      if(clue[i] != checkArr[i]) {
        if(rowStates[row] == true) {
          const newRowStates = [...rowStates];
          newRowStates[row] = false;
          setRowStates(newRowStates);
        }
        return false;
      }
    }
    if(rowStates[row] == false) {
      const newRowStates = [...rowStates];
      newRowStates[row] = true;
      setRowStates(newRowStates);
      return true;
    }
    return rowStates[row];
  }, [horizontalClues, values, rowStates]);

  const checkColState = useCallback((col) => {
    let clue = [...verticalClues[col]];
    let curr = 0;
    let checkArr = [];
    for( let i = 0; i < values.length; i++ ) {
      if(values[i][col] == 1) {
        curr++;
      } else {
        if(curr > 0) {
          checkArr.push(curr);
          curr = 0;
        }
      }
    }
    if(curr > 0)
      checkArr.push(curr);
    if(checkArr.length != clue.length) {
      if(colStates[col] == true) {
        const newColStates = [...colStates];
        newColStates[col] = false;
        setColStates(newColStates);
      }
      return false;
    }
    for( let i = 0; i < checkArr.length; i++ ) {
      if(clue[i] != checkArr[i]) {
        if(colStates[col] == true) {
          const newColStates = [...colStates];
          newColStates[col] = false;
          setColStates(newColStates);
        }
        return false;
      }
    }
    if(colStates[col] == false) {
      const newColStates = [...colStates];
      newColStates[col] = true;
      setColStates(newColStates);
      return true;
    }
    return colStates[col];
  }, [verticalClues, values, colStates]);

  useEffect(()=>{
    let gameWonFlag = true;
    for(let i = 0; i<values.length; i++) {
      let flag = checkRowState(i);
      if(!flag) gameWonFlag = false;
      flag = checkColState(i);
      if(!flag) gameWonFlag = false;
    }
    if( gameWonFlag != gameState) {
      handleGameState(gameWonFlag);
    }
  },[values, checkColState, checkRowState, handleGameState, gameState]);
  
  return (
    <div className='board-outer-div'>
      <Clues clues={verticalClues} orientation="vertical" states={colStates}/>
      <Clues clues={horizontalClues} orientation="horizontal" states={rowStates}/>
      <Grid values={values}
        updateGrid={(position,value,leftFlag) => updateGrid(position,value,leftFlag)}
        winState={winState}
        leftMouseDownFlag={leftMouseDownFlag}
        rightMouseDownFlag={rightMouseDownFlag}
        updateLeft={(flag) => updateLeft(flag)}
        updateRight={(flag) => updateRight(flag)}
        clearLeftFlag={clearLeftFlag}
        clearRightFlag={clearRightFlag}
        updateClearLeft={(flag) => {updateClearLeft(flag)}}
        updateClearRight={(flag) => {updateClearRight(flag)}}
      />
    </div>
  );
}

function Clues({clues,orientation,states}) {

  const size = clues.length == 5 ? 25 : clues.length == 10 ? 20 : 15;
  
  return (
    <div className={orientation+'-clues'}>{
      clues.map((clue,i) => (
        <div className={orientation+'-clue' + ' ' + ((states[i]) ? 'done' : '')} key={crypto.randomUUID()}>
          {
            clue.map((clueValue) => (
              <div className='clue-value' key={crypto.randomUUID()} style={{ width: `${size}px`, height: `${size}px` }}>
                {clueValue}
              </div>
            ))
          }
        </div>
      ))}
    </div>
  );
}

function Grid({values, updateGrid, winState, leftMouseDownFlag, rightMouseDownFlag, updateLeft, updateRight, clearRightFlag, updateClearRight, clearLeftFlag, updateClearLeft}) {
  return (
    <div className='board-grid'>
      {
        values.map((row,i) => (
          <div className='grid-row' key={crypto.randomUUID()}>
            {
              row.map((cellValue,j) => (
                <GridCell
                  value={cellValue} key={crypto.randomUUID()}
                  position={[i,j]}
                  updateGrid={(position,value,leftFlag)=>updateGrid(position,value,leftFlag)}
                  winState={winState}
                  leftMouseDownFlag={leftMouseDownFlag}
                  rightMouseDownFlag={rightMouseDownFlag}
                  updateLeft={(flag) => updateLeft(flag)}
                  updateRight={(flag) => updateRight(flag)}
                  clearLeftFlag={clearLeftFlag}
                  clearRightFlag={clearRightFlag}
                  updateClearLeft={(flag) => {updateClearLeft(flag)}}
                  updateClearRight={(flag) => {updateClearRight(flag)}}
                  padding={(values.length == 15) ? 5 : ((values.length == 5) ? 20 : 10)}
                />
              ))
            }
          </div>
        ))
      }
    </div>
  );  
}

function GridCell({value, position, updateGrid, winState, leftMouseDownFlag, rightMouseDownFlag, updateLeft, updateRight, clearRightFlag, updateClearRight, clearLeftFlag, updateClearLeft, padding}) {

  const handleClick = () => {
    if(value != 1) {
      updateGrid(position,1);
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    if(value != -1 && (value != 1 || !rightMouseDownFlag) && !clearRightFlag) {
      updateGrid(position,-1);
    }
  };

  const handleMouseOver = () => {
    if(leftMouseDownFlag && value == 0) {
      updateGrid(position,1);
    } else if(rightMouseDownFlag && value == 0) {
      updateGrid(position,-1);
    } else if(clearLeftFlag && value == 1) {
      updateGrid(position,0);
    } else if(clearRightFlag && value == -1) {
      updateGrid(position,0);
    }
  }

  const handleMouseDown = (e) => {
    if(e.button == 0 && value == 0) {
      updateLeft(true);
    } else if(e.button == 2 && value == 0) {
      updateRight(true);
    } else if(e.button == 0 && value == 1) {
      updateClearLeft(true);
    } else if(e.button == 2 && value == -1) {
      updateClearRight(true);
    }
  }

  const classValue = (value == 1) ? 'fill' : (value == -1) ? 'crossed' : 'empty';
  const winValue = (winState == 'win') ? 'win' : '';
  const animationDelay = position[0] + position[1];

    return (
        <div
          className={'grid-cell ' + classValue + ' ' + winValue}
          onClick={handleClick}
          onContextMenu={handleRightClick}
          style={{animationDelay: `${animationDelay*0.1}s`, padding: `${padding}px`}}
          onMouseOver={handleMouseOver}
          onMouseDown={handleMouseDown}
        >
          <div></div>
        </div>
    );
}

function initClueState(n) {
  const newState = [];
  for( let i = 0; i < n; i++ ) {
    newState.push(false);
  }
  return newState;
}

export default GameBoard;
