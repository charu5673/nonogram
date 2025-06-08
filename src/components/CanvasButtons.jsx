// css import
import '../index.css'

// react functionalities import 
import { useNavigate } from 'react-router-dom';

// pages import


// components import
import Button from './Button';

// hooks import


function CanvasButtons({clearBoard, submit, setTitleFlag}) {

  const navigate = useNavigate();

  return (
    <div className='canvas-buttons-outer'>
      <Button text='Title' action={() => {setTitleFlag(true)}} height={70} />
      <Button text='Submit' action={() => {submit()}} height={70} />
      <Button text='Clear' action={() => {clearBoard()}} height={70} />
      <Button text='Edit' action={() => {navigate('/canvas-list')}} height={70} />
    </div>
  );
}

export default CanvasButtons;
