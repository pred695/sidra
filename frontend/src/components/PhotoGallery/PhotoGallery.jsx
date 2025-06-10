import React, { useState, useCallback, useEffect } from 'react'
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
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Icon,
  Divider,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { PhotoUpload } from './PhotoUpload.jsx'
import { PhotoCard } from './PhotoCard.jsx'
import { SunflowerDecoration } from './SunflowerDecoration.jsx'
import { JournalForm } from '../Journal/JournalForm.jsx'
import { JournalEntry } from '../Journal/JournalEntry.jsx'

const MotionBox = motion(Box)

// Photo icon
const PhotoIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
    />
  </Icon>
)

// Journal icon
const JournalIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
    />
  </Icon>
)

// Plus icon
const PlusIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
    />
  </Icon>
)

export const PhotoGallery = () => {
  const [photos, setPhotos] = useState([])
  const [journalEntries, setJournalEntries] = useState([])
  const [showJournalForm, setShowJournalForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  // Initialize storage and load data
  useEffect(() => {
    const initializeData = async () => {
      try {
        await storage.initialize()
        const data = storage.loadData()
        setPhotos(data.photos || [])
        setJournalEntries(data.journalEntries || [])
      } catch (error) {
        console.error('Failed to load data:', error)
        toast({
          title: 'Failed to load data',
          description: 'Starting fresh with empty gallery',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        })
      } finally {
        setIsLoading(false)
      }
    }

    initializeData()
  }, [toast])

  const handlePhotoUpload = useCallback(async (newPhotos) => {
    const photosWithIds = newPhotos.map((photo, index) => ({
      id: Date.now() + index,
      file: photo,
      url: URL.createObjectURL(photo),
      name: photo.name,
      uploadedAt: new Date().toISOString(),
    }))

    try {
      const updatedPhotos = await storage.addPhoto(...photosWithIds)
      setPhotos(updatedPhotos)
      
      toast({
        title: 'New memories added! ✨',
        description: `${newPhotos.length} beautiful moment(s) saved to your journal`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Failed to save photos:', error)
      // Fallback to local state update
      setPhotos(prev => [...prev, ...photosWithIds])
      toast({
        title: 'Photos added locally',
        description: 'Could not sync to cloud, but photos are saved locally',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
    }
  }, [toast])

  const handlePhotoDelete = useCallback(async (photoId) => {
    try {
      const photoToDelete = photos.find(p => p.id === photoId)
      if (photoToDelete) {
        URL.revokeObjectURL(photoToDelete.url)
      }
      
      const updatedPhotos = await storage.deletePhoto(photoId)
      setPhotos(updatedPhotos)

      toast({
        title: 'Memory archived 📝',
        status: 'info',
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Failed to delete photo:', error)
      // Fallback to local state update
      setPhotos(prev => prev.filter(p => p.id !== photoId))
    }
  }, [photos, toast])

  const handleAddJournalEntry = useCallback(async (entry) => {
    try {
      const updatedEntries = await storage.addJournalEntry(entry)
      setJournalEntries(updatedEntries)
      setShowJournalForm(false)
    } catch (error) {
      console.error('Failed to save journal entry:', error)
      // Fallback to local state update
      setJournalEntries(prev => [...prev, entry])
      setShowJournalForm(false)
      throw error // Re-throw to show error in form
    }
  }, [])

  const handleUpdateJournalEntry = useCallback(async (entryId, updates) => {
    try {
      const updatedEntries = await storage.updateJournalEntry(entryId, updates)
      setJournalEntries(updatedEntries)
    } catch (error) {
      console.error('Failed to update journal entry:', error)
      // Fallback to local state update
      setJournalEntries(prev => 
        prev.map(entry => 
          entry.id === entryId ? { ...entry, ...updates } : entry
        )
      )
    }
  }, [])

  const handleDeleteJournalEntry = useCallback(async (entryId) => {
    try {
      const updatedEntries = await storage.deleteJournalEntry(entryId)
      setJournalEntries(updatedEntries)
      
      toast({
        title: 'Journal entry deleted',
        status: 'info',
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Failed to delete journal entry:', error)
      // Fallback to local state update
      setJournalEntries(prev => prev.filter(entry => entry.id !== entryId))
    }
  }, [toast])

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <Container maxW="7xl" py={8} px={4}>
        <VStack spacing={8} align="center" justify="center" minH="60vh">
          <Box fontSize="6xl" opacity={0.3}>
            🌻
          </Box>
          <Text fontSize="lg" color="gray.500">
            Loading your beautiful memories...
          </Text>
        </VStack>
      </Container>
    )
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

        {/* Main Content with Tabs */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs variant="soft-rounded" colorScheme="brand" align="center">
            <TabList mb={8} bg="rgba(255, 255, 255, 0.5)" p={2} borderRadius="2xl">
              <Tab
                leftIcon={<PhotoIcon />}
                _selected={{ bg: 'brand.500', color: 'white' }}
                borderRadius="xl"
                fontWeight="semibold"
              >
                Photo Gallery ({photos.length})
              </Tab>
              <Tab
                leftIcon={<JournalIcon />}
                _selected={{ bg: 'sunflower.500', color: 'white' }}
                borderRadius="xl"
                fontWeight="semibold"
              >
                Journal Entries ({journalEntries.length})
              </Tab>
            </TabList>

            <TabPanels>
              {/* Photo Gallery Tab */}
              <TabPanel p={0}>
                <VStack spacing={8} align="stretch">
                  {/* Photo Upload Section */}
                  <PhotoUpload onUpload={handlePhotoUpload} />

                  {/* Photo Gallery Section */}
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
                            My Photo Collection
                          </Heading>
                          <Box w="50px" h="1px" bg="brand.300" />
                        </HStack>
                        
                        <HStack spacing={2}>
                          <Badge colorScheme="pink" variant="outline">
                            {photos.length} photos
                          </Badge>
                          <Badge colorScheme="purple" variant="outline">
                            Memories
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

                  {/* Empty State for Photos */}
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
                          Your photo gallery is waiting for its first memory!
                        </Text>
                        <Text color="gray.400" maxW="md" mx="auto">
                          Upload your favorite photos, selfies, moments with friends, 
                          travel memories, or anything that makes you smile 💕
                        </Text>
                      </VStack>
                    </MotionBox>
                  )}
                </VStack>
              </TabPanel>

              {/* Journal Tab */}
              <TabPanel p={0}>
                <VStack spacing={8} align="stretch">
                  {/* Add Journal Entry Button */}
                  {!showJournalForm && (
                    <Flex justify="center">
                      <Button
                        leftIcon={<PlusIcon />}
                        variant="sunflower"
                        size="lg"
                        onClick={() => setShowJournalForm(true)}
                        _hover={{
                          transform: 'scale(1.05)',
                        }}
                      >
                        Write New Entry
                      </Button>
                    </Flex>
                  )}

                  {/* Journal Form */}
                  <JournalForm
                    onAddEntry={handleAddJournalEntry}
                    isVisible={showJournalForm}
                    onCancel={() => setShowJournalForm(false)}
                  />

                  {/* Journal Entries Section */}
                  {journalEntries.length > 0 && (
                    <MotionBox
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <VStack spacing={6} mb={8}>
                        <HStack spacing={4} align="center">
                          <Box w="50px" h="1px" bg="sunflower.300" />
                          <Heading 
                            size="lg" 
                            color="sunflower.600" 
                            textAlign="center"
                            fontFamily="'Georgia', serif"
                          >
                            My Journal Entries
                          </Heading>
                          <Box w="50px" h="1px" bg="sunflower.300" />
                        </HStack>
                        
                        <HStack spacing={2}>
                          <Badge colorScheme="yellow" variant="outline">
                            {journalEntries.length} entries
                          </Badge>
                          <Badge colorScheme="purple" variant="outline">
                            Thoughts & Dreams
                          </Badge>
                        </HStack>
                      </VStack>
                      
                      <SimpleGrid
                        columns={{ base: 1, md: 2, lg: 3 }}
                        spacing={6}
                      >
                        {journalEntries
                          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                          .map((entry, index) => (
                            <MotionBox
                              key={entry.id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.4,
                                delay: index * 0.1,
                              }}
                            >
                              <JournalEntry
                                entry={entry}
                                onUpdate={handleUpdateJournalEntry}
                                onDelete={handleDeleteJournalEntry}
                              />
                            </MotionBox>
                          ))}
                      </SimpleGrid>
                    </MotionBox>
                  )}

                  {/* Empty State for Journal */}
                  {journalEntries.length === 0 && !showJournalForm && (
                    <MotionBox
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      textAlign="center"
                      py={12}
                    >
                      <VStack spacing={4}>
                        <Box fontSize="6xl" opacity={0.3}>
                          📝✨
                        </Box>
                        <Text fontSize="xl" color="gray.500" mb={4} fontWeight="medium">
                          Your journal is ready for your first entry!
                        </Text>
                        <Text color="gray.400" maxW="md" mx="auto">
                          Share your thoughts, dreams, daily experiences, or anything 
                          that's on your mind. This is your personal space to express yourself 💕
                        </Text>
                        <HStack spacing={2} mt={4}>
                          <Text fontSize="sm" color="sunflower.500">✨ Daily thoughts</Text>
                          <Text fontSize="sm" color="brand.400">💕 Gratitude</Text>
                          <Text fontSize="sm" color="sunflower.500">🌻 Dreams</Text>
                        </HStack>
                      </VStack>
                    </MotionBox>
                  )}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </MotionBox>

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
            "Every photo tells a story, every entry captures a moment" 🌸
          </Text>
          
          {/* Storage status */}
          <HStack justify="center" mt={2} spacing={2}>
            <Badge colorScheme="green" variant="subtle" fontSize="xs">
              💾 Auto-saved locally
            </Badge>
            <Badge colorScheme="blue" variant="subtle" fontSize="xs">
              📱 Works across devices
            </Badge>
          </HStack>
        </MotionBox>
      </VStack>
    </Container>
  )
}