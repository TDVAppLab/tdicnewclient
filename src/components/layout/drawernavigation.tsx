import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import MenuIcon from '@mui/icons-material/Menu'
import XIcon from '@mui/icons-material/X'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { Divider, ListItemButton } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import * as React from 'react'
import { useState } from 'react'

import { IsAvailableWithoutProduction } from '@/constants'

import { useLocale } from '../utils/useLocale'
import {
  contactItemsList,
  getMenuLinkList,
  linkItemsList,
} from './menulinklist'

const DrawerAppBar: React.FC = () => {
  const { t, locale } = useLocale()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setIsOpen(open)
    }

  const list = () => (
    <Box
      sx={{
        width: '300px',
        height: '100%',
        borderLeft: '1px solid #3e3e3e',
        backgroundColor: '#3e3e3e',
        padding: '20px',
      }}
      component="div"
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography align="center">Menu</Typography>

      <List>
        {
          //Show the navigation list
          getMenuLinkList(locale).map(
            (linkItem, index) =>
              (IsAvailableWithoutProduction || !linkItem.IsOnDev) && (
                <Link
                  style={{
                    textDecoration: 'none ',
                  }}
                  key={linkItem.text}
                  href={linkItem.href}
                  passHref
                >
                  <ListItem component="a" sx={{ color: 'white' }}>
                    <ListItemText primary={linkItem.text} />
                  </ListItem>
                </Link>
              ),
          )
        }
      </List>
      <Divider />

      <List>
        <Typography align="center">Contact</Typography>
        {
          //Show the navigation list
          contactItemsList.map((linkItem, index) => (
            <Link
              style={{
                textDecoration: 'none ',
              }}
              key={linkItem.text}
              href={linkItem.href}
              passHref
            >
              <ListItem component="a" sx={{ color: 'white' }}>
                <ListItemText primary={linkItem.text} />
              </ListItem>
            </Link>
          ))
        }
      </List>
      <Divider />
      <List sx={{ display: 'flex' }}>
        {
          //Show the sns link list
          linkItemsList.map((linkItem, index) => (
            <ListItemButton
              component="a"
              key={linkItem.text}
              href={linkItem.href}
              target="_blank"
            >
              <DynamicComponent componentName={linkItem.iconName} />
            </ListItemButton>
          ))
        }
      </List>

      <Divider />

      <Typography align="center">Sattrack © 2024</Typography>
    </Box>
  )

  return (
    <Box component="div">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </Box>
  )
}

export default DrawerAppBar

// コンポーネントのマッピング
const components: { [key: string]: React.ComponentType<any> } = {
  XIcon: XIcon,
  FacebookIcon: FacebookIcon,
  InstagramIcon: InstagramIcon,
  YouTubeIcon: YouTubeIcon,
  // 他のコンポーネントもマッピング可能
}

// コンポーネント名を引数に取り、対応するコンポーネントを動的にレンダリングする関数
const DynamicComponent = ({ componentName }: { componentName: string }) => {
  const Component = components[componentName]

  if (!Component) {
    return <div>指定されたコンポーネントは存在しません。</div>
  }

  return <Component />
}
