const express = require('express');
const router = express.Router();

// Models
const Movie = require('../models/Movie');

// Get: ../api/movies
router.get('/', (req, res, next) => {
  const promise = Movie.find({ });

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

// Get: ../api/top10
router.get('/top10', (req, res, next) => {
  const promise = Movie.find({ }).limit(10).sort({ imdb_score: -1 });

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
}); 

// Get: ../api/movies/{id}
router.get('/:movie_id', (req, res, next) => {
  const promise = Movie.findById(req.params.movie_id);

  promise.then((movie) => {
    if(!movie)
      next({ message: 'The movie was not found.', code: 99 });

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

// Put: ../api/movies/{id}
router.put('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(
      req.params.movie_id,
      req.body,
      { new: true } // Eğer kayıttan sonra çıktıyı ekranda görmek istersek
    );

  promise.then((movie) => {
    if(!movie)
      next({ message: 'The movie was not found.', code: 99 });

    res.json(movie);
  //res.json({ status: 1 }); 
  }).catch((err) => {
    res.json(err);
  });
});

// Delete: ../api/movies/{id}
router.delete('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndDelete(req.params.movie_id);

  promise.then((movie) => {
    if(!movie)
      next({ message: 'The movie was not found.', code: 99 });

  //res.json(movie);
    res.json({ status: 1 });
  }).catch((err) => {
    res.json(err);
  });
});

// Post: ../api/movies  [From Body]
router.post('/', (req, res, next) => {
  // const { title, imdb_score, category, country, year } = req.body;
  
  const movie = new Movie(req.body);
  const promise = movie.save();

  promise.then((data) => {
  //res.json({ status: 1 });
    res.json(data)
  }).catch((err) => {
    res.json(err);
  });

  // movie.save((err, data) => {
  //   if(err)
  //     res.json(err);

  //   res.json({ status: 1 });
  // });

});

// Get: ../api/movies/between   //    $gte: greaterThenEqual
                                //    $lte: lessThenEqual
                                //    $gt:  greaterThen
                                //    $lt:  lessThen
router.get('/between/:start_year/:end_year', (req, res, next) => {
  const { start_year, end_year } = req.params;
  const promise = Movie.find(
    { 
      year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }
    //year: { "$gt": parseInt(start_year), "$lt": parseInt(end_year) }  
    }
  );

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
