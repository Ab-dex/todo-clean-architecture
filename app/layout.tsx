import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Inter } from 'next/font/google'
import './globals.css'
import { StyledRoot } from './StyledRoot';
import { Box, Typography } from '@mui/material';
import ModalRootContainer from './_components/modals';
import AppContextProvider from './_contexts/AppContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          <AppRouterCacheProvider>
          <StyledRoot>
          {/* header */}
          <Box bgcolor="black" color="white" sx={{paddingY: ["1rem", "1.5rem"]}}>
            <Typography variant='h5' fontWeight={700} textAlign={'center'}>
            Todo App
            </Typography>
            </Box>
          {children}
          <ModalRootContainer />
          </StyledRoot>
          </AppRouterCacheProvider>
        </AppContextProvider>
      </body>
    </html>
  )
}
