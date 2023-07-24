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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("./src/routes/auth.route");
const post_route_1 = require("./src/routes/post.route");
const follow_info_route_1 = require("./src/routes/follow_info.route");
const actions_route_1 = require("./src/routes/actions.route");
const db_connection_1 = __importDefault(require("./src/database/db_connection"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const YAML = __importStar(require("yamljs"));
const path = __importStar(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
const port = 6000;
db_connection_1.default;
app.use("/auth", auth_route_1.authRouter);
app.use("/upload", post_route_1.postRouter);
app.use("/data", follow_info_route_1.followRouter);
app.use("/data", actions_route_1.actionRouter);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
