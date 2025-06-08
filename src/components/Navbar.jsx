// css import
import '../index.css'

// react functionalities import 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// pages import


// components import
import WrappedTitle from './WrappedTitle';
import ThemeButton from './ThemeButton';
import BackButton from './BackButton';
import SettingsButton from './SettingsButton';
import SettingsDialog from './SettingsDialog';
import Button from './Button';


// hooks import


function Navbar() {

  const navigate = useNavigate();

  const [dialogFlag, setDialogFlag] = useState(false);

  return (
    <div className='navbar-outer'>
      <WrappedTitle wrappedFlag={false} fontSize='70px'/>
      <BackButton size={50} />
      <Button text='created' height={55} width={150} action={()=>{navigate('/canvas-list')}} />
      <ThemeButton />
      <SettingsButton size={50} updateSettingsDialogFlag={setDialogFlag} />
      { dialogFlag ? <SettingsDialog setSettingsFlag={setDialogFlag} /> : null}
    </div>
  );
}

export default Navbar;
