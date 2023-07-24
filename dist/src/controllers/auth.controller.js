"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const user_model_1 = __importDefault(require("../database/models/user.model"));
const session_model_1 = __importDefault(require("../database/models/session.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();
class AuthController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                const check1 = yield user_model_1.default.findOne({ username: username });
                const check2 = yield user_model_1.default.findOne({ email: email });
                if (!check1 && !check2) {
                    const hashPwd = yield bcrypt_1.default.hash(password, 3);
                    console.log(hashPwd);
                    const result = yield user_model_1.default.create({ username: username, email: email, password: hashPwd });
                    console.log('Signup successfully', result);
                    return res.status(200).json({ message: "OK" });
                }
                else if (check1 || check2) {
                    return res.status(400).json({ message: "Username or email already exist" });
                }
            }
            catch (err) {
                console.error(err);
                return res.status(400).json({ message: "server problem" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("fegrtgt");
                const { username, password } = req.body;
                console.log("ddfd", req.body);
                const result = yield user_model_1.default.findOne({ username: username });
                if (!username) {
                    return res.status(200).json({ message: "Wrong username" });
                }
                const pwdMatch = yield bcrypt_1.default.compare(password, result.password);
                if (pwdMatch) {
                    console.log('Login result', result);
                    const token = jsonwebtoken_1.default.sign({ id: result._id }, 'appinventiv', { expiresIn: '6h' });
                    console.log(token);
                    let session_payload = {
                        user_id: result._id,
                        device_id: "1234",
                        device_type: "google chrome",
                        isSessionActive: true
                    };
                    yield session_model_1.default.insertMany([
                        session_payload
                    ]);
                    yield client.set(`${result._id}_session`, JSON.stringify(session_payload));
                    return res.send({ message: "User Login Succesfully", token: token });
                }
                return res.status(400).json({ message: "Incorrect Password" });
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
exports.authController = new AuthController();
