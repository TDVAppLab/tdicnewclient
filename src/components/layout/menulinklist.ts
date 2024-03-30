const navItemsList = [
  { textja: 'Home', texten: 'Home', href: '/', IsOnDev: false },
  {
    textja: '3D map(Beta)',
    texten: '3D map(Beta)',
    href: '/tdv',
    IsOnDev: false,
  },
  { textja: 'Admin', texten: 'Admin', href: '/admin', IsOnDev: true },
]

export const getMenuLinkList = (locale: string | undefined) => {
  if (locale === 'en') {
    return navItemsList.map((item) => {
      return { text: item.texten, href: item.href, IsOnDev: item.IsOnDev }
    })
  } else {
    return navItemsList.map((item) => {
      return { text: item.textja, href: item.href, IsOnDev: item.IsOnDev }
    })
  }
}

export const contactItemsList = [
  {
    text: 'Privacy Policy',
    href: '/privacy',
  },
]

export const linkItemsList = [
  { text: 'Twitter', href: 'https://twitter.com', iconName: 'XIcon' },
]
