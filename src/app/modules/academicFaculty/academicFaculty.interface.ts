import { Model } from 'mongoose';

export interface IAcademicFaculty {
  title: string;
}

export type AcademicFacultyModel = Model<IAcademicFaculty, Record<string, unknown>>;

export type IAcademicFacultyFilters = {
  searchTerm?: string;
};