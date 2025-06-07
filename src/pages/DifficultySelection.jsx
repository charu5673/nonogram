// css import
import '../index.css'

// react functionalities import 
import { useNavigate } from 'react-router-dom';


// pages import


// components import
import WrappedTitle from '../components/WrappedTitle.jsx';
import Button from '../components/Button.jsx';
import ThemeButton from '../components/ThemeButton.jsx';
import BackButton from '../components/BackButton.jsx';


// hooks import


function DifficultySelection() {

  const navigate = useNavigate();

  return (
    <div className="difficulty-outer">
      <div className='difficulty-top-row'>
        <BackButton size={50} />
        <ThemeButton />
      </div>
      <WrappedTitle wrappedFlag={false} fontSize='150px'/>
      <div className='difficulty-buttons-row'>
        <div className='difficulty-button-outer'>
          <Button text='EASY' action={() => navigate('/game/easy')} height={70} />
          <span>5 X 5</span>
        </div>
        <div className='difficulty-button-outer'>
          <Button text='MEDIUM' action={() => navigate('/game/medium')} height={70} />
          <span>10 X 10</span>
        </div>
        <div className='difficulty-button-outer'>
          <Button text='HARD' action={() => navigate('/game/hard')} height={70} />
          <span>15 X 15</span>
        </div>
      </div>
    </div>
  );
}

export default DifficultySelection;
