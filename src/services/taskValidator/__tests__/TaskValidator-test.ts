import { parse } from "date-fns";
import TaskValidator from "..";

it("TaskValidator.isActive returns true for active at the moment task", () => {
  const taskValidator = new TaskValidator();

  const task = {
    id: "test",
    title: "test",
    created: parse("2019-01-01"),
    schedule: { 1: { 22: true } },
  };

  expect(taskValidator.isActive(task, parse("2019-04-22 22:00"))).toBe(true);
  expect(taskValidator.isActive(task, parse("2019-04-22 22:30"))).toBe(true);
  expect(taskValidator.isActive(task, parse("2019-04-15 22:59"))).toBe(true);

  expect(taskValidator.isActive(task, parse("2019-04-22 20:00"))).toBe(false);
  expect(taskValidator.isActive(task, parse("2019-04-23 22:00"))).toBe(false);
});
