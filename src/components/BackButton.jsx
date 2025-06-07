// css import
import '../index.css'

// react functionalities import 


// pages import


// components import


// hooks import


// images import
import backImage from './assets/images/back.png';


function BackButton({size}) {

  const handleClick = () => {
		window.history.back();
	}

  return (
    <button className='back-button-outer' onClick={handleClick} style={{ height: size + 'px', width: size + 'px' }}>
      <img src={backImage} />
    </button>
  );
}

export default BackButton;
