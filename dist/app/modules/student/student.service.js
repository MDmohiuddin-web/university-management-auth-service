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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const http_status_1 = __importDefault(require("http-status"));
const student_constant_1 = require("./student.constant");
const student_model_1 = require("./student.model");
const pagenationHelpers_1 = require("../../../helpes/pagenationHelpers");
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const user_model_1 = require("../users/user.model");
const getAllStudents = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = pagenationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: student_constant_1.studentSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filters needs $and to full fill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Dynamic  Sort needs  field to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield student_model_1.Student.find(whereConditions)
        .populate('academicSemester')
        .populate('academicDepartment')
        .populate('academicFaculty')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield student_model_1.Student.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findOne({ id })
        .populate('academicSemester')
        .populate('academicDepartment')
        .populate('academicFaculty');
    return result;
});
// const updateStudent = async (
//   id: string,
//   payload: Partial<IStudent>
// ): Promise<IStudent | null> => {
//   const isExist = await Student.findOne({ id });
//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !');
//   }
//   const { name, guardian, localGuardian, ...studentData } = payload;
//   const updatedStudentData: Partial<IStudent> = { ...studentData };
//   if (name && Object.keys(name).length > 0) {
//     Object.keys(name).forEach(key => {
//       const nameKey = `name.${key}` as keyof Partial<IStudent>; // `name.fisrtName`
//       (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
//     });
//   }
//   if (guardian && Object.keys(guardian).length > 0) {
//     Object.keys(guardian).forEach(key => {
//       const guardianKey = `guardian.${key}` as keyof Partial<IStudent>; // `guardian.fisrtguardian`
//       (updatedStudentData as any)[guardianKey] =
//         guardian[key as keyof typeof guardian];
//     });
//   }
//   if (localGuardian && Object.keys(localGuardian).length > 0) {
//     Object.keys(localGuardian).forEach(key => {
//       const localGuradianKey =
//         `localGuardian.${key}` as keyof Partial<IStudent>; // `localGuardian.fisrtName`
//       (updatedStudentData as any)[localGuradianKey] =
//         localGuardian[key as keyof typeof localGuardian];
//     });
//   }
//   const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
//     new: true,
//   })
//     .populate('academicFaculty')
//     .populate('academicDepartment')
//     .populate('academicSemester');
//   ;
//   if (result) {
//     await RedisClient.publish(EVENT_STUDENT_UPDATED, JSON.stringify(result));
//   }
//   return result;
// };
const updateStudent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield student_model_1.Student.findOne({ id });
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Student not found !');
    }
    const { name, guardian, localGuardian } = payload, studentData = __rest(payload, ["name", "guardian", "localGuardian"]);
    const updatedStudentData = Object.assign({}, studentData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}` // `name.fisrtName`
            ;
            updatedStudentData[nameKey] = name[key];
        });
    }
    if (guardian && Object.keys(guardian).length > 0) {
        Object.keys(guardian).forEach(key => {
            const guardianKey = `guardian.${key}` // `guardian.fisrtguardian`
            ;
            updatedStudentData[guardianKey] = guardian[key];
        });
    }
    if (localGuardian && Object.keys(localGuardian).length > 0) {
        Object.keys(localGuardian).forEach(key => {
            const localGuardianKey = `localGuardian.${key}` // `localGuardian.fisrtlocalGuardian`
            ;
            updatedStudentData[localGuardianKey] = localGuardian[key];
        });
    }
    const result = yield student_model_1.Student.findOneAndUpdate({ id }, updatedStudentData, {
        new: true,
    });
    return result;
});
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the student is exist
    const isExist = yield student_model_1.Student.findOne({ id });
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Student not found !');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //delete student first
        const student = yield student_model_1.Student.findOneAndDelete({ id }, { session });
        if (!student) {
            throw new ApiErrors_1.default(404, 'Failed to delete student');
        }
        //delete user
        yield user_model_1.User.deleteOne({ id });
        session.commitTransaction();
        session.endSession();
        return student;
    }
    catch (error) {
        session.abortTransaction();
        throw error;
    }
});
exports.StudentService = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,
};
