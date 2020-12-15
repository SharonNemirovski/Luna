import React from 'react'
<<<<<<< HEAD

export default function Contact() {
  return (
    <div>
      Contact
=======
import './Contact.scss';
import '../Animation/anima.scss'
import contactIMG from '../../../assets/contactClear.png'

export default function Contact() {
  return (
    <div className='Contact DropAnimation'>
      <div className="wrap">
        <img src={contactIMG} className="imgC"></img>
      </div>
>>>>>>> 0d92ecc5ba5669332628ce2cf29488b9542ec64a
    </div>
  )
}
