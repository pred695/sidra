import React, { useState, useCallback } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  useToast,
  Badge,
  HStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { PhotoUpload } from './PhotoUpload.jsx'
import { PhotoCard } from './PhotoCard.jsx'
import { SunflowerDecoration } from './SunflowerDecoration.jsx'

const MotionBox = motion(Box)

export const PhotoGallery = () => {
  const [photos, setPhotos] = useState([])
  const toast = useToast()

  const handlePhotoUpload = useCallback((newPhotos) => {
    const photosWithIds = newPhotos.map((photo, index) => ({
      id: Date.now() + index,
      file: photo,
      url: URL.createObjectURL(photo),
      name: photo.name,
      uploadedAt: new Date(),
    }))

    setPhotos(prev => [...prev, ...photosWithIds])
    
    toast({
      title: 'New memories added! ✨',
      description: `${newPhotos.length} beautiful moment(s) saved to your journal`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }, [toast])

  const handlePhotoDelete = useCallback((photoId) => {
    setPhotos(prev => {
      const photoToDelete = prev.find(p => p.id === photoId)
      if (photoToDelete) {
        URL.revokeObjectURL(photoToDelete.url)
      }
      return prev.filter(p => p.id !== photoId)
    })

    toast({
      title: 'Memory archived 📝',
      status: 'info',
      duration: 2000,
      isClosable: true,
    })
  }, [toast])

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Container maxW="7xl" py={8} px={4}>
      <VStack spacing={8} align="stretch">
        {/* Header Section */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          textAlign="center"
          position="relative"
        >
          <SunflowerDecoration />
          
          {/* Date Badge */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            mb={4}
          >
            <Badge
              colorScheme="pink"
              variant="subtle"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              bg="brand.100"
              color="brand.600"
            >
              {getCurrentDate()}
            </Badge>
          </MotionBox>

          <Heading
            size="2xl"
            bgGradient="linear(to-r, brand.500, sunflower.500)"
            bgClip="text"
            mb={4}
            fontFamily="'Georgia', serif"
          >
            My Personal Journal 💕
          </Heading>
          
          <VStack spacing={3}>
            <Text
              fontSize="lg"
              color="gray.600"
              maxW="2xl"
              mx="auto"
              fontStyle="italic"
            >
              "She believed she could, so she did" ✨
            </Text>
            <Text
              fontSize="md"
              color="brand.500"
              maxW="xl"
              mx="auto"
            >
              A space for all my beautiful moments, dreams, and memories 🌸
            </Text>
          </VStack>
        </MotionBox>

        {/* Upload Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PhotoUpload onUpload={handlePhotoUpload} />
        </MotionBox>

        {/* Gallery Section */}
        {photos.length > 0 && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <VStack spacing={6} mb={8}>
              <HStack spacing={4} align="center">
                <Box w="50px" h="1px" bg="brand.300" />
                <Heading 
                  size="lg" 
                  color="brand.600" 
                  textAlign="center"
                  fontFamily="'Georgia', serif"
                >
                  My Memory Collection
                </Heading>
                <Box w="50px" h="1px" bg="brand.300" />
              </HStack>
              
              <HStack spacing={2}>
                <Badge colorScheme="pink" variant="outline">
                  {photos.length} memories
                </Badge>
                <Badge colorScheme="yellow" variant="outline">
                  Personal space
                </Badge>
                <Badge colorScheme="purple" variant="outline">
                  Journal entries
                </Badge>
              </HStack>
            </VStack>
            
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
              spacing={6}
            >
              {photos.map((photo, index) => (
                <MotionBox
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                  }}
                >
                  <PhotoCard
                    photo={photo}
                    onDelete={handlePhotoDelete}
                  />
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>
        )}

        {/* Empty State */}
        {photos.length === 0 && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            textAlign="center"
            py={12}
          >
            <VStack spacing={4}>
              <Box fontSize="6xl" opacity={0.3}>
                📸✨
              </Box>
              <Text fontSize="xl" color="gray.500" mb={4} fontWeight="medium">
                Your journal is waiting for its first memory!
              </Text>
              <Text color="gray.400" maxW="md" mx="auto">
                Upload your favorite photos, selfies, moments with friends, 
                travel memories, or anything that makes you smile 💕
              </Text>
              <HStack spacing={2} mt={4}>
                <Text fontSize="sm" color="brand.400">✨ Self-care moments</Text>
                <Text fontSize="sm" color="sunflower.500">🌻 Adventures</Text>
                <Text fontSize="sm" color="brand.400">💕 Special days</Text>
              </HStack>
            </VStack>
          </MotionBox>
        )}

        {/* Journal Footer */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          textAlign="center"
          pt={8}
          borderTop="1px solid"
          borderColor="brand.100"
        >
          <Text fontSize="sm" color="gray.500" fontStyle="italic">
            "Every photo tells a story, every moment matters" 🌸
          </Text>
        </MotionBox>
      </VStack>
    </Container>
  )
}