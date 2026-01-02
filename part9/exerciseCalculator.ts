import { isNotNumber } from "./utils";

interface result {
  periodLength: number;
  trainingDays: number;
  success: Boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((h) => h > 0).length;
  const totalDailyHours = dailyExerciseHours.reduce((sum, h) => sum + h, 0);
  const average = totalDailyHours / periodLength;
  const success = average >= target;
  let ratingDescription: string;
  let rating: 1 | 2 | 3;
  if (average < 0.8 * target) {
    rating = 1;
    ratingDescription = "you should do more exercises";
  } else if (average < target) {
    rating = 1;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "Great job! Target reached";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const args = process.argv;
  const target = args[2];
  const hours = args.slice(3);

  if (!target || hours.length === 0) {
    throw new Error("Target and daily exercise hours must be provided");
  }

  if (isNotNumber(target) || hours.some((h) => isNotNumber(h))) {
    throw new Error("Arguments must be numeric values");
  }

  console.log(calculateExercises(hours.map(Number), Number(target)));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
