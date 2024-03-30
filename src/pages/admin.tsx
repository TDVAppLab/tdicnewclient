import { Button, Container } from '@mui/material'
import { Inter } from 'next/font/google'
import { signIn, signOut, useSession } from 'next-auth/react'

import { useLocale } from '@/components/utils/useLocale'

const inter = Inter({ subsets: ['latin'] })

//プレ管理画面
export default function Admin() {
  const { data: session } = useSession()

  const { t } = useLocale()


  return session ? (
    session.user.emailVerified ? (
      <Container maxWidth={false} sx={{ py: 2 }}>
        <Button variant="contained" color="inherit" onClick={() => signOut()}>
          signOut
        </Button>
        <ul>
          <li>User : {session.user.name}</li>
          {/*
          <li>{session.user.id}</li>
          <li>{session.user.email}</li>
          <li>{session.user.emailVerified?.toString()}</li>
           */}
        </ul>
        <Button variant="text" href="/adminupdate">
          Edit Updates
        </Button>
      </Container>
    ) : (
      <Container maxWidth={false} sx={{ py: 2 }}>
        <div>your account is not activated yet</div>
        <Button variant="contained" color="inherit" onClick={() => signOut()}>
          signOut
        </Button>
      </Container>
    )
  ) : (
    <Container maxWidth={false} sx={{ py: 2 }}>
      <Button variant="contained" color="inherit" onClick={() => signIn()}>
        signIn
      </Button>
    </Container>
  )
}

Admin.title = 'Admin'
