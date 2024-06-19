const { render } = require('sass');
const Course = require('../models/Course')

class MeController {

    // [GET] /me/stored/courese
    stored(req, res, next) {

        Promise.all([
                    Course.find({}).sortable(req).lean(),
                    Course.countDocumentsWithDeleted({ deleted: true })]
                )
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', { courses, deletedCount })
            })
            .catch(next);

    }

    // [GET] /me/trash/coureses
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .lean()
            .then(courses => res.render('me/trash-courses', { courses }))
            .catch(next);
    }

}

module.exports = new MeController();
