import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// Import the navy blue concrete textured wall
import navyBlueConcreteWall from '../assets/images/solid-navy-blue-concrete-textured-wall.jpg';
// Add import for the menu icon
import menuIcon from '../assets/icons/hjbdxz.png';
import closeIcon from '../assets/icons/Untitled_Artwork 2.png';
import bottomLeftIcon from '../assets/icons/Untitled_Artwork 3.png';

// Color variables
const colors = {
  primary: '#1a365d', // Deep blue
  secondary: '#ffffff', // White
  accent: '#c4a77d', // Gold
  text: '#ffffff', // White
  darkOverlay: 'rgba(0, 0, 0, 0.4)', // Dark overlay
  backgroundFallback: '#001838', // Fallback background color (darker navy blue)
  hotPink: '#EC3988', // OpenWeek section pink
  darkBlue: '#001838', // OpenWeek section dark blue
};

const HeroContainer = styled(motion.div)`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.backgroundFallback}; /* Darker navy blue fallback */
  background-image: url(${navyBlueConcreteWall});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ContentWrapper = styled(motion.div)`
  text-align: center;
  color: ${colors.text};
  max-width: 800px;
  padding: 2rem;
  z-index: 1;
  position: relative;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const GCMText = styled(motion.h1)`
  font-family: 'Poppins', sans-serif;
  font-size: 9.5rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  line-height: 1;
  color: ${colors.secondary};
  margin: 0;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.6);
  
  @media (max-width: 768px) {
    font-size: 5.5rem;
    letter-spacing: 1px;
  }
`;

const ConventSchoolText = styled(motion.h1)`
  font-family: 'Poppins', sans-serif;
  font-size: 5rem;
  font-weight: 600;
  line-height: 1;
  color: ${colors.hotPink};
  margin: 0.2rem 0 0 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const TreeLogo = styled(motion.div)`
  width: 50px;
  height: 60px;
  margin: 0 auto 0.5rem;
  background-color: ${colors.white};
  mask-image: url('https://www.greatwalstead.co.uk/wp-content/themes/walstead/images/logo-white.svg');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
`;

const Tagline = styled(motion.p)`
  font-size: 1rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${colors.white};
  margin-top: 1rem;
  line-height: 1.4;
  font-weight: 400;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  transform: translate(-50%, -50%);
  color: ${colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const ScrollText = styled.span`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${colors.text};
`;

const ScrollIcon = styled(motion.div)`
  width: 30px;
  height: 30px;
  border: 2px solid ${colors.text};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.text};
`;

// If there's a ScrollIndicator or similar component, make sure it's centered
const ScrollIndicatorContainer = styled.div`
  position: absolute;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Change the ExploreButton position to be in the middle
const ExploreButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background-color: ${colors.hotPink};
  color: ${colors.secondary};
  border: 2px solid ${colors.secondary};
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  
  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.hotPink};
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  }
  
  &:active {
    transform: scale(0.9);
    transition: transform 0.2s ease;
  }
`;

// Update the NavMenuButton - add transition for smooth animation
const NavMenuButton = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;
  margin-top: -15px;
  transition: opacity 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

// Update the MenuIcon to position it at the very top right
const MenuIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  margin: 0;
  padding: 0;
`;

// Update the MenuOverlay to slide in from the right side and use the same background
const MenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 50%; /* Half of the screen */
  height: 100%;
  background-color: ${colors.secondary};
  background: linear-gradient(135deg, 
    ${colors.secondary} 0%, 
    rgba(245, 245, 250, 1) 50%, 
    ${colors.secondary} 100%);
  background-size: 200% 200%;
  animation: gradientAnimation 15s ease infinite;
  z-index: 999;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 120px 40px 40px 40px; /* Increased top padding */
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  @keyframes gradientAnimation {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }

  &::before {
    content: none;
  }
`;

// Update the CloseButton to use the image icon and match menu button size/position
const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;
  margin-top: -15px;
  
  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease;
  }
`;

const CloseIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  margin: 0;
  padding: 0;
`;

