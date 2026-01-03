import patientData from "../data/patients";
import { Patient } from "../types/patient";
import {
  NonSensitivePatient,
  NewPatient,
} from "../types/non_sensitive_patient";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientData;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  addPatient,
};
