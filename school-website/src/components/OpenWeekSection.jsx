import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { motion, useInView } from 'framer-motion';
import SquiggleLine from './decorative/SquiggleLine';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// Color variables
const colors = {
  hotPink: '#EC3988', // Bright pink background
  darkBlue: '#001838', // Dark blue for the wavy top
  white: '#FFFFFF', // White text
  primary: '#EC3988', // Primary color for the new section
  accent: '#c4a77d', // Gold accent
  lightBlue: '#8fd3f4', // Light blue accent
};

const SectionContainer = styled.section`
  position: relative;
  background-color: ${colors.hotPink};
  background-image: linear-gradient(140deg, ${colors.hotPink} 0%, #d31b79 50%, #c21873 100%); /* Add gradient background */
  min-height: 100vh; /* Full viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  padding: 0; /* Remove default padding */
`;

const WavyTop = styled.div`
  position: absolute;
  top: -80px; /* More negative value to position the wave higher */
  left: 0;
  width: 100%;
  height: 120px; /* Slightly taller for better curve */
  background-color: ${colors.darkBlue};
  /* New clip path that creates a gentler wave like in the image */
  clip-path: polygon(0 0, 100% 0, 100% 80%, 83% 90%, 65% 92%, 50% 90%, 35% 84%, 15% 80%, 0 80%);
  z-index: 0;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: auto; /* Center vertically and horizontally */
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  position: relative;
  z-index: 5;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 2rem;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const AnnouncementContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  padding-top: 6vh; /* Add top padding based on viewport height */
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

// Animated text wrapper for character animations
const AnimatedTextWrapper = styled(motion.div)`
  overflow: hidden;
  display: inline-block;
`;

const CharacterWrapper = styled(motion.span)`
  display: inline-block;
  margin-right: 0.1em;
  letter-spacing: 0.05em;
`;

const OpenWeekTitle = styled.h2`
  font-size: 4rem; /* Larger font size */
  font-weight: 800;
  color: ${colors.white};
  text-align: center;
  margin-bottom: 1.5rem;
  font-family: 'True North Rough Black W01 Rg', 'Montserrat', sans-serif;
  text-shadow: 2px 4px 0 rgba(0,0,0,0.15); /* Add text shadow for depth */
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const BookHereText = styled.h3`
  font-size: 4.2rem; /* Larger font size */
  font-weight: 400;
  color: ${colors.white};
  text-align: center;
  text-transform: uppercase;
  font-family: 'True North Rough Black W01 Rg', 'Montserrat', sans-serif;
  letter-spacing: 0.08em;
  text-shadow: 2px 4px 0 rgba(0,0,0,0.15); /* Add text shadow for depth */
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  transform: rotate(-2deg);
`;

const WavyBorder = styled.div`
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  border: 2px solid ${colors.white};
  border-radius: 20px;
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border: 2px dashed ${colors.white};
    border-radius: 20px;
    opacity: 0.5;
  }
`;

const VideoWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  z-index: 1;
  transform: rotate(4deg); /* Counter-rotate to create a playful skewed look */
`;

const Video = styled(motion.video)`
  width: 100%;
  display: block;
  border-radius: 15px;
`;

const PlayButton = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 22px solid ${colors.primary};
    margin-left: 5px;
    display: block;
  }
`;

const VideoOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  backdrop-filter: blur(2px);
`;

const BlobButton = styled(motion.button)`
  background-color: ${props => props.bgColor || colors.white};
  color: ${props => props.textColor || colors.primary};
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 1rem 1.2rem;
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 5;
  line-height: 1.2;
  text-transform: uppercase;
  filter: drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.2));
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: inherit;
    border-radius: 60% 40% 50% 50% / 50% 45% 55% 50%;
    z-index: -1;
  }
`;

const PlayFullVideoButton = styled(BlobButton)`
  bottom: 10px;
  left: 20px;
  transform: rotate(-4deg); /* Counter-rotate to match video angle */
