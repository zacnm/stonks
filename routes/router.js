const   fs      = require('fs'),
        path    = require('path'),
        express = require('express');

class Router {

    constructor() {
        this.startFolder = null;
    }

    load(app, folderName) {

        if (!this.startFolder) {
            this.startFolder = path.basename(folderName);
        }

        fs.readdirSync(folderName).forEach((file) => {

            const fullName = path.join(folderName, file);

            if (file.toLowerCase().indexOf('.controller.js')) {
                const router = express.Router();
                const baseRoute = '/' + file.split('.')[0];
                console.log('Created route: ' + baseRoute + ' for ' + fullName);

                const controllerClass = require('../' + fullName);
                const controller = new controllerClass(router);
                app.use(baseRoute, router);
            }
        });
    }

}

module.exports = new Router();
