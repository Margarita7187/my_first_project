import React from 'react';
import UserRegistrationForm from './components/UserRegistrationForm';
import UserRegistrationFormWithValidation from './components/UserRegistrationFormWithValidation';
import ContactFormUncontrolled from './components/ContactFormUncontrolled';

function App() {
  const appStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const formsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
  };

  return (
    <div style={appStyle}>
      <h1>Практическая работа №17: React формы</h1>
      
      <div style={formsContainerStyle}>
        <UserRegistrationForm />
        <UserRegistrationFormWithValidation />
        <ContactFormUncontrolled />
      </div>
    </div>
  );
}

export default App;