`;

const PauseIcon = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 20px;
    background-color: ${colors.primary};
    border-radius: 3px;
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
`;

const ImageDecoration = styled(motion.div)`
  position: absolute;
  width: 30px;
  height: 30px;
  color: ${colors.white};
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);

  &.bottom-right {
    bottom: -10px;
    right: -10px;
    z-index: 3;
  }

  &.top-left {
    top: -10px;
    left: -10px;
    z-index: 3;
  }
`;

const Button = styled(motion.button)`
  background-color: ${colors.white};
  color: ${colors.primary};
  border: none;
  border-radius: 30px;
  padding: 1rem 2rem; /* Larger padding */
  font-size: 1.1rem; /* Larger font size */
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  margin-top: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Enhanced shadow */
  letter-spacing: 1px;
  
  &:hover {
    transform: translateY(-5px); /* More pronounced lift on hover */
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
    background-color: #f8f8f8; /* Slightly off-white on hover */
  }
`;

const SectionTitle = styled(motion.h3)`
  font-size: 1.8rem; /* Larger font size */
  font-weight: 700;
  color: ${colors.white};
  margin-bottom: 2rem;
  text-transform: uppercase;
  text-align: center;
  font-family: 'True North Rough Black W01 Rg', 'Montserrat', sans-serif;
  text-shadow: 1px 2px 0 rgba(0,0,0,0.15); /* Add subtle text shadow */
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SectionText = styled(motion.p)`
  color: ${colors.white};
  font-size: 1.2rem; /* Larger font size */
  margin-bottom: 2rem;
  max-width: 350px; /* Slightly wider text area */
  text-align: center;
  line-height: 1.6;
  text-shadow: 1px 1px 0 rgba(0,0,0,0.1); /* Add subtle text shadow */
`;

// Decorative elements
const Dragonfly = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: 60px;
  font-size: 2.5rem;
  color: ${colors.white};
  opacity: 0.8;
`;

const Circle = styled(motion.div)`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid ${colors.white};
  opacity: 0.4;
`;

// Add styled components for animated elements
const FloatingElement = styled(motion.div)`
  position: absolute;
  z-index: 0;
  opacity: 0.6;
`;

const AnimatedCircle = styled(FloatingElement)`
  width: ${props => props.size || '60px'};
  height: ${props => props.size || '60px'};
  border-radius: 50%;
  background-color: ${props => props.color || '#EC3988'};
`;

// Add a container for animated elements to ensure they don't overflow
const AnimatedElementsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
  pointer-events: none;
