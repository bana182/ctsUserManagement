import React from "react";
import { PearsonUsers } from "./PearsonUsers";
import { Footer } from "./components/footer/Footer";
import { Route, Redirect } from 'react-router-dom';
import { Login } from  './components/login/login';
import { Header } from './components/header/header';

export const App = () => (
  <main>
    <Header/>
    <Route path="/" exact component={PearsonUsers}/>
    <Route path="/login" component={Login}/>
    <Footer/>
  </main>
);
