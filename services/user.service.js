const User = require('../db/models/users.model');
const bcrypt = require('bcrypt');


exports.signupUser = (userData) => {
    return new Promise((resolve, reject) => {
        User.findByEmail(userData.email).then((user, err) => {
            if(err) {
                reject(err);
            }
            if(user) {
                reject('username '+ userData.firstName + ' already exists' )
            } else {
                User.create({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    password: userData.password,
                    date: new Date()
                }, (err, user) => {
                    if(err) {
                        reject(err)
                    }
                   
                    var salt = bcrypt.genSaltSync(10);
                    const hashedPassword = bcrypt.hashSync(user.password, salt)
                    user.password = hashedPassword;
        
                    user.save((error, updatedUser) => {
                        if(error) return reject(error);
                        resolve(updatedUser);
                    })
                })
            }
        })
       
    });
}

exports.loginUser = (userData) => {
    return new Promise((resolve, reject) => {
        User.findByEmail(userData.email).then((user, err) => {
            if(user && bcrypt.compareSync(userData.password, user.password)) {

                resolve({status: 'success', user: user.email + ' logged in'})
            } else if(user && !bcrypt.compareSync(userData.password, user.password)) {
                reject({status: 'failed', message: 'please enter a correct password'})
            }
            else if(err) {
                reject({status: 'failed', message:'somthing went wrong'})
            } else {
                reject({status: 'failed', message: 'user not found'})
            }
        })

    })
}
exports.unsubscribeUser = (userdata) => {
    return new Promise((resolve, reject) => {
        User.findByEmailAndRemove(userdata.email).then((user, err) => {
            if(user) {
                resolve({status: "success", message: user.email + ' removed'})
            } else {
                reject({status: 'failed', message:'user not removed'});
            }
        })
    })
}
