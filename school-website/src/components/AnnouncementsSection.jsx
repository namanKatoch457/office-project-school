import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllAnnouncements } from '../utils/api';

// Color variables
const colors = {
  primary: '#EC3988', // Hot pink
  secondary: '#001838', // Dark blue
  white: '#FFFFFF',
  lightPink: '#fde8f0', // Light pink background
  gray: '#f5f5f5',
  accent: '#c4a77d', // Gold accent
};

const SectionContainer = styled.section`
  position: relative;
  background-color: ${colors.lightPink};
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.8rem;
  font-weight: 700;
  color: ${colors.secondary};
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-family: 'True North Rough Black W01 Rg', 'Montserrat', sans-serif;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(to right, ${colors.primary}, ${colors.secondary});
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: ${colors.secondary};
  max-width: 700px;
  margin: 1.5rem auto 0;
  opacity: 0.8;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AnnouncementsSlider = styled.div`
  position: relative;
  width: 100%;
  overflow: visible;
  margin: 2rem auto;
`;

const AnnouncementsRow = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AnnouncementCard = styled(motion.div)`
  background-color: ${colors.white};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const CategoryTag = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: ${props => {
    switch(props.category) {
      case 'event': return '#8075FF'; // Purple
      case 'academic': return '#5DADEC'; // Blue
      case 'sports': return '#62D975'; // Green
      case 'holiday': return '#FF7676'; // Red
      default: return colors.primary; // Pink
    }
  }};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  z-index: 2;
`;

const CardImage = styled.div`
  height: 200px;
  background-image: url(${props => props.image || 'https://via.placeholder.com/350x200'});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${colors.secondary};
  margin-bottom: 0.8rem;
  line-height: 1.3;
`;

const CardText = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  flex-grow: 1;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const CardDate = styled.span`
  font-size: 0.85rem;
  color: #888;
  display: flex;
  align-items: center;
  
  &::before {
    content: '📅';
    margin-right: 0.5rem;
  }
`;

const CardPublisher = styled.span`
  font-size: 0.85rem;
  color: ${colors.primary};
  font-weight: 600;
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 0;
  left: 1.5rem;
  background-color: ${colors.accent};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 0 0 8px 8px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  z-index: 2;
`;

const LoadingSpinner = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;
  color: ${colors.primary};
  font-size: 1.2rem;
  
  &::before {
    content: "🔄";
    margin-right: 10px;
    font-size: 1.5rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: #fff3f3;
  border-left: 4px solid #ff6b6b;
  padding: 1rem;
  margin: 2rem 0;
  border-radius: 4px;
  color: #e74c3c;
`;

const NoAnnouncementsMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  margin: 2rem 0;
  color: ${colors.secondary};
  font-size: 1.1rem;
`;

const ViewAllButton = styled(motion.button)`
  display: block;
  margin: 3rem auto 0;
  padding: 0.8rem 2rem;
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(236, 57, 136, 0.2);
  
  &:hover {
    background-color: ${colors.secondary};
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 24, 56, 0.3);
  }
`;

// Decorative elements
const DecorativeElement = styled(motion.div)`
  position: absolute;
  font-size: ${props => props.size || '3rem'};
  color: ${props => props.color || colors.primary};
  opacity: ${props => props.opacity || 0.1};
  z-index: 0;
  pointer-events: none;
`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Truncate text to a specific length
const truncateText = (text, maxLength = 120) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Navigation arrows
const NavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.25);
  color: ${colors.secondary};
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

  @media (max-width: 992px) {
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
  background-color: ${props => props.active ? colors.secondary : 'rgba(0, 24, 56, 0.2)'};
  border: none;
  margin: 0 5px;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(0, 24, 56, 0.5);
  }
`;

