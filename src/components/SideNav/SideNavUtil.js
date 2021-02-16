// --- sidenav related Utils.
import React from "react";
import {
  AlertOutlined,
  CreditCardOutlined,
  FolderOpenOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
export default {
  // --- icon by type
  IconByType(type) {
    switch (type) {
      case "fault":
        return <AlertOutlined />;
      case "recent":
        return <AccessAlarmIcon />;
      case "history":
        return <FolderOpenOutlined />;
      case "passes":
        return <CreditCardOutlined />;
      case "contact":
        return <PhoneOutlined />;
      default:
        return null;
    }
  },
  // --- menu items for side nav.
  getMenuItems() {
    return [
      { name: "צפייה בתקלות", link: "fault", type: "fault" },
      { name: "נסגרו לאחרונה", link: "recent", type: "recent" },
      { name: "ארכיון", link: "history", type: "history" },
      { name: "אישורי כניסה", link: "passes", type: "passes" },
      { name: "צור קשר", link: "contact", type: "contact" },
    ];
  },
};
