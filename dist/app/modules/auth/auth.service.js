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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const user_model_1 = require("../users/user.model");
const jwtHelpers_1 = require("../../../helpes/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(id);
    if (!isUserExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiErrors_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { id: userId, role, needsPasswordChange } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiErrors_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userId } = verifiedToken;
    // tumi delete hye gso  kintu tumar refresh token ase
    // checking deleted user's refresh token
    const isUserExist = yield user_model_1.User.isUserExist(userId);
    if (!isUserExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist.id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
// const changePassword = async (
//   user: JwtPayload | null,
//   payload: IChangePassword
// ): Promise<void> => {
//   const { oldPassword, newPassword } = payload;
//   // // checking is user exist
//   // const isUserExist = await User.isUserExist(user?.userId);
//   //alternative way
//   const isUserExist = await User.findOne({ id: user?.userId }).select(
//     '+password'
//   );
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }
//   // checking old password
//   if (
//     isUserExist.password &&
//     !(await User.isPasswordMatched(oldPassword, isUserExist.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
//   }
//   // // hash password before saving
//   // const newHashedPassword = await bcrypt.hash(
//   //   newPassword,
//   //   Number(config.bycrypt_salt_rounds)
//   // );
//   // const query = { id: user?.userId };
//   // const updatedData = {
//   //   password: newHashedPassword,  //
//   //   needsPasswordChange: false,
//   //   passwordChangedAt: new Date(), //
//   // };
//   // await User.findOneAndUpdate(query, updatedData);
//   // data update
//   isUserExist.password = newPassword;
//   isUserExist.needsPasswordChange = false;
//   // updating using save()
//   isUserExist.save();
// };
// const forgotPass = async (payload: { id: string }) => {
//   const user = await User.findOne({ id: payload.id }, { id: 1, role: 1 });
//   if (!user) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist!")
//   }
//   let profile = null;
//   if (user.role === ENUM_USER_ROLE.ADMIN) {
//     profile = await Admin.findOne({ id: user.id })
//   }
//   else if (user.role === ENUM_USER_ROLE.FACULTY) {
//     profile = await Faculty.findOne({ id: user.id })
//   }
//   else if (user.role === ENUM_USER_ROLE.STUDENT) {
//     profile = await Student.findOne({ id: user.id })
//   }
//   if (!profile) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Pofile not found!")
//   }
//   if (!profile.email) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Email not found!")
//   }
//   const passResetToken = await jwtHelpers.createResetToken({ id: user.id }, config.jwt.secret as string, '50m')
//   const resetLink: string = config.resetlink + `token=${passResetToken}`
//   console.log("profile: ", profile)
//   await sendEmail(profile.email, `
//       <div>
//         <p>Hi, ${profile.name.firstName}</p>
//         <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
//         <p>Thank you</p>
//       </div>
//   `);
//   // return {
//   //   message: "Check your email!"
//   // }
// }
// const resetPassword = async (payload: { id: string, newPassword: string }, token: string) => {
//   const { id, newPassword } = payload;
//   const user = await User.findOne({ id }, { id: 1 })
//   if (!user) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "User not found!")
//   }
//   const isVarified = await jwtHelpers.verifyToken(token, config.jwt.secret as string);
//   const password = await bcrypt.hash(newPassword, Number(config.bycrypt_salt_rounds))
//   await User.updateOne({ id }, { password });
// }
exports.AuthService = {
    loginUser,
    refreshToken,
    // changePassword,
    // forgotPass,
    // resetPassword
};
