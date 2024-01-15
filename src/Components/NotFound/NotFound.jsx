import React from 'react';
import { useNavigate } from 'react-router';
import not from './notfound.module.css';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={not.not_found}>
            <h1>
                Not Found
            </h1>
            <p>We couldn't find the page you are looking for
                but we have Pokemon cards for you
            </p>
            <div className={not.not_found_btn}>
                <button onClick={() => navigate('/')}>Go Home</button>
            </div>
        </div>
  )
}

export default NotFound;