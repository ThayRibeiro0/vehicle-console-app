// Importing Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

// TODO: The Truck class should extend the Vehicle class and should implement the AbleToTow interface
class Truck extends Vehicle implements AbleToTow {
  getVin() {
    return this.vin;
  }
  // TODO: Declare properties of the Truck class
  name: string;
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];
  towingCapacity: number;

  // TODO: Create a constructor that accepts the properties of the Truck class
  constructor(
    name: string,
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[],
    towingCapacity: number
  ) {
    // TODO: The constructor should call the constructor of the parent class, Vehicle
    super();

    // TODO: The constructor should initialize the properties of the Truck class
    this.name = name;
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.towingCapacity = towingCapacity;
    
    // TODO: The constructor should check if the wheels array has 4 elements and create 4 new default Wheel objects if it does not
    this.wheels = wheels.length === 4 ? wheels : [new Wheel(20, 'DefaultBrand'), new Wheel(20, 'DefaultBrand'), new Wheel(20, 'DefaultBrand'), new Wheel(20, 'DefaultBrand')];
  }

  // TODO: Implement the tow method from the AbleToTow interface
  tow(vehicle: Truck | Motorbike | Car): void {
    // TODO: Get the make and model of the vehicle if it exists
    const vehicleInfo = `${vehicle.make} ${vehicle.model}`;
    
    // TODO: Check if the vehicle's weight is less than or equal to the truck's towing capacity
    if (vehicle.weight <= this.towingCapacity) {
      console.log(`${vehicleInfo} is being towed by the ${this.make} ${this.model}.`);
    } else {
      console.log(`${vehicleInfo} is too heavy to be towed by the ${this.make} ${this.model}.`);
    }
  }

  // TODO: Override the printDetails method from the Vehicle class
  override printDetails(): void {
    // TODO: The method should call the printDetails method of the parent class
    super.printDetails();

    // TODO: The method should log the details of the Truck
    console.log(`Towing Capacity: ${this.towingCapacity} lbs`);

    // Print details of the wheels
    this.wheels.forEach((wheel, index) => {
      console.log(`Wheel ${index + 1}: ${wheel.getDiameter} inch with a ${wheel.getTireBrand} tire`);
    });
  }
}

// Export the Truck class as the default export
export default Truck;
