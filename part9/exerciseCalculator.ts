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
    ratingDescription = "Great job! Target achieved";
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
