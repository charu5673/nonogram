// css import
import '../index.css'

// react functionalities import 


// pages import


// components import
import Button from './Button';

// hooks import


function CanvasButtons({clearBoard, submit, setTitleFlag}) {

  return (
    <div className='canvas-buttons-outer'>
      <Button text='Title' action={() => {setTitleFlag(true)}} height={70} />
      <Button text='Submit' action={() => {submit()}} height={70} />
      <Button text='Clear' action={() => {clearBoard()}} height={70} />
      <Button text='Edit' action={() => {}} height={70} />
    </div>
  );
}

export default CanvasButtons;
