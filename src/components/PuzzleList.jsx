// css import
import '../index.css'

// react functionalities import 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// pages import


// components import
import Button from './Button';


// hooks import


function PuzzleList() {

  const navigate = useNavigate();

  const [difficulty,setDifficulty] = useState('easy');
  const [puzzles,setPuzzles] = useState((localStorage.getItem(`${difficulty}user-puzzles`)) ? JSON.parse(localStorage.getItem(`${difficulty}user-puzzles`)) : []);

  const deletePuzzle = (i) => {
    const newPuzzles = [...puzzles];
    newPuzzles.splice(i, 1);
    localStorage.setItem(`${difficulty}user-puzzles`,JSON.stringify(newPuzzles));
    setPuzzles(newPuzzles);
  };

  const editPuzzle = (i) => {
    localStorage.setItem(`${difficulty}canvasTitleEdit`,puzzles[i].title);
    localStorage.setItem(`${difficulty}canvasValuesEdit`,JSON.stringify(puzzles[i].grid));
    localStorage.setItem(`${difficulty}editIndex`,i);
    navigate(`/canvas/${difficulty}/edit`);
  }

  const playPuzzle = (i) => {
    localStorage.setItem(`${difficulty}puzzle`,JSON.stringify(puzzles[i]));
    localStorage.setItem(`${difficulty}values`,JSON.stringify(initValues(difficulty)));
    navigate(`/game/${difficulty}`);
  }

  const handleDifficulty = (diff) => {
    if( diff == difficulty ) return;
    setDifficulty(diff);
    setPuzzles((localStorage.getItem(`${diff}user-puzzles`)) ? JSON.parse(localStorage.getItem(`${diff}user-puzzles`)) : []);
  };

  return (
    <div className="canvas-list-puzzles-outer">
      <div className='canvas-list-difficulty-buttons'>
        <Button text='easy' action={() => {handleDifficulty('easy')}} height={60} />
        <Button text='medium' action={() => {handleDifficulty('medium')}} height={60} />
        <Button text='hard' action={() => {handleDifficulty('hard')}} height={60} />
      </div>
      <div className='puzzle-list-outer'>
        { puzzles.length == 0 ? <span>No {difficulty} puzzles created!</span> : null}
        {
          puzzles.map((puzzle,i) => (
            <PuzzleCard key={crypto.randomUUID()} title={puzzle.title} deleteAction={()=>{deletePuzzle(i)}} editAction={()=>{editPuzzle(i)}} playAction={()=>{playPuzzle(i)}} values={puzzle.grid}/>
          ))
        }
      </div>
    </div>
  );
}

function PuzzleCard({title,deleteAction,editAction,playAction,values}) {
  return (
    <div className='puzzle-card-outer'>
      <div className='puzzle-card-left'>
        <div className='puzzle-card-left-top'>
          <h2>{title}</h2>
          <button className='puzzle-card-edit-button' onClick={()=>{editAction()}}></button>
          <button className='puzzle-card-delete-button' onClick={()=>{deleteAction()}}></button>
        </div>
        <div className='puzzle-card-left-bottom'>
          <Button action={()=>{playAction()}} text='Play' height={50} />
        </div>
      </div>
      <div className='puzzle-card-right'>
        <PuzzleGrid values={values}/>
      </div>
    </div>
  );
}

function PuzzleGrid({values}) {
  
  return (
    <div className='puzzle-grid-outer'>
      <div className='board-grid'>
      {
        values.map((row) => (
          <div className='grid-row' key={crypto.randomUUID()}>
            {
              row.map((cellValue) => (
                <GridCell
                  value={cellValue} key={crypto.randomUUID()}
                />
              ))
            }
          </div>
        ))
      }
      </div>
    </div>
  );  
}

function GridCell({value}) {

  const classValue = (value == 1) ? 'fill' : 'empty';

    return (
        <div
          className={'grid-cell ' + classValue}
        >
          <div></div>
        </div>
    );
}

function initValues(difficulty) {
  const n = (difficulty == 'hard') ? 15 : (difficulty == 'easy') ? 5 : 10;
  const values = [];
  for( let i = 0; i < n; i++) {
    values.push([]);
    for( let j = 0; j < n; j++) {
      values[i].push(0);
    }
  }
  return values;
}

export default PuzzleList;
