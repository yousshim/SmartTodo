import * as fc from "fast-check";
import PriorityQ from "../priorityQ";

type Model = {
  data: number[];
};

test("Test the properties of priorty queue", () => {
  class PushCommand implements fc.Command<Model, PriorityQ> {
    constructor(readonly value: number) {}

    check(_: Readonly<Model>): boolean {
      return true;
    }
    run(m: Model, r: PriorityQ) {
      m.data.push(this.value);
      m.data.sort((a, b) => a - b);
      r.push(this.value);
      expect(r.size).toBe(m.data.length);
    }
    toString() {
      return `Push(${this.value})`;
    }
  }

  class PopCommand implements fc.Command<Model, PriorityQ> {
    check(m: Readonly<Model>): boolean {
      return m.data.length > 0;
    }
    run(m: Model, r: PriorityQ) {
      const modelMax = m.data.pop();
      const realMax = r.pop();
      expect(r.size).toBe(m.data.length);
      expect(realMax).toBe(modelMax);
    }
    toString() {
      return "Pop()";
    }
  }

  const allCommands = [
    fc.integer().map((v) => new PushCommand(v)),
    fc.constant(new PopCommand()),
  ];
  fc.assert(
    fc.property(fc.commands(allCommands), (cmds) => {
      const model = { size: 0, data: [] };
      const real = new PriorityQ();
      const setup = () => ({ model, real });
      fc.modelRun(setup, cmds);
    })
  );
});
