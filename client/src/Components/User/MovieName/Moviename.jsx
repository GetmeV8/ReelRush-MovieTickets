import React, { useEffect, useState } from 'react';
import './moviename.css';

const Moviename = (props) => {
  const [movie, setMovie] = useState(null);
  
  useEffect(() => {
    if (props.data && props.data.length > 0) {
      console.log("props:", props.data);
      setMovie(props.data[0]);
    }
  }, [props.data]);

  console.log('Movie:', movie);

  return (
    <div className='text-white bg-black p-2'>
      {movie ? (
        <div>
          <div className=''>
            <h1 className='mb-2 bold font-extrabold text-2xl'>
              {movie.Movie?.moviename} - {movie?.Movie?.language}
            </h1>
          </div>

          <div className=''>
            <p className='border-white-200 rounded-md border inline p-1 text-xs'>
              {movie?.Movie?.genre}
            </p>
          </div>
        </div>
      ) : (
        <div>Movie not found</div>
      )}
    </div>
  );
}

export default Moviename;
