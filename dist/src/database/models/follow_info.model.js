"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followStatus = void 0;
const mongoose_1 = require("mongoose");
var followStatus;
(function (followStatus) {
    followStatus["Pending"] = "Pending";
    followStatus["Accepted"] = "Accepted";
    followStatus["Rejected"] = "Rejected";
})(followStatus = exports.followStatus || (exports.followStatus = {}));
const followSchema = new mongoose_1.Schema({
    sender_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        //ref: 'user',
        required: true
    },
    receiver_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    status: {
        type: String,
        enum: Object.values(followStatus),
    }
}, { timestamps: { createdAt: 'created_at' } });
exports.default = (0, mongoose_1.model)('follow_infos', followSchema);
