const userService = require('../services/user.service')


module.exports = {
    authenticate,
    register,
    getMovieLists,
    createMovieList,
    deleteMovieList,
    getMovies,
    addMovie,
    removeMovie
};


function authenticate(req, res, next) {
    console.log("Authenticate():", req.body);
       userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {

   userService.addUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getMovieLists(req, res, next) {
    userService.getMovieLists(req)
        .then(lists => res.json(lists))
        .catch(err => next(err));
}


function createMovieList(req, res, next) {
    userService.createMovieList(req)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function deleteMovieList(req, res, next) {
    userService.deleteMovieList(req)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getMovies(req, res, next) {
    userService.getMovies(req)
        .then(movies => res.json(movies))
        .catch(err => next(err));
}

function addMovie(req, res, next) {
    userService.addMovie(req)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function removeMovie(req, res, next) {
    userService.removeMovie(req)
        .then(() => res.json({}))
        .catch(err => next(err));
}
