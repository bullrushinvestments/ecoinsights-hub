import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers like toBeInTheDocument
import CoreFunctionalityComponent from './CoreFunctionalityComponent';

jest.mock('./ExternalDependency', () => ({
  useExternalData: jest.fn(),
}));

describe('Core Functionality Component Tests', () => {
  test('renders core functionality component correctly', async () => {
    (useExternalData as jest.Mock).mockResolvedValueOnce({ data: 'test-data' });
    render(<CoreFunctionalityComponent />);
    expect(await screen.findByText(/test-data/i)).toBeInTheDocument();
  });

  test('handles user interaction with button click', async () => {
    const mockHandleClick = jest.fn();
    (useExternalData as jest.Mock).mockResolvedValueOnce({ data: 'initial-data' });
    render(<CoreFunctionalityComponent handleClick={mockHandleClick} />);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(mockHandleClick).toHaveBeenCalled();
  });

  test('displays loading state when fetching data', async () => {
    (useExternalData as jest.Mock).mockRejectedValueOnce(new Promise(() => {}));
    render(<CoreFunctionalityComponent />);
    const loadingIndicator = await screen.findByRole('status');
    expect(loadingIndicator).toBeInTheDocument();
  });

  test('handles error and displays appropriate message', async () => {
    (useExternalData as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));
    render(<CoreFunctionalityComponent />);
    await waitFor(() => expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument());
  });

  test('ensures component is accessible', async () => {
    (useExternalData as jest.Mock).mockResolvedValueOnce({ data: 'test-data' });
    render(<CoreFunctionalityComponent />);
    const button = screen.getByRole('button');
    expect(button).toBeVisible();
    expect(button).toHaveAttribute('aria-label', /click me/i);
  });

  test('validates input fields for edge cases', async () => {
    (useExternalData as jest.Mock).mockResolvedValueOnce({ data: 'test-data' });
    render(<CoreFunctionalityComponent />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.queryByText(/please enter a valid value/i)).toBeInTheDocument();
  });

  test('mocks external dependencies correctly', async () => {
    (useExternalData as jest.Mock).mockResolvedValueOnce({ data: 'test-data' });
    render(<CoreFunctionalityComponent />);
    const mockDependency = useExternalData;
    expect(mockDependency).toHaveBeenCalled();
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers like toBeInTheDocument
import CoreFunctionalityComponent from './CoreFunctionalityComponent';

jest.mock('./ExternalDependency', () => ({
  useExternalData: jest.fn(),
}));

describe('Core Functionality Component Tests', () => {
  test('renders core functionality component correctly', async () => {
    (useExternalData as jest.Mock).mockResolvedValueOnce({ data: 'test-data' });
    render(<CoreFunctionalityComponent />);
    expect(await screen.findByText(/test-data/i)).toBeInTheDocument();
  });

  test('handles user interaction with button click', async () => {
    const mockHandleClick = jest.fn();
    (useExternalData as jest.Mock).mockResolvedValueOnce({ data: 'initial-data' });
    render(<CoreFunctionalityComponent handleClick={mockHandleClick} />);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(mockHandleClick).toHaveBeenCalled();
  });

  test('displays loading state when fetching data', async () => {
    (useExternalData as jest.Mock).mockRejectedValueOnce(new Promise(() => {}));
    render(<CoreFunctionalityComponent />);
    const loadingIndicator = await screen.findByRole('status');
    expect(loadingIndicator).toBeInTheDocument();
  });

  test('handles error and displays appropriate message', async () => {
    (useExternalData as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));
    render(<CoreFunctionalityComponent />);
    await waitFor(() => expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument());
  });

  test('ensures component is accessible', async () => {
    (useExternalData as jest.Mock).mockResolvedValueOnce({ data: 'test-data' });
    render(<CoreFunctionalityComponent />);
    const button = screen.getByRole('button');
    expect(button).toBeVisible();
    expect(button).toHaveAttribute('aria-label', /click me/i);
  });

  test('validates input fields for edge cases', async () => {
    (useExternalData as jest.Mock).mockResolvedValueOnce({ data: 'test-data' });
    render(<CoreFunctionalityComponent />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.queryByText(/please enter a valid value/i)).toBeInTheDocument();
  });

  test('mocks external dependencies correctly', async () => {
    (useExternalData as jest.Mock).mockResolvedValueOnce({ data: 'test-data' });
    render(<CoreFunctionalityComponent />);
    const mockDependency = useExternalData;
    expect(mockDependency).toHaveBeenCalled();
  });
});