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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = require("redis");
const session_model_1 = __importDefault(require("../database/models/session.model"));
const client = (0, redis_1.createClient)();
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        const verifyToken = jsonwebtoken_1.default.verify(token, 'appinventiv');
        if (verifyToken.id) {
            let findSession = (yield client.get(`${verifyToken.id}_session`)) || (yield session_model_1.default.find(verifyToken.id));
            if (findSession.length != 0) {
                req.body.id = verifyToken.id;
                next();
            }
            else {
                res.send("Session out");
            }
        }
        else {
            res.send({ message: "invalid token" });
        }
    });
}
exports.default = auth;
