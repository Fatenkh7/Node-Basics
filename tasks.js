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
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", onDataReceived);
  console.log(`Welcome to ${name}'s application!`);
  console.log("--------------------");
}

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
  process.exit();
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
      "'if you want you can add everything'\n"
  );
}

/**
 *list to show the elements

 */
let arr = ["buy bread", "get potato", "get ketchup"];
/**
 * @returns {void}
 */
function list() {
  arr.map((element) => console.log(arr.indexOf(element) + 1 + "-" + element));
}

/**
 * adds elements to the list
 *@param  {string} c the text received
 * @returns {void}
 */
function add(text) {
  arr.push(text.substring(4));
}
/**
 * remove last elment
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

// The following line starts the application
startApp("Faten khoder");
