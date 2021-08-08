import React,{useEffect} from "react";
import './App.css';
import Header from "./Header";
import Checkout from "./Checkout";
import Home from "./Home";
import Login from "./Login";
import {BrowserRouter as Router, Switch, Route}
from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import {loadStripe} from "@stripe/stripe-js";

import {Elements} from"@stripe/react-stripe-js";
import Orders from "./Orders";

const promise =loadStripe("pk_test_51JEIjtSBg7COC17ElRZ0FG68oqRZO8bcfC7Q3LMhI6neJqCYNMfHylbnEeIxMWv6EPKsoVmgTYRY2DR4h558ZYu700b94bO98a");


function App() {
  const [{},dispatch] = useStateValue(); 
  useEffect(() =>{
      //Will only run once when the app component loads....
      auth.onAuthStateChanged(authUser =>{
        console.log('THE USER IS >>> ',authUser);

        if(authUser){
          //The user just logged in/ the user was logged in
            dispatch({
              type:'SET_USER',
              user:authUser
            })
        }
        else{
          //The user has logged out
          dispatch({
            type:'SET_USER',
            user:null
          })
        }
      })
  },[])

  return (
  <Router>
    <div className="App">
      <Switch>
      <Route path="/login">
          <Login/>
      </Route>
      <Route path="/payment">
          <Header/>
          <Elements stripe={promise}>
              <Payment/>
          </Elements>
      </Route>
      <Route path="/orders">
      <Header/>
      <Orders/>
      </Route>
      <Route path="/checkout">
          <Header/>
          <Checkout/>
      </Route>
        <Route path="/">
        <Header/>
          <Home/>
      </Route>
      
      </Switch>
     
      {/* Home  */}
    </div>
  </Router>
  );
}

export default App;
