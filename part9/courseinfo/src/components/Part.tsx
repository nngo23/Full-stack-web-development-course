import { CoursePart } from "../App";

interface PartProps {
  item: CoursePart;
}

export const Part = ({ item }: PartProps) => {
  switch (item.kind) {
    case "basic":
      return (
        <div>
          <strong>
            {item.name} {item.exerciseCount}
          </strong>
          <p>
            <em>{item.description}</em>
          </p>
        </div>
      );

    case "background":
      return (
        <div>
          <strong>
            {item.name} {item.exerciseCount}
          </strong>
          <p>
            <em>{item.description}</em>
          </p>
          <p>Material: {item.backgroundMaterial}</p>
        </div>
      );

    case "group":
      return (
        <div>
          <strong>
            {item.name} {item.exerciseCount}
          </strong>
          <p>Group projects: {item.groupProjectCount}</p>
        </div>
      );

    case "special":
      return (
        <div>
          <strong>
            {item.name} {item.exerciseCount}
          </strong>
          <p>
            <em>{item.description}</em>
          </p>
          <p>Skills: {item.requirements.join(", ")}</p>
        </div>
      );

    default:
      return assertNever(item);
  }
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
};
