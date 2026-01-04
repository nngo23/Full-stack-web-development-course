import { CoursePart } from "../App";

interface TotalProp {
  part: CoursePart[];
}

export const Total = ({ part }: TotalProp) => {
  return (
    <div>
      Number of exercises {part.reduce((sum, p) => sum + p.exerciseCount, 0)}
    </div>
  );
};
