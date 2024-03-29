import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

// app là 1 ứng dụng, vì 1 server là 1 ứng dụng
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/create-crud', homeController.createCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.getCRUD);
    router.get('/edit-crud', homeController.editCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-users', userController.handleCreateNewUsers);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    return app.use('/', router)
}

module.exports = initWebRoutes;