// import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from "./Vehicle.js";
import Motorbike from "./Motorbike.js";
import Car from "./Car.js";
import Wheel from "./Wheel.js";
import AbleToTow from "../interfaces/AbleToTow.js";

// TODO: The Truck class should extend the Vehicle class and should implement the AbleToTow interface
class Truck extends Vehicle implements AbleToTow {
  canTow: boolean;
  // TODO: Declare properties of the Truck class
  // TODO: The properties should include vin, color, make, model, year, weight, top speed, wheels, and towing capacity
  // TODO: The types should be as follows: vin (string), color (string), make (string), model (string), year (number), weight (number), topSpeed (number), wheels (Wheel[]), towingCapacity (number)
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[] = [];
  towingCapacity: number = 0;

  // TODO: Create a constructor that accepts the properties of the Truck class
  // TODO: The constructor should call the constructor of the parent class, Vehicle
  // TODO: The constructor should initialize the properties of the Truck class
  // TODO: The constructor should check if the wheels array has 4 elements and create 4 new default Wheel objects if it does not
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    towingCapacity: number,
    wheels: Wheel[]
  ) {
    super();
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.wheels = wheels;
    this.canTow = towingCapacity > 0;

    if (wheels.length === 0) {
      this.wheels = [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
    } else {
      this.wheels = wheels;
    }
  }

  // TODO: Implement the tow method from the AbleToTow interface
  tow(vehicle: Truck | Motorbike | Car): void {
    // Check if the vehicle's weight is less than or equal to the truck's towing capacity
    if (vehicle.weight <= this.towingCapacity) {
      console.log(
        `${this.make} ${this.model} is towing ${vehicle.make} ${vehicle.model}.`
      );
    } else {
      console.log(
        `${vehicle.make} ${vehicle.model} is too heavy to be towed by ${this.make} ${this.model}.`
      );
    }
  }

  // TODO: Override the printDetails method from the Vehicle class
  // TODO: The method should call the printDetails method of the parent class
  // TODO: The method should log the details of the Truck
  // TODO: The details should include the VIN, make, model, year, weight, top speed, color, towing capacity, and wheels

  override printDetails(): void {
    super.printDetails();
    console.log(`Truck VIN: ${this.vin}`);
    console.log(`Truck make: ${this.make}`);
    console.log(`Truck model: ${this.model}`);
    console.log(`Truck year: ${this.year}`);
    console.log(`Truck weight: ${this.weight}`);
    console.log(`Truck top speed: ${this.topSpeed}`);
    console.log(`Truck color: ${this.color}`);
    console.log(`Truck towing capacity: ${this.towingCapacity}`);
    console.log(`Truck wheels:`);
    for (let i = 0; i < this.wheels.length; i++) {
      console.log(`Wheel ${i + 1}: ${this.wheels[i].brand}`);
    }
  }
}

// Export the Truck class as the default export
export default Truck;
