import { isNotNumber } from "./utils";

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight";
  }
  return "Obese";
};

try {
  const args = process.argv;
  const height = args[2];
  const weight = args[3];

  if (!height || !weight) {
    throw new Error("Height and weight must be provided");
  }

  if (isNotNumber(height) || isNotNumber(weight)) {
    throw new Error("Arguments must be numeric values");
  }

  console.log(calculateBmi(Number(height), Number(weight)));
} catch (err: unknown) {
  let message = "An error occurred.";
  if (err instanceof Error) {
    message += " " + err.message;
  }
  console.log(message);
}
