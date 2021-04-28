// Select the Element
const clear=document.querySelector(".clear");
const dateElement=document.getElementById("date");
const list=document.getElementById("list");
const input=document.getElementryById("input");
//classes names
const CHECK="fa-check-circle";
const UNCHECK="fa-circle-thin";
const LINE_THROUGH="lineThrough";
// variables
let LIST, id;
// get item from localstorage
let data=localstorage.getItem("TODO");
// check if data is not empty
if(data){
  LIST=JSON.parse(data);
  id=LIST.length;// set the id to the last one in the list
  loadList(LIST);// load the list to the user interface
} else{
  //if data isn't empty
  LIST=[];
  id=0;
}
// load items to the user's interface
function loadList(array){
  array.forEach(function(item){
    addToDo(item.name,item.id,item.done,item.trash);
  })
}
// clear the  localstorage
clear.addEventListener("click",function(){
  localstorage.clear();
  location.reload();
})
// add item to localstorage
localstorage.setItem("TODO",JSON.stringify(LIST));
// show todays dateElement
const options={weekday : "long", month:"short",day:"numeric"};
const today=new Date();
dataElement.innerHTML=today.toLocaleDateString("en-us",options);
//add todo function
function addToDo(toDo,id,done,trash){
  if(trash){ return;}
  const DONE=done? CHECK:UNCHECK;
  const LINE=done? LINE_THROUGH:"";
  const item= '<li class="item">
            <i class="fa fa ${DONE} co" job="complete" id="${id}"></i>
            <p class="text ${LINE}">${toDo}</p>
            <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
            </li>
            ';
            const position="beforeend";
            list.insertAdjacentHTML(position,item);

              }
              // add an item to the list user the enter key
              document.addEventListener("keyup",function(even){
                if(event.keycode==13){
                  const toDo=input.value;
                  // if the input isn't empty
                  if(toDo){
                    addToDo(toDo,id,false,false);
                    LIST.push({
                      name:toDo,
                      id:id,
                      done:false,
                      trash:false
                    });
                    id++;

                  }
                  input.value="";
                }
              });
              // add item to localstorage
              localstorage.setItem("TODO",JSON.stringify(LIST));
              // complete todo
              function completeToDo(element){
                element.classList.toggle(CHECK);
                element.classList.toggle(UNCHECK);
                element.parentNode.querySelector(".text").claddList.toggle(LINE_THROUGH);
                LIST[element.id].done=LIST[element.id].done? false:true;
              }
              // remove todo
              function removeToDo(element){
                element.parentNode.removeChild(element.parentNode);
                LIST[element.id].trash=true;
              }
              // target the items created dynamically
              list.addEventListener("click",function(event){
                const element=event.target;
                const elementjob=element.attributes.job.value;
                if(elementjob == "complete"){
                  completeToDo(element);
                }else if(elementjob == "delete"){
                  removeToDo(element);
                }
                // add item to localstorage
                localstorage.setItem("TODO",JSON.stringify(LIST));
              });
