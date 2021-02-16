import React from 'react'
import "./Recent.scss"
import "../Animation/anima.scss";
import Table from "./Recentable"
export default function Recent({token , IsEditor}) {
    return (
    <div className="Recent DropAnimation">
        <div className="RecentCardHolder">
            <Table token ={token} IsEditor = {IsEditor}/>
        </div>
    </div>
    )
}


