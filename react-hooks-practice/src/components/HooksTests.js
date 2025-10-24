import React from 'react';
import BasicHooks from './BasicHooks';
import AdvancedHooks, { ThemeProvider } from './AdvancedHooks';
import CustomHooks from './CustomHooks';

const HooksTests = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>React Hooks Tests</h1>
      <p>Практическая работа №16: Использование хуков React</p>
      
      <ThemeProvider>
        <BasicHooks />
        <AdvancedHooks />
        <CustomHooks />
      </ThemeProvider>
    </div>
  );
};

export default HooksTests;