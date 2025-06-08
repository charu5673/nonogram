// css import
import '../index.css'

// react functionalities import 


// pages import


// components import
import WrappedTitle from './WrappedTitle';
import ThemeButton from './ThemeButton';
import BackButton from './BackButton';


// hooks import


function Navbar() {

  return (
    <div className='navbar-outer'>
      <WrappedTitle wrappedFlag={false} fontSize='70px'/>
      <BackButton size={50} />
      <ThemeButton />
    </div>
  );
}

export default Navbar;
