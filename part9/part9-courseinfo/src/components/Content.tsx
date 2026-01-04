import { CoursePart } from "../App";
import { Part } from "./Part";

interface ContentProp {
  item: CoursePart[];
}

export const Content = ({ item }: ContentProp) => {
  return (
    <div>
      {item.map((i) => (
        <Part key={i.name} item={i} />
      ))}
    </div>
  );
};
