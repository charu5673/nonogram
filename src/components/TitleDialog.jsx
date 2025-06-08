// css import
import '../index.css'

// react functionalities import 
import { useState } from 'react';


// pages import


// components import
import Button from './Button';


// hooks import


function TitleDialog({setTitleFlag, updateTitle, titleText}) {

  const [title, setTitle] = useState(titleText);

	const handleChange = (e) => {
		setTitle(e.target.value);
	}

	const handleSubmit = () => {
		updateTitle(title);
		setTitleFlag(false);
	}

	const handleOuterClick = () => {
		setTitleFlag(false);
	}

	const handleInnerClick = (e) => {
		e.stopPropagation();
	}

  return (
    <div className='title-dialog-outer' onClick={handleOuterClick}>
      <div className='title-dialog' onClick={handleInnerClick}>
        <span>Enter title: </span>
        <input onChange={handleChange} type='text' value={title}></input>
        <Button text='Set' action={handleSubmit} height={50} />
      </div>
    </div>
  );
}

export default TitleDialog;
