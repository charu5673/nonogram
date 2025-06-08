// css import
import '../index.css'

// react functionalities import 
import { useNavigate } from 'react-router-dom';


// pages import


// components import


// hooks import


function WrappedTitle({wrappedFlag, fontSize}) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }

  return (
    <div className="wrapped-title" style={{ flexDirection: wrappedFlag ? 'column' : 'row' }} onClick={handleClick}>
      <div className="wrapped-title-top-text" style={{fontSize: fontSize}}>
        <span className='title-letter'>N</span>
        <span className='title-letter'>O</span>
        <span className='title-letter'>N</span>
        <span className='title-letter'>O</span>
      </div>
      <div className="wrapped-title-bottom-text" style={{fontSize: fontSize}}>
        <span className='title-letter'>G</span>
        <span className='title-letter'>R</span>
        <span className='title-letter'>A</span>
        <span className='title-letter'>M</span>
      </div>
    </div>
  );
}

export default WrappedTitle;
