
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import  About from './components/About';

function App() {
  return (
    <>
    <Router>
    <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          
          
        </Switch>
    <Navbar></Navbar>
    <Home></Home>
    </Router>
    </>
  );
}

export default App;
