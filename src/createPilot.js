/**
 * Create a pilot system to take action over the airplane for the current
 * simulator state.
 * @param  {Object} settings
 * @param  {Object} settings.accelerate - The acceleration it will take when
 * speeding up or down is needed.
 * @param  {Object} settings.tilt - The tilt the airplane will take when
 * ascending or descending is needed.
 * @return {Function} - The pilot system. It will receive the simulator ref.
 */

const createPilot = settings => {
  return simulator => {
    const { tilt, accelerate } = settings;
    const { airplane, landing } = simulator;

    // Landing System

    const distanceToLanding = landing.x - airplane.x;
    const isAbove = airplane.y > 0;
    const isMoving = airplane.speed >= 1;
    const isTooHigh = airplane.y >= 290
    airplane.landing = isTooHigh ? true: airplane.landing;

    if (distanceToLanding <= 0 && airplane.landing) {
      airplane.inclination = isAbove ? -tilt : 0;
      airplane.acceleration = isMoving ? -accelerate : 0;
      airplane.landing = !isMoving ? false : true;
      console.log(airplane.landing);
    } else{

    }
    if (!airplane.landing ) {
      airplane.inclination = airplane.speed > 500 ? tilt : 0;
      airplane.acceleration = !isTooHigh && airplane.fuel > 0 ? accelerate*1.1 : 0;      
    }
  };
};

module.exports = { createPilot };
