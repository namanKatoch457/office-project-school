import React from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const SquiggleContainer = styled(motion.div)`
  position: absolute;
  top: ${props => props.top || '0'};
  left: ${props => props.left || '0'};
  right: ${props => props.right || 'auto'};
  width: ${props => props.width ? `${props.width}px` : 'auto'};
  height: ${props => props.height || '50px'};
  transform: ${props => `rotate(${props.rotate || 0}deg)`};
  opacity: ${props => props.opacity || 0.6};
  z-index: 1;
`;

const SquiggleSVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const SquiggleLine = ({ 
  top, 
  left, 
  right, 
  width, 
  height = 50, 
  rotate = 0, 
  color = '#FFFFFF',
  opacity = 0.6,
  delay = 0
}) => {
  return (
    <SquiggleContainer
      top={top}
      left={left}
      right={right}
      width={width}
      height={height}
      rotate={rotate}
      opacity={opacity}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity, scale: 1 }}
      transition={{ duration: 1, delay }}
    >
      <SquiggleSVG viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M0,25 Q20,5 40,25 T80,25 T120,25 T160,25 T200,25"
          stroke={color}
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: delay + 0.3 }}
        />
      </SquiggleSVG>
    </SquiggleContainer>
  );
};

export default SquiggleLine; 