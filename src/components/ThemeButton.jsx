// css import
import '../index.css'

// react functionalities import 


// pages import


// components import


// hooks import
import { useTheme } from '../hooks/useTheme.jsx';




function ThemeButton() {

  return (
    <button className='toggle-theme-button' onClick={useTheme()}>
    </button>
  );
}

export default ThemeButton;
