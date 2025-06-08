// css import
import '../index.css'

// react functionalities import 


// pages import


// components import


// hooks import


// images import


function SettingsButton({updateSettingsDialogFlag, size}) {

  const handleClick = () => {
		updateSettingsDialogFlag(true);
  }

  return (
    <button className='settings-button-outer' onClick={handleClick} style={{ height: size + 'px', width: size + 'px' }}>
    </button>
  );
}

export default SettingsButton;
