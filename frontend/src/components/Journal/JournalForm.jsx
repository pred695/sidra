import React, { useState } from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Textarea,
  Button,
  Select,
  useColorModeValue,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

// Pen icon component
const PenIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
    />
  </svg>
)

export const JournalForm = ({ onAddEntry, isVisible, onCancel }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mood, setMood] = useState('happy')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('brand.200', 'brand.600')

  const moodOptions = [
    { value: 'happy', label: '😊 Happy', color: 'yellow' },
    { value: 'grateful', label: '🙏 Grateful', color: 'purple' },
    { value: 'excited', label: '🤩 Excited', color: 'orange' },
    { value: 'peaceful', label: '😌 Peaceful', color: 'green' },
    { value: 'love', label: '💕 In Love', color: 'pink' },
    { value: 'thoughtful', label: '🤔 Thoughtful', color: 'gray' },
    { value: 'sad', label: '😢 Sad', color: 'blue' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: 'Please fill in all fields',
        description: 'Both title and content are required',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsSubmitting(true)

    const newEntry = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      mood,
      createdAt: new Date().toISOString(),
      isLiked: false,
    }

    try {
      await onAddEntry(newEntry)
      
      // Reset form
      setTitle('')
      setContent('')
      setMood('happy')
      
      toast({
        title: 'Journal entry saved! ✨',
        description: 'Your thoughts have been captured beautifully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Failed to save entry',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setTitle('')
    setContent('')
    setMood('happy')
    onCancel()
  }

  if (!isVisible) return null

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        bg={bgColor}
        borderRadius="2xl"
        p={6}
        border="2px solid"
        borderColor={borderColor}
        backdropFilter="blur(10px)"
        position="relative"
        overflow="hidden"
      >
        {/* Decorative sunflowers */}
        <Box
          position="absolute"
          top={-5}
          right={-5}
          fontSize="3xl"
          opacity={0.1}
          transform="rotate(15deg)"
          pointerEvents="none"
        >
          🌻
        </Box>
        <Box
          position="absolute"
          bottom={-5}
          left={-5}
          fontSize="2xl"
          opacity={0.1}
          transform="rotate(-15deg)"
          pointerEvents="none"
        >
          💕
        </Box>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="brand.600"
              textAlign="center"
              fontFamily="'Georgia', serif"
            >
              Write Your Heart Out 💕
            </Text>

            <HStack spacing={4}>
              <FormControl>
                <FormLabel fontSize="sm" color="brand.600">
                  Entry Title
                </FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's on your mind today?"
                  borderColor="brand.200"
                  _focus={{
                    borderColor: "brand.400",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                  }}
                  _placeholder={{ color: "gray.400" }}
                />
              </FormControl>

              <FormControl maxW="200px">
                <FormLabel fontSize="sm" color="brand.600">
                  Mood
                </FormLabel>
                <Select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  borderColor="brand.200"
                  _focus={{
                    borderColor: "brand.400",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                  }}
                >
                  {moodOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel fontSize="sm" color="brand.600">
                Your Thoughts
              </FormLabel>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Pour your heart out... share your dreams, experiences, feelings, or anything that matters to you today. This is your safe space to be completely yourself. ✨"
                rows={6}
                resize="vertical"
                borderColor="brand.200"
                _focus={{
                  borderColor: "brand.400",
                  boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                }}
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>

            <HStack justify="space-between" pt={2}>
              <Button
                variant="ghost"
                colorScheme="gray"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                variant="sunflower"
                leftIcon={<PenIcon />}
                isLoading={isSubmitting}
                loadingText="Saving..."
                _hover={{
                  transform: 'scale(1.05)',
                }}
              >
                Save Entry
              </Button>
            </HStack>
          </VStack>
        </form>

        {/* Inspiration quote */}
        <Box textAlign="center" mt={4} pt={4} borderTop="1px solid" borderColor="brand.100">
          <Text fontSize="xs" color="gray.500" fontStyle="italic">
            "Your journal is a mirror of your soul" 🌸
          </Text>
        </Box>
      </Box>
    </MotionBox>
  )
}