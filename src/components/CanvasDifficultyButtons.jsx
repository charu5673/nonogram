// css import
import '../index.css'

// react functionalities import 
import { useNavigate } from 'react-router-dom';

// pages import


// components import
import Button from './Button';

// hooks import


function CanvasDifficultyButtons({mode}) {

  const navigate = useNavigate();

  return (
    <div className='canvas-difficulty-buttons-outer'>
      <Button text='easy' action={() => {navigate(`/canvas/easy/${mode}`)}} height={70} />
      <Button text='medium' action={() => {navigate(`/canvas/medium/${mode}`)}} height={70} />
      <Button text='hard' action={() => {navigate(`/canvas/hard/${mode}`)}} height={70} />
    </div>
  );
}

export default CanvasDifficultyButtons;
