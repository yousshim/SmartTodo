import Task from "./task";
import { User } from "./user";
import priorityQ from "./priorityQ";
import { Request, Response } from "express";
import PriorityQ from "./priorityQ";

export const addUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = new User({ name, email, tasks: [] });
  try {
    await user.save();
    res.send(user._id);
  } catch (err) {
    console.log(err);
    res.status(400).send("failed to add user");
  }
};

export const getTask = async (req: Request, res: Response) => {
  const id = req.query.id;
  const user = await User.findById(id);
  if (!user) {
    res.send("User not found");
    return;
  }
  const tasks: Task[] = [];
  user.tasks.forEach((task) => {
    tasks.push(
      new Task(task.name, task.description, new Date(task.dueDate), task.tags)
    );
  });
  const q = new PriorityQ<Task>();
  q.data = tasks;
  q.size = tasks.length;
  const task = q.pop();
  res.json({
    id: task?.id,
    name: task?.name,
    description: task?.description,
    dueDate: task?.duedate,
    createDate: task?.createDate,
    tags: task?.tags,
  });
  const userTasks: any[] = [];
  q.data.forEach((task) => {
    userTasks.push({
      id: task.id,
      name: task.name,
      description: task.description,
      dueDate: task.duedate,
      tags: task.tags,
    });
  });
};

export const addTask = async (req: Request, res: Response) => {
  const { id, ...taskinfo } = req.body;
  const { name, description, dueDate, tags } = taskinfo;
  const user = await User.findById(id);
  if (!user) {
    res.send("User not found");
    return;
  }
  const tasks: Task[] = [];
  console.log(user.tasks);
  user.tasks.forEach((task) => {
    tasks.push(
      new Task(task.name, task.description, new Date(task.dueDate), task.tags)
    );
  });
  const q = new PriorityQ<Task>();
  q.data = tasks;
  q.size = tasks.length;
  q.push(new Task(name, description, dueDate, tags));
  user.tasks = q.data.map((task) => ({
    id: task.id,
    name: task.name,
    description: task.description,
    dueDate: task.duedate.getDate().toString(),
    createDate: task.createDate.getDate().toString(),
    tags: task.tags,
  }));
  await user.save();
  res.send(user._id);
};
