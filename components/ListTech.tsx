import ItemTechStack from "./ItemTech";
import {getTechStacks} from "@/lib/projects";


export default function ListTechStacks() {
    const techStacks = getTechStacks();

  return (
    <div className="flex flex-wrap gap-4">
      {techStacks.map((stack) => (
        <ItemTechStack key={stack} title={stack} />
      ))}
    </div>
  );
}
