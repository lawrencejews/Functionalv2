const { Task } = require("../types");
const fs = require("fs");

const app_ = () =>
    fs.readFile("config.json", "utf-8", (err, contents) => {
        console.log(err, contents);
        if (err) throw err;

        const newContents = contents.replace(/3/g, "6");

        fs.writeFile("config1.json", newContents, (err, _) => {
            if (err) throw err;
            console.log("success!");
        });
    });

const readFile = (path, enc) =>
    Task((rej, res) =>
        fs.readFile(path, enc, (err, contents) =>
            err ? rej(err) : res(contents)
        )
    );

const writeFile = (path, contents) =>
    Task((rej, res) =>
        fs.writeFile(path, contents, (err, contents) =>
            err ? rej(err) : res(contents)
        )
  );
    
const app = () =>
    readFile("config.json", "utf-8") //Task(contents)
        .map((contents) => contents.replace(/3/g, "6"))
        .chain((newContents) => writeFile("config1.json", newContents));

app().fork(console.error, () => console.log("success!"));
