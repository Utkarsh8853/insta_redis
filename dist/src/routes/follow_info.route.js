"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followRouter = void 0;
const express_1 = __importDefault(require("express"));
const follow_info_controller_1 = require("../controllers/follow_info.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
exports.followRouter = express_1.default.Router();
exports.followRouter.post('/follow', auth_middleware_1.default, follow_info_controller_1.followController.follow);
exports.followRouter.post('/unfollow', auth_middleware_1.default, follow_info_controller_1.followController.unfollow);
exports.followRouter.get('/following', auth_middleware_1.default, follow_info_controller_1.followController.following_list);
exports.followRouter.get('/follower', auth_middleware_1.default, follow_info_controller_1.followController.follower_list);
