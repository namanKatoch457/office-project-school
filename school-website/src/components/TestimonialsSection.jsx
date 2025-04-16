import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { motion, useInView } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// Color variables
const colors = {
  lightPink: '#fde8f0',
  darkPink: '#EC3988',
  darkBlue: '#001838',
  white: '#FFFFFF',
};

const SectionContainer = styled.section`
  position: relative;
  background-color: ${colors.darkPink};
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

// Decorative moving elements
const FloatingShape = styled(motion.div)`
  position: absolute;
  background-color: ${props => props.color || colors.white};
  opacity: ${props => props.opacity || 0.1};
  border-radius: ${props => props.borderRadius || '50%'};
  z-index: 1;
  pointer-events: none;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
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
    padding: 3rem 2rem;
  }
`;

const VideoWrapper = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const Video = styled(motion.img)`
  width: 100%;
  height: auto;
  display: block;
`;

const PlayButton = styled(motion.div)`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: ${colors.darkPink};
  color: ${colors.white};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
  }
`;

const TextContent = styled(motion.div)`
  color: ${colors.white};
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  color: ${colors.white};
  margin-top: 0;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'True North Rough Black W01 Rg', 'Montserrat', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SectionText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Button = styled(motion.button)`
  background-color: ${colors.white};
  color: ${colors.darkPink};
  border: none;
  border-radius: 30px;
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
  }
`;

// Add a Pulse animation for the play button
const PulseCircle = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(236, 57, 136, 0.5);
  z-index: 1;
`;

// Add floating quotes to enhance the testimonial theme
const QuoteIcon = styled(motion.div)`
  position: absolute;
  color: ${colors.white};
  opacity: 0.1;
  font-size: 150px;
  font-family: Georgia, serif;
  line-height: 1;
  z-index: 1;
  pointer-events: none;
`;

const LottieContainer = styled.div`
  width: 100%;
  max-width: 450px;
  margin: 0 auto 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  line-height: 0;
`;

const TestimonialsSection = () => {
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const videoVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: '0%', opacity: 1, transition: { duration: 0.8 } }
  };

  const textVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: '0%', opacity: 1, transition: { duration: 0.8, delay: 0.2 } }
  };

  // Animation for section entry
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren"
      }
    }
  };

  // Animation variants for floating elements
  const floatVariants = {
    animate: (custom) => ({
      y: [0, custom.yMove, 0],
      x: [0, custom.xMove, 0],
      rotate: [0, custom.rotate, 0],
      transition: {
        duration: custom.duration,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  // Pulse animation for play button
  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 0.3, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <SectionContainer 
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      {/* Floating decorative elements */}
      <FloatingShape 
        color={colors.white}
        opacity={0.07}
        width="150px"
        height="150px"
        style={{ top: '10%', left: '5%', width: '150px', height: '150px' }}
        animate="animate"
        variants={floatVariants}
        custom={{ yMove: -30, xMove: 20, rotate: 10, duration: 8 }}
      />
      <FloatingShape 
        color={colors.white}
        opacity={0.05}
        borderRadius="40%"
        style={{ bottom: '15%', right: '8%', width: '180px', height: '180px' }}
        animate="animate"
        variants={floatVariants}
        custom={{ yMove: 40, xMove: -15, rotate: -15, duration: 10 }}
      />
      <FloatingShape 
        color={colors.darkBlue}
        opacity={0.07}
        borderRadius="30% 70% 70% 30% / 30% 30% 70% 70%"
        style={{ top: '40%', right: '15%', width: '100px', height: '100px' }}
        animate="animate"
        variants={floatVariants}
        custom={{ yMove: -20, xMove: -20, rotate: 20, duration: 6 }}
      />

      {/* Floating quote icons */}
      <QuoteIcon
        style={{ top: '15%', left: '15%', transform: 'rotate(180deg)' }}
        animate="animate"
        variants={floatVariants}
        custom={{ yMove: -15, xMove: 10, rotate: -5, duration: 7 }}
      >
        "
      </QuoteIcon>
      <QuoteIcon
        style={{ bottom: '20%', right: '20%' }}
        animate="animate"
        variants={floatVariants}
        custom={{ yMove: 15, xMove: -10, rotate: 5, duration: 7 }}
      >
        "
      </QuoteIcon>

      <ContentContainer>
        <VideoWrapper
          variants={videoVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Video src="https://www.greatwalstead.co.uk/wp-content/uploads/2023/09/Chris-and-pupils.jpg" alt="Video thumbnail" />
          <PulseCircle
            variants={pulseVariants}
            animate="animate"
          />
          <PlayButton 
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
          >
            Play Full Video
          </PlayButton>
        </VideoWrapper>
        <TextContent
          variants={textVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <LottieContainer>
            <DotLottieReact
              src="https://lottie.host/4cfb335a-8087-4637-b4d5-f23b190c1748/wz3NcAWkvn.lottie"
              loop
              autoplay
              style={{ width: "100%", height: "auto", minHeight: "180px" }}
            />
          </LottieContainer>
          <SectionTitle style={{ marginTop: "-20px" }}>Hear from Our Great Walstead Families</SectionTitle>
          <SectionText>
            What's life like at our school? Find out from the people who know best – our wonderful pupils and their parents.
          </SectionText>
          <ButtonGroup>
            <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Watch This Video</Button>
            <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Why Choose Us</Button>
          </ButtonGroup>
        </TextContent>
      </ContentContainer>
    </SectionContainer>
  );
};

export default TestimonialsSection;