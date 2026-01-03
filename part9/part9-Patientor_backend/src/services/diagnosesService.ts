import diagnosesData from "../data/diagnoses";
import patientData from "../data/patients";
import { Diagnosis } from "../types/diagnosis";
import { Patient } from "../types/patient";
import { NonSensitivePatient } from "../types/non_sensitive_patient";

const diagnoses: Diagnosis[] = diagnosesData;
const patients: Patient[] = patientData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addDiagnoses = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnoses,
  getNonSensitivePatients,
};
