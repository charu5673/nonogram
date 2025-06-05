// css import
import '../index.css';

// react functionalities import 


// pages import


// components import


// hooks import


function Button({action, text, height}) {

  return (
    <button className='button-outer' onClick={() => action()} style={{height: height + "px"}}>
      <span style={{fontSize: height / 2 + "px"}}>{text}</span>
      <ButtonShape/>
      <ButtonShape/>
    </button>
  );
}

function ButtonShape() {
	return (
		<div className='button-shape-outer'>
			<div className='button-shape-longer'></div>
			<div className='button-shape-wider'></div>
		</div>
	);
}

export default Button;
