import fs from 'fs';
import inquirer from 'inquirer';
import Truck from "./classes/Truck.js";
import Car from "./classes/Car.js";
import Motorbike from "./classes/Motorbike.js";
import Wheel from "./classes/Wheel.js";
import Cli from "./classes/Cli.js";

// Read the existing vehicles from the vehicles.json file
function loadVehicles(): (Truck | Car | Motorbike)[] {
  try {
    const data = fs.readFileSync('vehicles.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.log('No existing vehicles found or error reading the file.');
    return []; // If no file or error, return an empty array
  }
}

// Save the vehicles to the vehicles.json file
function saveVehicles(vehicles: (Truck | Car | Motorbike)[]): void {
  fs.writeFileSync('vehicles.json', JSON.stringify(vehicles, null, 2));
}

// Load the vehicles from the file at the start
const vehicles: (Truck | Car | Motorbike)[] = loadVehicles();
const year: number = 2021;
const towingCapacity: number = 10000;
const wheelType: number = 17; // example wheel type
const wheels: Wheel[] = []; // example wheels array

// Existing vehicles example
const truck1 = new Truck(
  Cli.generateVin() as string, 
  "red",
  "Ford",
  "F-150",
  year.toString(), 
  5000,
  120,
  wheelType,
  wheels,
  towingCapacity
);

const car1 = new Car(
  Cli.generateVin(),
  'blue',
  'Toyota',
  'Camry',
  2021,
  3000,
  130,
  []
);

const motorbike1Wheels = [new Wheel(17, "Michelin"), new Wheel(17, "Michelin")];
const motorbike1 = new Motorbike(Cli.generateVin(), "black", "Harley Davidson", "Sportster", 2021, 500, 125, motorbike1Wheels);

// Push existing vehicles to the array
vehicles.push(truck1);
vehicles.push(car1);
vehicles.push(motorbike1);

// Function to create a new truck
async function createTruck() {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'vin', message: 'Enter VIN:' },
    { type: 'input', name: 'color', message: 'Enter color:' },
    { type: 'input', name: 'make', message: 'Enter make:' },
    { type: 'input', name: 'model', message: 'Enter model:' },
    { type: 'input', name: 'year', message: 'Enter year:' },
    { type: 'input', name: 'weight', message: 'Enter weight:' },
    { type: 'input', name: 'maxSpeed', message: 'Enter max speed:' },
    { type: 'input', name: 'wheelType', message: 'Enter wheel type:' },
    { type: 'input', name: 'towingCapacity', message: 'Enter towing capacity:' },
  ]);

  const newTruck = new Truck(
    answers.vin,
    answers.color,
    answers.make,
    answers.model,
    answers.year,
    parseInt(answers.weight),
    parseInt(answers.maxSpeed),
    parseInt(answers.wheelType),
    [], // Assuming wheels are empty for simplicity
    parseInt(answers.towingCapacity)
  );

  vehicles.push(newTruck);
  saveVehicles(vehicles); // Save the updated vehicles list
  console.log('New truck created and added to the list.');

  // Ask if the user wants to view the newly created vehicle
  const { viewNewVehicle } = await inquirer.prompt({
    type: 'confirm',
    name: 'viewNewVehicle',
    message: 'Do you want to see the details of the newly created truck?',
    default: true,
  });

  if (viewNewVehicle) {
    await vehicleActions(newTruck);
  }
}

// Function to create a new car
async function createCar() {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'vin', message: 'Enter VIN:' },
    { type: 'input', name: 'color', message: 'Enter color:' },
    { type: 'input', name: 'make', message: 'Enter make:' },
    { type: 'input', name: 'model', message: 'Enter model:' },
    { type: 'input', name: 'year', message: 'Enter year:' },
    { type: 'input', name: 'weight', message: 'Enter weight:' },
    { type: 'input', name: 'maxSpeed', message: 'Enter max speed:' },
  ]);

  const newCar = new Car(
    answers.vin,
    answers.color,
    answers.make,
    answers.model,
    parseInt(answers.year),
    parseInt(answers.weight),
    parseInt(answers.maxSpeed),
    [] // Assuming wheels are empty for simplicity
  );

  vehicles.push(newCar);
  saveVehicles(vehicles); // Save the updated vehicles list
  console.log('New car created and added to the list.');

  // Ask if the user wants to view the newly created vehicle
  const { viewNewVehicle } = await inquirer.prompt({
    type: 'confirm',
    name: 'viewNewVehicle',
    message: 'Do you want to see the details of the newly created car?',
    default: true,
  });

  if (viewNewVehicle) {
    await vehicleActions(newCar);
  }
}

