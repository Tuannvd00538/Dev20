var warning = require('../controller/warning');

module.exports = function(app){

    const API_V1 = "/_api/v1";

	app.route(`${API_V1}/warning`)
        .post(warning.add);
        
    app.route(`${API_V1}/warning/:id/:month/:year`)
        .get(warning.getByMonthAndYear);

    app.route(`${API_V1}/warning/:id/today`)
        .get(warning.getToday);

    app.route(`${API_V1}/warning/:id/:year`)
        .get(warning.getByYear);
}