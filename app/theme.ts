'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const palette = {
    text:{
      primary: "#FFFFFF"
    }
}

const theme = createTheme({

  typography: {
    fontFamily: roboto.style.fontFamily,
    allVariants: {
      color: "white"
    }
  },
});

export default theme;