// Function to create a new motorbike
async function createMotorbike() {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'vin', message: 'Enter VIN:' },
    { type: 'input', name: 'color', message: 'Enter color:' },
    { type: 'input', name: 'make', message: 'Enter make:' },
    { type: 'input', name: 'model', message: 'Enter model:' },
    { type: 'input', name: 'year', message: 'Enter year:' },
    { type: 'input', name: 'weight', message: 'Enter weight:' },
    { type: 'input', name: 'maxSpeed', message: 'Enter max speed:' },
    { type: 'input', name: 'wheelType', message: 'Enter wheel type:' },
  ]);

  const newMotorbike = new Motorbike(
    answers.vin,
    answers.color,
    answers.make,
    answers.model,
    parseInt(answers.year),
    parseInt(answers.weight),
    parseInt(answers.maxSpeed),
    [new Wheel(parseInt(answers.wheelType), "Michelin"), new Wheel(parseInt(answers.wheelType), "Michelin")] // Example wheels
  );

  vehicles.push(newMotorbike);
  saveVehicles(vehicles); // Save the updated vehicles list
  console.log('New motorbike created and added to the list.');

  // Ask if the user wants to view the newly created vehicle
  const { viewNewVehicle } = await inquirer.prompt({
    type: 'confirm',
    name: 'viewNewVehicle',
    message: 'Do you want to see the details of the newly created motorbike?',
    default: true,
  });

  if (viewNewVehicle) {
    await vehicleActions(newMotorbike);
  }
}

// Function to delete a vehicle
async function deleteVehicle() {
  if (vehicles.length === 0) {
    console.log("No vehicles to delete.");
    return;
  }

  const { vehicleToDelete } = await inquirer.prompt({
    type: 'list',
    name: 'vehicleToDelete',
    message: 'Select a vehicle to delete or Exit:',
    choices: [
      ...vehicles.map((vehicle, index) => `${index + 1}. ${vehicle.constructor.name} - ${vehicle['make']} ${vehicle['model']}`),
      'Exit'
    ],
  });

  if (vehicleToDelete === 'Exit') {
    console.log('Returning to the main menu...');
    return;
  }

  // Get the index of the vehicle to delete
  const vehicleIndex = parseInt(vehicleToDelete.split('.')[0]) - 1;

  // Remove the vehicle from the array
  vehicles.splice(vehicleIndex, 1);

  // Save the updated vehicles array to the file after deletion
  saveVehicles(vehicles);  // Save after deletion

  console.log("Vehicle has been deleted.");
}


// Vehicle actions function
async function vehicleActions(vehicle: Truck | Car | Motorbike) {
  let vehicleActionRunning = true;

  while (vehicleActionRunning) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'Select an action for the selected vehicle:',
      choices: [
        'Start vehicle',
        'Accelerate 5 MPH',
        'Decelerate 5 MPH',
        'Turn left',
        'Turn right',
        'Stop vehicle',
        'Reverse vehicle',
        'Print details',
        'Exit',
      ],
    });

    // Execute the action
    switch (action) {
      case 'Start vehicle':
        vehicle.start();
        break;
      case 'Accelerate 5 MPH':
        vehicle.accelerate(5);
        break;
      case 'Decelerate 5 MPH':
        vehicle.decelerate(5);
        break;
      case 'Turn left':
        vehicle.turn('left');
        break;
      case 'Turn right':
        vehicle.turn('right');
        break;
      case 'Stop vehicle':
        vehicle.stop();
        break;
      case 'Reverse vehicle':
        vehicle.reverse();
        break;
      case 'Print details':
        vehicle.printDetails();
        break;
      case 'Exit':
        vehicleActionRunning = false;
        break;
      default:
        console.log('Invalid action!');
        break;
    }
  }
}

// Main menu function
async function menu(): Promise<void> {
  let continueRunning = true;
  let selectedVehicle: Truck | Car | Motorbike | null = null;

  while (continueRunning) {
    const { vehicleAction } = await inquirer.prompt({
      type: 'list',
      name: 'vehicleAction',
      message: 'Select an action:',
      choices: [
        'Select existing vehicle',
        'Create new vehicle',
        'Delete vehicle',
        'Exit',
      ],
    });

    if (vehicleAction === 'Select existing vehicle') {
      const { vehicleChoice } = await inquirer.prompt({
        type: 'list',
        name: 'vehicleChoice',
        message: 'Select a vehicle:',
        choices: vehicles.map((vehicle, index) => `${index + 1}. ${vehicle.constructor.name} - ${vehicle['make']} ${vehicle['model']}`),
      });

      const vehicleIndex = parseInt(vehicleChoice.split('.')[0]) - 1;
      selectedVehicle = vehicles[vehicleIndex];
    }

    if (vehicleAction === 'Create new vehicle') {
      const { vehicleType } = await inquirer.prompt({
        type: 'list',
        name: 'vehicleType',
        message: 'What type of vehicle would you like to create?',
        choices: [
          'Truck',
          'Car',
          'Motorbike',
        ],
      });

      if (vehicleType === 'Truck') await createTruck();
      else if (vehicleType === 'Car') await createCar();
      else if (vehicleType === 'Motorbike') await createMotorbike();
    }

    if (vehicleAction === 'Delete vehicle') {
      await deleteVehicle();
    }

    if (selectedVehicle) {
      await vehicleActions(selectedVehicle);
      selectedVehicle = null;
    }

    if (vehicleAction === 'Exit') {
      continueRunning = false;
      console.log('Exiting...');
    }
  }
}

// Run the menu
menu();
