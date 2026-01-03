import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  return res.send("Hello Full Stack!");
});

app.get("/bmi", (request, response) => {
  const heightParam = request.query.height;
  const weightParam = request.query.weight;

  if (!heightParam || !weightParam) {
    return response.status(400).json({
      error: "parameters missing",
    });
  }

  if (isNaN(Number(heightParam)) || isNaN(Number(weightParam))) {
    return response.status(400).json({
      error: "malformatted parameters",
    });
  }

  return response.json({
    heightParam,
    weightParam,
    bmi: calculateBmi(Number(heightParam), Number(weightParam)),
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: { target?: unknown; daily_exercises?: unknown[] } = req.body;

  if (!data.target || !data.daily_exercises) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }
  if (
    isNaN(Number(data.target)) ||
    data.daily_exercises.some((h: unknown) => isNaN(Number(h)))
  ) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  return res.json(
    calculateExercises(data.daily_exercises.map(Number), Number(data.target))
  );
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
