import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import React from 'react'

function Sidebar() {
  const drawerWidth = 240

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <List>
        {[
          'Inbox',
          'Starred',
          'Send email',
          'Drafts',
          'Starred',
          'Send email',
          'Drafts',
          'Starred',
          'Send email',
          'Drafts',
          'Starred',
          'Send email',
          'Drafts',
          'Starred',
          'Send email',
          'Drafts',
          'Starred',
          'Send email',
          'Drafts',
          'Starred',
          'Send email',
          'Drafts',
          'Starred',
          'Send email',
          'Drafts',
          'Starred',
          'Send email',
          'Drafts',
          'Starred',
          'Send email',
          'Drafts',
        ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar
