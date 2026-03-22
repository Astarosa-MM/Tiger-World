// App2.jsx
import readline from 'readline';
import { insertCampus } from './services/insertCampusService.js'; // your service

// Create console input interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Simple menu
async function printMenu() {
  console.log('\n=== Campus Diagram Menu ===');
  console.log('1) Insert Campus');
  console.log('0) Exit');

  rl.question('Choose an action: ', async (choice) => {
    switch (choice) {
      case '1':
        await insertCampusPrompt();
        break;
      case '0':
        rl.close();
        return;
      default:
        console.log('Invalid choice.');
    }
    printMenu(); // loop back to menu
  });
}

// Prompt for campus fields
async function insertCampusPrompt() {
  rl.question('Enter campus name: ', async (campus_name) => {
    try {
      const result = await insertCampus({ campus_name });
      console.log('Success:', result.message);
    } catch (err) {
      console.error('Error:', err.message);
    }
    printMenu();
  });
}

// Start
printMenu();