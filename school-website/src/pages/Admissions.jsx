import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import EnquirySection from '../components/EnquirySection';
import Footer from '../components/Footer';

// Import icons and images - adjust paths as needed
import menuIcon from '../assets/icons/hjbdxz.png';
import closeIcon from '../assets/icons/Untitled_Artwork 2.png';

// Color variables
const colors = {
  primary: '#1a365d', // Deep blue
  secondary: '#ffffff', // White
  accent: '#c4a77d', // Gold
  text: '#1a365d', // Deep blue text
  darkOverlay: 'rgba(0, 0, 0, 0.4)', // Dark overlay
  backgroundFallback: '#1a365d', // Fallback background color
  hotPink: '#EC3988', // Pink accent color
  darkBlue: '#001838', // Dark blue for backgrounds
  lightGray: '#f5f5f5', // Light background
};

// Floating animation container
const FloatingElement = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background-color: ${colors.hotPink};
  opacity: 0.2;
  z-index: 0;
  filter: blur(8px);
`;

// Floating elements for visual appeal
const floatingVariants = {
  float: {
    y: [0, -10, 0],
    x: [0, 5, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

// Advanced scroll animation
const ScrollAnimatedElement = ({ children, direction = "up", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const variants = {
    hidden: {
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      opacity: 0,
      scale: direction === "scale" ? 0.8 : 1,
      rotate: direction === "rotate" ? -5 : 0
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.22, 1, 0.36, 1] // Improved cubic bezier
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

// Page container
const PageContainer = styled(motion.div)`
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

// Menu components
const MenuIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  margin: 0;
  padding: 0;
`;

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

const MenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 50%;
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
  padding: 120px 40px 40px 40px;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
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

const MenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  width: 100%;
  position: relative;
  z-index: 1;
`;

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

// Header section
const HeaderSection = styled(motion.section)`
  background-image: url('https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80');
  background-size: cover;
  background-position: center;
  height: 60vh;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding-bottom: 3rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const ParallaxBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80');
  background-size: cover;
  background-position: center;
  z-index: -1;
`;

const HeaderContent = styled(motion.div)`
  position: relative;
  z-index: 1;
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const AdmissionsTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${colors.secondary};
  text-transform: uppercase;
  margin-bottom: 1rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -0.8rem;
    left: 0;
    width: 5rem;
    height: 0.5rem;
    background-color: ${colors.hotPink};
  }
`;

// Introduction section
const IntroSection = styled(motion.section)`
  padding: 4rem 2rem;
  background-color: ${colors.secondary};
  max-width: 1200px;
  margin: 0 auto;
`;

const IntroText = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${colors.text};
  margin-bottom: 2rem;
  max-width: 800px;
`;

// Word of it section
const WordSection = styled(motion.section)`
  padding: 4rem 2rem;
  background-color: ${colors.lightGray};
  position: relative;
  overflow: hidden;
`;

const WordSectionContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const WordTextContainer = styled(motion.div)`
  flex: 1;
  min-width: 300px;
`;

const WordImageContainer = styled(motion.div)`
  flex: 1;
  min-width: 300px;
  position: relative;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.darkBlue};
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 4rem;
    height: 0.3rem;
    background-color: ${colors.hotPink};
  }
`;

const WordImage = styled(motion.img)`
  width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const WordButton = styled(motion.a)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: transparent;
  color: ${colors.darkBlue};
  border: 2px solid ${colors.darkBlue};
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${colors.darkBlue};
    color: ${colors.secondary};
  }
`;

// Open Week section
const OpenWeekSection = styled(motion.section)`
  padding: 4rem 2rem;
  background-color: ${colors.secondary};
`;

const OpenWeekContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const OpenWeekForm = styled(motion.div)`
  margin-top: 2rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const FormInput = styled(motion.input)`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const FormButton = styled(motion.button)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: ${colors.hotPink};
  color: ${colors.secondary};
  border: none;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
`;

// Admissions Process section
const ProcessSection = styled(motion.section)`
  padding: 4rem 2rem;
  background-color: ${colors.lightGray};
`;

const ProcessContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const ProcessSteps = styled(motion.div)`
  margin-top: 2rem;
`;

const ProcessStep = styled(motion.div)`
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const StepHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StepTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${colors.darkBlue};
`;

const ExpandIcon = styled.span`
  color: ${colors.darkBlue};
  transform: ${props => props.expanded ? 'rotate(180deg)' : 'rotate(0)'};
  transition: transform 0.3s ease;
`;

const StepContent = styled(motion.div)`
  padding-top: 1rem;
  display: ${props => props.expanded ? 'block' : 'none'};
`;

// Joining section
const JoiningSection = styled(motion.section)`
  padding: 4rem 2rem;
  background-color: ${colors.secondary};
`;

const JoiningContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const JoiningTextContainer = styled(motion.div)`
  flex: 1;
  min-width: 300px;
`;

const JoiningImageContainer = styled(motion.div)`
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
`;

const MapImage = styled(motion.img)`
  max-width: 100%;
  height: auto;
`;

// Questions section
const QuestionsSection = styled(motion.section)`
  padding: 4rem 2rem;
  background-color: ${colors.lightGray};
`;

const QuestionsContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
`;

const QuestionsTextContainer = styled(motion.div)`
  flex: 1;
  min-width: 300px;
`;

const QuestionsImageContainer = styled(motion.div)`
  flex: 1;
  min-width: 300px;
`;

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15 
    }
  }
};

const slideIn = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15 
    }
  }
};

const slideRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15 
    }
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15 
    }
  }
};

// Add these styled components after the other styled components
const HighlightedText = styled.span`
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  color: ${props => props.color || colors.hotPink};
  letter-spacing: 1px;
`;

const GCMText = styled.span`
  font-family: 'Arial', sans-serif;
  font-weight: 800;
  color: ${props => props.color || colors.hotPink};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ConventText = styled.span`
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 700;
  color: ${props => props.color || colors.hotPink};
`;

const Admissions = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedStep, setExpandedStep] = useState(null);

  // Refs for parallax elements
  const headerRef = useRef(null);
  const wordSectionRef = useRef(null);
  const processRef = useRef(null);
  const joiningRef = useRef(null);
  const questionsRef = useRef(null);

  const { scrollY, scrollYProgress } = useScroll();
  
  // Spring physics for smoother animations
  const springScrollY = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  
  // Parallax transforms with improved ranges
  const headerParallax = useTransform(scrollY, [0, 500], ['0%', '20%']);
  const titleParallax = useTransform(scrollY, [0, 300], ['0%', '30%']);
  const titleScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 0.8, 1]);
  
  // Improved parallax effect that activates when section is in view
  const wordBgParallax = useTransform(scrollY, 
    value => wordSectionRef.current ? 
      [wordSectionRef.current.offsetTop - 500, wordSectionRef.current.offsetTop + 500] : [0, 1000], 
    ['0%', '30%']
  );
  
  // Rotation effect for the map image
  const mapRotation = useTransform(scrollY,
    value => joiningRef.current ?
      [joiningRef.current.offsetTop - 300, joiningRef.current.offsetTop + 300] : [0, 1000],
    [0, 5]
  );
  
  // Background parallax for process section
  const processBgPosition = useTransform(scrollY,
    value => processRef.current ?
      [processRef.current.offsetTop - 500, processRef.current.offsetTop + 500] : [0, 1000],
    ['50% 0%', '50% 20%']
  );

  // Questions section parallax
  const questionsTextPosition = useTransform(scrollY,
    value => questionsRef.current ?
      [questionsRef.current.offsetTop - 400, questionsRef.current.offsetTop + 400] : [0, 1000],
    [0, 50]
  );
  
  const questionsImagePosition = useTransform(scrollY,
    value => questionsRef.current ?
      [questionsRef.current.offsetTop - 400, questionsRef.current.offsetTop + 400] : [0, 1000],
    [0, -30]
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleStep = (stepId) => {
    if (expandedStep === stepId) {
      setExpandedStep(null);
    } else {
      setExpandedStep(stepId);
    }
  };

  const processSteps = [
    { id: 1, title: "Come and meet us" },
    { id: 2, title: "Register" },
    { id: 3, title: "Taster day" },
    { id: 4, title: "Offer letter" },
    { id: 5, title: "Accept the offer" },
    { id: 6, title: "Complete the paperwork" },
  ];

  return (
    <PageContainer
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Floating Elements */}
      <FloatingElement
        variants={floatingVariants}
        animate="float"
        style={{ top: '20%', left: '10%', width: '150px', height: '150px' }}
      />
      <FloatingElement
        variants={floatingVariants}
        animate="float"
        style={{ top: '60%', right: '5%', width: '100px', height: '100px' }}
      />
      <FloatingElement
        variants={floatingVariants}
        animate="float"
        style={{ bottom: '30%', left: '5%', width: '120px', height: '120px' }}
      />

      {/* Progress bar that shows scroll position */}
      <motion.div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: colors.hotPink,
          transformOrigin: '0%',
          scaleX: springScrollY,
          zIndex: 9999
        }}
      />

      {/* Navbar Button */}
      <NavMenuButton onClick={toggleMenu}>
        <MenuIcon src={menuIcon} alt="Menu" />
      </NavMenuButton>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <MenuOverlay
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <CloseButton onClick={toggleMenu}>
              <CloseIcon src={closeIcon} alt="Close" />
            </CloseButton>
            <MenuLinks>
              <MenuItem to="/">HOME</MenuItem>
              <MenuItem to="/admissions">ADMISSIONS</MenuItem>
              <MenuItem to="#">WHY CHOOSE US</MenuItem>
              <MenuItem to="#">OUR SCHOOL</MenuItem>
              <MenuItem to="#">OUR COMMUNITY</MenuItem>
              <MenuItem to="#">ABOUT US</MenuItem>
              <MenuItem to="#">CONTACT US</MenuItem>
            </MenuLinks>
          </MenuOverlay>
        )}
      </AnimatePresence>

      {/* Header Section - Enhanced parallax */}
      <HeaderSection 
        ref={headerRef}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <ParallaxBackground
          style={{ y: headerParallax }}
        />
        <HeaderContent
          variants={staggerChildren}
        >
          <AdmissionsTitle
            style={{ 
              y: titleParallax, 
              scale: titleScale, 
              opacity: titleOpacity 
            }}
            variants={slideIn}
          >
            ADMISSIONS
          </AdmissionsTitle>
          <IntroText 
            style={{ color: colors.secondary }}
            variants={slideUp}
          >
            We're here to support you at <ConventText color={colors.secondary}>GCM</ConventText> <GCMText color={colors.secondary}>Convent</GCMText>, every step of the way.
          </IntroText>
        </HeaderContent>
      </HeaderSection>

      {/* Introduction Section */}
      <IntroSection
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeIn}
      >
        <ScrollAnimatedElement>
          <IntroText variants={slideUp}>
            At <ConventText>GCM</ConventText>, we make it as easy as possible to explore a potential partnership with us. We want our
            inquiry process to be a helpful discovery of what a lifetime of preparation in a specially curated
            learning community might look like for your child, and if <ConventText>GCM</ConventText> is the right fit.
          </IntroText>
        </ScrollAnimatedElement>
        <ScrollAnimatedElement delay={0.2}>
          <IntroText variants={slideUp}>
            Choosing a school is an extremely important decision. We've made our admissions process as simple as
            possible to help families through this critical decision-making time.
          </IntroText>
        </ScrollAnimatedElement>
      </IntroSection>

      {/* Word of It Section - Enhanced parallax */}
      <WordSection
        ref={wordSectionRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeIn}
      >
        <WordSectionContent variants={staggerChildren}>
          <WordTextContainer variants={slideIn}>
            <ScrollAnimatedElement direction="left">
              <SectionTitle variants={slideUp}>DON'T JUST TAKE OUR WORD FOR IT</SectionTitle>
            </ScrollAnimatedElement>
            <ScrollAnimatedElement direction="left" delay={0.2}>
              <IntroText variants={slideUp}>
                "The dedication and positivity of the staff is evident in everything they do - from the care and attention our
                children receive, to the amazing progress they are making with their education."
              </IntroText>
            </ScrollAnimatedElement>
            <ScrollAnimatedElement direction="scale" delay={0.4}>
              <WordButton 
                href="#"
                variants={scaleUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                READ THE STORY
              </WordButton>
            </ScrollAnimatedElement>
          </WordTextContainer>
          <WordImageContainer variants={slideRight}>
            <ScrollAnimatedElement direction="right">
              <WordImage 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1009&q=80"
                alt="Students in library with teacher"
                style={{ y: wordBgParallax }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </ScrollAnimatedElement>
          </WordImageContainer>
        </WordSectionContent>
      </WordSection>

      {/* Open Week Section */}
      <OpenWeekSection
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeIn}
      >
        <OpenWeekContent variants={staggerChildren}>
          <ScrollAnimatedElement direction="up">
            <SectionTitle variants={slideUp}>OUR NEXT OPEN WEEK</SectionTitle>
          </ScrollAnimatedElement>
          <ScrollAnimatedElement direction="up" delay={0.2}>
            <IntroText variants={slideUp}>
              Information about our Open Week dates on our next Open Week.
            </IntroText>
          </ScrollAnimatedElement>
          <ScrollAnimatedElement direction="up" delay={0.3}>
            <OpenWeekForm variants={slideUp}>
              <FormLabel>Select your date:</FormLabel>
              <FormInput 
                type="text" 
                placeholder="Select a date..."
                variants={slideUp}
              />
              <FormButton
                variants={scaleUp}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                BOOK MY VISIT
              </FormButton>
            </OpenWeekForm>
          </ScrollAnimatedElement>
        </OpenWeekContent>
      </OpenWeekSection>

      {/* Admissions Process Section - With bg parallax */}
      <ProcessSection
        ref={processRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeIn}
        style={{ backgroundPosition: processBgPosition }}
      >
        <ProcessContent variants={staggerChildren}>
          <ScrollAnimatedElement direction="up">
            <SectionTitle variants={slideUp}>ADMISSIONS PROCESS</SectionTitle>
          </ScrollAnimatedElement>
          <ScrollAnimatedElement direction="up" delay={0.2}>
            <IntroText variants={slideUp}>
              Our admissions process is designed to be simple and straightforward.
            </IntroText>
          </ScrollAnimatedElement>
          <ProcessSteps variants={staggerChildren}>
            {processSteps.map((step, index) => (
              <ScrollAnimatedElement direction={index % 2 === 0 ? "left" : "right"} delay={0.1 * index}>
                <ProcessStep 
                  key={step.id} 
                  onClick={() => toggleStep(step.id)}
                  variants={slideUp}
                  custom={index}
                  whileHover={{ scale: 1.01, x: 5 }}
                >
                  <StepHeader>
                    <StepTitle>{step.title}</StepTitle>
                    <ExpandIcon expanded={expandedStep === step.id}>▼</ExpandIcon>
                  </StepHeader>
                  <AnimatePresence>
                    {expandedStep === step.id && (
                      <StepContent 
                        expanded={expandedStep === step.id}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>Detailed information about {step.title.toLowerCase()} step would go here.</p>
                      </StepContent>
                    )}
                  </AnimatePresence>
                </ProcessStep>
              </ScrollAnimatedElement>
            ))}
          </ProcessSteps>
        </ProcessContent>
      </ProcessSection>

      {/* Joining Section - With rotating image */}
      <JoiningSection
        ref={joiningRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeIn}
      >
        <JoiningContent variants={staggerChildren}>
          <JoiningTextContainer variants={slideIn}>
            <ScrollAnimatedElement direction="left">
              <SectionTitle variants={slideUp}>JOINING OUR <ConventText>GCM</ConventText> FAMILY</SectionTitle>
            </ScrollAnimatedElement>
            <ScrollAnimatedElement direction="left" delay={0.2}>
              <IntroText variants={slideUp}>
                When you join <ConventText>GCM</ConventText> school as a family, you become a part of our community. We believe each child is
                unique, and they deserve to be understood, supported and nurtured, as they develop at their own unique
                pace within our warm caring community.
              </IntroText>
            </ScrollAnimatedElement>
            <ScrollAnimatedElement direction="left" delay={0.3}>
              <IntroText variants={slideUp}>
                We are blessed with a beautiful site, filled with nature and space for children to enjoy. Set in
                acres of countryside, our grounds provide the ideal environment for our pupils to flourish.
              </IntroText>
            </ScrollAnimatedElement>
            <ScrollAnimatedElement direction="left" delay={0.4}>
              <IntroText variants={slideUp}>
                If you're interested in your child joining us at our vibrant and friendly school, we'd be delighted to hear from you. Our dedicated admissions team will help you every step of the way through the process.
              </IntroText>
            </ScrollAnimatedElement>
          </JoiningTextContainer>
          <JoiningImageContainer variants={slideRight}>
            <ScrollAnimatedElement direction="right">
              <MapImage 
                src="https://images.unsplash.com/photo-1527489377706-5bf97e608852?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80"
                alt="School campus map"
                style={{ rotate: mapRotation }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </ScrollAnimatedElement>
          </JoiningImageContainer>
        </JoiningContent>
      </JoiningSection>

      {/* Questions Section - With text/image opposing motion */}
      <QuestionsSection
        ref={questionsRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeIn}
      >
        <QuestionsContent variants={staggerChildren}>
          <QuestionsTextContainer 
            variants={slideIn}
            style={{ y: questionsTextPosition }}
          >
            <ScrollAnimatedElement direction="left">
              <SectionTitle variants={slideUp}>BUZZING WITH QUESTIONS?</SectionTitle>
            </ScrollAnimatedElement>
            <ScrollAnimatedElement direction="left" delay={0.2}>
              <IntroText variants={slideUp}>
                Our admissions team is here to help you with any questions you may have.
              </IntroText>
            </ScrollAnimatedElement>
            <ScrollAnimatedElement direction="scale" delay={0.3}>
              <WordButton 
                href="#"
                variants={scaleUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                TALK TO OUR TEAM
              </WordButton>
            </ScrollAnimatedElement>
          </QuestionsTextContainer>
          <QuestionsImageContainer 
            variants={slideRight}
            style={{ y: questionsImagePosition }}
          >
            <ScrollAnimatedElement direction="right">
              <WordImage 
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80"
                alt="Happy student"
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ duration: 0.3 }}
              />
            </ScrollAnimatedElement>
          </QuestionsImageContainer>
        </QuestionsContent>
      </QuestionsSection>

      {/* Enquiry Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={fadeIn}
      >
        <EnquirySection />
      </motion.div>

      {/* Footer */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={fadeIn}
      >
        <Footer />
      </motion.div>
    </PageContainer>
  );
};

export default Admissions;
