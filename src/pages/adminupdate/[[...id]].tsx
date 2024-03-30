import { Box, Button, Container, Grid, Typography } from '@mui/material'
import type { MultiobjectiveText } from '@prisma/client'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import UpdatedDetails from '@/components/teamactivityupdate/updatedetails'
import UpdateList from '@/components/teamactivityupdate/updatelist'
import { MultiobjectiveTextTypeUpdates } from '@/global'
import { trpc } from '@/utils/trpc'

const inter = Inter({ subsets: ['latin'] })

const defaultMultiobjectiveText = (): MultiobjectiveText => {
  return {
    id: '',
    type: MultiobjectiveTextTypeUpdates,
    titleEn: '',
    titleJp: '',
    scriptEn: '',
    scriptJp: '',
    status: '',
    displayDate: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export default function AdminUpdate() {
  const { data: session } = useSession()
  const router = useRouter()
  const { id } = router.query

  const updatetext = trpc.multiobjectiveTextRouter.get.useQuery({
    id: id ? id.toString() : '',
  })

  const updatetextlist = trpc.multiobjectiveTextRouter.list.useQuery()

  const [multiobjectiveTexts, setMultiobjectiveTexts] = useState<
    MultiobjectiveText[]
  >([])

  const [selectedMultiobjectiveText, setSelectedMultiobjectiveText] =
    useState<MultiobjectiveText>(defaultMultiobjectiveText())

  useEffect(() => {
    if (
      updatetext &&
      !updatetext.error &&
      updatetext.data?.id === id?.toString()
    ) {
      setSelectedMultiobjectiveText(
        updatetext.data ?? defaultMultiobjectiveText(),
      )
    }
  }, [JSON.stringify(updatetext.data)])

  useEffect(() => {
    if (updatetextlist && !updatetextlist.error) {
      setMultiobjectiveTexts(updatetextlist.data ?? [])
    }
  }, [updatetextlist.data])

  return (
    session &&
    session.user.emailVerified && (
      <Container maxWidth={false} sx={{ py: 2 }}>
        <Box component={'div'} p={10}>
          <Grid container spacing={10}>
            <Grid item lg={6} xl={6}>
              <Typography variant="h5" gutterBottom>
                Updates
              </Typography>
              <Button variant="text" href="/adminupdate">
                Create New Update
              </Button>
              {
                <UpdateList multiobjectiveTexts={multiobjectiveTexts} />
                //<UpdateList multiobjectiveTexts={updatetextlist.data || []} />
              }
            </Grid>
            <Grid item lg={6} xl={6}>
              <Typography variant="h5" gutterBottom>
                {id ? 'Details and Edit Update' : 'Create New Update'}
              </Typography>
              {(!id || selectedMultiobjectiveText.id === id?.toString()) && (
                <UpdatedDetails
                  multiobjectiveText={selectedMultiobjectiveText}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    )
  )
}

AdminUpdate.title = 'Edit Updates'
