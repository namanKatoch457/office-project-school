import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

// Color variables
const colors = {
  white: '#FFFFFF',
  lightPink: '#fde8f0', // Light pink background
  darkPink: '#EC3988', // Hot pink for titles/accents
  darkBlue: '#001838', // Dark blue for text and elements
};

const SectionContainer = styled.div`
  position: relative;
  width: 100%;
  /* Setting a fixed height for proper intersection observer calculation */
  height: 400vh; /* 100vh for the sticky container + 300vh for scroll progress */
  overflow: visible;
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const SlidesTrack = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 500%; /* 5x width for 5 slides */
  height: 100%;
  display: flex;
`;

const Slide = styled.div`
  position: relative;
  width: 20%; /* Each slide takes 1/5 of the total width */
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const SlideContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const TextContent = styled.div`
  padding: 2rem;
`;

const ImageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  color: ${props => props.color || colors.white};
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  font-family: 'True North Rough Black W01 Rg', 'Montserrat', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SectionText = styled(motion.p)`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: ${props => props.color || colors.darkBlue};
  max-width: 500px;
`;

const Button = styled(motion.button)`
  background-color: ${props => props.bgColor || colors.darkPink};
  color: ${props => props.color || colors.white};
  border: none;
  border-radius: 30px;
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled(motion.img)`
  width: 100%;
  max-width: 450px;
  height: auto;
  border-radius: ${props => props.borderRadius || '0'};
  box-shadow: ${props => props.boxShadow || 'none'};
`;

// For the 7Cs section
const IconsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;
`;

const IconCircle = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.bgColor || colors.darkPink};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  margin: 0 auto;
`;

// Floating decorative elements
const FloatingHeart = styled(motion.div)`
  position: absolute;
  left: 3%;
  top: 10%;
  font-size: 2rem;
  color: ${colors.darkPink};
  opacity: 0.6;
  z-index: 10;
`;

const FloatingStar = styled(motion.div)`
  position: absolute;
  right: 3%;
  bottom: 10%;
  font-size: 2rem;
  color: ${colors.darkPink};
  opacity: 0.6;
  z-index: 10;
`;

// Slide indicators
const SlideIndicators = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
`;

const SlideIndicator = styled.div`
  width: 40px;
  height: 6px;
  background-color: ${props => props.active ? colors.darkPink : 'rgba(255, 255, 255, 0.5)'};
  border-radius: 3px;
  transition: all 0.3s ease;
  cursor: pointer;
`;

// Navigation arrows
const NavArrow = styled(motion.div)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${colors.white};
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.darkPink};
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }
`;

// Horizontal scroll prompt
const ScrollPrompt = styled(motion.div)`
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  color: ${colors.darkPink};
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 10;
`;

const ScrollIcon = styled(motion.div)`
  font-size: 1.5rem;
  margin-left: 8px;
  display: flex;
`;

// Progress indicator for debugging
// eslint-disable-next-line no-unused-vars
const ProgressIndicator = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 12px;
  z-index: 1000;
