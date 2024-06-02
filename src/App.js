import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { Auth } from './pages/auth/index';
import { Journal } from './pages/journal/index';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth/>}/>
          <Route path="/journal" element={<Journal/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
