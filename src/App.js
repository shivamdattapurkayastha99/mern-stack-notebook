
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import  About from './components/About';
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';

function App() {
  return (
    <>
    <NoteState>
    <Router>
    <Navbar></Navbar>
    <Alert message="here are your notes"></Alert>
    <div className="container">

    
    <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          
          
        </Switch>
        </div>
    
    
    </Router>
    </NoteState>
    </>
  );
}

export default App;