`;

const LottieContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OpenWeekSection = () => {
  // Create refs for scroll animation
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const bookRef = useRef(null);
  const videoRef = useRef(null);
  
  // Check if elements are in view
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const isTitleInView = useInView(titleRef, { once: false, amount: 0.5 });
  const isBookInView = useInView(bookRef, { once: false, amount: 0.5 });

  // State for video playing
  const [isPlaying, setIsPlaying] = React.useState(false);
  
  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Animation variants for characters
  const parentVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const letterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        damping: 10, 
        stiffness: 200
      }
    }
  };

  // Animation variants for Book Here
  const bookHereVariants = {
    hidden: {
      scale: 0,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 150,
        delay: 0.5
      }
    }
  };

  return (
    <SectionContainer ref={sectionRef} id="open-week-section">
      <WavyTop />
      
      {/* Decorative elements */}
      <Dragonfly
        initial={{ x: -50, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 0.8 } : { x: -50, opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        🜿
      </Dragonfly>
      
      <SquiggleLine 
        top="120px" 
        left="10px" 
        width={200} 
        color={colors.white} 
        opacity={isInView ? 0.6 : 0} 
        rotate={-10}
      />
      
      <SquiggleLine 
        top="75vh" 
        right="20px" 
        left="auto" 
        width={150} 
        color={colors.white} 
        opacity={isInView ? 0.5 : 0} 
        rotate={15}
        delay={0.3}
      />
      
      <Circle
        style={{ bottom: '15vh', left: '10%' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView 
          ? { scale: 1, opacity: 0.4 }
          : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 1, delay: 0.5 }}
      />
      
      <Circle
        style={{ top: '15vh', right: '10%' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView 
          ? { scale: 1, opacity: 0.4 }
          : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 1, delay: 0.8 }}
      />
      
      <AnnouncementContainer>
        {/* Character by character animation for Open Week title */}
        <OpenWeekTitle ref={titleRef}>
          <AnimatedTextWrapper
            variants={parentVariants}
            initial="hidden"
            animate={isTitleInView ? "visible" : "hidden"}
          >
            {"Open Week 28th April - 2nd May".split('').map((char, index) => (
              <CharacterWrapper key={index} variants={letterVariants}>
                {char === ' ' ? '\u00A0' : char}
              </CharacterWrapper>
            ))}
          </AnimatedTextWrapper>
        </OpenWeekTitle>
        
        {/* Animated Book Here text */}
        <motion.div
          ref={bookRef}
          initial="hidden"
          animate={isBookInView ? "visible" : "hidden"}
          variants={bookHereVariants}
        >
          <BookHereText>Book Here</BookHereText>
        </motion.div>
      </AnnouncementContainer>
      
      <ContentContainer>
        <LeftContent>
          <LottieContainer>
            <DotLottieReact
              src="https://lottie.host/d3b428ce-fdbd-43f5-9b51-0fcc2aabd436/ZyO9EFi4RK.lottie"
              loop
              autoplay
              style={{ width: "100%", height: "auto", minHeight: "250px" }}
            />
          </LottieContainer>
          <SectionTitle
            initial={{ x: -30, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            Explore with us
          </SectionTitle>
          <SectionText
            initial={{ x: -30, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Come on a secret mission to discover the sparks of magic that make our school so unique.
          </SectionText>
        </LeftContent>
        
        <RightContent>
          <VideoContainer>
            <WavyBorder />
            <VideoWrapper
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView 
                ? { scale: 1, opacity: 1 }
                : { scale: 0.8, opacity: 0 }
              }
              transition={{ duration: 0.8 }}
            >
              <Video 
                ref={videoRef}
                poster="https://www.greatwalstead.co.uk/wp-content/uploads/2023/09/Walstead160921-0009-1-768x512.jpg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                muted
                playsInline
              >
                <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </Video>
              
              {!isPlaying && (
                <VideoOverlay
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <PlayButton 
                    onClick={handlePlayVideo}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                </VideoOverlay>
              )}
            </VideoWrapper>
            
            <PlayFullVideoButton
              bgColor={colors.white}
              textColor={colors.primary}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1 }}
              onClick={handlePlayVideo}
            >
              Play Full<br />Video
            </PlayFullVideoButton>
          </VideoContainer>
        </RightContent>
      </ContentContainer>
      
      {/* Add animated elements container */}
      <AnimatedElementsContainer>
        <AnimatedCircle 
          size="80px"
          color="#EC3988"
          style={{ top: '10%', left: '5%' }}
          animate={isInView ? 
            { 
              y: [0, -20, 0], 
              rotate: [0, 15, 0],
              opacity: [0.6, 0.8, 0.6]
            } : {}}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        
        <AnimatedCircle 
          size="120px"
          color="#EC3988"
          style={{ top: '60%', left: '8%' }}
          animate={isInView ? 
            { 
              y: [0, 30, 0], 
              opacity: [0.2, 0.3, 0.2]
            } : {}}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        
        <AnimatedCircle 
          size="40px"
          color="#001838"
          style={{ bottom: '15%', right: '5%' }}
          animate={isInView ? 
            { 
              x: [0, 30, 0], 
              rotate: [0, 30, 0] 
            } : {}}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      </AnimatedElementsContainer>
    </SectionContainer>
  );
};

export default OpenWeekSection; 