let plusbtn=document.querySelector(".plus");
let flag=true;
let deleteflag=false;
let middle=document.querySelector(".middle");
let midleftcont=document.querySelector(".midleft");
let textarea=document.querySelector(".textarea");
let parenttikcont=document.querySelector(".ticketcontainer");
let allprioritycolor=document.querySelectorAll(".colorx");
let ticketcolor="color4";
let deletebtn=document.querySelector(".delete");
let colorarray=['color1','color2','color3','color4'];
var uid = new ShortUniqueId();
let ticketarray=[];

if(localStorage.getItem("tickets")){
    let stringiarray = localStorage.getItem("tickets");
    let array = JSON.parse(stringiarray);
    ticketarray = array;
    for(let i=0 ; i<array.length; i++){
        createticket(array[i].ticketkatask, array[i].ticketkacolor , array[i].ticketkiid);
    }
}
plusbtn.addEventListener("click",function(){
        if(flag==true){
       middle. style.display="none";
       flag=!flag;
    }
    else{
        middle.style.display="flex";
        flag=!flag;
    }
})
midleftcont.addEventListener("keydown",function(e){
    let key=e.key;
    if(key=="Enter"){
        let value=textarea.value;
        if(value!="")
        createticket(value);
        middle.style.display="none";
        flag=!flag;
       textarea.value="";
    }
})
deletebtn.addEventListener("click",function(){
    deleteflag=!deleteflag;
    if(deleteflag)
    deletebtn.style.color="red";
      else{
          deletebtn.style.color="black";
      }
})
function createticket(value,color,id){
    let ticket=document.createElement("div");
    ticket.setAttribute('class','ticket');
    let idkyah;
    let colorkyah;
    let task;
    if(color==undefined && id==undefined){
        idkyah =uid();
        colorkyah = ticketcolor;
        task = value;
    }
    else{
        task =  value;  
        idkyah = id;
        colorkyah = color;
    }
    ticket.innerHTML=  `<div class="tikcolor ${colorkyah}"></div>
                       <div class="tikid"><span class="uid">${idkyah}</span></div>
                       <div class="tiktask"><span class="mytask">${task}</span></div>
                       <div class="lock"><i class="fa fa-lock"></i></div>`
    parenttikcont.appendChild(ticket);                   
    //push in ticket array
    if(color== undefined && id==undefined){
        ticketarray.push({"ticketkatask":value ,"ticketkacolor":ticketcolor , "ticketkiid":idkyah  });
        pushtolocal(ticketarray);
    }
    
    // forming ticket using array
        
    
    console.log(ticketarray.length);
    //delete functionality using flag
    ticket.addEventListener("click",function(){
        if(deleteflag){
            ticket.remove();
            let idx = getticketindex(idkyah);
            ticketarray.splice(idx,1);
            pushtolocal();
        }
        
    })
    let tikcolordiv=ticket.querySelector(".tikcolor");
    tikcolordiv.addEventListener("click",function(){
        
        // let idofthisticketdiv= ticket.querySelector(".uid");
        // let presentid = idofthisticketdiv.textContent;
        // console.log(presentid);
        let currentcolor=tikcolordiv.classList[1];
        let coloridx;
        for(let i=0; i<colorarray.length; i++ ){
            if(colorarray[i]==currentcolor){
                coloridx=i;
                break;
            }
        }
        let nextcoloridx = (coloridx + 1)%colorarray.length;
        let nextcoloris =colorarray[nextcoloridx];
        tikcolordiv.classList.remove(currentcolor);
        tikcolordiv.classList.add(nextcoloris);
        let idx = getticketindex(idkyah);
        ticketarray[idx].ticketkacolor=nextcoloris;
        pushtolocal();

    })
    let tiktaskdiv = ticket.querySelector(".tiktask");
    let lockdiv= ticket.querySelector(".lock");
    let lockunlockicon = lockdiv.querySelector(".fa");
    lockunlockicon.addEventListener("click",function(){
         if(lockunlockicon.classList[1]=="fa-lock"){
             lockunlockicon.classList.remove("fa-lock");
             lockunlockicon.classList.add("fa-unlock");
             tiktaskdiv.setAttribute("contenteditable","true");
         }
         else{
            lockunlockicon.classList.remove("fa-unlock");
            lockunlockicon.classList.add("fa-lock");
            tiktaskdiv.setAttribute("contenteditable","false");
         }
         // task update in ticketarray
         let idx = getticketindex(idkyah);
         let newtaskspan = ticket.querySelector(".mytask");
         let newtasktext = newtaskspan.textContent;
         ticketarray[idx].ticketkatask=newtasktext;
         pushtolocal();
    })
                 
}
// for(let i=0 ; i<ticketarray.length; i++){
//     createticket(ticketarray[i].ticketkatask , ticketarray[i].ticketkacolor , ticketarray[i].ticketkiid  );
//  } 


