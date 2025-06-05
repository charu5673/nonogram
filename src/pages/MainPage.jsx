// css import
import '../index.css';

// react functionalities import 
import { useNavigate } from 'react-router-dom';


// pages import


// components import
import WrappedTitle from '../components/WrappedTitle.jsx';
import Button from '../components/Button.jsx';
import ThemeButton from '../components/ThemeButton.jsx';


// hooks import


function MainPage() {

  const navigate = useNavigate();

  return (
    <div className='main-page-outer'>
      <WrappedTitle wrappedFlag = {true} fontSize='150px' />
      <div className='main-page-bottom-row'>
        <Button action={() => navigate('/difficulty')} text="PLAY" height={50}/>
        <ThemeButton/>
      </div>
    </div>
  );
}

export default MainPage;
