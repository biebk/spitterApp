 //this is the global variable that is needed in one function to hold the percantage value
 var percentageHolder = 0;
 //code for making reset button disabled.
 let resetBtn = document.getElementById("resetBtn");
 if (resetBtn.disabled == true) {
     resetBtn.style.cursor = 'auto';
 }
 //this is the code for removing existing error msg while clicking on percentage
 var inputBtn = document.querySelectorAll("input[type='text']");
 for (let i = 0; i < inputBtn.length; i++) {
     inputBtn[i].addEventListener("click", inputClicked)
 }
 function inputClicked() {
     errorMsg[0].style.display = 'none';
     errorMsg[1].style.display = 'none';
 }

 //getting access to error message array
 var errorMsg = document.querySelectorAll(".errorMsg");
 //getting access to percentage button array
 var percentageBtn = document.querySelectorAll(".inputBox .percentageWrapper > span");
 //adding onclick event to percentage buttons
 for (let i = 0; i < percentageBtn.length; i++) {
     percentageBtn[i].addEventListener('click', percentageClicked);
 }
 function percentageClicked(event) {
     //this attribute remove is used to remove the active id from percentage button
     attributeRemover();
     //this event.target is used to recognize and get the element which triggered that event
     var currentElement = event.target;
     currentElement.setAttribute('id', 'active');
     percentageHolder = currentElement.getAttribute('value');
     let billInput = document.getElementById("billInput").value;
     let personCounter = document.getElementById("peopleCounter").value;
     //incase the user clicks percentage first without event entering the bill amount
     
     
         if (billInput == "") {
         
         console.log(errorMsg[0].innerText);
         errorMsg[0].innerText = "Bill cannot be 0 !";
         errorMsg[0].style.cssText = "display:block; z-index: 3;";
         currentElement.removeAttribute('id');
         console.log(errorMsg[0].innerText);
     }
     else if(personCounter == "") {
         console.log("hi");
         errorMsg[1].style.display= 'block';
         errorMsg[1].innerText="Person cannot be empty !";
     }
     //if the bill is not empty and personCounter is entered succesfully
     else {
         let percent = currentElement.innerText;
         console.log(parseFloat(percent));
         //this function is actually used to create all the calculation and we have passed the percentage to function
         resultGenerator(percent);
     }
     
 }
 //function to remove the attribute
 function attributeRemover() {
     for (let i = 0; i < percentageBtn.length; i++) {
         percentageBtn[i].removeAttribute('id');
     }
 }
 //calculates everything we need to show
 function resultGenerator(percent) {
     let bill = parseFloat(document.getElementById("billInput").value);
     let noOfPerson = parseInt(document.getElementById("peopleCounter").value);
     let percentage = parseFloat(percent);

     const tipAmount = (bill * percentage) / 100;
     const tipPerPerson = tipAmount / noOfPerson;
     const totalPerPerson = (bill + tipAmount) / noOfPerson;
     // console.log(`tipPerPerson ${tipPerPerson} totalPerPerson ${totalPerPerson}`);
     var showTip = document.getElementById("showTip");
     var showTotal = document.getElementById("showTotal");
     showTip.innerText = "$" + tipPerPerson.toFixed(2);
     showTotal.innerText = "$" + totalPerPerson.toFixed(2);
     resetActivator();
     percentageHolder = 0;

 }
 //function to remove the disabled attribute of button
 function resetActivator() {
     resetBtn.disabled = false;
     resetBtn.style.cursor = 'pointer';
     resetBtn.style.backgroundColor = "hsl(185, 41%, 84%)";
 }
 //function to clear everything
 function resetter() {
     let people = document.getElementById("peopleCounter");
     let bill = document.getElementById("billInput");
     let showTip = document.getElementById("showTip");
     let showTotal = document.getElementById("showTotal");
     bill.value = '';
     people.value='';
     showTip.innerText="$0.00";
     showTotal.innerText="$0.00";   
     attributeRemover();  
     customInput.style.display= 'none';
     errorMsgHider();  
     customInput.value='';
     // window.location.reload();     
 }

 function counterAdded() {
     errorMsgHider();
     //accessing the number of people and bill amount
     let people = document.getElementById("peopleCounter").value;
     let bill = document.getElementById("billInput").value;
     let customValue = document.getElementById("counter").value;
     if(customValue){
      resultGenerator(customValue);
    }
  else {
     if(bill==""||bill==0){
     errorMsg[0].style.display = 'block';
     errorMsg[0].innerText = "Bill cannot be empty !";
    }
     else if (people == " "|| people== 0) {
         console.log("I reached in if condition");
         errorMsg[1].style.display = 'block';
         errorMsg[1].innerText = "People cannot be empty !";
     }

     else {
         console.log("i reached in else condition");
         if (percentageHolder == 0) {
             errorMsg[0].style.display = 'block';
             errorMsg[0].innerText = "Select the percentage";
         }
         else {
             resultGenerator(percentageHolder);
             errorMsg[0].style.display = "none";
         }

     }
  }


 }
 function errorMsgHider(){
     for(let i=0;i<errorMsg.length;i++){
         errorMsg[i].style.display= 'none';
         
     }
 }

 //function for custom button
 var custom = document.querySelector(".container .custom");
 var customInput = document.querySelector("#counter");
 console.log(customInput);
 custom.addEventListener('click',showCustomInput);
 customInput.addEventListener('keyup',customAdded);
 function customAdded(event){
     let bill = document.getElementById("billInput").value;
     let people = document.getElementById("peopleCounter").value;

     if(bill==''||bill==0){
         errorMsg[0].style.display = 'block';
     errorMsg[0].innerText = "Bill cannot be empty !";
     }
     else if(people==''||people==0){
         errorMsg[1].style.display = 'block';
         errorMsg[1].innerText = "People cannot be empty !";
     }
     else {
         resultGenerator(event.target.value);
     }
     
 }

 function showCustomInput() {
     let bill = document.getElementById("billInput").value;
    attributeRemover();
    errorMsgHider();
    if(bill==""||bill==0){
     errorMsg[0].style.display = 'block';
     errorMsg[0].innerText = "Bill cannot be empty !";
    }
    else {
     customInput.style.display='block';
    }
     
 }
 //this actually removes the error message while clicked to 
//    document.body.addEventListener('click',errorMsgHider);