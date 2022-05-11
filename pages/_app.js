import 'regenerator-runtime/runtime'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '../public/theme'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
