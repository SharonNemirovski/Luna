// --- sidenav related Utils.
import React from 'react'
import { 
  AlertOutlined,
  CreditCardOutlined,
  FolderOpenOutlined,
  PhoneOutlined,
} from '@ant-design/icons';

export default {
  // --- icon by type
  IconByType(type) {
    switch(type) {
      case 'fault':
        return <AlertOutlined />
      case 'pass':
        return <CreditCardOutlined />
      case 'history':
        return <FolderOpenOutlined />
      case 'contact':
        return <PhoneOutlined />
      default:
        return null
    }
  },
  // --- menu items for side nav.
  getMenuItems() {
    return [
      { name: 'צפייה בתקלות', link: 'fault', type: 'fault' },
      { name: 'אישורי כניסה', link: 'passes', type: 'pass' },
      { name: 'ארכיון', link: 'history', type: 'history' },
      { name: 'צור קשר', link: 'contact', type: 'contact' }
    ]
  }
}