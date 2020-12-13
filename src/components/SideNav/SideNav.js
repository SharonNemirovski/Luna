// --- React & Styling
import React, {useEffect} from 'react';
import './SideNav.scss';
import logo from '../../assets/logoClear.png';
// --- components
import { LogoutOutlined } from '@ant-design/icons';
// --- utils
import sideNavUtils from './SideNavUtil';
import SideNavMenuItem from './SideNavMenuItem/SideNavMenuItem';
import { useLocation } from 'react-router-dom';


export default function SideNav() {
  const menuItems = sideNavUtils.getMenuItems();
  const [activeTab, setActiveTab] = React.useState('fault');
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    setActiveTab(currentPath.slice(1));
  }, [location]);

  return (
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
      </div>
      <div className="SideNav_actions">
        <div className="SideNav_actions_logout">
          <LogoutOutlined />
          <span>התנתקות</span>
        </div>
      </div>
    </div>
  );
}
