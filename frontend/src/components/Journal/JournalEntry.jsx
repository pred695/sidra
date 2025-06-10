import React, { useState } from 'react'
import {
  Box,
  VStack,
  Text,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  HStack,
  Tooltip,
  Badge,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

// Edit icon component
const EditIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
    />
  </svg>
)

// Delete icon component
const TrashIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
    />
  </svg>
)

// Heart icon component
const HeartIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    />
  </svg>
)

export const JournalEntry = ({ entry, onUpdate, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(entry.content)
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(entry.isLiked || false)
  const toast = useToast()

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  }

  const getMoodColor = (mood) => {
    const moodColors = {
      happy: 'yellow',
      sad: 'blue',
      excited: 'orange',
      peaceful: 'green',
      grateful: 'purple',
      thoughtful: 'gray',
      love: 'pink'
    }
    return moodColors[mood] || 'gray'
  }

  const getMoodEmoji = (mood) => {
    const moodEmojis = {
      happy: '😊',
      sad: '😢',
      excited: '🤩',
      peaceful: '😌',
      grateful: '🙏',
      thoughtful: '🤔',
      love: '💕'
    }
    return moodEmojis[mood] || '📝'
  }

  const handleSaveEdit = () => {
    onUpdate(entry.id, { content: editedContent })
    setIsEditing(false)
    toast({
      title: 'Journal entry updated! ✨',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  const handleCancelEdit = () => {
    setEditedContent(entry.content)
    setIsEditing(false)
  }

  const handleLike = (e) => {
    e.stopPropagation()
    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    onUpdate(entry.id, { isLiked: newLikedState })
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete(entry.id)
  }

  return (
    <>
      <MotionBox
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box
          bg="rgba(255, 255, 255, 0.9)"
          backdropFilter="blur(10px)"
          borderRadius="2xl"
          p={6}
          cursor="pointer"
          onClick={onOpen}
          position="relative"
          border="2px solid"
          borderColor="brand.100"
          _hover={{
            borderColor: 'sunflower.300',
            shadow: '2xl',
          }}
          transition="all 0.3s ease"
          minH="200px"
        >
          {/* Action buttons overlay */}
          <MotionBox
            position="absolute"
            top={3}
            right={3}
            zIndex={2}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <HStack spacing={1}>
              <Tooltip label={isLiked ? "Unlike" : "Like"} hasArrow>
                <IconButton
                  icon={<HeartIcon />}
                  size="sm"
                  variant="ghost"
                  colorScheme={isLiked ? "red" : "gray"}
                  bg="rgba(255, 255, 255, 0.9)"
                  _hover={{
                    bg: "rgba(255, 255, 255, 1)",
                    transform: "scale(1.1)",
                  }}
                  onClick={handleLike}
                  color={isLiked ? "red.500" : "gray.600"}
                />
              </Tooltip>
              <Tooltip label="Delete entry" hasArrow>
                <IconButton
                  icon={<TrashIcon />}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  bg="rgba(255, 255, 255, 0.9)"
                  _hover={{
                    bg: "red.50",
                    transform: "scale(1.1)",
                  }}
                  onClick={handleDelete}
                />
              </Tooltip>
            </HStack>
          </MotionBox>

          {/* Mood badge */}
          <Box position="absolute" top={3} left={3}>
            <Badge
              colorScheme={getMoodColor(entry.mood)}
              variant="subtle"
              borderRadius="full"
              px={3}
              py={1}
              fontSize="xs"
            >
              {getMoodEmoji(entry.mood)} {entry.mood}
            </Badge>
          </Box>

          {/* Sunflower decoration */}
          <Box
            position="absolute"
            bottom={3}
            right={3}
            fontSize="xl"
            opacity={0.3}
            pointerEvents="none"
          >
            🌻
          </Box>

          <VStack spacing={3} align="start" mt={8}>
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="brand.700"
              fontFamily="'Georgia', serif"
            >
              {entry.title}
            </Text>
            
            <Text
              fontSize="md"
              color="gray.700"
              noOfLines={4}
              lineHeight="1.6"
            >
              {entry.content}
            </Text>
            
            <Text fontSize="xs" color="gray.500" mt="auto">
              {formatDate(entry.createdAt)}
            </Text>
          </VStack>
        </Box>
      </MotionBox>

      {/* Full entry modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
        <ModalOverlay bg="rgba(0, 0, 0, 0.4)" backdropFilter="blur(10px)" />
        <ModalContent bg="white" borderRadius="2xl" mx={4}>
          <ModalHeader
            bg="brand.50"
            borderRadius="2xl 2xl 0 0"
            borderBottom="1px solid"
            borderColor="brand.100"
          >
            <HStack justify="space-between" align="center">
              <VStack align="start" spacing={1}>
                <Text fontFamily="'Georgia', serif" color="brand.700">
                  {entry.title}
                </Text>
                <HStack spacing={2}>
                  <Badge
                    colorScheme={getMoodColor(entry.mood)}
                    variant="subtle"
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                  >
                    {getMoodEmoji(entry.mood)} {entry.mood}
                  </Badge>
                  <Text fontSize="xs" color="gray.500">
                    {formatDate(entry.createdAt)}
                  </Text>
                </HStack>
              </VStack>
              <IconButton
                icon={<EditIcon />}
                size="sm"
                variant="ghost"
                colorScheme="brand"
                onClick={() => setIsEditing(!isEditing)}
                isActive={isEditing}
              />
            </HStack>
          </ModalHeader>
          
          <ModalCloseButton />
          
          <ModalBody p={6}>
            {isEditing ? (
              <VStack spacing={4} align="stretch">
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows={10}
                  resize="vertical"
                  borderColor="brand.200"
                  _focus={{
                    borderColor: "brand.400",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                  }}
                />
                <HStack justify="flex-end" spacing={3}>
                  <Button
                    variant="ghost"
                    colorScheme="gray"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="solid"
                    colorScheme="brand"
                    onClick={handleSaveEdit}
                  >
                    Save Changes
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <Text
                fontSize="md"
                color="gray.700"
                lineHeight="1.8"
                whiteSpace="pre-wrap"
              >
                {entry.content}
              </Text>
            )}
            
            {/* Journal footer decoration */}
            <Box textAlign="center" mt={6} pt={4} borderTop="1px solid" borderColor="brand.100">
              <Text fontSize="xs" color="gray.400" fontStyle="italic">
                "Written with love in my personal journal" 🌸
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}