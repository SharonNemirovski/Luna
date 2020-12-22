import React from 'react'
import "./Login.scss";
import logo from "../../../assets/loginBackground.png";
import { Redirect, Route, Switch } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
export default function Login() {
    return (
<div className="loginholder">
      <div className="logo">
        <img src={logo} alt="כניסה" />
      </div>
      <div className = "inputfieldsholder">
        <h1 className = "loginText">Welcome To Luna</h1>
        <TextField className = "inputuser"label = "שם משתמש"/>
        <TextField className = "inputpass" type = "password" label = "הכנס סיסמא"/>
      </div>
</div>
    )
}


