import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Education from './Education';

describe('Education Component', () => {
  const mockFormData = {
    education: []
  };
  
  const mockSetFormData = jest.fn();

  beforeEach(() => {
    mockSetFormData.mockClear();
  });

  test('renders all form fields', () => {
    render(<Education formData={mockFormData} setFormData={mockSetFormData} />);
    
    expect(screen.getByLabelText(/School/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Degree/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Graduation Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Education/i)).toBeInTheDocument();
  });

  test('adds education when form is submitted', () => {
    render(<Education formData={mockFormData} setFormData={mockSetFormData} />);
    
    const schoolInput = screen.getByLabelText(/School/i);
    const degreeInput = screen.getByLabelText(/Degree/i);
    const gradDateInput = screen.getByLabelText(/Graduation Date/i);
    const descInput = screen.getByLabelText(/Description/i);
    const addButton = screen.getByText(/Add Education/i);
    
    fireEvent.change(schoolInput, { target: { value: 'Harvard University' } });
    fireEvent.change(degreeInput, { target: { value: 'Computer Science' } });
    fireEvent.change(gradDateInput, { target: { value: '05/2022' } });
    fireEvent.change(descInput, { target: { value: 'Graduated with honors' } });
    
    fireEvent.click(addButton);
    
    expect(mockSetFormData).toHaveBeenCalledWith({
      education: [{
        school: 'Harvard University',
        degree: 'Computer Science',
        graduationDate: '05/2022',
        description: 'Graduated with honors'
      }]
    });
  });
});