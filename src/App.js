import './index.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Create from './components/Create';
import OrderDetails from './components/OrderDetails';
import EditOrder from './components/EditOrder';
import FilteredOrders from './components/FilteredOrders';
import NotFound from './components/NotFound';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="app-container">
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className = "content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/orders/filter" element={<FilteredOrders />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<EditOrder />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
