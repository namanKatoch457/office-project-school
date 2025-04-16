import React from 'react';
import styled from '@emotion/styled';

// Color variables
const colors = {
  darkBlue: '#001838',
  darkPink: '#EC3988',
  white: '#FFFFFF',
};

const SectionContainer = styled.section`
  position: relative;
  background-color: ${colors.darkBlue};
  padding: 6rem 0;
  overflow: hidden;
  width: 100%;
`;

const WavyTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  background-color: ${colors.white};
  clip-path: path('M0,0 C300,50 500,0 1366,50 L1366,0 L0,0 Z');
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  color: ${colors.white};
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  color: ${colors.secondary};
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'True North Rough Black W01 Rg', 'Montserrat', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SectionText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${colors.white};
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
  text-align: left;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${colors.white};
  border-radius: 5px;
  font-size: 1rem;
  background-color: transparent;
  color: ${colors.white};
  width: 100%;

  &::placeholder {
    color: ${colors.white};
    opacity: 0.7;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid ${colors.white};
  border-radius: 5px;
  font-size: 1rem;
  background-color: transparent;
  color: ${colors.white};
  height: 100px;
  width: 100%;

  &::placeholder {
    color: ${colors.white};
    opacity: 0.7;
  }
`;

const ConsentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
`;

const PrivacyLink = styled.a`
  color: ${colors.darkPink};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  background-color: transparent;
  color: ${colors.white};
  border: 2px solid ${colors.white};
  border-radius: 30px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
  }
`;

const EnquirySection = () => {
  return (
    <SectionContainer>
      <WavyTop />
      <ContentContainer>
        <SectionTitle>Make an Enquiry</SectionTitle>
        <SectionText>
          Please use this form for all general enquiries. <PrivacyLink href="#">Click here</PrivacyLink> to send an admissions enquiry.
        </SectionText>
        <Form>
          <FormRow>
            <Input type="text" placeholder="Title" style={{ flex: 1 }} />
            <Input type="text" placeholder="First Name" style={{ flex: 2 }} />
            <Input type="text" placeholder="Last Name" style={{ flex: 2 }} />
          </FormRow>
          <Input type="email" placeholder="Email Address" />
          <Input type="text" placeholder="General Enquiry Subject" />
          <TextArea placeholder="Your Enquiry for the School Office" />
          <ConsentContainer>
            <Checkbox type="checkbox" />
            <span>Data submitted through this form will be accessed, processed and retained in accordance with the School's <PrivacyLink href="#">Privacy Notice</PrivacyLink>.</span>
          </ConsentContainer>
          <SubmitButton>Send Enquiry</SubmitButton>
        </Form>
      </ContentContainer>
    </SectionContainer>
  );
};

export default EnquirySection; 