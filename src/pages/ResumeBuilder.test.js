import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResumeBuilder from './ResumeBuilder';
import { BrowserRouter } from 'react-router-dom';

// Mock the PDF renderer
jest.mock('@react-pdf/renderer', () => ({
  PDFViewer: ({ children }) => <div data-testid="pdf-viewer">{children}</div>,
  pdf: jest.fn().mockResolvedValue({
    toBlob: jest.fn().mockResolvedValue(new Blob())
  }),
  Document: ({ children }) => <div>{children}</div>,
  Page: ({ children }) => <div>{children}</div>,
  Text: ({ children }) => <div>{children}</div>,
  View: ({ children }) => <div>{children}</div>,
  StyleSheet: {
    create: jest.fn().mockReturnValue({})
  }
}));

// Mock file-saver
jest.mock('file-saver', () => ({
  saveAs: jest.fn()
}));

describe('ResumeBuilder Component', () => {
  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();
  });

  test('renders the stepper with all steps', () => {
    render(
      <BrowserRouter>
        <ResumeBuilder />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Template/i)).toBeInTheDocument();
    expect(screen.getByText(/Personal Info/i)).toBeInTheDocument();
    expect(screen.getByText(/Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Education/i)).toBeInTheDocument();
    expect(screen.getByText(/Skills/i)).toBeInTheDocument();
  });

  test('navigates through steps when Next button is clicked', async () => {
    render(
      <BrowserRouter>
        <ResumeBuilder />
      </BrowserRouter>
    );
    
    // First step - Template selection
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);
    
    // Should now be on Personal Info step
    await waitFor(() => {
      expect(screen.getByText(/Personal Information/i)).toBeInTheDocument();
    });
  });

  test('shows help dialog when Help button is clicked', () => {
    render(
      <BrowserRouter>
        <ResumeBuilder />
      </BrowserRouter>
    );
    
    const helpButton = screen.getByText(/Help/i);
    fireEvent.click(helpButton);
    
    expect(screen.getByText(/How to use this app:/i)).toBeInTheDocument();
  });
});