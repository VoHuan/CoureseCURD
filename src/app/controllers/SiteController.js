const Course = require('../models/Course')

class SiteController {
    // [GET] /
     index(req, res, next) {
        // try {
        //     const data = await Course.find({});
        //     res.json(data);
        // }  catch (err) {
        //     res.status(400).json({error: err});
        // }

        Course.find({})
        // .then(course => res.json(course))
        .lean()
        .then(courses => res.render('home',{courses}))
        .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
