import React from 'react'
import { Link } from 'react-router-dom';
// --- utils 
import sideNavUtils from '../SideNavUtil';

export default function SideNavMenuItem({ item, activeTab, setActiveTab }) {
  return (
    <Link 
      to={item.link}
      onClick={() => setActiveTab(item.type)}
      className={`SideNav_menu_item ${activeTab === item.type ? 'SideNav_menu_item-active' : ''}`}>
      {sideNavUtils.IconByType(item.type)}
      <span className='SideNav_menu_item-link' >
        {item.name}
       </span>
    </Link>
  )
}
