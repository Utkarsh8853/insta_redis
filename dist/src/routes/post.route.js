"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
exports.postRouter = express_1.default.Router();
exports.postRouter.post('/post', auth_middleware_1.default, post_controller_1.postController.post);
//authRouter.post('/login', authController.login);
