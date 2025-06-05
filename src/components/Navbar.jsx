// css import
import '../index.css'

// react functionalities import 


// pages import


// components import
import WrappedTitle from './WrappedTitle';
import ThemeButton from './ThemeButton';


// hooks import


function Navbar() {

  return (
    <div className='navbar-outer'>
      <WrappedTitle wrappedFlag={false} fontSize='70px'/>
      <ThemeButton />
    </div>
  );
}

export default Navbar;
