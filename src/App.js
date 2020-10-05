import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import logo from './assets/images/JT_PRUEBA.jpg';

const Star = ({ starId, rating, onMouseEnter, onMouseLeave, onClick }) => {
  let styleClass = "star-rating-blank";
  if (rating && rating >= starId) {
    styleClass = "star-rating-filled";
  }
//svg de esterllas
  return (
    <div
      className="star"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <svg
        height="55px"
        width="53px"
        class={styleClass}
        viewBox="0 0 25 23"
        data-rating="1"
      >
        <polygon
          stroke-width="0"
          points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
        />
      </svg>
    </div>
  );
};
//* fin svg estrellas


function App() {
  const [comic, setComic] = useState(null);
  const [latestNum, setLatestNum] = useState(null);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];

//llamado al ultimo commic 
  const fetchLatestComic = () => {
    setComic(null);
    setError(null);
    axios.get('https://cors-anywhere.herokuapp.com/https://xkcd.com/info.0.json')
      .then(res => {
        setComic(res.data);
        setLatestNum(res.data.num);
      })
      .catch(err => setError(err));
  };

//traer diferente comic
  const fetchComic = (num) => {
    setComic(null);
    setError(null);
    axios.get(`https://cors-anywhere.herokuapp.com/https://xkcd.com/${num}/info.0.json`)
      .then(res => setComic(res.data))
      .catch(err => setError(err));
  };

  useEffect(() => {
    fetchLatestComic();
  }, []);

  if (error) {
    return (
      <div className="app">
        {error.message}
      </div>
    );
  }

  return (


    <div className="app">
    <header className="Header">
      <img src={logo} className="Logo" alt="logo" />
      
    </header>
    <h1>{comic ? comic.title : 'Loading...'}</h1>
     
      <div className='comic-container'>
        {comic
         ? (
           <img className='comic' src={comic.img} alt={comic.transcript} title={comic.alt} />
         )
         : (
           <div className="loading" />
         )
        }
      </div>
   
     {/* 
        
     //boton aleatorio   
      <Buttons
        fetchComic={fetchComic}
        currentNum={comic ? comic.num : 0}
        latestNum={latestNum}
        fetchLatestComic={fetchLatestComic}
        loading={!comic}
      />
      */}


    <div className="flex-container">
        {stars.map((star, i) => (
          <Star
            key={i}
            starId={i}
            rating={hoverRating || rating}
            onMouseEnter={() => setHoverRating(i)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(i)}
          />
        ))}
      </div>

    </div>
  );
}


const Buttons = ({
  fetchComic,
  fetchLatestComic,
  latestNum,
  loading,
}) => {
  const fetchRandom = () => {
    const num = Math.floor((Math.random() * (latestNum - 1)) + 1);
    fetchComic(num);
  };

  return (
    <div className="buttons-row">
     
     
      <button
        disabled={loading}
        onClick={() => fetchRandom()}>
        Aleatorio
      </button>
      
    
    </div>
  );
};

export default App;
