import React, { useState } from 'react'
import {
  Box,
  Image,
  VStack,
  Text,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  HStack,
  Tooltip,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

// Trash icon component
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

export const PhotoCard = ({ photo, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete(photo.id)
  }

  const handleLike = (e) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  return (
    <>
      <MotionBox
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box
          bg="rgba(255, 255, 255, 0.9)"
          backdropFilter="blur(10px)"
          borderRadius="2xl"
          overflow="hidden"
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
        >
          {/* Action buttons overlay */}
          <MotionBox
            position="absolute"
            top={2}
            right={2}
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
              <Tooltip label="Delete photo" hasArrow>
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

          {/* Sunflower decoration */}
          <Box
            position="absolute"
            bottom={2}
            left={2}
            fontSize="2xl"
            opacity={0.3}
            pointerEvents="none"
            zIndex={1}
          >
            🌻
          </Box>

          <VStack spacing={3} p={0}>
            <Box position="relative" w="full">
              <Image
                src={photo.url}
                alt={photo.name}
                w="full"
                h="200px"
                objectFit="cover"
                borderRadius="xl"
                fallback={
                  <Box
                    w="full"
                    h="200px"
                    bg="brand.100"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="xl"
                  >
                    <Text color="brand.500">Loading...</Text>
                  </Box>
                }
              />
              
              {/* Gradient overlay for better text readability */}
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                h="50px"
                bgGradient="linear(to-t, rgba(0,0,0,0.3), transparent)"
                borderRadius="0 0 xl xl"
              />
            </Box>

            <VStack spacing={1} px={4} pb={4} align="start" w="full">
              <Text
                fontSize="sm"
                fontWeight="bold"
                color="brand.700"
                noOfLines={1}
                w="full"
              >
                {photo.name}
              </Text>
              <Text fontSize="xs" color="gray.600">
                {formatDate(photo.uploadedAt)}
              </Text>
            </VStack>
          </VStack>
        </Box>
      </MotionBox>

      {/* Full-size modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay bg="rgba(0, 0, 0, 0.8)" backdropFilter="blur(10px)" />
        <ModalContent bg="transparent" shadow="none" maxW="90vw" maxH="90vh">
          <ModalCloseButton
            color="white"
            bg="rgba(0, 0, 0, 0.5)"
            _hover={{ bg: "rgba(0, 0, 0, 0.7)" }}
            size="lg"
            zIndex={10}
          />
          <ModalBody p={0}>
            <Box position="relative" borderRadius="xl" overflow="hidden">
              <Image
                src={photo.url}
                alt={photo.name}
                w="full"
                h="full"
                maxH="85vh"
                objectFit="contain"
                borderRadius="xl"
              />
              
              {/* Photo info overlay */}
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                bg="rgba(0, 0, 0, 0.7)"
                color="white"
                p={4}
                borderRadius="0 0 xl xl"
              >
                <HStack justify="space-between" align="center">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="bold" fontSize="lg">
                      {photo.name}
                    </Text>
                    <Text fontSize="sm" opacity={0.8}>
                      Uploaded on {formatDate(photo.uploadedAt)}
                    </Text>
                  </VStack>
                  <Box fontSize="2xl">🌻</Box>
                </HStack>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}