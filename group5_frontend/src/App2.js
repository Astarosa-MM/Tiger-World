// App2.js
import readline from 'readline';
import { insertCampus } from './services/campusInsertService.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Main menu
function printMenu() {
  console.log('\n=== Campus Diagram Menu ===');
  console.log('1) Insert Campus');
  console.log('0) Exit');

  rl.question('Choose an action: ', async (choice) => {
    if (choice === '1') {
      await insertCampusPrompt();
    } else if (choice === '0') {
      rl.close();
      return;
    } else {
      console.log('Invalid choice.');
    }

    // Only loop here
    printMenu();
  });
}

// Insert Campus prompt
function insertCampusPrompt() {
  return new Promise((resolve) => {
    rl.question('Enter campus name: ', async (campus_name) => {
      try {
        const result = await insertCampus({
          campus_name,
          campus_status: 'AVAILABLE'
        });

        console.log('Success:', result.message);
      } catch (err) {
        console.error('Error:', err.response?.data?.error || err.message);
      }

      resolve();
    });
  });
}

// Start menu
printMenu();