import { v4 as uuid } from "uuid";

type Tag = {
  name: string;
  priority: number;
};

const tags: Tag[] = [
  { name: "Urgent", priority: 10 },
  { name: "Less Urgent", priority: 5 },
  { name: "Lest Urgent", priority: 1 },
];

const daysBetween = (date1: Date, date2: Date): number => {
  return Math.floor((date1.getTime() - date2.getTime()) / (1000 * 3600 * 24));
};

export default class Task {
  public id: string;
  public name: string;
  public description: string;
  public createDate: Date;
  public duedate: Date;
  public tags: string[];
  constructor(
    name: string,
    description: string,
    duedate: Date,
    tags: string[]
  ) {
    this.id = uuid();
    this.description = description;
    this.name = name;
    this.createDate = new Date();
    this.duedate = new Date(duedate);
    this.tags = tags;
  }
  get slack(): number {
    return daysBetween(this.duedate, new Date());
  }
  isGreaterThan(other: Task): boolean {
    for (const tag of tags) {
      const tagInThis = this.tags.includes(tag.name);
      const tagInOther = other.tags.includes(tag.name);
      if (tagInThis && !tagInOther) {
        return true;
      }
      if (!tagInThis && tagInOther) {
        return false;
      }
    }
    return this.slack < other.slack;
  }
}
