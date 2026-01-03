import { Patient } from "../types/patient";

export type NonSensitivePatient = Omit<Patient, "ssn">;
