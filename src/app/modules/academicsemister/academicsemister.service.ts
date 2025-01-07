import { IAcademicSemester } from "./academicsemister.interface";
import { AcademicSemester } from "./academicsemister.model";

const createSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
    const result = await AcademicSemester.create(payload);
    return result;
};

export const academicSemesterService = {
    createSemester,
}