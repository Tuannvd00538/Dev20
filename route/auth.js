var auth = require('../controller/auth');

module.exports = function(app){

    const API_V1 = "/_api/v1";

	app.route(`${API_V1}/account/register`)
        .post(auth.add);
        
    app.route(`${API_V1}/account/login`)
        .post(auth.login);

    app.route(`${API_V1}/account/:id`)
        .get(auth.getMe);
}