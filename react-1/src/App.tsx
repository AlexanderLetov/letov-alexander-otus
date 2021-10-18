import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import Header from './components/Header'
import Home from './components/Home'
import City from './components/City'
import ChangeCity from './components/ChangeCity'
import { Container } from 'react-bootstrap'


function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/change-current-city" exact component={ChangeCity} />
        <Route path="/city/:id" component={City} />
      </Container>
    </Router>
  );
}

export default App;