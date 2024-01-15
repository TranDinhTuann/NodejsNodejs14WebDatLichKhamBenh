import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });

    } catch (error) {
        console.log(error);
    }
}

let createCRUD = async (req, res) => {
    try {
        return res.render('create-crud.ejs');
    } catch (error) {
        console.log(error);
    }
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('Post success');
} 

let getCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('get-crud.ejs', {
        dataTable: data
    });
}

let editCRUD = async (req, res) => {
    let userID = req.query.id;
    if(userID){
        let userData = await CRUDService.getUserInfoByID(userID);
        return res.render('edit-crud.ejs', {
            user: userData
        });
    }
    else{
        return res.send('User not found');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;   
    let allUsers = await CRUDService.updateUserData(data); 
    return res.render('get-crud.ejs', {
        dataTable: allUsers
    });
}

let deleteCRUD = async (req, res) => {
    let userID = req.query.id;
    if(userID){
        await CRUDService.deleteUserByID(userID);
        return res.send('Delete a user success!')
    }else{
        return res.send('User not found!')
    }
} 

module.exports = {
    getHomePage: getHomePage,
    createCRUD: createCRUD,
    postCRUD: postCRUD,
    getCRUD: getCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}