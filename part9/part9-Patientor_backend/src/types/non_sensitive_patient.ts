import { Patient } from "../types/patient";

export type NonSensitivePatient = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;
