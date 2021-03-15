const fs = require("fs");
const { Task, Either, Id } = require("types");
const { Right, Left, fromNullable } = Either;
const { List, Map } = require("immutable-ext");

const greaterThan5 = (x) =>
    x.length > 5 ? Right(x) : Left("not greater than 5");

const looksLikeEmail = (x) =>
    x.match(/@/gi) ? Right(x) : Left("not an email");

const email = "blahh@yadda.com";
const res = [greaterThan5, looksLikeEmail].traverse(Either.of, (v) => v(email));

res.fold(console.log, (x) => console.log(x.toJS()));

// List([getUser, getTimeline, getAds])
//     .traverse(Task.of, (f) => f())
//     .fork(console.log, (x) => console.log(x.toJS()));
