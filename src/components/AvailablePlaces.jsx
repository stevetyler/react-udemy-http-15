import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState()

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const json = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            json.places, 
            position.coords.latitude, 
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });

      } catch (error) {
        setError({message: error.message || 'Could not fetch places, please try again later'});
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, [])
  
  return (
    <>
      {error && <Error title="An error occurred" message={error.message}/>}
      <Places
        title="Available Places"
        places={availablePlaces}
        fallbackText="No places available."
        loadingText="Fetching places..."
        isLoading={isFetching}
        onSelectPlace={onSelectPlace}
      />
    </>
  );
}
