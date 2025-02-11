import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Ensure you create this file for styling

function Home() {
  const navigate = useNavigate();

  const sports = [
    { name: "NBA Basketball", value: "basketball_nba", image: "/images/nba.jpg" },
    { name: "College Basketball", value: "basketball_ncaab", image: "/images/college-basketball.png" },
    { name: "NFL Football", value: "americanfootball_nfl", image: "/images/nfl.png" },
    { name: "MLB Baseball", value: "baseball_mlb", image: "/images/mlb.png" },
    { name: "NHL Hockey", value: "icehockey_nhl", image: "/images/nhl.png" }
  ];

  return (
    <div className="Home">
      <header className="App-header">
      <div className="sports-tabs">
        {sports.map((sport) => (
          <button key={sport.value} className="sport-tab" onClick={() => navigate(`/scores/${sport.value}`)}>
            <img src={sport.image} alt={sport.name} className="sport-icon" />
            {sport.name}
          </button>
        ))}
      </div>
      </header>

      {/* Add a main image */}
      <div className="main-image">
        <img src="/images/sports-banner.jpeg" alt="Sports Odds" />
      </div>

    </div>
  );
}

export default Home;


