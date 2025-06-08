// css import
import '../index.css'

// react functionalities import 


// pages import


// components import


// hooks import


function CanvasGrid({values, updateGrid, leftMouseDownFlag, updateLeft, clearLeftFlag, updateClearLeft, title}) {
  
  return (
    <div className='canvas-grid-outer'>
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
                  leftMouseDownFlag={leftMouseDownFlag}
                  updateLeft={(flag) => updateLeft(flag)}
                  clearLeftFlag={clearLeftFlag}
                  updateClearLeft={(flag) => {updateClearLeft(flag)}}
                  padding={(values.length == 15) ? 5 : ((values.length == 5) ? 20 : 10)}
                />
              ))
            }
          </div>
        ))
      }
      </div>
      <div className='canvas-title'>{title}</div>
    </div>
  );  
}

function GridCell({value, position, updateGrid, leftMouseDownFlag, updateLeft, clearLeftFlag, updateClearLeft, padding}) {

  const handleClick = () => {
    if(value != 1) {
      updateGrid(position,1);
    }
  };

  const handleMouseOver = () => {
    if(leftMouseDownFlag && value == 0) {
      updateGrid(position,1);
    } else if(clearLeftFlag && value == 1) {
      updateGrid(position,0);
    }
  }

  const handleMouseDown = (e) => {
    if(e.button == 0 && value == 0) {
      updateLeft(true);
    } else if(e.button == 0 && value == 1) {
      updateClearLeft(true);
    }
  }

  const classValue = (value == 1) ? 'fill' : 'empty';
  const animationDelay = position[0] + position[1];

    return (
        <div
          className={'grid-cell ' + classValue}
          onClick={handleClick}
          style={{animationDelay: `${animationDelay*0.1}s`, padding: `${padding}px`}}
          onMouseOver={handleMouseOver}
          onMouseDown={handleMouseDown}
        >
          <div></div>
        </div>
    );
}

export default CanvasGrid;
