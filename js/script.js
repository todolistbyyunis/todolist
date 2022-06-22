let tasksProcess = document.querySelector("#process");
let tasksCompleted = document.querySelector("#completed");
let tasksCanceled = document.querySelector("#canceled");
let button = document.querySelector("#addButton");
let inputArea = document.querySelector(".inputArea");
let deleteButton = document.querySelector("#deleteTasker")
let forms = document.querySelectorAll(".form");
let tasks = document.querySelector(".tasks");
let tabs = document.querySelector(".tabs");

localParsing()

localStorage.setItem("process",tasksProcess.innerHTML);
localStorage.setItem("completed",tasksCompleted.innerHTML);
localStorage.setItem("canceled", tasksCanceled.innerHTML);


/*function createForm(anytext) {
    let form = document.createElement("div");
    form.classList.add("form");
    let div = document.createElement("div");
    let div2 = document.createElement("div");
    div.classList.add("col");
    div2.classList.add("col");
    div2.classList.add("settings");
    form.append(div);
    form.append(div2);
    let p = document.createElement("p");
    p.classList.add("inputArea");
    div.append(p);
    let select = document.createElement("select");
    select.setAttribute("id","selecting");
    div2.append(select);
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");
    let option3 = document.createElement("option");
    option1.setAttribute("value","processing");
    option2.setAttribute("value","done");
    option3.setAttribute("value","canceled");
    select.append(option1);
    select.append(option2);
    select.append(option3);
    option1.innerText = "Processing";
    option2.innerText = "Done";
    option3.innerText = "Canceled";
    let deleter = document.createElement("button");
    deleter.setAttribute("id","deleteTasker");
    deleter.innerText = "Delete"
    div2.append(deleter);
    p.innerText = anytext;
    return form
}

function addTaskHandler() {
    let newTask = createForm(inputArea.value);
    tasks.append(newTask);
    updater()
}

//вставка новой задачи через данный код выше
*/

let template = document.querySelector("template");

function addTaskHandler() {
    var templateClone = template.content.cloneNode(true);

    templateClone.querySelector(".inputArea").textContent = inputArea.value;
    tasksProcess.append(templateClone);
    document.getElementById("inputer").value = null;
    updater();
    localStorage.setItem("process",tasksProcess.innerHTML);
    localStorage.setItem("completed",tasksCompleted.innerHTML);
    localStorage.setItem("canceled", tasksCanceled.innerHTML);
}

button.addEventListener("click", addTaskHandler);

function updater() {
    let delButtons = document.querySelectorAll("#deleteTasker");
    for (let i = 0; i < delButtons.length ; i++) {
        let x = delButtons[i];
        x.addEventListener("click",function(event){
            let a = event.target;
            let item = a.closest(".form");
            item.remove();
            localStorage.setItem("process",tasksProcess.innerHTML);
            localStorage.setItem("completed",tasksCompleted.innerHTML);
            localStorage.setItem("canceled", tasksCanceled.innerHTML);
        })
    }

    let buttonChangerProcess = document.querySelectorAll('.buttonChangerProcess');
    for (let i = 0; i < buttonChangerProcess.length ; i++) {
        let x = buttonChangerProcess[i];
        x.addEventListener("click",function(event){
            let a = event.target;
            let item = a.closest(".form");
            let buttons = a.closest(".buttons");
            item.classList.remove("canceled");
            item.classList.remove("completed");
            buttons.innerHTML = '<img class="buttonChangerCompleted" id="completed" src="img/qalocka.png" tabindex="0"> <img class="buttonChangerCanceled" id="canceled" src="img/krest1.png" tabindex="0">';
            let b = item.cloneNode(true);
            tasksProcess.append(b);
            item.remove();
            localStorage.setItem("process",tasksProcess.innerHTML);
            localStorage.setItem("completed",tasksCompleted.innerHTML);
            localStorage.setItem("canceled", tasksCanceled.innerHTML);
        })
    }

    let buttonChangerCanceled = document.querySelectorAll('.buttonChangerCanceled');
    for (let i = 0; i < buttonChangerCanceled.length ; i++) {
        let x = buttonChangerCanceled[i];
        x.addEventListener("click",function(event){
            let a = event.target;
            let item = a.closest(".form");
            let buttons = a.closest(".buttons");
            item.classList.add("canceled");
            item.classList.remove("completed");
            buttons.innerHTML = '<img class="buttonChangerProcess" id="process" src="img/waiter.jpg" tabindex="0"> <img class="buttonChangerCompleted" id="completed" src="img/qalocka.png" tabindex="0">';
            let b = item.cloneNode(true);
            tasksCanceled.append(b);
            item.remove();
            localStorage.setItem("process",tasksProcess.innerHTML);
            localStorage.setItem("completed",tasksCompleted.innerHTML);
            localStorage.setItem("canceled", tasksCanceled.innerHTML);
        })
    }

    let buttonChangerCompleted = document.querySelectorAll('.buttonChangerCompleted');
    for (let i = 0; i < buttonChangerCompleted.length ; i++) {
        let x = buttonChangerCompleted[i];
        x.addEventListener("click",function(event){
            let a = event.target;
            let item = a.closest(".form");
            let buttons = a.closest(".buttons");
            item.classList.add("completed");
            item.classList.remove("canceled");
            buttons.innerHTML = '<img class="buttonChangerProcess" id="process" src="img/waiter.jpg" tabindex="0"> <img class="buttonChangerCanceled" id="canceled" src="img/krest1.png" tabindex="0">';
            let b = item.cloneNode(true);
            tasksCompleted.append(b);
            item.remove();
            localStorage.setItem("process",tasksProcess.innerHTML);
            localStorage.setItem("completed",tasksCompleted.innerHTML);
            localStorage.setItem("canceled", tasksCanceled.innerHTML);
        })
    }

}

let label = document.querySelectorAll("label");
for (let i = 0; i < label.length ; i++) {
    let x = label[i];
    x.addEventListener("click",function() {
        updater()
    })
}

function runOnKeys(func, ...codes) {
    let pressed = new Set();

    document.addEventListener('keydown', function(event) {
      pressed.add(event.code);

      for (let code of codes) { // все ли клавиши из набора нажаты?
        if (!pressed.has(code)) {
          return;
        }
      }

      // да, все

      // во время показа alert, если посетитель отпустит клавиши - не возникнет keyup
      // при этом JavaScript "пропустит" факт отпускания клавиш, а pressed[keyCode] останется true
      // чтобы избежать "залипания" клавиши -- обнуляем статус всех клавиш, пусть нажимает всё заново
      pressed.clear();

      func();
    });

    document.addEventListener('keyup', function(event) {
      pressed.delete(event.code);
    });

    localStorage.setItem("process",tasksProcess.innerHTML);
    localStorage.setItem("completed",tasksCompleted.innerHTML);
    localStorage.setItem("canceled", tasksCanceled.innerHTML);
  }

runOnKeys(
    addTaskHandler,
    "ControlLeft",
    "Enter"
);

function localParsing() {
    let processLocal = localStorage.getItem("process");
    let completedLocal = localStorage.getItem("completed");
    let canceledLocal = localStorage.getItem("canceled");
    tasksProcess.innerHTML = processLocal;
    tasksCompleted.innerHTML = completedLocal;
    tasksCanceled.innerHTML = canceledLocal;
}
updater()

