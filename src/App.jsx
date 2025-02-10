import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [joke, setJoke] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isJokeVisible, setIsJokeVisible] = useState(false);
  const [isPunchlineVisible, setIsPunchlineVisible]
 = useState(false); // New state for punchline visibility

  const fetchJoke = async () => {
    setIsLoading(true);
    setError(null);
    setIsJokeVisible(false);
    setIsPunchlineVisible(false); // Reset punchline visibility when fetching a new joke
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setJoke(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setIsJokeVisible(true);
      }, 200);
    }
  };

  useEffect(() => {
    fetchJoke(); // Initial fetch on mount
  }, []);

  const revealPunchline = () => {
    setIsPunchlineVisible(true);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Welcome to the Joke Generator!</h1>
        <p>Click the button to get a random joke.</p>
      </header>

      <main className="app-main">
        <button className="generate-button" onClick={fetchJoke} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Generate Joke'}
        </button>
        {error && <p className="error-message">Error: {error}</p>}
        <div className={`joke-container ${isJokeVisible ? 'visible' : ''}`}>
          {joke && (
            <>
              <h3>{joke.setup}</h3>
              {/* Conditionally render the "punchline" based on isPunchlineVisible */}
              {isPunchlineVisible && <p>{joke.punchline}</p>}
              {!isPunchlineVisible && (
                <button className="reveal-button" onClick={revealPunchline}>
                  Reveal Punchline
                </button>
              )}
            </>
          )}
        </div>
      </main>
      <footer className="app-footer">
        <p>&copy; Amogh Joke Generator</p>
      </footer>
    </div>
  );
}

export default App;