`;

const HorizontalScrollSection = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const touchStartRef = useRef(null);
  
  // Function to generate variants based on active slide
  const getSlideVariants = (slideIndex) => ({
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: activeSlide === slideIndex ? 1 : 0.3, 
      y: 0,
      transition: { duration: 0.5 }
    }
  });

  // Handle scroll events for vertical to horizontal conversion
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Set up Intersection Observer to detect when section is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []);

  // Calculate scroll position and update horizontal slides
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current || !isInView) return;

      // Get container's position and dimensions
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate how far we've scrolled into the section (0 to 1)
      // Offset by viewport height since the sticky container is 100vh
      let rawProgress = (viewportHeight - containerTop) / (containerHeight - viewportHeight);
      
      // Clamp progress between 0 and 1
      const progress = Math.max(0, Math.min(1, rawProgress));
      setScrollProgress(progress);
      
      // Map progress to slide index (we have 5 slides)
      // We want to complete all slides slightly before reaching the end
      // to allow a buffer for transitioning back to vertical scroll
      const slideProgress = progress * 5 * 0.95; // Slightly less than 5 to allow buffer
      const newActiveSlide = Math.min(4, Math.floor(slideProgress));
      
      // Update active slide
      setActiveSlide(newActiveSlide);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Call once to initialize
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isInView]);

  // Add touch handling for mobile
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartRef.current = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
      if (!touchStartRef.current || !isInView) return;
      
      // If we're in the section, prevent default behavior to avoid
      // the browser's natural scroll, which would interfere with our custom scroll
      if (scrollProgress > 0 && scrollProgress < 1) {
        e.preventDefault();
      }
    };
    
    const handleTouchEnd = () => {
      touchStartRef.current = null;
    };
    
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, isInView]);

  // Handle direct slide navigation
  const handleIndicatorClick = (index) => {
    // Calculate the scroll position needed to reach this slide
    const container = containerRef.current;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const containerTop = containerRect.top;
    const containerHeight = containerRect.height;
    const viewportHeight = window.innerHeight;
    
    // Calculate target progress
    const targetProgress = (index + 0.5) / 5; // Target the middle of the slide
    
    // Calculate scroll position
    const scrollPosition = 
      window.scrollY + 
      containerTop + 
      (containerHeight - viewportHeight) * targetProgress;
    
    // Scroll to position
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  };

  // Navigate to previous/next slide
  const goToPrevSlide = () => {
    if (activeSlide > 0) {
      handleIndicatorClick(activeSlide - 1);
    }
  };

  const goToNextSlide = () => {
    if (activeSlide < 4) {
      handleIndicatorClick(activeSlide + 1);
    }
  };

  // Calculate the exact horizontal position based on scroll progress
  const calculateSlidePosition = () => {
    if (scrollProgress < 0.05) return 0; // Start threshold
    if (scrollProgress > 0.95) return -80; // End threshold (4 slides × 20%)
    
    // Map the 0.05-0.95 range to 0-80% horizontal translation
    const normalizedProgress = (scrollProgress - 0.05) / 0.9;
    return -normalizedProgress * 80; // Move from 0 to -80% (4 slides of 20% each)
  };

  return (
    <SectionContainer ref={containerRef}>
      <StickyContainer ref={stickyRef}>
        <FloatingHeart
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 0.6 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        >
          ♥
        </FloatingHeart>
        <FloatingStar
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 0.6 }}
          transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse" }}
        >
          ✧
        </FloatingStar>
        
        <NavArrow 
          className="prev" 
          onClick={goToPrevSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ opacity: activeSlide > 0 ? 1 : 0.3 }}
        >
          ←
        </NavArrow>
        <NavArrow 
          className="next" 
          onClick={goToNextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ opacity: activeSlide < 4 ? 1 : 0.3 }}
        >
          →
        </NavArrow>

        <ScrollPrompt
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: 1 }}
        >
          Keep Scrolling
          <ScrollIcon
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↔
          </ScrollIcon>
        </ScrollPrompt>

        <SlidesTrack 
          style={{ 
            transform: `translateX(${calculateSlidePosition()}%)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* New Slide 1: Blank White Slide */}
          <Slide style={{ backgroundColor: colors.white }}>
            {/* Intentionally left blank */}
          </Slide>

          {/* Slide 2 (previously 1): Our Values */}
          <Slide style={{ backgroundColor: colors.white }}>
            <SlideContent>
              <TextContent>
                <SectionTitle 
                  variants={getSlideVariants(1)}
                  initial="hidden"
                  animate="visible"
                  color={colors.darkPink}
                >
                  Our Values
                </SectionTitle>
                <SectionText 
                  variants={getSlideVariants(1)}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  We lead by example to instil positive values – empathy, adventure and determination – which are integral to our school life and just as important to us as academic achievement.
                </SectionText>
                <Button 
                  variants={getSlideVariants(1)}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  bgColor={colors.darkPink}
                >
                  Discover More
                </Button>
              </TextContent>
              <ImageContent>
                <Image 
                  src="https://www.greatwalstead.co.uk/wp-content/uploads/2023/09/Our-Values-Explorer.png"
                  alt="Child with binoculars surrounded by nature illustrations"
                  variants={getSlideVariants(1)}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.7 }}
                />
              </ImageContent>
            </SlideContent>
          </Slide>

          {/* Slide 3: Head's Welcome */}
          <Slide style={{ backgroundColor: colors.lightPink }}>
            <SlideContent>
              <TextContent>
                <SectionTitle 
                  variants={getSlideVariants(2)}
                  initial="hidden"
                  animate="visible"
                  color={colors.darkPink}
                >
                  Head's Welcome
                </SectionTitle>
                <SectionText 
                  variants={getSlideVariants(2)}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  Find out the magic ingredient which our headteacher believes gives Great Walstead its special atmosphere.
                </SectionText>
                <Button 
                  variants={getSlideVariants(2)}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  bgColor={colors.darkPink}
                >
                  Read More
                </Button>
              </TextContent>
              <ImageContent>
                <Image 
                  src="https://www.greatwalstead.co.uk/wp-content/uploads/2023/09/Chris-and-pupils.jpg"
                  alt="Headteacher with students"
                  variants={getSlideVariants(2)}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.7 }}
                  borderRadius="10px"
                  boxShadow="0 5px 15px rgba(0, 0, 0, 0.1)"
                />
              </ImageContent>
            </SlideContent>
          </Slide>

          {/* Slide 4: Guided by the 7Cs */}
          <Slide style={{ backgroundColor: '#073B22', backgroundImage: 'url(https://www.greatwalstead.co.uk/wp-content/uploads/2023/09/forest-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <SlideContent>
              <TextContent>
                <SectionTitle 
                  variants={getSlideVariants(3)}
                  initial="hidden"
                  animate="visible"
                  color={colors.white}
                >
                  Guided by the 7Cs
                </SectionTitle>
                <SectionText 
                  variants={getSlideVariants(3)}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  color={colors.white}
                >
                  It's our job as teachers to cultivate the innate curiosity and creativity in our children. Our learning compass – the 7 Cs – helps guide us.
                </SectionText>
                <Button 
                  variants={getSlideVariants(3)}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  bgColor={colors.white}
                  color={colors.darkBlue}
                >
                  Read More
                </Button>
              </TextContent>
              <ImageContent>
                <IconsContainer>
                  {['Curiosity', 'Creativity', 'Connection', 'Communication', 'Compassion', 'Commitment', 'Confidence'].map((c, index) => (
                    <IconCircle 
                      key={c}
                      variants={getSlideVariants(3)}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      bgColor={index % 2 === 0 ? colors.darkPink : '#00B0A6'}
                    >
                      {c.charAt(0)}
                    </IconCircle>
                  ))}
                </IconsContainer>
              </ImageContent>
            </SlideContent>
          </Slide>

          {/* Slide 5: The Year 7&8 Experience */}
          <Slide style={{ backgroundColor: colors.white }}>
            <SlideContent>
              <TextContent>
                <SectionTitle 
                  variants={getSlideVariants(4)}
                  initial="hidden"
                  animate="visible"
                  color={colors.darkPink}
                >
                  The Year 7&8 Experience
                </SectionTitle>
                <SectionText 
                  variants={getSlideVariants(4)}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  Building dens, experimenting in science labs, and discovering passions are all part of the Year 7 & 8 experience at Great Walstead.
                </SectionText>
                <Button 
                  variants={getSlideVariants(4)}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  bgColor={colors.darkPink}
                >
                  Read More
                </Button>
              </TextContent>
              <ImageContent>
                <Image 
                  src="https://www.greatwalstead.co.uk/wp-content/uploads/2023/09/forest-school.jpg"
                  alt="Students in forest school"
                  variants={getSlideVariants(4)}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.7 }}
                  borderRadius="10px"
                  boxShadow="0 5px 15px rgba(0, 0, 0, 0.1)"
                />
              </ImageContent>
            </SlideContent>
          </Slide>
        </SlidesTrack>
        
        {/* Slide indicators */}
        <SlideIndicators>
          {[0, 1, 2, 3, 4].map(index => (
            <SlideIndicator 
              key={index} 
              active={activeSlide === index}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </SlideIndicators>
        
        {/* Progress indicator for debugging - uncomment if needed */}
        {/* <ProgressIndicator>
          Progress: {Math.round(scrollProgress * 100)}% | Slide: {activeSlide + 1}/5
        </ProgressIndicator> */}
      </StickyContainer>
    </SectionContainer>
  );
};

export default HorizontalScrollSection; 