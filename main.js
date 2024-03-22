var jsonData = {};
async function loadData() {
  return fetch('./commands.json')
  .then((res) => res.json())
  .then((json) => jsonData = json);
}

var before = document.getElementById("before");
var lineElement = document.getElementById("line");
var commandElement = document.getElementById("typer"); 
var textareaElement = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");

var git = 0;
var pw = false;
let pwd = false;
var commandList = [];

setTimeout(async function() {
  await loadData()
    .then((res) => loopLines(res.commands[8].value, "", 80));
  textareaElement.focus();
}, 100);

window.addEventListener("keyup", enterKey);

//init
textareaElement.value = "";
commandElement.innerHTML = textareaElement.value;

function enterKey(e) {
  console.log(e.keyCode);
  if (e.keyCode == 181) {
    document.location.reload(true);
  }
  if (pw) {
    let et = "*";
    let w = textareaElement.value.length;
    commandElement.innerHTML = et.repeat(w);
  } else {
    if (e.keyCode == 13) {
      commandList.push(commandElement.innerHTML);
      git = commandList.length;
      addLine("visitor@portfolio-tr:~$ " + commandElement.innerHTML, "no-animation", 0);
      commands(commandElement.innerHTML.toLowerCase());
      commandElement.innerHTML = "";
      textareaElement.value = "";
    }
    if (e.keyCode == 38 && git != 0) {
      git -= 1;
      textareaElement.value = commandList[git];
      commandElement.innerHTML = textareaElement.value;
    }
    if (e.keyCode == 40 && git != commandList.length) {
      git += 1;
      if (commandList[git] === undefined) {
        textareaElement.value = "";
      } else {
        textareaElement.value = commandList[git];
      }
      commandElement.innerHTML = textareaElement.value;
    }
  }
}

function commands(cmd) {
  for(var i = 0; i<jsonData.commands.length;i++) {
    if(cmd.toLowerCase() == "email" && jsonData.commands[i].name == "email"){
      addLine('Opening mailto:<a href="mailto:rtyree32@gmail.com">rtyree32@gmail.com</a>...', "color2", 80);
      newTab(jsonData.commands[i].value);
      return;
    }
    else if(cmd.toLowerCase() == "banner" && jsonData.commands[i].name == "banner"){
      loopLines(jsonData.commands[i].value, jsonData.commands[i].style, jsonData.commands[i].time);
      return;
    }
    else if(cmd.toLowerCase() == "history" && jsonData.commands[i].name == "history"){
      addLine("<br>", "", 0);
      loopLines(commandList, jsonData.commands[i].style, jsonData.commands[i].time);
      addLine("<br>", "command", 80 * commandList.length + 50);
      return;
    }
    else if(cmd.toLowerCase() == "linkedin" && jsonData.commands[i].name == "linkedin"){
      addLine("Opening LinkedIn...", jsonData.commands[i].style, jsonData.commands[i].time);
      newTab(jsonData.commands[i].value);
      return;
    }
    else if(cmd.toLowerCase() == "github" && jsonData.commands[i].name == "github"){
      addLine("Opening GitHub...", jsonData.commands[i].style, jsonData.commands[i].time);
      newTab(jsonData.commands[i].value);
      return;
    }
    else if(cmd.toLowerCase() == "reset" && jsonData.commands[i].name == "reset"){
      location.reload();
      return;
    }       
    else if(cmd.toLowerCase() == jsonData.commands[i].name) {
      loopLines(jsonData.commands[i].value, jsonData.commands[i].style, jsonData.commands[i].time);
      return;    
    }
    else if(cmd.toLowerCase() == "clear") {
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      return;
    }
  }
}

function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}
