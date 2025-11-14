import { useState, useEffect } from 'react';
import { getAllTrips } from '../api/api';
import './TripsList.css';

const TripsList = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await getAllTrips();
      setTrips(response.data);
    } catch (err) {
      setError('Failed to load trips');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div className="trips-list"><p>Loading...</p></div>;
  if (error) return <div className="trips-list"><p>{error}</p></div>;

  return (
    <div className="trips-list">
      <h1>All Trips</h1>
      {trips.length === 0 ? (
        <p>No trips yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Weather</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {trips.map(trip => (
              <tr key={trip._id}>
                <td>{trip.city}</td>
                <td>{formatDate(trip.startDate)}</td>
                <td>{formatDate(trip.endDate)}</td>
                <td>
                  {trip.weather ? (
                    <span>
                      {trip.weather.temp}°C - {trip.weather.description}
                      {trip.weather.humidity && ` (${trip.weather.humidity}%)`}
                    </span>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>{trip.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TripsList;