console.log(allprioritycolor.length);
for(let i=0 ; i<allprioritycolor.length; i++){
    allprioritycolor[i].addEventListener("click",function(){
        for(let j=0; j<allprioritycolor.length; j++){
            allprioritycolor[j].classList.remove("selected");
            
        }
        allprioritycolor[i].classList.add("selected");
        ticketcolor=allprioritycolor[i].classList[1];
        
    })
}
alltopcolors = document.querySelectorAll(".topcolor");
for(let i=0; i<alltopcolors.length; i++){
    alltopcolors[i].addEventListener("click",function(){
        let selectedtopcolor = alltopcolors[i].classList[0];
        console.log(selectedtopcolor);
        let filterarray=[];
        for(let j=0; j<ticketarray.length; j++){
            if(ticketarray[j].ticketkacolor==selectedtopcolor){
                filterarray.push(ticketarray[j]);
            }
        }
       let alltickets = document.querySelectorAll(".ticket");
       for(let k=0; k<alltickets.length; k++){
           alltickets[k].remove();
       }
        for(let k=0; k<filterarray.length; k++){
           createticket(filterarray[k].ticketkatask,filterarray[k].ticketkacolor,filterarray[k].ticketkiid);
       }
    })
    alltopcolors[i].addEventListener("dblclick",function(){
        let alltickets = document.querySelectorAll(".ticket");
        for(let k=0; k<alltickets.length; k++){
            alltickets[k].remove();
        }
        for(let k=0; k<ticketarray.length; k++){
            createticket(ticketarray[k].ticketkatask,ticketarray[k].ticketkacolor,ticketarray[k].ticketkiid);
        }
    })
}
function getticketindex(idkyah){
    for(let i=0; i<ticketarray.length; i++){
        if(ticketarray[i].ticketkiid==idkyah){
            return i;
        }
    }
}
// function to push in local storage

function pushtolocal(){
       let stringigyarr = JSON.stringify(ticketarray);
       localStorage.setItem("tickets", stringigyarr);
}

// alltopcolors = document.querySelectorAll(".topcolor");
// for(let i=0; i<alltopcolors.length; i++){
//     alltopcolors[i].addEventListener("click",function(){
//         let choosencolor= alltopcolors[i].classList[0];
        
//     })
// }
// alltopcolors=document.querySelectorAll(".topcolor");
// for(let i=0; i<alltopcolors.length; i++){
//     alltopcolors[i].addEventListener("click",function(){
//         allticketdiv=document.querySelectorAll(".ticket");
//         for(let j=0; j<allticketdiv.length; j++){
//             let onetikcolor=allticketdiv[j].querySelector(".tikcolor");
//             let presenttopcolor=alltopcolors[i].classList[0];
//             if(!onetikcolor.classList.contains(presenttopcolor)){
//                allticketdiv[j].style.display="none"; 
//             }
//             else{
//                 allticketdiv[j].style.display="";
//             }
//         }
//     })
// }