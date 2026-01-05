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

const getPatientByID = (id: string): Patient | undefined => {
  const patientToShow = patients.find((p) => id === p.id);
  if (!patientToShow) return undefined;
  return {
    ...patientToShow,
    entries: patientToShow.entries ?? [],
  };
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  getPatientByID,
  addPatient,
};
