import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Scores() {
  const { sport } = useParams(); // Get the sport from the URL
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API key and base URL for sports odds
  const apiKey = 'dec94cb8710a2dd89387b1355152774b';
  const baseUrl = `https://api.the-odds-api.com/v4/sports/${sport}/odds`;

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch(`${baseUrl}?regions=us&oddsFormat=american&apiKey=${apiKey}`);
        
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
  
    if (sport) {
      fetchScores();
    }
  }, [sport, baseUrl]); // Re-fetch when sport changes
  
  return (
    <div className="Scores">
      <button onClick={() => navigate('/')} className="home-button">Go to Home</button>
  
      <h2>{sport.replace('_', ' ').toUpperCase()} Odds</h2>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
      {data && (
        <div className="scoreboard">
          {data.length > 0 ? (
            data.map((event, index) => (
              <div key={index} className="game">
                <h3>{event.home_team} vs {event.away_team}</h3>
  
                {/* Format the commence_time to remove seconds */}
                {event.commence_time ? (
                  <p>Start Time: {new Date(event.commence_time).toLocaleString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                  </p>
                ) : (
                  <p>Start Time: Not Available</p>
                )}
  
                {/* Show only DraftKings odds */}
                {event.bookmakers
                  .filter(bookmaker => bookmaker.title === "DraftKings")  // Filter for DraftKings
                  .map((bookmaker, idx) => (
                    <div key={idx}>
                      <h4>{bookmaker.title}</h4>
                      <p>
                        {bookmaker.markets[0].outcomes[0].name}: {bookmaker.markets[0].outcomes[0].price}
                        <br />
                        {bookmaker.markets[0].outcomes[1].name}: {bookmaker.markets[0].outcomes[1].price}
                      </p>
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <p>No odds available.</p>
          )}
        </div>
      )}
    </div>
  );
  
}

export default Scores;

