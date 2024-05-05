#! usr/bin/env node

//                                      "ATM MACHINE"
//============================================================================================

import inquirer from "inquirer";                //Import Inquirer 


let myBalance = 50000;                          //initialize myBalance
let myPin = 2468;                               //initialize myPin

let pinAnswer = await inquirer.prompt([         //Get input from user for pin
    {
        name: "pin",
        type: "number",
        message: "Enter your PIN code: ",
    },
]);

if (pinAnswer.pin === myPin) {                  //Apply if condition to check the value of pin
    console.log("\nCorrect PIN Code !!!\n");

    let operationAns = await inquirer.prompt([   //If condition is true than user select one option
        {
            name: "operation",
            message: "Please select option",
            type: "list",
            choices: ["withdraw", "check balance"],
        },
    ]);

    if (operationAns.operation === "withdraw") {        //nested if condition if user press withdraw
        let amountChoices = ["1000", "2000", "5000", "10000", "Enter custom amount"];//Initialize an array
        let amountQuestion = [
            {
                name: "amount",
                message: "Enter your amount or select from the choices:",//select the amount you want to withdraw
                type: "list",
                choices: amountChoices,
            },
        ];

        let amountAns = await inquirer.prompt(amountQuestion);  //amount given by the user

        let withdrawAmount = amountAns.amount;                  //Assign the value of amount to withdrawAmount     
        if (withdrawAmount === "Enter custom amount") {         //nested if to check the condition
            let customAmount = await inquirer.prompt([
                {
                    name: "customAmount",
                    message: "Enter custom amount:",
                    type: "number",
                },
            ]);
            withdrawAmount = customAmount.customAmount;         //assign the value to variable
        } else {
            withdrawAmount = parseInt(withdrawAmount);          // Convert to number
        }

        if (withdrawAmount > myBalance) {                       //check the condition of withdrawAmount
            console.log("Insufficient amount balance.");
        } else {
            myBalance -= withdrawAmount;                         //deduct the value of withdrawAmount from myBalance and assign the new value in myBalance
            console.log(`Withdrawn amount: ${withdrawAmount}`);
            console.log(`Your remaining balance is: ${myBalance}`);
        }
    } else if (operationAns.operation === "check balance") {    //if user pess check balance than print the value of myBalance
        console.log(`Your balance is: ${myBalance}`);
    }
} else {
    console.log("\nIncorrect PIN code\n");
}





