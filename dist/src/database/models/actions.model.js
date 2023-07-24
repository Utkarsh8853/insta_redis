"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.type = void 0;
const mongoose_1 = require("mongoose");
// follow schema
var type;
(function (type) {
    type["Likes"] = "liked";
    type["Comment"] = "Comment";
})(type = exports.type || (exports.type = {}));
const replySchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    action_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'actionSchema',
        required: true
    },
    reply_text: {
        type: String,
        required: true
    }
});
const actionSchema = new mongoose_1.Schema({
    post_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'posts',
        required: true
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    action_type: {
        type: String,
        enum: Object.values(type),
    },
    content: {
        type: String
    },
    reply: [replySchema],
});
exports.default = (0, mongoose_1.model)('actions', actionSchema);
