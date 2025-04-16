import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { getStudentBirthdays } from '../utils/api';

// Color variables
const colors = {
  primary: '#EC3988', // Hot pink
  secondary: '#001838', // Dark blue
  white: '#FFFFFF',
  yellow: '#FFD700', // For decorations
  light: '#FDE8F0', // Light pink
};

const SectionContainer = styled.section`
  background-color: ${colors.primary};
  background-image: linear-gradient(150deg, #ff4f9e 0%, ${colors.primary} 50%, #d01c72 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 0 2rem;
  text-align: center;
  position: relative;
  z-index: 5;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3.5rem;
  color: ${colors.white};
  margin-bottom: 3rem;
  text-align: center;
  font-family: 'True North Rough Black W01 Rg', 'Montserrat', sans-serif;
  text-shadow: 2px 4px 0 rgba(0,0,0,0.15);
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
    margin-bottom: 2rem;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: visible;
  margin: 0 auto 2rem;
`;

const BirthdayGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 1rem 0;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BirthdayCard = styled(motion.div)`
  background-color: ${colors.white};
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  height: 100%;
  transform-style: preserve-3d;
  perspective: 1000px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: linear-gradient(to right, ${colors.secondary}, ${colors.primary});
  }
`;

const ProfileImage = styled(motion.img)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 6px solid ${colors.primary};
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
`;

const StudentName = styled(motion.h3)`
  font-size: 1.5rem;
  color: ${colors.secondary};
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const StudentClass = styled(motion.p)`
  font-size: 1.2rem;
  color: ${colors.primary};
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const BirthdayDate = styled(motion.p)`
  font-size: 1rem;
  color: #666;
  margin-top: 0.5rem;
`;

const NoData = styled.p`
  color: ${colors.white};
  font-size: 1.4rem;
  text-align: center;
  margin-top: 2rem;
  padding: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Birthday = styled(motion.div)`
  margin-top: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.2rem;
  background-color: rgba(236, 57, 136, 0.1);
  border-radius: 20px;
`;

const BirthdayIcon = styled(motion.span)`
  font-size: 1.8rem;
  margin-right: 0.8rem;
`;

const Decoration = styled(motion.div)`
  position: absolute;
  color: ${colors.yellow};
  font-size: 2rem;
  opacity: 0.2;
  z-index: 0;
  
  &.top-left {
    top: -10px;
    left: -10px;
    font-size: 2.5rem;
    transform: rotate(-30deg);
  }
  
  &.bottom-right {
    bottom: -10px;
    right: -10px;
    font-size: 2.5rem;
    transform: rotate(30deg);
  }
`;

// Navigation arrows
const NavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.25);
  color: ${colors.white};
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.8rem;
  z-index: 10;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
  
  &.prev {
    left: -25px;
  }
  
  &.next {
    right: -25px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    
    &.prev {
      left: 10px;
    }
    
    &.next {
      right: 10px;
    }
  }
`;

// Pagination indicators
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const PaginationDot = styled(motion.button)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? colors.white : 'rgba(255, 255, 255, 0.4)'};
  border: none;
  margin: 0 5px;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

// Confetti elements for birthday theme
const Confetti = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '10px'};
  height: ${props => props.size || '10px'};
  background-color: ${props => props.color || colors.yellow};
  opacity: ${props => props.opacity || 0.6};
  border-radius: ${props => props.isRound ? '50%' : '2px'};
  z-index: 1;
`;

// Cake decoration
const Cake = styled(motion.div)`
  position: absolute;
  font-size: ${props => props.size || '3rem'};
  color: ${props => props.color || colors.yellow};
  opacity: ${props => props.opacity || 0.6};
  z-index: 1;
`;

// Floating decorations
const FloatingElement = styled(motion.div)`
  position: absolute;
  color: ${colors.white};
  opacity: 0.1;
  font-size: ${props => props.size || '2rem'};
  z-index: 0;
`;

