import React , {useState} from "react";
import "antd/dist/antd.css";
import "./App.scss";
// --- Components
import HomePage from "./components/Fullpage/HomePage"
import LogIn from "./components/logIn/Log"
import ProtectedRoute from "./components/logIn/ProtectedRoute"
import {useHistory, Redirect, Route, Switch } from "react-router-dom";

function App() {
  const [isLoged , setLogin] = useState(false);
  const [token , setToken] = useState(true);
  const [IsEditor , setprivilige] = useState(false);
  const  history = useHistory();
  return (
    <div className="App">
      <Switch>
        <Route 
        path="/login" 
        render = {(props) => {
          return  <LogIn 
          {...props} onconnect = {(Token,ISeditor)=>{
            setLogin(true);
            setToken(Token);
            setprivilige(ISeditor)
            history.push("/Main");
          }}/>    
        }} 
        />
        <ProtectedRoute path="/Main" token = {token} IsEditor ={IsEditor} component ={HomePage} disconnecting = {() => {setLogin(false)}} isAuth = {isLoged}/>
        <Redirect to="/login"/>
      </Switch>
    </div>
  );
}

export default App;


