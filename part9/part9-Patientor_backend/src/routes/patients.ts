import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatientEntry } from "../utils/utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientsService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (err: unknown) {
    let message = "An error occurred.";
    if (err instanceof Error) {
      message += " " + err.message;
    }
    res.status(400).send(message);
  }
});

export default router;
