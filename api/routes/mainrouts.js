'use strict';
module.exports = function(app) {
    var mainController = require('../controllers/maincontroller');

    // todoList Routes
    app.route('/')
        .get(mainController.sayHello);

};