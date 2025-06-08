// css import
import '../index.css'

// react functionalities import 
import { useState } from 'react';


// pages import


// components import
import Button from './Button';
import Popup from './Popup';


// hooks import


function SettingsDialog({setSettingsFlag}) {

	const [settings, updateSettings] = useState(JSON.parse(localStorage.getItem('userSettings')));
	const [popupFlag, setPopupFlag] = useState(false);
	const [missingPopupFlag, setMissingPopupFlag] = useState(false);

	const userPuzzlesFlag = initFlag();

  const handleSubmit = () => {
    localStorage.setItem('userSettings',JSON.stringify(settings));
    setSettingsFlag(false);
  }

  const handleOuterClick = () => {
    setSettingsFlag(false);
  }

  const handleInnerClick = (e) => {
    e.stopPropagation();
  }

	const handleInBuiltChange = (e) => {
		if(settings.includeInBuilt && !settings.includeUser) {
			setPopupFlag(true);
			setTimeout(() => {
				setPopupFlag(false);
			}, 3000);
			e.target.checked = true;
			return;
		}
		updateSettings(prev => ({
      ...prev,
      includeInBuilt: e.target.checked
    }));
	}

	const handleUserChange = (e) => {
		if(!settings.includeInBuilt && settings.includeUser) {
			setPopupFlag(true);
			setTimeout(() => {
				setPopupFlag(false);
			}, 3000);
			e.target.checked = true;
			return;
		}
		if( e.target.checked && !userPuzzlesFlag ) {
			setMissingPopupFlag(true);
			setTimeout(() => {
				setMissingPopupFlag(false);
			}, 3000);
		}
		updateSettings(prev => ({
      ...prev,
      includeUser: e.target.checked
    }));
	}

  return (
    <div className='settings-dialog-outer' onClick={handleOuterClick}>
      <div className='settings-dialog' onClick={handleInnerClick}>
				<div className='settings-dialog-input'>
					<span>Include in-built puzzles: </span>
        	<input onChange={handleInBuiltChange} type='checkbox' checked={settings.includeInBuilt}></input>
				</div>
				<div className='settings-dialog-input'>
					<span>Include your puzzles: </span>
        	<input onChange={handleUserChange} type='checkbox' checked={settings.includeUser} ></input>
				</div>
        <Button text='Set' action={handleSubmit} height={50} />
      </div>
			{ popupFlag ? <Popup text={'At least one option should be selected!'}/> : null}
			{ missingPopupFlag ? <Popup text={'You have not created puzzles for one or more difficulties!'}/> : null}
    </div>
  );
}

function initFlag() {
	const midPuzzles = JSON.parse(localStorage.getItem('mediumuser-puzzles'));
	const easyPuzzles = JSON.parse(localStorage.getItem('easyuser-puzzles'));
	const hardPuzzles = JSON.parse(localStorage.getItem('harduser-puzzles'));
	if( midPuzzles && easyPuzzles && hardPuzzles ) {
		if( midPuzzles.length > 0 && easyPuzzles.length > 0 && hardPuzzles.length > 0 ) {
			return true;
		}
	}
	return false;
}

export default SettingsDialog;
