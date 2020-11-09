import * as fc from "fast-check";
import PriorityQ from "../priorityQ";

/********************************************************* 
test max heap vs sorted array
heap should always have the same size as the array
heap should always pop the same max as the array
*********************************************************/

class testType {
  constructor(public id: number, public value: number) {}
  isGreaterThan(other: testType): boolean {
    return this.value > other.value;
  }
}

type Model = {
  data: testType[];
};

class PushCommand implements fc.Command<Model, PriorityQ<testType>> {
  constructor(public val: testType) {}
  check(m: Readonly<Model>): boolean {
    return m.data.every((v) => v.id != this.val.id);
  }
  run(m: Model, r: PriorityQ<testType>) {
    m.data.push(this.val);
    r.push(this.val);
    expect(m.data.length).toEqual(r.size);
  }
  toString() {
    return `Push(${this.val.value})`;
  }
}

class PopCommand implements fc.Command<Model, PriorityQ<testType>> {
  check(m: Readonly<Model>): boolean {
    return m.data.length > 0;
  }
  run(m: Model, r: PriorityQ<testType>) {
    const { id: expectedId, value: expectedMax } = m.data.reduce((max, next) =>
      next.isGreaterThan(max) ? next : max
    );
    m.data = m.data.filter((e) => e.id != expectedId);
    const realReturn = r.pop();
    if (!realReturn) {
      return;
    }
    const { id: actualId, value: actualMax } = realReturn;
    // expect(actualId).toEqual(expectedId);
    expect(actualMax).toEqual(expectedMax);
  }
  toString() {
    return "Pop()";
  }
}

const allCommands = [
  fc
    .record({
      id: fc.nat(),
      value: fc.integer(),
    })
    .map((v) => new PushCommand(new testType(v.id, v.value))),
  fc.constant(new PopCommand()),
];

describe("Test the properties of priorty queue", () => {
  fc.assert(
    fc.property(fc.commands(allCommands), (cmds) => {
      test("should keep the same size and max value as array", () => {
        const model: Model = {
          data: [],
        };
        const real = new PriorityQ<testType>();
        const setup = () => ({ model, real });
        fc.modelRun(setup, cmds);
      });
    })
  );
});
