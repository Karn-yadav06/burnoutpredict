export const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Helper to make API calls with automatically attached JWT token.
 * Handles parsing responses and standardized error throws.
 */
export async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };

  const config = {
    ...options,
    headers
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // If the server returns formal validation or message errors
    const errorMessage = data.message || (data.errors && data.errors[0]?.message) || 'Something went wrong';
    const err = new Error(errorMessage);
    err.status = response.status;
    err.errors = data.errors || [];
    throw err;
  }

  return data;
}
