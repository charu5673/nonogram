// css import
import '../index.css'

// react functionalities import 


// pages import


// components import


// hooks import


function WinPopup({win}) {

  const text = (win == 'win') ? "You have won the game! :D" : "Not quite! Try again :)";

  return (
    <div className='win-popup'>
      {text}
    </div>
  );
}

export default WinPopup;