const BirthdaySection = () => {
  const [birthdayStudents, setBirthdayStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentBatch, setCurrentBatch] = useState(0);
  const autoSlideTimerRef = useRef(null);
  const sectionRef = useRef(null);
  
  // Group students into batches of 3
  const getBatches = (students) => {
    const batches = [];
    for (let i = 0; i < students.length; i += 3) {
      batches.push(students.slice(i, i + 3));
    }
    return batches;
  };
  
  const birthdayBatches = getBatches(birthdayStudents);
  const totalBatches = birthdayBatches.length;

  useEffect(() => {
    const fetchBirthdayStudents = async () => {
      try {
        setLoading(true);
        const response = await getStudentBirthdays();
        
        if (response.status === 'success') {
          setBirthdayStudents(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Failed to fetch birthday data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBirthdayStudents();
  }, []);
  
  // Auto-slide every 8 seconds (8000ms)
  useEffect(() => {
    if (birthdayBatches.length <= 1) return;
    
    const startAutoSlide = () => {
      autoSlideTimerRef.current = setInterval(() => {
        setCurrentBatch(prev => (prev + 1) % totalBatches);
      }, 8000);
    };
    
    startAutoSlide();
    
    return () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current);
      }
    };
  }, [birthdayBatches.length, totalBatches]);
  
  const goToNextBatch = () => {
    setCurrentBatch(prev => (prev + 1) % totalBatches);
    
    // Reset the auto-slide timer when manually navigating
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
      autoSlideTimerRef.current = setInterval(() => {
        setCurrentBatch(prev => (prev + 1) % totalBatches);
      }, 8000);
    }
  };
  
  const goToPrevBatch = () => {
    setCurrentBatch(prev => (prev - 1 + totalBatches) % totalBatches);
    
    // Reset the auto-slide timer when manually navigating
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
      autoSlideTimerRef.current = setInterval(() => {
        setCurrentBatch(prev => (prev + 1) % totalBatches);
      }, 8000);
    }
  };
  
  const handleDotClick = (index) => {
    setCurrentBatch(index);
    
    // Reset the auto-slide timer when manually navigating
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
      autoSlideTimerRef.current = setInterval(() => {
        setCurrentBatch(prev => (prev + 1) % totalBatches);
      }, 8000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        staggerChildren: 0.05,
        staggerDirection: -1 
      }
    }
  };
  
  const cardVariants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        damping: 12,
        stiffness: 100
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: { 
        duration: 0.2 
      }
    }
  };
  
  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        damping: 8,
        stiffness: 100,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };
  
  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  const birthdayIconVariants = {
    hidden: { rotate: -10, scale: 0.9 },
    visible: { 
      rotate: 0, 
      scale: 1 
    },
    animate: {
      rotate: [0, 10, 0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };
  
  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        damping: 10, 
        stiffness: 80 
      }
    }
  };
  
  const confettiVariants = {
    animate: (custom) => ({
      y: [0, custom.yEnd],
      x: [0, custom.xEnd],
      rotate: [0, custom.rotate],
      opacity: [0.7, 0],
      transition: {
        duration: custom.duration,
        repeat: Infinity,
        repeatType: "loop",
        delay: custom.delay
      }
    })
  };
  
  const floatingVariants = {
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

  // If no birthdays today, don't render the section
  if (!loading && birthdayStudents.length === 0) {
    return null;
  }

  // Generate random confetti positions
  const generateConfetti = (count) => {
    const confetti = [];
    const colors = ['#FFD700', '#EC3988', '#FFFFFF', '#001838', '#FDE8F0'];
    
    for (let i = 0; i < count; i++) {
      confetti.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 10 + 5}px`,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.2,
        isRound: Math.random() > 0.5,
        custom: {
          yEnd: Math.random() * 200 + 100,
          xEnd: (Math.random() - 0.5) * 200,
          rotate: Math.random() * 360,
          duration: Math.random() * 10 + 5,
          delay: Math.random() * 5
        }
      });
    }
    
    return confetti;
  };
  
  const confettiElements = generateConfetti(30);

  return (
    <SectionContainer ref={sectionRef}>
      {/* Random confetti particles */}
      {confettiElements.map(conf => (
        <Confetti
          key={conf.id}
          style={{ left: conf.left, top: conf.top }}
          size={conf.size}
          color={conf.color}
          opacity={conf.opacity}
          isRound={conf.isRound}
          variants={confettiVariants}
          animate="animate"
          custom={conf.custom}
        />
      ))}
      
      {/* Floating cake decoration */}
      <Cake
        size="4.5rem"
        opacity={0.5}
        style={{ bottom: '25%', left: '12%' }}
        variants={floatingVariants}
        animate="animate"
        custom={{ yMove: 25, xMove: 10, rotate: 10, duration: 7 }}
      >
        🎂
      </Cake>
      
      {/* Floating decorative elements */}
      <FloatingElement
        size="3rem"
        style={{ top: '15%', left: '5%' }}
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        ✦
      </FloatingElement>
      
      <FloatingElement
        size="2.5rem"
        style={{ bottom: '20%', right: '8%' }}
        animate={{ 
          y: [0, 10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        ✧
      </FloatingElement>
      
      <FloatingElement
        size="4rem"
        style={{ top: '60%', right: '15%' }}
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.08, 0.12, 0.08]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        ○
      </FloatingElement>
      
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
        >
          🎂 Today's Birthday Celebrations 🎉
        </SectionTitle>
        
        {loading ? (
          <NoData>Loading birthday celebrations...</NoData>
        ) : error ? (
          <NoData>Something went wrong: {error}</NoData>
        ) : birthdayStudents.length > 0 ? (
          <SliderContainer>
            {totalBatches > 1 && (
              <>
                <NavButton 
                  className="prev" 
                  onClick={goToPrevBatch}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  ←
                </NavButton>
                <NavButton 
                  className="next" 
                  onClick={goToNextBatch}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  →
                </NavButton>
              </>
            )}
            
            <AnimatePresence mode="wait">
              <BirthdayGrid
                key={`batch-${currentBatch}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {birthdayBatches[currentBatch]?.map((student) => (
                  <BirthdayCard
                    key={student._id}
                    variants={cardVariants}
                    whileHover={{ 
                      y: -8,
                      boxShadow: '0 12px 25px rgba(0, 0, 0, 0.18)'
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    <Decoration 
                      className="top-left"
                      animate={{ 
                        rotate: [-30, -25, -30],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      ★
                    </Decoration>
                    <Decoration 
                      className="bottom-right"
                      animate={{ 
                        rotate: [30, 25, 30],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      ★
                    </Decoration>
                    
                    <ProfileImage 
                      src={student.profileImage} 
                      alt={`${student.name}'s profile`}
                      whileHover={{
                        scale: 1.05,
                        transition: {
                          duration: 0.3,
                          ease: "easeOut"
                        }
                      }}
                    />
                    <StudentName>{student.name}</StudentName>
                    <StudentClass>{student.classSection}</StudentClass>
                    <Birthday>
                      <BirthdayIcon
                        animate={{ 
                          rotate: [0, 3, 0, -3, 0],
                          scale: [1, 1.05, 1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "easeInOut"
                        }}
                      >
                        🎂
                      </BirthdayIcon>
                      <BirthdayDate>{student.formattedBirthday}</BirthdayDate>
                    </Birthday>
                  </BirthdayCard>
                ))}
              </BirthdayGrid>
            </AnimatePresence>
            
            {totalBatches > 1 && (
              <PaginationContainer>
                {birthdayBatches.map((_, index) => (
                  <PaginationDot 
                    key={index} 
                    active={currentBatch === index}
                    onClick={() => handleDotClick(index)}
                    animate={currentBatch === index ? {
                      scale: [1, 1.1, 1],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    } : {}}
                  />
                ))}
              </PaginationContainer>
            )}
          </SliderContainer>
        ) : (
          <NoData>No birthdays today!</NoData>
        )}
      </ContentWrapper>
    </SectionContainer>
  );
};

export default BirthdaySection; 