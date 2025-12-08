import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers like toBeInTheDocument
import DesignArchitectureComponent from './DesignArchitectureComponent';

jest.mock('./externalDependency', () => ({
  useExternalData: jest.fn(),
}));

describe('Design Architecture Component Tests', () => {
  const mockUseExternalData = (mockResponse) => {
    const mockFn = jest.fn().mockReturnValue(mockResponse);
    return { useExternalData: mockFn };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state when data is being fetched', async () => {
    const mockResponse = { loading: true, error: null, data: null };
    (useExternalData as jest.Mock).mockReturnValue(mockResponse);

    render(<DesignArchitectureComponent />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders content when data is fetched successfully', async () => {
    const mockResponse = { loading: false, error: null, data: 'some data' };
    (useExternalData as jest.Mock).mockReturnValue(mockResponse);

    render(<DesignArchitectureComponent />);

    expect(screen.getByText(/some data/i)).toBeInTheDocument();
  });

  test('renders error message when fetching data fails', async () => {
    const mockResponse = { loading: false, error: 'error occurred', data: null };
    (useExternalData as jest.Mock).mockReturnValue(mockResponse);

    render(<DesignArchitectureComponent />);

    expect(screen.getByText(/error occurred/i)).toBeInTheDocument();
  });

  test('handles user interaction with the component', async () => {
    const mockResponse = { loading: false, error: null, data: 'some data' };
    (useExternalData as jest.Mock).mockReturnValue(mockResponse);

    render(<DesignArchitectureComponent />);

    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    
    await waitFor(() => {
      expect(useExternalData).toHaveBeenCalled();
    });
  });

  test('component is accessible', async () => {
    const mockResponse = { loading: false, error: null, data: 'some data' };
    (useExternalData as jest.Mock).mockReturnValue(mockResponse);

    render(<DesignArchitectureComponent />);

    expect(screen.getByRole('button', { name: /click me/i })).toBeEnabled();
    expect(screen.getByText(/some data/i)).toHaveAttribute('aria-live', 'polite');
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers like toBeInTheDocument
import DesignArchitectureComponent from './DesignArchitectureComponent';

jest.mock('./externalDependency', () => ({
  useExternalData: jest.fn(),
}));

describe('Design Architecture Component Tests', () => {
  const mockUseExternalData = (mockResponse) => {
    const mockFn = jest.fn().mockReturnValue(mockResponse);
    return { useExternalData: mockFn };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state when data is being fetched', async () => {
    const mockResponse = { loading: true, error: null, data: null };
    (useExternalData as jest.Mock).mockReturnValue(mockResponse);

    render(<DesignArchitectureComponent />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders content when data is fetched successfully', async () => {
    const mockResponse = { loading: false, error: null, data: 'some data' };
    (useExternalData as jest.Mock).mockReturnValue(mockResponse);

    render(<DesignArchitectureComponent />);

    expect(screen.getByText(/some data/i)).toBeInTheDocument();
  });

  test('renders error message when fetching data fails', async () => {
    const mockResponse = { loading: false, error: 'error occurred', data: null };
    (useExternalData as jest.Mock).mockReturnValue(mockResponse);

    render(<DesignArchitectureComponent />);

    expect(screen.getByText(/error occurred/i)).toBeInTheDocument();
  });

  test('handles user interaction with the component', async () => {
    const mockResponse = { loading: false, error: null, data: 'some data' };
    (useExternalData as jest.Mock).mockReturnValue(mockResponse);

    render(<DesignArchitectureComponent />);

    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    
    await waitFor(() => {
      expect(useExternalData).toHaveBeenCalled();
    });
  });

  test('component is accessible', async () => {
    const mockResponse = { loading: false, error: null, data: 'some data' };
    (useExternalData as jest.Mock).mockReturnValue(mockResponse);

    render(<DesignArchitectureComponent />);

    expect(screen.getByRole('button', { name: /click me/i })).toBeEnabled();
    expect(screen.getByText(/some data/i)).toHaveAttribute('aria-live', 'polite');
  });
});