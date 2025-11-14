import { useState } from 'react';
import { createTrip } from '../api/api';
import './TripForm.css';

const TripForm = ({ onTripCreated }) => {
  const [form, setForm] = useState({
    city: '',
    startDate: '',
    endDate: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.city || !form.startDate || !form.endDate) {
      setError('Please fill in all required fields');
      return;
    }

    if (new Date(form.startDate) >= new Date(form.endDate)) {
      setError('Start date must be before end date');
      return;
    }

    setLoading(true);
    try {
      await createTrip(form);
      setForm({ city: '', startDate: '', endDate: '', notes: '' });
      onTripCreated();
    } catch (err) {
      setError('Failed to create trip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="trip-form">
      {error && <p className="error">{error}</p>}

      <div>
        <label>City *</label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Enter city"
        />
      </div>

      <div>
        <label>Start Date *</label>
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>End Date *</label>
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Add notes"
          rows="4"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Trip'}
      </button>
    </form>
  );
};

export default TripForm;
