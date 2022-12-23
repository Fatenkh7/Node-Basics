/**
 * Starts the application
 * This is the function that is run when the app starts
 *
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *
 * @param  {string} name the name of the app
 * @returns {void}
 */
let inputjson = "./database.json";

if (process.argv[2]) {
  inputjson = "./blah.json";

  console.log("----------------");
} else {
  inputjson = "./database.json";
}
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", onDataReceived);
  console.log(`Welcome to ${name}'s application!`);
  console.log("--------------------");

  try {
    arr = JSON.parse(fs.readFileSync("database.json").toString());
  } catch (error) {
    console.log("error");
  }
}
//fs
var fs = require("fs");
//read file
var data = fs.readFileSync("database.json", "utf8");
//split data
var lines = data.split("\n");
//split lines
var lines = lines.map(function (line) {
  return line.split("\t");
});

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 *
 * For example, if the user entered
 * ```
 * node tasks.js batata
 * ```
 *
 * The text received would be "batata"
 * This function  then directs to other functions
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === "quit\n" || text === "exit\n") {
    quit();
  } else if (text.startsWith("hello")) {
    hello(text);
  } else if (text === "help\n") {
    help();
  } else if (text === "list\n") {
    list();
  } else if (text.startsWith("add")) {
    add(text);
  } else if (text.startsWith("remove")) {
    remove(text);
  } else if (text.startsWith("edit")) {
    edit(text);
  } else if (text.startsWith("check")) {
    check(text);
  } else if (text.startsWith("uncheck")) {
    uncheck(text);
  } else {
    unknownCommand(text);
  }
}

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"');
}

/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text) {
  console.log(text.trim() + "!");
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log("Quitting now, goodbye ;) !");
  try {
    fs.writeFileSync("database.json", JSON.stringify(arr, null, 3));
  } catch (error) {
    console.log("error");
  }
  process.exit();
}
function readData() {
  fs.readFile(inputjson, (data) => {
    try {
      let tasks = JSON.parse(data);
      // console.log(arrayObject);
    } catch (error) {
      console.error("Invalid -> Empty database");
    }
  });
}
/**
 * prints "help"
 *  this function to help you what is the available command.
 * @param  {string} c the text received
 * @returns {void}
 */
function help() {
  console.log(
    "Commands:\n" +
      "  quit\n" +
      "exit\n" +
      "add\n" +
      "remove\n" +
      "list\n" +
      "  hello " +
      "'if you want you can add everything'\n" +
      "edit what u want to replace\n" +
      "check    :to check if the task is done\n" +
      "uncheck  :to uncheck the task\n"
  );
}

/**
 *list to show the elements

 */
let arr = [
  { task: "buy bread", done: false },
  { task: "get potato", done: true },
  { task: "get ketchup", done: true },
];

/**
 * @returns {void}
 */
function list() {
  arr.map((element, index) => {
    let output = element.done ? "[✓]" + element.task : "[ ]" + element.task;
    console.log(index + 1 + output);
  });
}

/**
 * adds elements to the list
 *@param  {string} c the text received
 * @returns {void}
 */
function add(text) {
  if (text === "add\n") {
    console.log("error");
  } else {
    arr.push({ task: text.substring(4), done: false });
  }
}
/**
 * remove the elments
 *
 * @returns {void}
 */
function remove(text) {
  if (text.slice(6).trim() == "") {
    arr.pop();
  } else if (parseInt(text.substring(6)) > arr.length) {
    console.log("this number dosen't exist");
  } else {
    arr.splice(parseInt(text.substring(6)) - 1, 1);
  }
}
/**
 * replace elements to the list
 *@param  {string} c the text received
 * @returns {void}
 */
function edit(text) {
  if (text.slice(4).trim() == "") {
    console.log("error");
  } else if (parseInt(text.substring(5)) < arr.length) {
    arr[parseInt(text.substring(4)) - 1].task = text.substring(6).trim();
  } else if (isNaN(text.substring(4))) {
    arr.pop();
    arr.push({ task: text.slice(4).trim(), done: false });
  }
}

//check function
function check(text) {
  if (text.slice(5).trim() == "") {
    console.log("error");
  } else {
    arr[parseInt(text.slice(6).trim()) - 1].done = true;
  }
}
//uncheck function
function uncheck(text) {
  if (text.slice(7).trim() == "") {
    console.log("error");
  } else {
    arr[parseInt(text.slice(8).trim()) - 1].done = false;
  }
}
// The following line starts the application
startApp("Faten khoder");
