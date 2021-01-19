import React from 'react'
import { Redirect, Route } from "react-router-dom";
function ProtectedRoute({isAuth:isAuth , component:Component ,IsEditor, token,disconnecting , ...rest}) {
    const handledisconnect = () =>{
        disconnecting();
    }
    return (

        <Route
         {...rest} 
        render = {(props)=>{
            if(isAuth){
                return <Component {...props } disconnect = {handledisconnect} IsEditor ={IsEditor} token = {token}/>
            }
            else
            {
                return(<Redirect to = {{pathname:"/login" , state : {from: props.location} }}/>);
            }
        }}/>
    )
}

export default ProtectedRoute
