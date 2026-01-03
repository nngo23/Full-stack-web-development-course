import { NewPatient } from "../types/non_sensitive_patient";
import { Gender } from "../types/patient";

const isText = (value: unknown): value is string => {
  return typeof value === "string" || value instanceof String;
};

const requireString = (value: unknown, fieldName: string): string => {
  if (!isText(value)) {
    throw new Error(`Invalid or missing ${fieldName}`);
  }
  return value;
};

const isValidDate = (value: string): boolean => {
  return Boolean(Date.parse(value));
};

const requireDate = (value: unknown): string => {
  if (!isText(value) || !isValidDate(value)) {
    throw new Error("Incorrect dateOfBirth: " + value);
  }
  return value;
};

const isGender = (value: string): value is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(value);
};

const requireGender = (gender: unknown): Gender => {
  if (!isText(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

export const toNewPatientEntry = (input: unknown): NewPatient => {
  if (!input || typeof input !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in input &&
    "dateOfBirth" in input &&
    "ssn" in input &&
    "gender" in input &&
    "occupation" in input
  ) {
    const newPatientEntry: NewPatient = {
      name: requireString(input.name, "name"),
      dateOfBirth: requireDate(input.dateOfBirth),
      ssn: requireString(input.ssn, "ssn"),
      gender: requireGender(input.gender),
      occupation: requireString(input.occupation, "occupation"),
    };

    return newPatientEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};
