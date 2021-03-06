// --- React & Styling
import React from 'react';
import './SideNav.scss';

// --- components
import { LogoutOutlined } from '@ant-design/icons';
import SideNavMenuItem from './SideNavMenuItem/SideNavMenuItem';
// --- utils
import sideNavUtils from './SideNavUtil';
import { useEffect } from 'react';
import './SideNav.scss';
import logo from '../../assets/logoClear.png';
import IconButton from "@material-ui/core/IconButton";
import { useHistory, useLocation } from 'react-router-dom';

export default function SideNav({ondisconnect}) {
  const menuItems = sideNavUtils.getMenuItems();
  const [activeTab, setActiveTab] = React.useState("fault");
  const location = useLocation();
  const history = useHistory();
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
        <IconButton onClick = {()=>{
          history.replace("/login");
          ondisconnect();
          }}>
           
            התנתקות
            <LogoutOutlined/>
          </IconButton>
        </div>
      </div>
    </div>
  );
}
