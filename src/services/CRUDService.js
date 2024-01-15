import bcrypt from "bcryptjs";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                // image: DataTypes.STRING, // vì mình không tạo input
                roleId: data.roleId,
                // positionId: DataTypes.STRING,
            })
            resolve('Oke! Create a new user success');
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUser = () => {
    return new Promise (async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            }); 
            resolve(users);
        } catch (error) {
            reject(error)
        }
    })
}

let getUserInfoByID = async (userID) => {
    return new Promise (async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userID},
                raw: true,
            })
            if(user){
                resolve(user);
            }
            else{
                resolve({});
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateUserData = async (data) => {
    return new Promise (async (resolve, reject) => {
        try {
                let user = await db.User.findOne({
                    where: {id: data.id}
                })
                if(user){
                    user.firstName = data.firstName;
                    user.lastName = data.lastName;
                    user.address = data.address;

                    await user.save();
                    let allUsers = await db.User.findAll();
                    resolve(allUsers);
                }else{
                    resolve();
                }
        } catch (error) {
            reject(error)
        }
    })
}   


let deleteUserByID = (userID) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id : userID}
            })
            if(user){
                await user.destroy();
            }
            resolve(); // return
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoByID: getUserInfoByID,
    updateUserData: updateUserData,
    deleteUserByID: deleteUserByID,
}