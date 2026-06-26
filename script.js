document.addEventListener('DOMContentLoaded',()=>{   // phele to doom hi load kregaa
    // ## STEP 1..
    const todoInput =document.getElementById("todo-input");
    const addtaskbutton =document.getElementById("add-task-btn");
    const todolist= document.getElementById("todo-list");


// ## STEP 6..// 
// Refresh ke baad JavaScript ki saari variables delete ho jaati hain.  isliye local storage se render karate hai 
let tasks=JSON.parse(localStorage.getItem('tasks')) || [];  // JSON.parse means from the local storage string display data into original structure..
                                                    // localStorage.getItem('tasks')  beacsue ya to getitem dedo jo bhi hai array me ya fir empty array hi dedo dono k leye true ho

// ## STEP 7..//                                        
// now loop to get out the tasks...
tasks.forEach((task) => rendertask(task));


 // ## STEP 2..
addtaskbutton.addEventListener('click', ()=>{
   const tasttext= todoInput.value.trim();
    if(tasttext==="") return;

    const newTask={
        id:Date.now(),
        text:tasttext,
        completed:false
    }
    tasks.push(newTask);
    // ## STEP 4..// 
     savetasks();      //for saving tasks in local storage   // call it and save in the form of string
    rendertask(newTask);
    todoInput.value=""  //clear input where user write
    console.log(tasks);
    
});
// ## STEP 3..//
// now save to local storage.. 
function savetasks(){
    localStorage.setItem("tasks" , JSON.stringify(tasks))  //in foorm of JSOn
}

// ## STEP 5..//
// *** Use of Render = NOW Read from save local storage and will print in html....

function rendertask(task){
    // what we have to do now ....Read from to the local storage grab all the Task and saved it into array then loop read all atsk inside loop and display

        // STEP : 8......{create the li for tasks}
    const li=document.createElement('li');
    li.setAttribute("data-id" , task.id);   //har li ko ek taskid deti hai unique..
    li.innerHTML=`
    <span>${task.text}</span>
    <button class="delete-btn" >Delete</button>
    `;
    
      //   STEP : 10 ....{agar task completed hai to add class (css) and it after click }
    if(task.completed) li.classList.add("completed");
    
        //   STEP : 9 ....{task par click krte hi use true bna do but delete button par kuch mat kroo}
   li.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') return;
    task.completed = !task.completed;  // when user click on task it converts ...hamne phele false leya tha to ab ye true kr dega
    li.classList.toggle("completed");
    savetasks();              
});
todolist.appendChild(li);

//  STEP NO: 11...........
// FOr DELETE the li .....

li.querySelector('button').addEventListener('click' ,(e)=>{
    e.stopPropagation()   //prevent toggle firing
    tasks=tasks.filter((t)=>t.id !==task.id);
    li.remove();
    savetasks();
})

}
});
