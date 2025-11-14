# TripPal Frontend

React + Vite frontend for the TripPal trip planning application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file (optional):
```
VITE_API_URL=http://localhost:5000/api
```

If not set, it defaults to `http://localhost:5000/api`

## Running the Application

Development mode:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Features

- **Create Trips**: Add new trips with destination, dates, and notes
- **Weather Integration**: Automatically fetch weather for your destination
- **View All Trips**: See a list of all your planned trips
- **Trip Details**: View full information about a specific trip
- **Delete Trips**: Remove trips from your list
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- React 18
- Vite
- React Router DOM
- Axios
- CSS3
