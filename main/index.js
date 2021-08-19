    
    const billAmount = document.querySelector("#bill-amount");
    const cashgiven = document.querySelector("#cash-given");
    const cashGivenDiv = document.querySelector(".cash-given-div");
    const changeReturnDiv = document.querySelector(".return-change")
    const outputTable = document.querySelector(".output-table")
    const nextbtn = document.querySelector(".btn-next");
    const checkbtn = document.querySelector(".btn-check");
    const tables = document.querySelector("table");
    const errorMessage = document.querySelector(".error-message");
    const noofNotes = document.querySelectorAll(".no-of-notes");

    const availableNotes = [2000,500,200,100,20,5,1];

    nextbtn.addEventListener("click", hideMessage(), nextbtnHandler());
    function nextbtnHandler(){
        if(Number(billAmount.value)>0){
            nextbtn.style.display="none";
            cashGivenDiv.style.display="block";

        }else{
            showErrorMessage("Enter Valid Bill Amount");
        }    
    }

    checkbtn.addEventListener("click", () => validateBillandCashAmnt(), clearNotes(), hideMessage());

    function validateBillandCashAmnt(){
        hideMessage();
        if(billAmount.value>0 && cashgiven.value>0){

            if(!Number.isInteger(cashgiven.value)){
                showErrorMessage("Enter a number/Integer in Cash Give field")
            }
            if(cashgiven.value>billAmount.value){
                const amountToReturn = cashgiven.value - billAmount.value;
                calculateChange(amountToReturn);
            }else if(billAmount.value===cashgiven.value){
                showErrorMessage("No Amount to be returned");
            }
            else{
                showErrorMessage("Cash is less than bill, please enter right amount")
            }
        }else{
            showErrorMessage("Enter valid bill amount and Cash Given to Continue");
        }
    }

    function calculateChange(amountToReturn){
        changeReturnDiv.style.display="block";
        for(let i = 0;i<availableNotes.length;i++){
            const numofNotes = Math.trunc(amountToReturn / availableNotes[i]);
            amountToReturn = amountToReturn % availableNotes[i];
            if(numofNotes>=1){
                noofNotes[i].innerText = numofNotes;
            }
        }

    }

    function hideMessage(){
        errorMessage.style.display="none";
    }
    function showErrorMessage(tempMsg){
        errorMessage.style.display="block";
        errorMessage.innerText = tempMsg;
        changeReturnDiv.style.display="none";
    }

    function clearNotes(){
        for(let nnotes of noofNotes){
            nnotes.innerText = "";
        }
    }


    