"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.actionController = void 0;
const actions_model_1 = __importStar(require("../database/models/actions.model"));
const post_model_1 = __importDefault(require("../database/models/post.model"));
class ActionController {
    action(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.id;
                const { post_id, action_type, content } = req.body;
                const check1 = yield post_model_1.default.findOne({ _id: post_id });
                console.log('check 1 ', check1);
                if (check1) {
                    const filter1 = { _id: post_id };
                    const update1 = { $inc: { comment_count: 1 } };
                    const update2 = { $inc: { likes_count: 1 } };
                    if (action_type === actions_model_1.type.Comment && (content == null || content === "")) {
                        return res.status(400).send({ message: "Comment is missing" });
                    }
                    else if (action_type === actions_model_1.type.Likes) {
                        const check2 = yield actions_model_1.default.findOne({ post_id: post_id, user_id: user_id });
                        const check3 = yield actions_model_1.default.findOne({ action_type: actions_model_1.type.Likes });
                        console.log('check 2 ', check2);
                        console.log('check 3 ', check3);
                        if (check2 && check3) {
                            return res.status(400).send("You already liked the post");
                        }
                        const action = yield actions_model_1.default.create({ post_id, user_id, action_type });
                        yield post_model_1.default.updateOne(filter1, update2);
                        console.log('Liked', action);
                        return res.status(200).send({ message: "Liked" });
                    }
                    else if (action_type === "Comment" && content != null) {
                        const action = yield actions_model_1.default.create({ post_id, user_id, action_type, content });
                        yield post_model_1.default.updateOne(filter1, update1);
                        console.log('Commented', action);
                        return res.status(200).send({ message: "Commented" });
                    }
                }
                return res.status(400).send("Wrong post id");
            }
            catch (err) {
                console.error(err);
                return res.status(400).send("Server problem");
            }
        });
    }
    allComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { post_id } = req.body;
                const check = yield post_model_1.default.findOne({ _id: post_id });
                console.log('check ', check);
                if (check) {
                    const result = yield actions_model_1.default.find({ post_id: post_id, action_type: actions_model_1.type.Comment }).select('content');
                    console.error(result);
                    return res.status(400).json({ result });
                }
                return res.status(400).send("Wrong post id");
            }
            catch (err) {
                console.error(err);
                return res.status(400).json({ message: "server problem" });
            }
        });
    }
    allLikes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { post_id } = req.body;
                const check = yield post_model_1.default.findOne({ _id: post_id });
                console.log('check ', check);
                if (check) {
                    const result = yield actions_model_1.default.find({ post_id: post_id, action_type: actions_model_1.type.Likes }).select('user_id');
                    console.error(result);
                    return res.status(400).json({ result });
                }
                return res.status(400).send("Wrong post id");
            }
            catch (err) {
                console.error(err);
                return res.status(400).json({ message: "server problem" });
            }
        });
    }
}
exports.actionController = new ActionController();
