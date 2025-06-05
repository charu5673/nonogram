// css import
import '../index.css'

// react functionalities import 


// pages import


// components import


// hooks import


function WrappedTitle({wrappedFlag, fontSize}) {

  return (
    <div className="wrapped-title" style={{ flexDirection: wrappedFlag ? 'column' : 'row' }}>
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
