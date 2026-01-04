import { z } from "zod";
import { Gender } from "../types/patient";
import { NewPatient } from "../types/non_sensitive_patient";

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const toNewPatientEntry = (input: unknown): NewPatient => {
  return NewPatientSchema.parse(input);
};
