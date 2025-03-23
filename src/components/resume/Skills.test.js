import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Skills from './Skills';

describe('Skills Component', () => {
  const mockFormData = {
    skills: []
  };
  
  const mockSetFormData = jest.fn();

  beforeEach(() => {
    mockSetFormData.mockClear();
  });

  test('renders the skills input field', () => {
    render(<Skills formData={mockFormData} setFormData={mockSetFormData} />);
    
    expect(screen.getByLabelText(/Add a Skill/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Skill/i)).toBeInTheDocument();
  });

  test('adds a skill when form is submitted', () => {
    render(<Skills formData={mockFormData} setFormData={mockSetFormData} />);
    
    const skillInput = screen.getByLabelText(/Add a Skill/i);
    const addButton = screen.getByText(/Add Skill/i);
    
    fireEvent.change(skillInput, { target: { value: 'JavaScript' } });
    fireEvent.click(addButton);
    
    expect(mockSetFormData).toHaveBeenCalledWith({
      skills: ['JavaScript']
    });
  });

  test('adds a skill when Enter key is pressed', () => {
    render(<Skills formData={mockFormData} setFormData={mockSetFormData} />);
    
    const skillInput = screen.getByLabelText(/Add a Skill/i);
    
    fireEvent.change(skillInput, { target: { value: 'React' } });
    fireEvent.keyPress(skillInput, { key: 'Enter', code: 13, charCode: 13 });
    
    expect(mockSetFormData).toHaveBeenCalledWith({
      skills: ['React']
    });
  });
});