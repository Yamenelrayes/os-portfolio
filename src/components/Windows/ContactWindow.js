import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import aboutMe from '../../data/aboutMe';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaPaperPlane, FaExclamationTriangle } from 'react-icons/fa';

const Container = styled.div`
  padding: 25px;
  height: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactForm = styled.form`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 20px;
`;

const FormTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
  color: #fff;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #ddd;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  background-color: #333;
  border: 1px solid #444;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  background-color: #333;
  border: 1px solid #444;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #45a049;
  }
  
  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

const ContactInfo = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 25px;
  font-size: 1.1em;
`;

const InfoTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 25px;
  color: #fff;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: #ddd;
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  margin-right: 18px;
  color: #4caf50;
  font-size: 20px;
`;

const ContactText = styled.div`
  flex: 1;
`;

const ContactTitle = styled.h4`
  font-size: 18px;
  margin-bottom: 8px;
`;

const ContactValue = styled.div`
  font-size: 16px;
  color: #aaa;
  margin-bottom: 5px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 35px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  border-radius: 28px;
  background-color: #333;
  color: #fff;
  font-size: 25px;
  transition: transform 0.2s, background-color 0.2s;
  
  &:hover {
    transform: translateY(-3px);
    background-color: #4caf50;
  }
`;

const SuccessMessage = styled.div`
  background-color: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ErrorMessage = styled.div`
  background-color: rgba(220, 53, 69, 0.2);
  color: #dc3545;
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ContactWindow = () => {
  const [formData, setFormData] = useState({
    name: '',
    from_email: '',
    message: ''
  });
  
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Add current time and ensure email is included in form data
    const formElement = formRef.current;
    
    // Add time input
    const timeInput = document.createElement('input');
    timeInput.type = 'hidden';
    timeInput.name = 'time';
    timeInput.value = new Date().toLocaleString();
    formElement.appendChild(timeInput);
    
    // Add email input (to be displayed in the email message)
    const emailInput = document.createElement('input');
    emailInput.type = 'hidden';
    emailInput.name = 'email';
    emailInput.value = formData.from_email;
    formElement.appendChild(emailInput);
    
    // EmailJS send using the form reference
    emailjs.sendForm(
      'service_6n0k94l', // EmailJS Service ID
      'template_xhxsl9u', // EmailJS Template ID
      formRef.current,
      '2TsMXrK9HJck_NXO_' // Public Key
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        from_email: '',
        message: ''
      });
      // Remove the temporary inputs
      formElement.removeChild(timeInput);
      formElement.removeChild(emailInput);
    })
    .catch((err) => {
      console.error('Email sending failed:', err);
      setIsSubmitting(false);
      setError('Failed to send your message. Please try again later.');
      // Remove the temporary inputs
      formElement.removeChild(timeInput);
      formElement.removeChild(emailInput);
    });
  };
  
  return (
    <Container>
      <ContactForm ref={formRef} onSubmit={handleSubmit}>
        <FormTitle>Send a Message</FormTitle>
        
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="from_email"
            value={formData.from_email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="message">Message</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </FormGroup>
        
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
          <FaPaperPlane />
        </SubmitButton>
        
        {isSubmitted && (
          <SuccessMessage>
            <FaEnvelope />
            Your message has been sent successfully!
          </SuccessMessage>
        )}
        
        {error && (
          <ErrorMessage>
            <FaExclamationTriangle />
            {error}
          </ErrorMessage>
        )}
      </ContactForm>
      
      <ContactInfo>
        <InfoTitle>Contact Information</InfoTitle>
        
        <ContactItem>
          <ContactIcon>
            <FaEnvelope />
          </ContactIcon>
          <ContactText>
            <ContactTitle>Email</ContactTitle>
            <ContactValue>{aboutMe.contact.email}</ContactValue>
          </ContactText>
        </ContactItem>
        
        <ContactItem>
          <ContactIcon>
            <FaPhone />
          </ContactIcon>
          <ContactText>
            <ContactTitle>Phone</ContactTitle>
            <ContactValue><span role="img" aria-label="UK flag">🇬🇧</span> {aboutMe.contact.phone}</ContactValue>
            <ContactValue><span role="img" aria-label="Egypt flag">🇪🇬</span> {aboutMe.contact.phone2}</ContactValue>
          </ContactText>
        </ContactItem>
        
        <SocialLinks>
          <SocialLink href={aboutMe.contact.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </SocialLink>
          <SocialLink href={aboutMe.contact.github} target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </SocialLink>
        </SocialLinks>
      </ContactInfo>
    </Container>
  );
};

export default ContactWindow; 