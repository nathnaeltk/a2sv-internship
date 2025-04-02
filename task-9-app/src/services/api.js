const API_BASE_URL = 'https://akil-backend.onrender.com';

export const fetchJobs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/opportunities/search`);
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const fetchJobDetails = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/opportunities/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch job details');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching job details:', error);
    throw error;
  }
};

export const getBookmarks = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookmarks`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch bookmarks');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  }
};

export const createBookmark = async (jobId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookmarks/${jobId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to create bookmark');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating bookmark:', error);
    throw error;
  }
};

export const deleteBookmark = async (jobId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookmarks/${jobId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to delete bookmark');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    throw error;
  }
}; 