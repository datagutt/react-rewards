import { AnimateFunction } from './helpers.types';

export const animate: AnimateFunction = ({
  root,
  particles,
  decay,
  lifetime,
  updateParticle,
  onFinish,
}) => {
  let startTime: number | null = null;

  const update = (timestamp: number) => {
    if (!startTime) startTime = timestamp;

    // Calculate the progress based on elapsed time
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / lifetime, 1); // Normalize progress to [0, 1]

    // Update each particle based on progress
    particles.forEach((particle) => updateParticle(particle, progress, decay));

    // Continue animation if progress is less than 1
    if (progress < 1) {
      window.requestAnimationFrame(update);
    } else {
      // Cleanup particles after animation is complete
      particles.forEach((particle) => {
        if (particle.element.parentNode === root) {
          root.removeChild(particle.element);
        }
      });
      onFinish();
    }
  };

  window.requestAnimationFrame(update);
};

export const { PI } = Math;

export const degreesToRadians = (degrees: number) => degrees * (PI / 180);

export const getRandomInt = (min: number, max: number) => {
  const minVal = Math.ceil(min);
  const maxVal = Math.floor(max);
  return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
};

export const generatePhysics = (
  angle: number,
  spread: number,
  startVelocity: number,
  differentiator: number
) => {
  const radAngle = degreesToRadians(angle);
  const radSpread = degreesToRadians(spread);
  const { random } = Math;
  return {
    x: 0,
    y: 0,
    z: 0,
    height: 0,
    wobble: random() * 10,
    velocity: startVelocity * 0.5 + random() * startVelocity,
    angle2D: -radAngle + (0.5 * radSpread - random() * radSpread),
    angle3D: -(PI / 4) + random() * (PI / 2),
    tiltAngle: random() * PI,
    differentiator,
  };
};

export const getContainerById = (id: string) => {
  const container = document.getElementById(id);
  if (!container) {
    console.error(
      `Element with an ID of ${id} could not be found. Please provide a valid ID.`
    );
  }
  return container;
};