const AnnouncementsSection = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentBatch, setCurrentBatch] = useState(0);
  const autoSlideTimerRef = useRef(null);

  // Group announcements into batches of 3
  const getBatches = (items) => {
    const batches = [];
    for (let i = 0; i < items.length; i += 3) {
      batches.push(items.slice(i, i + 3));
    }
    return batches;
  };
  
  const announcementBatches = getBatches(announcements);
  const totalBatches = announcementBatches.length;

  useEffect(() => {
    const fetchAllAnnouncements = async () => {
      try {
        setLoading(true);
        const response = await getAllAnnouncements();
        
        if (response.status === 'success') {
          setAnnouncements(response.data);
        } else {
          setError(response.message || 'Failed to fetch announcements');
        }
      } catch (err) {
        setError('Error connecting to the server. Please try again later.');
        console.error('Error fetching announcements:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAnnouncements();
  }, []);
  
  // Auto-slide every 5 seconds (5000ms)
  useEffect(() => {
    if (announcementBatches.length <= 1) return;
    
    const startAutoSlide = () => {
      autoSlideTimerRef.current = setInterval(() => {
        setCurrentBatch(prev => (prev + 1) % totalBatches);
      }, 5000);
    };
    
    startAutoSlide();
    
    return () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current);
      }
    };
  }, [announcementBatches.length, totalBatches]);
  
  const goToNextBatch = () => {
    setCurrentBatch(prev => (prev + 1) % totalBatches);
    
    // Reset the auto-slide timer when manually navigating
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
      autoSlideTimerRef.current = setInterval(() => {
        setCurrentBatch(prev => (prev + 1) % totalBatches);
      }, 5000);
    }
  };
  
  const goToPrevBatch = () => {
    setCurrentBatch(prev => (prev - 1 + totalBatches) % totalBatches);
    
    // Reset the auto-slide timer when manually navigating
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
      autoSlideTimerRef.current = setInterval(() => {
        setCurrentBatch(prev => (prev + 1) % totalBatches);
      }, 5000);
    }
  };
  
  const handleDotClick = (index) => {
    setCurrentBatch(index);
    
    // Reset the auto-slide timer when manually navigating
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
      autoSlideTimerRef.current = setInterval(() => {
        setCurrentBatch(prev => (prev + 1) % totalBatches);
      }, 5000);
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

  return (
    <SectionContainer>
      {/* Decorative Elements */}
      <DecorativeElement 
        size="5rem"
        style={{ top: '10%', left: '5%' }}
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0] 
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      >
        ◯
      </DecorativeElement>
      
      <DecorativeElement 
        size="4rem"
        style={{ bottom: '15%', right: '8%' }}
        color={colors.secondary}
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -10, 0] 
        }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      >
        ✧
      </DecorativeElement>
      
      <DecorativeElement 
        size="3.5rem"
        style={{ top: '50%', right: '15%' }}
        color={colors.accent}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.12, 0.08]
        }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      >
        ◇
      </DecorativeElement>
      
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            School Announcements
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Stay updated with the latest news and events from our school community
          </SectionSubtitle>
        </SectionHeader>
        
        {loading ? (
          <LoadingSpinner
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            Loading announcements...
          </LoadingSpinner>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : announcements.length === 0 ? (
          <NoAnnouncementsMessage>
            No announcements available at this time.
          </NoAnnouncementsMessage>
        ) : (
          <AnnouncementsSlider>
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
              <AnnouncementsRow
                key={`batch-${currentBatch}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {announcementBatches[currentBatch]?.map((announcement, index) => (
                  <AnnouncementCard
                    key={announcement._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {announcement.featured && (
                      <FeaturedBadge>Featured</FeaturedBadge>
                    )}
                    
                    <CategoryTag category={announcement.category}>
                      {announcement.category}
                    </CategoryTag>
                    
                    <CardImage image={announcement.image} />
                    
                    <CardContent>
                      <CardTitle>{announcement.title}</CardTitle>
                      <CardText>{truncateText(announcement.content)}</CardText>
                      
                      <CardFooter>
                        <CardDate>{formatDate(announcement.createdAt)}</CardDate>
                        <CardPublisher>{announcement.publishedBy}</CardPublisher>
                      </CardFooter>
                    </CardContent>
                  </AnnouncementCard>
                ))}
              </AnnouncementsRow>
            </AnimatePresence>
            
            {totalBatches > 1 && (
              <PaginationContainer>
                {announcementBatches.map((_, index) => (
                  <PaginationDot 
                    key={index} 
                    active={currentBatch === index}
                    onClick={() => handleDotClick(index)}
                    animate={currentBatch === index ? {
                      scale: [1, 1.2, 1],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    } : {}}
                  />
                ))}
              </PaginationContainer>
            )}
          </AnnouncementsSlider>
        )}
        
        <ViewAllButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Announcements
        </ViewAllButton>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default AnnouncementsSection; 