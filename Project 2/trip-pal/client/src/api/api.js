import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const createTrip = (tripData) => apiClient.post('/trips', tripData);
export const getAllTrips = () => apiClient.get('/trips');
export const getTripById = (id) => apiClient.get(`/trips/${id}`);

export default apiClient;
