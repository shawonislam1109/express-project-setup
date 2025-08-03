"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../auth"));
const users_1 = __importDefault(require("../users"));
const articles_1 = __importDefault(require("../articles"));
const comments_1 = __importDefault(require("../comments"));
const routes = [
    {
        path: '/auth',
        handler: auth_1.default,
    },
    {
        path: '/users',
        handler: users_1.default,
    },
    {
        path: '/articles',
        handler: articles_1.default,
    },
    {
        path: '/comments',
        handler: comments_1.default,
    },
];
exports.default = (app) => {
    routes.forEach((route) => {
        if (route.path === '/') {
            app.get(route.path, route.handler);
        }
        else {
            app.use(`/api/v1${route === null || route === void 0 ? void 0 : route.path}`, route.handler);
        }
    });
};
//# sourceMappingURL=index.js.map