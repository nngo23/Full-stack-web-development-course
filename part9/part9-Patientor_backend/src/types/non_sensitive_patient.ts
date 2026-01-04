import { z } from "zod";
import { Patient } from "../types/patient";
import { NewPatientSchema } from "../utils/zodSchema";

export type NonSensitivePatient = Omit<Patient, "ssn">;

export type NewPatient = z.infer<typeof NewPatientSchema>;
