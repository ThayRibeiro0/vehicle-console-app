// import Driveable interface
import Driveable from '../interfaces/Driveable.js';


// Vehicle class that implements Driveable interface
class Vehicle implements Driveable {
  // Declare properties of the Vehicle class
  started: boolean = false;
  currentSpeed: number = 0; // Initialize currentSpeed to 0

  // Constructor for the Vehicle class
  constructor() {
    this.started = false;
    this.currentSpeed = 0;
  }

  // Method to print vehicle details
  printDetails(): void {
    console.log(`Vehicle started: ${this.started}`);
    console.log(`Vehicle current speed: ${this.currentSpeed} mph`);
  }

  // Method to start the vehicle
  start() {
    this.started = true;
    console.log(`${this.constructor.name} is now started.`);
  }

  // Method to accelerate the vehicle
  accelerate(speed: number): void {
    if (!this.started) {
      console.log('Start the vehicle first');
      return;
    }
    // Increase current speed by the specified amount
    this.currentSpeed += speed;
    console.log(`Accelerating ${this.constructor.name} by ${speed} MPH. Current speed: ${this.currentSpeed} MPH.`);
  }

  // Method to decelerate the vehicle
  decelerate(change: number): void {
    if (!this.started) {
      console.log('Start the vehicle first');
      return;
    }
    // Decrease current speed by the specified amount but ensure it doesn't go below 0
    this.currentSpeed = Math.max(0, this.currentSpeed - change);
    console.log(`Vehicle decelerated to ${this.currentSpeed} mph.`);
  }

  // Method to stop the vehicle
  stop(): void {
    this.currentSpeed = 0;
    this.started = false;
    console.log('Vehicle stopped');
  }

  // Method to turn the vehicle
  turn(direction: string): void {
    if (this.started) {
      console.log(`Vehicle turned ${direction}`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  // Method to reverse the vehicle
  reverse(): void {
    if (this.started) {
      console.log('Vehicle reversed');
    } else {
      console.log('Start the vehicle first');
    }
  }
}

// Export the Vehicle class
export default Vehicle;
