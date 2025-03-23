import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PersonalInfo from './PersonalInfo';

describe('PersonalInfo Component', () => {
  const mockFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    summary: ''
  };
  
  const mockSetFormData = jest.fn();

  beforeEach(() => {
    mockSetFormData.mockClear();
  });

  test('renders all form fields', () => {
    render(<PersonalInfo formData={mockFormData} setFormData={mockSetFormData} />);
    
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Professional Summary/i)).toBeInTheDocument();
  });

  test('updates form data when fields change', () => {
    render(<PersonalInfo formData={mockFormData} setFormData={mockSetFormData} />);
    
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...mockFormData,
      firstName: 'John'
    });
  });
});