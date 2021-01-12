var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');


router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);
router.post('/createmovielist', userController.createMovieList);
router.delete('/deletemovielist/:id', userController.deleteMovieList);
router.post('/addmovie', userController.addMovie);
router.delete('/removemovie/:movieID/:listID', userController.removeMovie);
router.get('/movielists', userController.getMovieLists);
router.get('/movies/:id', userController.getMovies);


module.exports = router;
