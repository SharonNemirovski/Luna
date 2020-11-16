import React from 'react'
import './Faults.scss';
import '../Animation/anima.scss'

export default function Faults() {
  return (
    <div className='Faults DropAnimation'>
      <div className="body">
        <table className='table'>
          <tbody>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th> 
            <th>Age</th>
          </tr>
          <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
          </tr>
          <tr>
            <td>John</td>
            <td>Doe</td>
            <td>80</td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>
  )
}



