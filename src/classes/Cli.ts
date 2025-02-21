// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";
import AbleToTow from "../interfaces/AbleToTow.js";
import Vehicle from "./Vehicle.js";
import fs from "fs";

// define the Cli class
class Cli {
  // TODO: update the vehicles property to accept Truck and Motorbike objects as well
  vehicles: (Car | Truck | Motorbike)[];
  // TODO: You will need to use the Union operator to define additional types for the array
  selectedVehicleVin: string | undefined = undefined;
  exit: boolean = false;
  // TODO: See the AbleToTow interface for an example of how to use the Union operator
  canVehicleTow(vehicle: Truck): boolean {
    if ("canTow" in vehicle) {
      return (vehicle as AbleToTow).canTow;
    }
    return false;
  }

  // TODO: Update the constructor to accept Truck and Motorbike objects as well
  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on",
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {
        // set the selectedVehicleVin to the vin of the selected vehicle
        this.selectedVehicleVin = answers.selectedVehicleVin;
        // perform actions on the selected vehicle
        this.performActions();
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "Select a vehicle type",
          // TODO: Update the choices array to include Truck and Motorbike
          choices: ["Car", "Truck", "Motorbike"],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === "Car") {
          // create a car
          this.createCar();
        }
        // TODO: add statements to create a truck or motorbike if the user selects the respective vehicle type
        else if (answers.vehicleType === "Truck") {
          this.createTruck();
        } else if (answers.vehicleType === "Motorbike") {
          this.createMotorbike();
        }
      });
  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        {
          type: "input",
          name: "color",
          message: "Enter Color",
        },
        {
          type: "input",
          name: "make",
          message: "Enter Make",
        },
        {
          type: "input",
          name: "model",
          message: "Enter Model",
        },
        {
          type: "input",
          name: "year",
          message: "Enter Year",
        },
        {
          type: "input",
          name: "weight",
          message: "Enter Weight",
        },
        {
          type: "input",
          name: "topSpeed",
          message: "Enter Top Speed",
        },
      ])
      .then((answers) => {
        const car = new Car(
          // TODO: The generateVin method is static and should be called using the class name Cli, make sure to use Cli.generateVin() for creating a truck and motorbike as well!
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        // push the car to the vehicles array
        this.vehicles.push(car);
        // set the selectedVehicleVin to the vin of the car
        this.selectedVehicleVin = car.vin;
        this.saveVehiclesToFile();
        console.log("Updated vehicles file.", car);
        // perform actions on the car
        this.performActions();
      });
  }

  // method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        {
          type: "input",
          name: "color",
          message: "Enter Color",
        },
        {
          type: "input",
          name: "make",
          message: "Enter Make",
        },
        {
          type: "input",
          name: "model",
          message: "Enter Model",
        },
        {
          type: "input",
          name: "year",
          message: "Enter Year",
        },
        {
          type: "input",
          name: "weight",
          message: "Enter Weight",
        },
        {
          type: "input",
          name: "topSpeed",
          message: "Enter Top Speed",
        },
        {
          type: "input",
          name: "towingCapacity",
          message: "Enter Towing Capacity",
        },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          parseInt(answers.towingCapacity),
          []
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.saveVehiclesToFile();
        console.log("Updated vehicles file.", this.vehicles);
        this.performActions();
      });
  }

  // method to create a motorbike
  // TODO: Use the answers object to pass the required properties to the Motorbike constructor
  // TODO: push the motorbike to the vehicles array
  // TODO: set the selectedVehicleVin to the vin of the motorbike
  // TODO: perform actions on the motorbike

  // TODO: The generateVin method is static and should be called using the class name Cli, make sure to use Cli.generateVin() for creating a truck and motorbike as well!

  // push the motorbike to the vehicles array
  // set the selectedVehicleVin to the vin of the motorbike
  // perform actions on the motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        {
          type: "input",
          name: "color",
          message: "Enter Color",
        },
        {
          type: "input",
          name: "make",
          message: "Enter Make",
        },
        {
          type: "input",
          name: "model",
          message: "Enter Model",
        },
        {
          type: "input",
          name: "year",
          message: "Enter Year",
        },
        {
          type: "input",
          name: "weight",
          message: "Enter Weight",
        },
        {
          type: "input",
          name: "topSpeed",
          message: "Enter Top Speed",
        },
        {
          type: "input",
          name: "frontWheelDiameter",
          message: "Enter Front Wheel Diameter",
        },
        {
          type: "input",
          name: "frontWheelBrand",
          message: "Enter Front Wheel Brand",
        },
        {
          type: "input",
          name: "rearWheelDiameter",
          message: "Enter Rear Wheel Diameter",
        },
        {
          type: "input",
          name: "rearWheelBrand",
          message: "Enter Rear Wheel Brand",
        },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.saveVehiclesToFile();
        console.log("Updated vehicles file.", this.vehicles);
        this.performActions();
      });
  }

  // method to find a vehicle to tow
  // TODO: add a parameter to accept a truck object
  findVehicleToTow(truck: Truck): void {
    const towableVehicles = this.vehicles.filter(
      (vehicle) => vehicle.vin !== this.selectedVehicleVin
    );

    if (towableVehicles.length === 0) {
      console.log("Available vehicles to be tow.", towableVehicles);
      this.performActions();
      return;
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleToTow",
          message: "Select a vehicle to tow",
          choices: towableVehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {
        const vehicleToTow = this.vehicles.find(
          (vehicle) => vehicle.vin === answers.vehicleToTow
        );

        if (vehicleToTow && vehicleToTow instanceof Vehicle) {
          // Only attempt to tow if the vehicle is valid
          truck.tow(vehicleToTow);
          console.log(`Towing ${vehicleToTow.make} ${vehicleToTow.model}.`);
          this.performActions();
        } else {
          console.log("Invalid vehicle selection.");
          this.performActions();
        }
      })
      .catch((error) => {
        console.error("Error finding vehicle to tow:", error);
        this.performActions();
      });
  }

  // method to perform actions on a vehicle
  performActions(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Select an action",
          // TODO: add options to tow and wheelie
          choices: [
            "Print details",
            "Start vehicle",
            "Accelerate 5 MPH",
            "Decelerate 5 MPH",
            "Stop vehicle",
            "Turn right",
            "Turn left",
            "Reverse",
            "Tow",
            "Wheelie",
            "Select or create another vehicle",
            "Exit",
          ],
        },
      ])
      .then((answers) => {
        // perform the selected action
        if (answers.action === "Print details") {
          // find the selected vehicle and print its details
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].printDetails();
            }
          }
        } else if (answers.action === "Start vehicle") {
          // find the selected vehicle and start it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].start();
            }
          }
        } else if (answers.action === "Accelerate 5 MPH") {
          // find the selected vehicle and accelerate it by 5 MPH
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].accelerate(5);
            }
          }
        } else if (answers.action === "Decelerate 5 MPH") {
          // find the selected vehicle and decelerate it by 5 MPH
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].decelerate(5);
            }
          }
        } else if (answers.action === "Stop vehicle") {
          // find the selected vehicle and stop it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].stop();
            }
          }
        } else if (answers.action === "Turn right") {
          // find the selected vehicle and turn it right
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].turn("right");
            }
          }
        } else if (answers.action === "Turn left") {
          // find the selected vehicle and turn it left
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].turn("left");
            }
          }
        } else if (answers.action === "Reverse") {
          // find the selected vehicle and reverse it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].reverse();
            }
          }
        }
        // TODO: add statements to perform the tow action only if the selected vehicle is a truck. Call the findVehicleToTow method to find a vehicle to tow and pass the selected truck as an argument. After calling the findVehicleToTow method, you will need to return to avoid instantly calling the performActions method again since findVehicleToTow is asynchronous.
        // TODO: add statements to perform the wheelie action only if the selected vehicle is a motorbike
        else if (answers.action === "Tow") {
          // Find the selected vehicle by VIN
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              // Ensure the vehicle is a truck
              if (this.vehicles[i] instanceof Truck) {
                // Call the tow method only if it's a Truck
                this.findVehicleToTow(this.vehicles[i] as Truck);
                return; // Exit after finding the vehicle to tow
              } else {
                console.log("Only trucks can tow vehicles.");
                this.performActions(); // Prompt for more actions
                return; // Exit to prevent further actions if it's not a truck
              }
            }
          }
          console.log("No vehicle selected.");
        } else if (answers.action === "Wheelie") {
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              // Check if the selected vehicle is a motorbike
              if (this.vehicles[i] instanceof Motorbike) {
                (this.vehicles[i] as Motorbike).wheelie(
                  this.vehicles[i] as Motorbike
                );
                this.performActions();
                return; // Exit after performing the wheelie action
              } else {
                console.log("Only motorbikes can perform a wheelie.");
                this.performActions();
                return; // Exit to prevent further actions if it's not a motorbike
              }
            }
          }
          console.log("No vehicle selected.");
        } else if (answers.action === "Select or create another vehicle") {
          // start the cli to return to the initial prompt if the user wants to select or create another vehicle
          this.startCli();
          return;
        } else {
          // exit the cli if the user selects exit
          this.exit = true;
        }
        if (!this.exit) {
          // if the user does not want to exit, perform actions on the selected vehicle
          this.performActions();
        }
      });
  }

  saveVehiclesToFile(): void {
    fs.writeFileSync("vehicles.json", JSON.stringify(this.vehicles, null, 2));
  }

  loadVehiclesFromFile(): void {
    if (fs.existsSync("vehicles.json")) {
      const data = fs.readFileSync("vehicles.json", "utf-8");
      const parsedVehicles = JSON.parse(data);

      // Reconstruct instances of the correct classes
      this.vehicles = parsedVehicles.map((vehicle: any) => {
        if (vehicle.towingCapacity !== undefined) {
          return new Truck(
            vehicle.vin,
            vehicle.color,
            vehicle.make,
            vehicle.model,
            vehicle.year,
            vehicle.weight,
            vehicle.topSpeed,
            vehicle.towingCapacity,
            vehicle.wheels
          );
        } else if (vehicle.wheels.length > 0) {
          return new Motorbike(
            vehicle.vin,
            vehicle.color,
            vehicle.make,
            vehicle.model,
            vehicle.year,
            vehicle.weight,
            vehicle.topSpeed,
            vehicle.wheels
          );
        } else {
          return new Car(
            vehicle.vin,
            vehicle.color,
            vehicle.make,
            vehicle.model,
            vehicle.year,
            vehicle.weight,
            vehicle.topSpeed,
            vehicle.wheels
          );
        }
      });
    }
  }

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "CreateOrSelect",
          message:
            "Would you like to create a new vehicle or perform an action on an existing vehicle?",
          choices: ["Create a new vehicle", "Select an existing vehicle"],
        },
      ])
      .then((answers) => {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if (answers.CreateOrSelect === "Create a new vehicle") {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// export the Cli class
export default Cli;
