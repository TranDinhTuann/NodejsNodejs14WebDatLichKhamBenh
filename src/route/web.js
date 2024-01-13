import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

// app là 1 ứng dụng, vì 1 server là 1 ứng dụng
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/tyrant', (req, res) => {
        return res.send('Hello world with Tyrant');
    })

    return app.use('/', router)
}

module.exports = initWebRoutes;