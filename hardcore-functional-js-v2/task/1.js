import { Task } from "types";
//const { Task } = require("../types");

Task((rej, res) => res(2))
    .chain((two) => Task.of(two + 1))
    .map((three) => three * 2);

//==================================== task rather then promise
t1.fork(console.error, console.log);
