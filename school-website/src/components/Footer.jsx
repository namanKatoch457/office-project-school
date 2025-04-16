import React from 'react';
import styled from '@emotion/styled';

// Color variables
const colors = {
  darkBlue: '#001838',
  white: '#FFFFFF',
  darkPink: '#EC3988',
};

const FooterContainer = styled.footer`
  background-color: ${colors.darkBlue};
  color: ${colors.white};
  padding: 4rem 0;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 1rem;
`;

const ContactInfo = styled.div`
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const ContactTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${colors.white};
  margin-bottom: 1.5rem;
  font-family: 'True North Rough Black W01 Rg', 'Montserrat', sans-serif;
`;

const ContactDetails = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
`;

const UsefulLinks = styled.div`
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const LinksTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${colors.white};
  margin-bottom: 1.5rem;
  font-family: 'True North Rough Black W01 Rg', 'Montserrat', sans-serif;
`;

const Link = styled.a`
  color: ${colors.white};
  text-decoration: none;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

const SocialIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const FooterTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${colors.white};
  margin-bottom: 1rem;
  font-family: 'True North Rough Black W01 Rg', 'Montserrat', sans-serif;
`;

const FooterSectionTitle = styled.h3`
  font-size: 1.2rem;
  color: ${colors.white};
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  font-family: 'True North Rough Black W01 Rg', 'Montserrat', sans-serif;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoSection>
          <Logo src="/path/to/logo.png" alt="Great Walstead School Logo" />
          <p>© Great Walstead School 2023. All rights reserved.</p>
        </LogoSection>
        <ContactInfo>
          <ContactTitle>Get in Touch</ContactTitle>
          <ContactDetails>Great Walstead School, East Mascalls Lane, Lindfield, West Sussex, RH16 2QL</ContactDetails>
          <ContactDetails>T: 01444 483 528</ContactDetails>
        </ContactInfo>
        <UsefulLinks>
          <LinksTitle>Useful Links</LinksTitle>
          <Link href="#">Contact Us</Link>
          <Link href="#">Latest News</Link>
          <Link href="#">Job Opportunities</Link>
          <Link href="#">Venue Hire</Link>
        </UsefulLinks>
      </FooterContent>
      <SocialIcons>
        <SocialIcon src="/path/to/facebook-icon.png" alt="Facebook" />
        <SocialIcon src="/path/to/instagram-icon.png" alt="Instagram" />
        <SocialIcon src="/path/to/linkedin-icon.png" alt="LinkedIn" />
      </SocialIcons>
    </FooterContainer>
  );
};

export default Footer; 