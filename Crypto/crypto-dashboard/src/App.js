import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Homepage  from './Pages/Homepage';
import Coinpage from './Pages/Coinpage';
import Alert from './Components/Alert/Alert';
import './App.css';
import 'react-alice-carousel/lib/alice-carousel.css';

function App() {
  return (
    <BrowserRouter>
    <div className="coin-app">
      <Header />
      <Routes>
        {/*<Route path="/" element={<Homepage />} exact/>*/}
        <Route path="/crypto-dashboard-v2/" element={<Homepage />} exact/>
        <Route path="/crypto-dashboard-v2/coins/:id" element={<Coinpage />} />
      </Routes>
      <Alert />
      </div>
    </BrowserRouter>
  );
}

export default App;
