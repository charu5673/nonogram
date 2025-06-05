// css import
import '../index.css'

// react functionalities import 
import { useNavigate } from 'react-router-dom';


// pages import


// components import
import Button from './Button';


// hooks import


function GameButtons({resetAction, newGameAction, submitAction}) {

  const navigate = useNavigate();

  return (
    <div className='game-buttons-outer'>
      <Button text={'RESET'} action={()=>resetAction()} height={70}/>
      <Button text={'DIFFICULTY'} action={() => navigate('/difficulty')} height={70}/>
      <Button text={'SUBMIT'} action={()=>{submitAction()}} height={70}/>
      <Button text={'NEW GAME'} action={()=>newGameAction()} height={70}/>
    </div>
  );
}

export default GameButtons;