// Update the MenuLinks to align left
const MenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  width: 100%;
  position: relative;
  z-index: 1;
`;

// Update the MenuItem to use Link component
const MenuItem = styled(Link)`
  color: ${colors.darkBlue};
  font-size: 2.5rem;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
  position: relative;
  text-transform: uppercase;
  font-family: 'Arial', sans-serif;
  letter-spacing: 1px;
  width: 100%;
  text-align: left;
  padding-bottom: 5px;
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 3px;
    bottom: 0;
    left: 0;
    background-color: ${colors.hotPink};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 50%;
  }
`;

// Add a button for the bottom left corner
const BottomRightButton = styled(motion.button)`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100px;
  height: 100px;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 990;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;
`;

const BottomRightIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  margin: 0;
  padding: 0;
`;

// Add animation variants for the bottom right button
const bottomRightButtonVariants = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      delay: 1.8,
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: { 
    scale: 1.1,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: { 
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

// Add state for menu
const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Toggle menu function
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Update the menu animation variants
  const menuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'tween',
        duration: 0.4,
        ease: 'easeOut'
      }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: { 
        type: 'tween',
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  };

  // Add animation variants for menu items
  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Add animation for close button
  const closeButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        staggerChildren: 0.3
      }
    }
  };

  const contentVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const scrollVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5,
        duration: 0.8
      }
    }
  };

  // Add a ref for the container
  const heroRef = React.useRef(null);
  
  // Add an effect to restore the hero section when scrolled back
  useEffect(() => {
    const checkVisibility = () => {
      if (!heroRef.current) return;
      
      const rect = heroRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      
      // If hero section becomes visible and the content is faded out, restore it
      if (isVisible) {
        const contentWrapper = document.querySelector('.content-wrapper');
        if (contentWrapper && (contentWrapper.style.opacity === '0' || contentWrapper.style.transform.includes('translateY'))) {
          // Reset the content wrapper with animation
          contentWrapper.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
          contentWrapper.style.transform = 'translateY(0)';
          contentWrapper.style.opacity = '1';
        }
      }
    };
    
    // Add scroll listener
    window.addEventListener('scroll', checkVisibility);
    
    // Check initially
    checkVisibility();
    
    // Cleanup
    return () => window.removeEventListener('scroll', checkVisibility);
  }, []);

  // Modify the scrollToOpenWeek function to set a flag
  const scrollToOpenWeek = () => {
    const openWeekSection = document.getElementById('open-week-section');
    
    if (openWeekSection) {
      // First animate the content to fade out upward
      const contentWrapper = document.querySelector('.content-wrapper');
      if (contentWrapper) {
        contentWrapper.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        contentWrapper.style.transform = 'translateY(-50px)';
        contentWrapper.style.opacity = '0';
      }
      
      // Create a scroll animation overlay
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '0';
      overlay.style.backgroundColor = colors.hotPink;
      overlay.style.zIndex = '999';
      overlay.style.transition = 'height 0.8s cubic-bezier(0.65, 0, 0.35, 1)';
      document.body.appendChild(overlay);
      
      // Trigger the animation after a small delay
      setTimeout(() => {
        overlay.style.height = '100%';
        
        // Scroll to the section after animation
        setTimeout(() => {
          openWeekSection.scrollIntoView({ behavior: 'auto', block: 'start' });
          
          // Remove the overlay with animation
          setTimeout(() => {
            overlay.style.height = '0';
            
            // Remove the overlay element after animation
            setTimeout(() => {
              document.body.removeChild(overlay);
            }, 800);
          }, 300);
        }, 600);
      }, 100);
    }
  };

  // Add animation variants for the explore button
  const exploreButtonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.2,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  // Add a function to scroll to "Why Choose Us" section
  const scrollToWhyChooseUs = () => {
    const whyChooseUsSection = document.getElementById('why-choose-us-section');
    
    if (whyChooseUsSection) {
      // Create a scroll animation overlay
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '0';
      overlay.style.backgroundColor = colors.hotPink;
      overlay.style.zIndex = '999';
      overlay.style.transition = 'height 0.8s cubic-bezier(0.65, 0, 0.35, 1)';
      document.body.appendChild(overlay);
      
      // Trigger the animation after a small delay
      setTimeout(() => {
        overlay.style.height = '100%';
        
        // Scroll to the section after animation
        setTimeout(() => {
          whyChooseUsSection.scrollIntoView({ behavior: 'auto', block: 'start' });
          
          // Remove the overlay with animation
          setTimeout(() => {
            overlay.style.height = '0';
            
            // Remove the overlay element after animation
            setTimeout(() => {
              document.body.removeChild(overlay);
            }, 800);
          }, 300);
        }, 600);
      }, 100);
    }
  };

  return (
    <>
      {/* Add the nav menu button */}
      <NavMenuButton onClick={toggleMenu} style={{ opacity: menuOpen ? 0 : 1 }}>
        <MenuIcon src={menuIcon} alt="Menu" />
      </NavMenuButton>
      
      {/* Add the bottom right button with animations */}
      <BottomRightButton 
        onClick={scrollToWhyChooseUs}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        variants={bottomRightButtonVariants}
      >
        <BottomRightIcon src={bottomLeftIcon} alt="Why Choose Us" />
      </BottomRightButton>
      
      {/* Updated menu overlay with animated items */}
      {menuOpen && (
        <MenuOverlay
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
        >
          <CloseButton 
            onClick={toggleMenu}
            initial="hidden"
            animate="visible"
            variants={closeButtonVariants}
          >
            <CloseIcon src={closeIcon} alt="Close" />
          </CloseButton>
          <MenuLinks>
            <motion.div custom={0} variants={menuItemVariants} initial="hidden" animate="visible">
              <MenuItem to="/">HOME</MenuItem>
            </motion.div>
            <motion.div custom={1} variants={menuItemVariants} initial="hidden" animate="visible">
              <MenuItem to="/admissions">ADMISSIONS</MenuItem>
            </motion.div>
            <motion.div custom={2} variants={menuItemVariants} initial="hidden" animate="visible">
              <MenuItem to="#">WHY CHOOSE US</MenuItem>
            </motion.div>
            <motion.div custom={3} variants={menuItemVariants} initial="hidden" animate="visible">
              <MenuItem to="#">OUR SCHOOL</MenuItem>
            </motion.div>
            <motion.div custom={4} variants={menuItemVariants} initial="hidden" animate="visible">
              <MenuItem to="#">OUR COMMUNITY</MenuItem>
            </motion.div>
            <motion.div custom={5} variants={menuItemVariants} initial="hidden" animate="visible">
              <MenuItem to="#">ABOUT US</MenuItem>
            </motion.div>
            <motion.div custom={6} variants={menuItemVariants} initial="hidden" animate="visible">
              <MenuItem to="#">CONTACT US</MenuItem>
            </motion.div>
          </MenuLinks>
        </MenuOverlay>
      )}
    
      <HeroContainer
        ref={heroRef}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <ContentWrapper 
          variants={contentVariants}
          className="content-wrapper"
        >
          <Title>
            <TreeLogo initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} />
            <GCMText
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              GCM
            </GCMText>
            <ConventSchoolText
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Convent School
            </ConventSchoolText>
            <Tagline
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              A prestigious educational institution
              <br />
              dedicated to academic excellence
            </Tagline>
          </Title>
          
          {/* Explore button */}
          <ExploreButton
            variants={exploreButtonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToOpenWeek}
          >
            Explore
          </ExploreButton>
        </ContentWrapper>
        
        <ScrollIndicatorContainer>
          <ScrollIndicator 
            variants={scrollVariants}
            initial="hidden"
            animate="visible"
          >
            <ScrollText>Scroll</ScrollText>
            <ScrollIcon
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </ScrollIcon>
          </ScrollIndicator>
        </ScrollIndicatorContainer>
      </HeroContainer>
    </>
  );
};

export default Hero; 