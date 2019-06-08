var warning = require('../controller/warning');

module.exports = function(app){

    const API_V1 = "/_api/v1";

	app.route(`${API_V1}/warning`)
        .post(warning.add);
        
    app.route(`${API_V1}/warning/:id`)
        .get(warning.getWarningByUser);

    app.route(`${API_V1}/realtime/:id/today`)
        .get(warning.getToday);
}