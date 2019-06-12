var auth = require('../controller/auth');
var group = require('../controller/group');

module.exports = function(app){

    const API_V1 = "/_api/v1";

	app.route(`${API_V1}/account/register`)
        .post(auth.add);
        
    app.route(`${API_V1}/account/login`)
        .post(auth.login);

    app.route(`${API_V1}/account/:id`)
        .get(auth.getMe);

    app.route(`${API_V1}/group/:ownerId`)
        .get(group.getAll);

    app.route(`${API_V1}/group/detail/:groupId`)
        .get(group.getDetail)
        .put(group.editGroup)
        .delete(group.deleteGroup);

    app.route(`${API_V1}/group/create`)
        .post(group.create);

    app.route(`${API_V1}/group/addtogroup`)
        .post(group.createUG);
}