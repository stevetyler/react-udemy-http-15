import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState()

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch('http://localhost:3000/placess');
        const resData = await response.json();
        
        if(!response.ok) {
          throw new Error('Failed to fetch places');
        }
        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({message: error.message || 'Could not fetch places, please try again later'});
      }
      
      setIsFetching(false);
    }
    fetchPlaces();
  }, [])
  
  if (error) {
    return <Error title="An error occurred" message={error.message}/>;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      loadingText="Fetching places..."
      isLoading={isFetching}
      onSelectPlace={onSelectPlace}
    />
  );
}
