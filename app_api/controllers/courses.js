const { find, pullAllBy, orderBy } = require('lodash');
const { courses } = require('../models/courses');
const debug = require('debug')('app_api');

const coursesReadAll = (req, res) => {
    debug(`query= ${JSON.stringify(req.query)}`)
    res.json({ courses: orderBy(courses,req.query.orderBy,req.query.order)});
};

const coursesCreateOne = (req, res) => {
    debug("---- coursesCreateOne ---");
    const course = {
        id: Math.ceil(Math.random() * 1000),
        name: req.body.name,
        info: req.body.info,
    }
    courses.push(course);
    res.json(course);
}

const coursesReadOne = (req, res) => {
    debug("---- coursesReadOne ---");
    let course = find(courses, { 'id': Number(req.params.id) });
    if (!course) res.status(404).send(`The course with id:${req.params.id} was not found`)
    res.send(course);
}

const coursesUpdateOne = (req, res) => {
    debug("---- coursesUpdateOne ---");
    let course = find(courses, { 'id': Number(req.params.id) });
    if (!course) res.status(404).send('the course with id:${req.params.id} was not found');
    course.name = req.body.name;
    res.json(course);
}

const coursesDeleteOne = (req, res) => {
    debug("---- coursesDeleteOne ---");
    pullAllBy(courses, [{ 'id': Number(req.params.id) }], 'id');
    res.json(courses);
}

module.exports = {
    coursesReadAll,
    coursesCreateOne,
    coursesReadOne,
    coursesUpdateOne,
    coursesDeleteOne
};