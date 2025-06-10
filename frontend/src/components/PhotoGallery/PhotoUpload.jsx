import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Box,
  VStack,
  Text,
  Icon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

// Camera icon component
const CameraIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 15.2c1.37 0 2.5-1.13 2.5-2.5S13.37 10.2 12 10.2s-2.5 1.13-2.5 2.5 1.13 2.5 2.5 2.5zm0-3.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"
    />
    <path
      fill="currentColor"
      d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.05l1.83-2h4.24l1.83 2H20v12z"
    />
  </Icon>
)

export const PhotoUpload = ({ onUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const imageFiles = acceptedFiles.filter(file => 
      file.type.startsWith('image/')
    )
    
    if (imageFiles.length > 0) {
      onUpload(imageFiles)
    }
  }, [onUpload])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true,
  })

  const borderColor = useColorModeValue(
    isDragAccept ? 'sunflower.500' : 
    isDragReject ? 'red.300' : 
    isDragActive ? 'brand.500' : 'brand.200',
    isDragAccept ? 'sunflower.400' : 
    isDragReject ? 'red.400' : 
    isDragActive ? 'brand.400' : 'brand.300'
  )

  const bgColor = useColorModeValue(
    isDragActive ? 'brand.50' : 'white',
    isDragActive ? 'brand.900' : 'gray.800'
  )

  return (
    <MotionBox
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Box
        {...getRootProps()}
        border="3px dashed"
        borderColor={borderColor}
        borderRadius="2xl"
        bg={bgColor}
        p={8}
        cursor="pointer"
        transition="all 0.3s ease"
        _hover={{
          borderColor: 'sunflower.500',
          bg: 'brand.50',
          transform: 'translateY(-2px)',
          shadow: 'xl',
        }}
        backdropFilter="blur(10px)"
        position="relative"
        overflow="hidden"
      >
        <input {...getInputProps()} />
        
        {/* Sunflower pattern overlay */}
        <Box
          position="absolute"
          top={-10}
          right={-10}
          fontSize="6xl"
          opacity={0.1}
          transform="rotate(15deg)"
          pointerEvents="none"
        >
          🌻
        </Box>
        <Box
          position="absolute"
          bottom={-10}
          left={-10}
          fontSize="4xl"
          opacity={0.1}
          transform="rotate(-15deg)"
          pointerEvents="none"
        >
          🌻
        </Box>

        <VStack spacing={4} textAlign="center">
          <MotionBox
            animate={{
              rotate: isDragActive ? 360 : 0,
              scale: isDragActive ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <CameraIcon
              boxSize={12}
              color={isDragActive ? 'sunflower.500' : 'brand.500'}
            />
          </MotionBox>

          <VStack spacing={2}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={isDragActive ? 'sunflower.600' : 'brand.600'}
            >
              {isDragActive
                ? 'Drop your beautiful photos here! 📸'
                : 'Upload Your Photos'}
            </Text>
            
            <Text color="gray.600" fontSize="md">
              Drag and drop your photos here, or click to browse
            </Text>
            
            <Text color="gray.500" fontSize="sm">
              Supports: JPG, PNG, GIF, WebP
            </Text>
          </VStack>

          <Button
            variant="sunflower"
            size="lg"
            leftIcon={<CameraIcon boxSize={5} />}
            _hover={{
              transform: 'scale(1.05)',
            }}
          >
            Choose Photos
          </Button>
        </VStack>
      </Box>
    </MotionBox>
  )
}