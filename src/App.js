import './index.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Create from './components/Create';
import OrderDetails from './components/OrderDetails';
import EditOrder from './components/EditOrder';
import FilteredOrders from './components/FilteredOrders';
import NotFound from './components/NotFound';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="app-container">
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className = "content">
          <Switch>
            <Route exact path="/hamro-ghar/">
              <Home />
            </Route>
            <Route path="/hamro-ghar/orders/filter">
              <FilteredOrders />
            </Route>
            <Route path="/hamro-ghar/create">
              <Create />
            </Route>
            <Route path="/hamro-ghar/edit/:id">
              <EditOrder />
            </Route>
            <Route path="/hamro-ghar/orders/:id">
              <OrderDetails />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
