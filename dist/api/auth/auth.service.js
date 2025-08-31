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
exports.logout = exports.refreshAuthTokens = exports.generateAuthTokens = exports.loginUserWithEmailAndPassword = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const registerUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.default.isEmailTaken(email)) {
        throw new ApiError_1.default(400, 'Email already taken');
    }
    const user = yield user_model_1.default.create({ name, email, password });
    return user;
});
exports.registerUser = registerUser;
const loginUserWithEmailAndPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email });
    if (!user || !(yield user.comparePassword(password))) {
        throw new ApiError_1.default(401, 'Incorrect email or password');
    }
    return user;
});
exports.loginUserWithEmailAndPassword = loginUserWithEmailAndPassword;
const generateAuthTokens = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '15m',
    });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7d',
    });
    user.refreshToken = refreshToken;
    yield user.save();
    return { accessToken, refreshToken };
});
exports.generateAuthTokens = generateAuthTokens;
const refreshAuthTokens = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = yield user_model_1.default.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            throw new ApiError_1.default(403, 'Invalid refresh token');
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '15m',
        });
        return { accessToken };
    }
    catch (error) {
        throw new ApiError_1.default(403, 'Invalid refresh token');
    }
});
exports.refreshAuthTokens = refreshAuthTokens;
const logout = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ refreshToken });
    if (user) {
        user.refreshToken = undefined;
        yield user.save();
    }
});
exports.logout = logout;
//# sourceMappingURL=auth.service.js.map