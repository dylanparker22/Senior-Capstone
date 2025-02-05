import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  // State to store the fetched JSON data
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const response = await fetch('https://dylan22-adfzeghfhsaqbvck.centralus-01.azurewebsites.net/api/espn/college-football-scoreboard');

        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the JSON data
        const jsonData = await response.json();
        setData(jsonData); // Set the fetched data into state
      } catch (error) {
        setError(error); // Set error state
      } finally {
        setLoading(false); // Stop loading once done
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array ensures it runs once on mount

  // Handle loading, error, and data display
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error.message}</div>;
  }

  // Display the fetched JSON as a string
  return (
    <div>
      <h1>Fetched JSON Data:</h1>
      <pre className="json-output">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
  
}

export default App;

