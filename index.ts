import inquirer from "inquirer";
import chalk from "chalk";

const prompt = await inquirer.prompt([
  {
    type: "input",
    name: "dueDate",
    message: "What is the due date? (YYYY-MM-DDTHH:mm:ss)",
  },
]);

const dueDate = new Date(prompt.dueDate); // Convert input to Date object

const countdownTimer = () => {
  const now = new Date();

  if (dueDate <= now) {
    console.log(chalk.red("Invalid due date. Please enter a future date."));
    return;
  }

  const interval = setInterval(() => {
    const difference = dueDate.getTime() - new Date().getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const formattedDifference = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    console.clear();
    console.log(chalk.red("Countdown timer"));
    console.log("");
    console.log(formattedDifference);

    if (difference <= 0) {
      clearInterval(interval);
      console.log(chalk.green("Time's up!"));
    }
  }, 1000);
};

countdownTimer();
