const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_URL = `${API_BASE_URL}/api`;
export const UPLOAD_URL = `${API_BASE_URL}/uploads`;

export default API_BASE_URL;
