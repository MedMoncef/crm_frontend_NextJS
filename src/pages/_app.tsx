import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '@/components/layout/Navbar';
import { ThemeProvider } from '@/context/themeContext'
import { AuthProvider } from '@/context/AuthContext';
import { TableProvider } from '@/context/TableContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider>

            <Navbar />
            <Component {...pageProps} />

    </AuthProvider>
    </ThemeProvider>
  )
}
