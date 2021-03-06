import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import Header from './components/Header'
import Home from './components/Home'
import City from './components/City'
import ChangeCity from './components/ChangeCity'
import FavoritesCity from './components/FavoritesCity'
import { Container } from 'react-bootstrap'

function App() {
   return (
      <Router>
         <Container>
            <Header />
            <Switch>
               <Route path="/" exact component={Home} />
               <Route path="/change-current-city" exact component={ChangeCity} />
               <Route path="/favorites-city" exact component={FavoritesCity} />
               <Route path="/city/:id" component={City} />
               {/* <Route component={NotFound} /> */}
               <Redirect to="/" />
            </Switch>
         </Container>
      </Router>
   );
}

export default App;