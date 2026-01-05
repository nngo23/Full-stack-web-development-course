import express, { Request, Response, NextFunction } from "express";
import { z } from "zod";
import patientsService from "../services/patientsService";
import { NewPatientSchema } from "../utils/zodSchema";
import { Patient } from "../types/patient";
import { NewPatient } from "../types/non_sensitive_patient";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (err: unknown) {
    next(err);
  }
};

const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof z.ZodError) {
    res.status(400).send({ err: err.issues });
  } else {
    next(err);
  }
};

router.get("/:id", (req, res) => {
  const patient = patientsService.getPatientByID(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.use(errorMiddleware);

export default router;
