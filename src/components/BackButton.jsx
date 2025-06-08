// css import
import '../index.css'

// react functionalities import 


// pages import


// components import


// hooks import


// images import


function BackButton({size}) {

  const handleClick = () => {
		window.history.back();
	}

  return (
    <button className='back-button-outer' onClick={handleClick} style={{ height: size + 'px', width: size + 'px' }}>
    </button>
  );
}

export default BackButton;
