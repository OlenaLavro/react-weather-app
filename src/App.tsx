import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import { HomePage } from './pages/HomePage';
import { CityPage } from './pages/CityPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/weather' element={<HomePage />} />
        <Route path='/weather/:city' element={<CityPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
