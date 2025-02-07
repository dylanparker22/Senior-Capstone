import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate(); // Define navigate

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://dylan22-adfzeghfhsaqbvck.centralus-01.azurewebsites.net/api/espn/college-football-scoreboard'
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>College Football Scoreboard</h1>
      </header>

      <nav className="navbar">
      <ul>
        <li><button onClick={() => navigate("/")}>Home</button></li>
        <li><button onClick={() => navigate("/scores")}>Scores</button></li>
        <li><button onClick={() => navigate("/teams")}>Teams</button></li>
        <li><button onClick={() => navigate("/standings")}>Standings</button></li>
      </ul>
      </nav>

      <main className="content">
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
        {data && (
          <div className="scoreboard">
            {data.events && data.events.length > 0 ? (
              data.events.map((event, index) => (
                <div key={index} className="game">
                  <h2>{event.name}</h2>
                  <p>{event.competitions[0].status.type.description}</p>
                  <p>
                    {event.competitions[0].competitors[0].team.displayName} -{' '}
                    {event.competitions[0].competitors[0].score}
                  </p>
                  <p>
                    {event.competitions[0].competitors[1].team.displayName} -{' '}
                    {event.competitions[0].competitors[1].score}
                  </p>
                </div>
              ))
            ) : (
              <p>No games available.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

