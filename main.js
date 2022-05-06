const input = require('sync-input');

const coffeeMachine = {
    water: 700,
    milk: 540,
    beans: 120,
    disCups: 9,
    doubleDisCups: 5,
    money: 550
}

const espresso = {
    water: 250,
    milk: 0,
    beans: 16,
    money: 4
}

const latte = {
    water: 350,
    milk: 75,
    beans: 20,
    money: 7
}

const cappuccino = {
    water: 20,
    milk: 100,
    beans: 12,
    money: 6
}

let coffeeType = [0, espresso, latte, cappuccino];
let error;

function makeCoffee(type, portion) {

    Object.entries(coffeeMachine).forEach(([key, value]) => {
        if (key !== "money") {
            if (value < coffeeType[type][key] * portion) {
                error = 1;
                console.log(`Sorry, not enough ${key}!`);
            }
        }
    });
    if (!error) {
        console.log("I have enough resources, making you a coffee!");
        coffeeMachine.water -= coffeeType[type].water * portion;
        coffeeMachine.milk -= coffeeType[type].milk * portion;
        coffeeMachine.beans -= coffeeType[type].beans * portion;
        if (portion === 1) {
            coffeeMachine.disCups -= 1;
        } else {
            coffeeMachine.doubleDisCups -= 1;
        }
        coffeeMachine.money += coffeeType[type].money * portion;
    } else {
        error = 0;
    }
}

function coffeeMachineStatus() {

    console.log(`${coffeeMachine.water} ml of water`);
    console.log(`${coffeeMachine.milk} ml of milk`);
    console.log(`${coffeeMachine.beans} g of coffee beans`);
    console.log(`${coffeeMachine.disCups} disposable cups`);
    console.log(`${coffeeMachine.doubleDisCups} big disposable cups`);
    console.log(`$${coffeeMachine.money} of money`);

}

function chooseAction() {
    console.log("Write action (buy, fill, take, remaining, exit):");
    let choose = input();
    switch (choose) {
        case "buy":
            chooseCoffeeType();
            break;
        case "fill":
            topUp();
            break;
        case "take":
            takingMoney();
            break;
        case "remaining":
            coffeeMachineStatus();
            break;
        case "exit":
            process.exit(1);
            break;
    }

}

function chooseCoffeeType() {
    console.log("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:");
    let type = Number(input());
    console.log("Choose portion: 1 - normal, 2 - double in big disposable cup");
    let portion = Number(input());
    makeCoffee(type, portion);
}

function topUp() {
    console.log("Write how many ml of water you want to add:");
    coffeeMachine.water += Number(input());
    console.log("Write how many ml of milk you want to add:");
    coffeeMachine.milk += Number(input());
    console.log("Write how many grams of coffee beans you want to add:");
    coffeeMachine.beans += Number(input());
    console.log("Write how many disposable coffee cups you want to add:");
    coffeeMachine.disCups += Number(input());
}

function takingMoney() {
    console.log("I gave you " + coffeeMachine.money);
    coffeeMachine.money = 0;
}

while (true) {
    chooseAction();
}