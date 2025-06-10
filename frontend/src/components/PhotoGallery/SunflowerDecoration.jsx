import React from 'react'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export const SunflowerDecoration = () => {
  return (
    <>
      {/* Floating sunflowers */}
      <MotionBox
        position="absolute"
        top={-20}
        left="10%"
        fontSize="4xl"
        opacity={0.3}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        pointerEvents="none"
      >
        🌻
      </MotionBox>

      <MotionBox
        position="absolute"
        top={-10}
        right="15%"
        fontSize="3xl"
        opacity={0.4}
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        pointerEvents="none"
      >
        🌻
      </MotionBox>

      <MotionBox
        position="absolute"
        top={-30}
        right="5%"
        fontSize="2xl"
        opacity={0.2}
        animate={{
          y: [0, -8, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        pointerEvents="none"
      >
        🌻
      </MotionBox>

      <MotionBox
        position="absolute"
        top={-15}
        left="75%"
        fontSize="2.5xl"
        opacity={0.3}
        animate={{
          y: [0, -12, 0],
          rotate: [0, -8, 8, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        pointerEvents="none"
      >
        🌻
      </MotionBox>

      <MotionBox
        position="absolute"
        top={-35}
        left="40%"
        fontSize="3xl"
        opacity={0.25}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
        pointerEvents="none"
      >
        🌻
      </MotionBox>

      <MotionBox
        position="absolute"
        top={-25}
        right="45%"
        fontSize="2.5xl"
        opacity={0.35}
        animate={{
          y: [0, -18, 0],
          rotate: [0, -12, 12, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
        pointerEvents="none"
      >
        🌻
      </MotionBox>

      {/* Heart decorations */}
      <MotionBox
        position="absolute"
        top={-25}
        left="50%"
        fontSize="2xl"
        opacity={0.4}
        color="brand.400"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        pointerEvents="none"
      >
        💕
      </MotionBox>

      <MotionBox
        position="absolute"
        top={-5}
        left="30%"
        fontSize="1.5xl"
        opacity={0.3}
        color="brand.300"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
        pointerEvents="none"
      >
        💖
      </MotionBox>

      <MotionBox
        position="absolute"
        top={-15}
        right="25%"
        fontSize="1.8xl"
        opacity={0.35}
        color="brand.500"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5
        }}
        pointerEvents="none"
      >
        💗
      </MotionBox>

      <MotionBox
        position="absolute"
        top={-40}
        left="65%"
        fontSize="1.6xl"
        opacity={0.25}
        color="sunflower.400"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8
        }}
        pointerEvents="none"
      >
        💛
      </MotionBox>

      {/* Sparkle effects */}
      <MotionBox
        position="absolute"
        top={-12}
        left="20%"
        fontSize="lg"
        opacity={0.4}
        color="sunflower.300"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.2, 0.6, 0.2],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        pointerEvents="none"
      >
        ✨
      </MotionBox>

      <MotionBox
        position="absolute"
        top={-35}
        right="35%"
        fontSize="md"
        opacity={0.3}
        color="brand.200"
        animate={{
          scale: [0.5, 1.5, 0.5],
          opacity: [0.1, 0.5, 0.1],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        pointerEvents="none"
      >
        ✨
      </MotionBox>

      <MotionBox
        position="absolute"
        top={-8}
        right="60%"
        fontSize="lg"
        opacity={0.35}
        color="sunflower.200"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        pointerEvents="none"
      >
        ✨
      </MotionBox>
    </>
  )
}