import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  return res.send("Hello Full Stack!");
});

app.get("/bmi", (request, response) => {
  const heightParam = request.query.height;
  const weightParam = request.query.weight;

  if (
    !heightParam ||
    !weightParam ||
    isNaN(Number(heightParam)) ||
    isNaN(Number(weightParam))
  ) {
    return response.status(400).json({
      error: "Wrong parameters",
    });
  }

  return response.json({
    heightParam,
    weightParam,
    bmi: calculateBmi(Number(heightParam), Number(weightParam)),
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
