import express from "express";
import patientsService from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

export default router;
