import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { motion, useInView } from 'framer-motion';

// Color variables
const colors = {
  lightPink: '#fde8f0',
  darkPink: '#EC3988',
  darkBlue: '#001838',
  white: '#FFFFFF',
};

const SectionContainer = styled.section`
  position: relative;
  background-color: ${colors.white};
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const WavyTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  background-color: ${colors.darkPink};
  clip-path: path('M0,0 C300,50 500,0 1366,50 L1366,0 L0,0 Z');
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
  width: 100%;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  color: ${colors.darkBlue};
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'True North Rough Black W01 Rg', 'Montserrat', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SectionText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${colors.darkBlue};
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const ImagesContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ImageWrapper = styled(motion.div)`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const FollowButton = styled(motion.button)`
  background-color: ${colors.darkPink};
  color: ${colors.white};
  border: none;
  border-radius: 30px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(236, 57, 136, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(236, 57, 136, 0.4);
  }
`;

// Decorative elements
const DecorativeElement = styled(motion.div)`
  position: absolute;
  font-size: ${props => props.size || '3rem'};
  color: ${props => props.color || colors.darkPink};
  opacity: ${props => props.opacity || 0.1};
  z-index: 0;
  pointer-events: none;
`;

const FollowUsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
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

  return (
    <SectionContainer ref={sectionRef}>
      <WavyTop />
      
      {/* Decorative Elements */}
      <DecorativeElement 
        size="4rem"
        style={{ top: '15%', left: '5%' }}
        animate="animate"
        variants={floatVariants}
        custom={{ yMove: -20, xMove: 10, rotate: 5, duration: 7 }}
      >
        ◯
      </DecorativeElement>
      
      <DecorativeElement 
        size="3rem"
        style={{ bottom: '20%', right: '8%' }}
        color={colors.darkBlue}
        animate="animate"
        variants={floatVariants}
        custom={{ yMove: 15, xMove: -10, rotate: -5, duration: 8 }}
      >
        ✧
      </DecorativeElement>
      
      <ContentContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <SectionTitle variants={itemVariants}>Follow Us</SectionTitle>
        <SectionText variants={itemVariants}>
          From football to poetry and everything in between, get the latest scoop from our Instagram.
        </SectionText>
        <ImagesContainer variants={containerVariants}>
          <ImageWrapper variants={itemVariants}>
            <Image src="https://www.greatwalstead.co.uk/wp-content/uploads/2023/09/Chris-and-pupils.jpg" alt="Instagram 1" />
          </ImageWrapper>
          <ImageWrapper variants={itemVariants}>
            <Image src="https://www.greatwalstead.co.uk/wp-content/uploads/2023/09/Our-Values-Explorer.png" alt="Instagram 2" />
          </ImageWrapper>
          <ImageWrapper variants={itemVariants}>
            <Image src="https://www.greatwalstead.co.uk/wp-content/uploads/2023/09/GWS-forest-school.jpg" alt="Instagram 3" />
          </ImageWrapper>
          <ImageWrapper variants={itemVariants}>
            <Image src="https://www.greatwalstead.co.uk/wp-content/uploads/2023/09/forest-school.jpg" alt="Instagram 4" />
          </ImageWrapper>
        </ImagesContainer>
        <FollowButton 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          Follow on Instagram
        </FollowButton>
      </ContentContainer>
    </SectionContainer>
  );
};

export default FollowUsSection; 