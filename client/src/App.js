import './App.css';
import {BrowserRouter as Router, Route, Switch, Routes} from 'react-router-dom';
import Basicscreen from './components/Basicscreen';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Basicscreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
