import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTripById } from '../api/api';
import './TripDetail.css';

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrip();
  }, [id]);

  const fetchTrip = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTripById(id);
      setTrip(response.data);
    } catch (err) {
      setError('Failed to load trip details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateDuration = () => {
    if (!trip) return 0;
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="trip-detail-container">
        <div className="loading">Loading trip details...</div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="trip-detail-container">
        <div className="error-message">{error || 'Trip not found'}</div>
        <button className="btn btn-primary" onClick={() => navigate('/trips')}>
          Back to Trips
        </button>
      </div>
    );
  }

  return (
    <div className="trip-detail-container">
      <button className="btn btn-back" onClick={() => navigate('/trips')}>
        ← Back to Trips
      </button>

      <div className="trip-detail">
        <div className="detail-header">
          <h1>{trip.city}</h1>
          {trip.weather && trip.weather.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${trip.weather.icon}@4x.png`}
              alt={trip.weather.description}
              className="large-weather-icon"
            />
          )}
        </div>

        <div className="detail-grid">
          <div className="detail-card">
            <h3>📅 Trip Duration</h3>
            <p className="detail-content">
              <strong>Start:</strong> {formatDate(trip.startDate)}
            </p>
            <p className="detail-content">
              <strong>End:</strong> {formatDate(trip.endDate)}
            </p>
            <p className="detail-content">
              <strong>Duration:</strong> {calculateDuration()} days
            </p>
          </div>

          {trip.weather && (
            <div className="detail-card weather-card">
              <h3>🌡️ Weather Information</h3>
              <p className="detail-content">
                <strong>Temperature:</strong> {trip.weather.temp}°C
              </p>
              <p className="detail-content">
                <strong>Condition:</strong> {trip.weather.description}
              </p>
              <p className="detail-content">
                <strong>Humidity:</strong> {trip.weather.humidity}%
              </p>
            </div>
          )}

          {trip.notes && (
            <div className="detail-card notes-card">
              <h3>📝 Trip Notes</h3>
              <p className="detail-content">{trip.notes}</p>
            </div>
          )}
        </div>

        {!trip.notes && (
          <div className="detail-card notes-card">
            <h3>📝 Trip Notes</h3>
            <p className="detail-content">No notes added for this trip.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripDetail;
