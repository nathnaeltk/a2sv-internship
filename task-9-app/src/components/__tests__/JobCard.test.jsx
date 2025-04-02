import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import JobCard from '../JobCard';
import { AuthProvider } from '@/context/AuthContext';
import { createBookmark, deleteBookmark } from '@/services/api';

// Mock the API functions
jest.mock('@/services/api', () => ({
  createBookmark: jest.fn(),
  deleteBookmark: jest.fn(),
}));

// Mock the next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockJob = {
  id: '1',
  title: 'Software Engineer',
  orgName: 'Tech Corp',
  location: ['New York'],
  description: 'A great job opportunity',
  categories: ['IT', 'Development'],
  logoUrl: '/logo.png',
};

const renderWithAuth = (ui, { user = null, bookmarks = [] } = {}) => {
  return render(
    <AuthProvider>
      {ui}
    </AuthProvider>
  );
};

describe('JobCard', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders job information correctly', () => {
    renderWithAuth(<JobCard job={mockJob} />);
    
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('A great job opportunity')).toBeInTheDocument();
    expect(screen.getByText('IT')).toBeInTheDocument();
    expect(screen.getByText('Development')).toBeInTheDocument();
  });

  it('shows outline bookmark icon when not bookmarked', () => {
    renderWithAuth(<JobCard job={mockJob} />);
    
    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).toHaveAttribute('title', 'Add to bookmarks');
  });

  it('shows solid bookmark icon when bookmarked', () => {
    renderWithAuth(<JobCard job={mockJob} />, {
      bookmarks: [{ id: '1' }],
    });
    
    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).toHaveAttribute('title', 'Remove from bookmarks');
  });

  it('redirects to login when clicking bookmark while not authenticated', () => {
    const { window } = global;
    delete global.window;
    global.window = { ...window, location: { href: '' } };

    renderWithAuth(<JobCard job={mockJob} />);
    
    const bookmarkButton = screen.getByRole('button');
    fireEvent.click(bookmarkButton);
    
    expect(global.window.location.href).toBe('/login');
  });

  it('creates bookmark when clicking bookmark button while authenticated', async () => {
    createBookmark.mockResolvedValueOnce({ id: '1' });
    
    renderWithAuth(<JobCard job={mockJob} />, {
      user: { id: '1' },
    });
    
    const bookmarkButton = screen.getByRole('button');
    fireEvent.click(bookmarkButton);
    
    await waitFor(() => {
      expect(createBookmark).toHaveBeenCalledWith('1', expect.any(String));
    });
  });

  it('deletes bookmark when clicking bookmark button on bookmarked job', async () => {
    deleteBookmark.mockResolvedValueOnce({ id: '1' });
    
    renderWithAuth(<JobCard job={mockJob} />, {
      user: { id: '1' },
      bookmarks: [{ id: '1' }],
    });
    
    const bookmarkButton = screen.getByRole('button');
    fireEvent.click(bookmarkButton);
    
    await waitFor(() => {
      expect(deleteBookmark).toHaveBeenCalledWith('1', expect.any(String));
    });
  });

  it('disables bookmark button while loading', async () => {
    createBookmark.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    renderWithAuth(<JobCard job={mockJob} />, {
      user: { id: '1' },
    });
    
    const bookmarkButton = screen.getByRole('button');
    fireEvent.click(bookmarkButton);
    
    expect(bookmarkButton).toBeDisabled();
    
    await waitFor(() => {
      expect(bookmarkButton).not.toBeDisabled();
    });
  });
}); 