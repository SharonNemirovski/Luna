import React from 'react'
import './Contact.scss';
import '../Animation/anima.scss'
import contactIMG from '../../../assets/contactClear.png'

export default function Contact() {
  return (
    <div className='Contact DropAnimation'>
      <div className="wrap">
        <img src={contactIMG} className="imgC"></img>
      </div>
    </div>
  )
}
