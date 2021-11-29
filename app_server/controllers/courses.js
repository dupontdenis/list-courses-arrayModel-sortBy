const axios = require('axios');
const debug = require('debug')('app_server');

const coursesReadAll = (req, res) => {
    debug(`url= ${req.url}, ${req.originalUrl}`);
    debug(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    debug(`query= ${JSON.stringify(req.query)}`)
    //axios.get('http://localhost:3000/api/courses')
    //axios.get(`http://localhost:3000/api/courses/?orderBy=${req.query.orderBy}&order=${req.query.order}`)
    axios.get(`http://localhost:3000/api/courses${req.url}`)
        .then(function (response) {
            res.render('courses-list', {
                courses: response.data.courses
            });
        })
        .catch(function (error) {
            // handle error
            debug(error);
        })
};

const coursesReadOne = (req, res) => {
    debug('-------------- READ ONE-------------------------------')

    axios.get(`http://localhost:3000/api/courses/${Number(req.params.id)}`)
        .then(function (response) {
            res.render('course-info', {
                course: response.data
            });
        })
        .catch(function (error) {
            // handle error
            debug(error);
        })
};

const coursesDeleteOne = (req, res) => {
    debug('-------------- DELETE ONE-------------------------------')
    debug(req.params.id)
    axios.delete(`http://localhost:3000/api/courses/${Number(req.params.id)}`)
        .then(function (response) {
            debug(response)
            res.redirect(`/courses/`);
        })
        .catch(function (error) {
            // handle error
            debug(error);
        })
};

const renderForm = (req, res) => {
    res.render('course-form',
        {
            title: `New Course`,
            error: req.query.err
        }
    );

};

const coursesForm = (req, res) => {
    debug('----------------   FORM  -----------------------')
    renderForm(req, res);
};

const coursesAddOne = (req, res) => {
    debug('----------------   ADD ONE  -----------------------')
    //debug(req.body)
    if (!req.body.info || !req.body.name) {

        res.redirect(`/courses/new?err=val`);
    }
    else {
        axios.post('http://localhost:3000/api/courses/', req.body)
            .then(function (response) {
                debug(response);
                res.redirect("/courses")
            })
            .catch(function (error) {
                debug(error);
            });
    }
};

module.exports = {
    coursesReadAll,
    coursesReadOne,
    coursesAddOne,
    coursesDeleteOne,
    coursesForm,
};