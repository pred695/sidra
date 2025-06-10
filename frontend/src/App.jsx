import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { PhotoGallery } from './components/PhotoGallery'
import { theme } from './theme/theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <PhotoGallery />
    </ChakraProvider>
  )
}

export default App