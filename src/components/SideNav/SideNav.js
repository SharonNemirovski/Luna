// --- React & Styling
<<<<<<< HEAD
import React from 'react'
import './SideNav.scss';
import logo from '../../assets/logo.png';
// --- components
import { LogoutOutlined } from '@ant-design/icons';
import SideNavMenuItem from './SideNavMenuItem/SideNavMenuItem';
// --- utils 
import sideNavUtils from './SideNavUtil';
=======
import React from 'react';
import './SideNav.scss';
import logo from '../../assets/logoClear.png';
// --- components
import { LogoutOutlined } from '@ant-design/icons';
// --- utils
import sideNavUtils from './SideNavUtil';
import SideNavMenuItem from './SideNavMenuItem/SideNavMenuItem';
>>>>>>> 0d92ecc5ba5669332628ce2cf29488b9542ec64a

export default function SideNav() {
  const menuItems = sideNavUtils.getMenuItems();
  const [activeTab, setActiveTab] = React.useState('fault');

  return (
<<<<<<< HEAD
    <div className='SideNav'>
      <div className="SideNav_header">
        <img src={logo} alt="לונה"/>
      </div>
      <div className="SideNav_menu">
        { 
          menuItems.map((item, i) => <SideNavMenuItem setActiveTab={setActiveTab} activeTab={activeTab} key={i} item={item} />)
        }
=======
    <div className="SideNav">
      <div className="SideNav_header">
        <img src={logo} alt="לונה" />
      </div>
      <div className="SideNav_menu">
        {menuItems.map((item, i) => (
          <SideNavMenuItem
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            key={i}
            item={item}
          />
        ))}
>>>>>>> 0d92ecc5ba5669332628ce2cf29488b9542ec64a
      </div>
      <div className="SideNav_actions">
        <div className="SideNav_actions_logout">
          <LogoutOutlined />
          <span>התנתקות</span>
        </div>
      </div>
    </div>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> 0d92ecc5ba5669332628ce2cf29488b9542ec64a
}
