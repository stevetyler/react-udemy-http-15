export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();
    
    if(!response.ok) {
        throw new Error('Failed to fetch places');
    }
    //console.log('resData type', resData);
    return resData;
}

export async function updateUserPlaces(places) {
    const response = await fetch('localehost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify(places),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const resData = await response.json();

    return resData;
}