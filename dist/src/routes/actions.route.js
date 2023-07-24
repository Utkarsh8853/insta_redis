"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionRouter = void 0;
const express_1 = __importDefault(require("express"));
const actions_controller_1 = require("../controllers/actions.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
exports.actionRouter = express_1.default.Router();
exports.actionRouter.post('/action', auth_middleware_1.default, actions_controller_1.actionController.action);
exports.actionRouter.get('/allComment', actions_controller_1.actionController.allComment);
exports.actionRouter.get('/allLikes', actions_controller_1.actionController.allLikes);
