const db = require('../database');
const jwt = require('jsonwebtoken');

let userStats = (req, res) => {
    let decoded = jwt.decode(req.headers.token);

    let unpublished = db.one(`SELECT COUNT(*) from diy_projects WHERE user_id=$1 AND publish_status=4`, decoded.id)
    let published = db.one(`SELECT COUNT(*) from diy_projects WHERE user_id=$1 AND publish_status=5`, decoded.id)
    let todo = db.one(`SELECT COUNT(*) from diy_my_projects WHERE user_id=$1 AND project_status=1`, decoded.id)
    let inprogress = db.one(`SELECT COUNT(*) from diy_my_projects WHERE user_id=$1 AND project_status=2`, decoded.id)
    let completed = db.one(`SELECT COUNT(*) from diy_my_projects WHERE user_id=$1 AND project_status=3`, decoded.id)

    Promise.all([unpublished, published, todo, inprogress, completed])
    .then(response => {
        return {
            unpublished: response[0].count,
            published: response[1].count,
            todo: response[2].count,
            inprogress: response[3].count,
            completed: response[4].count,
        }
    })
    .then(response => res.send({status: 'success',
                                stats: response}))
    .catch(err => res.send({status: error}));

}

module.exports = userStats;