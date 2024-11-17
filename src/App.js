import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Films from './components/Films';
import FilmDetails from './components/FilmDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Films />} />
        <Route path="/films/:id" element={<FilmDetails />} />
      </Routes>
    </Router>
  );
}

export default App;