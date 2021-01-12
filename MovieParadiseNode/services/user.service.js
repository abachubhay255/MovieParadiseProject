const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const User = db.User;
const MovieList = db.MovieList;

module.exports = {
    authenticate,
    getById,
    addUser,
    getMovieLists,
    createMovieList,
    deleteMovieList,
    getMovies,
    addMovie,
    removeMovie
}

async function authenticate({username, password}) {
    const user = await User.findOne({username});
    if (user && bcrypt.compareSync(password, user.hash)) {
        const {hash, ...userWithoutHash} = user.toObject();
        const token = jwt.sign({sub: user.id}, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }

}
async function getById(id) {

    return await User.find({_id: id});
}

async function addUser(userParam) {

    // validate
    if (await User.findOne({username: userParam.username})) {
        throw 'Username "' + userParam.username + '" is already taken';
    } else if (await User.findOne({email: userParam.email})) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();

}

async function getMovieLists(req) {
    const user = await User.findOne({_id: req.user.sub});
    let movieLists = []
    for (let list of user.movieCollection) {
        let movieList = await MovieList.findById(list);
        movieLists.push(movieList);
    }
    return movieLists;
}

async function createMovieList(req) {
    let user = await User.findOne({_id: req.user.sub});
    const movieList = new MovieList(req.body);
    if (user.group === '') {
        user.movieCollection.push(movieList)
        await movieList.save();
        await user.save();
        return;
    }
    let group = await User.find({group: user.group});
    for (let member of group) {
        member.movieCollection.push(movieList)
        await movieList.save();
        await member.save();
    }
}

async function deleteMovieList(req) {
    let user = await User.findOne({_id: req.user.sub});
    if (user.group === '') {
        user.movieCollection = user.movieCollection.filter(movieList => movieList._id != req.params.id);
        await user.save();
        await MovieList.deleteOne({_id: req.params.id});
        return;
    }
    let group = await User.find({group: user.group});
    for (let member of group) {
        member.movieCollection = member.movieCollection.filter(movieList => movieList._id != req.params.id);
        await member.save();
    }
    await MovieList.deleteOne({_id: req.params.id});
}

async function getMovies(req) {
    let list = await MovieList.findOne({_id: req.params.id});
    return list.movies;
}

async function addMovie(req) {
    let list = await MovieList.findOne({_id: req.body.list});
    list.movies.forEach(movie => {
        if (movie.id === req.body.id) {
            throw 'Movie: ' + req.body.original_title + ' is already in this list';
        }
    })
    list.movies.push(req.body);
    await list.save();
}

async function removeMovie(req) {
    let list = await MovieList.findOne({_id: req.params.listID});
    list.movies = list.movies.filter(movie => movie.id != req.params.movieID);
    await list.save();
}

