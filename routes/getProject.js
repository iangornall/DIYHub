const db = require('../database');
const secret = process.env.JWTSECRET;
const jwt = require('jsonwebtoken');

let getProject = (req, res) => {
  let decoded;
  let votestatus;
  let projectId = req.params.id;
  let projectData = {};

  //Checks if User is logged in and has provided a JSON Webtoken
  if (req.headers && req.headers.token) {
    decoded = jwt.decode(req.headers.token)
    votestatus = db.one(
      `SELECT * FROM diy_votes WHERE project_id=$1 AND user_id=$2`, [projectId, decoded.id]
    )
    .then(result => true)
    .catch(err => false)
  } else {
    votestatus = "Not Logged in"
  }

  //Queries Project Details
  let project = db.one(
    `SELECT diy_projects.id AS id, user_id as owner, first_name, last_name, creation_date, project_title, feature_image_file, time_range, cost_range, project_description FROM diy_projects INNER JOIN diy_users ON diy_projects.user_id = diy_users.id WHERE diy_projects.id=$1`, projectId
  )
  let steps = db.query(
    `SELECT step_order, step_image_file, step_title, step_text FROM diy_steps WHERE project_id=$1 ORDER BY step_order`, projectId
  )
  let materials = db.query(
    `SELECT title, amazon_asin, quantity from diy_materials INNER JOIN diy_materials_bridge ON diy_materials.id = diy_materials_bridge.material_id WHERE project_id=$1`, projectId
  )
  let comments = db.query(
    `SELECT comment, diy_comments.id AS comment_id, user_id, creation_date, diy_users.first_name AS name, diy_users.avatar_file AS avatar, diy_users.email AS email FROM diy_comments INNER JOIN diy_users ON diy_comments.user_id = diy_users.id WHERE diy_comments.project_id =$1 ORDER BY diy_comments.id DESC`, projectId
  )
  let votes = db.query(
    `SELECT COUNT(project_id) from diy_votes WHERE project_id=$1`, projectId
  )
  let collaborators = db.query(
    `SELECT diy_users.id AS id, collab_status, first_name, last_name FROM diy_users INNER JOIN diy_collaborators ON diy_users.id = diy_collaborators.user_id WHERE diy_collaborators.project_id=$1`, projectId
  )

  
  
  //Builds the project as a package to send back to front end.
  Promise.all([project, steps, materials, comments, votes, votestatus, collaborators])
  .then(data => {
    projectData.project = data[0];
    projectData.steps = data[1];
    projectData.materials = data[2];
    projectData.comments = data[3];
    projectData.votes= data[4][0].count;
    projectData.votestatus = data[5];
    projectData.collaborators = data[6];
    projectData.status = 'success';

    res.send(projectData);
  })
  .catch(error => {
    console.log(error);
    res.send({status: 'error'})
  })
}
module.exports = getProject;