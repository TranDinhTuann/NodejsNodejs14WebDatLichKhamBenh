import db from "../models/index";
import bcrypt from "bcryptjs";

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

let handleUserLogin = (email, password) => {
    return new Promise ( async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if(isExist){
                // user already exist
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: {email: email},
                    raw: true,
                    // attributes: {
                    //     include: ['email', 'roleId'],
                    //   },
                })
                if(user){
                    // compare password
                    let check = await bcrypt.compareSync(password, user.password);
                    if(check){
                        userData.errCode = 0;
                        userData.errMessage = 'oke';
                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = 'User is not found'
                }
            }else{
                userData.errCode = 1;
                userData.errMessage = 'Email không tồn tại trên hệ thống';
            }
            resolve(userData);
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if(user) {
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve,reject) => {
        try {
            let users = '';
            if(userId === 'ALL'){
                users = await db.User.findAll({
                    attributes: {exclude: ['password']},
                })
            }
            if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where: {id : userId},
                    attributes: {exclude: ['password']},
                })
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }
    } )    
}

let createNewUsers = (data) => {
    return new Promise( async (resolve, reject) => {
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
            resolve({
                errCode: 0,
                message: 'OK'
            });
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUsers: createNewUsers,
}