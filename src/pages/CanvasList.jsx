// css import
import '../index.css'

// react functionalities import 


// pages import


// components import
import Navbar from '../components/Navbar';
import PuzzleList from '../components/PuzzleList';

// hooks import


function CanvasList() {

  return (
    <div className='canvas-list-outer'>
      <Navbar createdFlag={false}/>
      <PuzzleList />
    </div>
  );
}

export default CanvasList;
