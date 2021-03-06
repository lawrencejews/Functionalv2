const { Right, Left } = require("../either");
const Box = require("../box");
const Task = require("data.task");

// nt(a.map(f)) == nt(a).map(f)
const eitherToTask = (e) => e.fold(Task.rejected, Task.of);

const fake = (id) => ({ id: id, name: "user1", best_friend_id: id + 1 });

const Db = {
    find: (id) =>
        new Task((rej, res) =>
            setTimeout(
                () => res(id > 2 ? Right(fake(id)) : Left("not found")),
                100
            )
        ),
};

const send = (code, json) =>
    console.log(`sending ${code}: ${JSON.stringify(json)}`);

Db.find(1)
    .chain(eitherToTask)
    .chain((u) => Db.find(u.best_friend_id))
    .chain(eitherToTask)
    .fork(
        (error) => send(500, { error }),
        (u) => send(200, u)
    );
