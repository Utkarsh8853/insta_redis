"use strict";
// import User from "../database/models/user.model";
// import bcrypt from 'bcrypt';
// class AuthController {
//     async signup(req:any, res:any) {
//         try {
//             const { username, email, password } = req.body;
//             const hashPwd = await bcrypt.hash(password,3);
//             console.log(hashPwd);
//             const result = await User.create({username: username, email:email, password:hashPwd});
//             if(result) {
//                 console.log('Signup successfully',result);
//                 return res.status(200).json({message: "OK"});
//             }
//             return res.status(400).json({message: "server problem"});
//         } catch(err) {
//             console.error(err);
//         }
//     }
//     async login(req:any, res:any) {
//         try {
//             const { username, password } = req.body;
//             const result:any = await User.findOne({username: username});
//             if(!username) {
//                 return res.status(200).json({message: "Wrong username"});
//             }
//             const pwdMatch = await bcrypt.compare(password, result.password)
//             if(pwdMatch) {
//                 console.log('Login result',result);
//                 return res.status(200).json({message: "OK Login"});
//             }
//             return res.status(400).json({message: "Incorrect Password"});
//         } catch(err) {
//             console.error(err);
//         }
//     }
// }
// export const authController = new AuthController();
