const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height * height) / 10000);
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight";
  }
  return "Obese";
};

console.log(calculateBmi(180, 74));
