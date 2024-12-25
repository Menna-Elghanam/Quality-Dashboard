export const calculateColor = (value) => {
    if (isNaN(value) || value == 0) {
      return `rgb(161, 168,168)`;
    }
    const max = 1; // Define the maximum value
    const percentage = Math.min(value / max, 1); // Ensure percentage doesn't exceed 1
  
    // Color stops (RGB values)
    const colors = [
      { r: 24, g: 224, b: 208 }, // Turquoise (Safe)
      { r: 255, g: 255, b: 0 }, // Yellow (Warning)
      { r: 220, g: 0, b: 0 }, // Orange
    ];
  
    const step = percentage * (colors.length - 1);
    const index = Math.floor(step); // Lower bound of the range
    const t = step - index; // Fraction between the two stops
    const c1 = colors[index];
    const c2 = colors[Math.min(index + 1, colors.length - 1)];
  
    const r = Math.round(c1.r + t * (c2.r - c1.r));
    const g = Math.round(c1.g + t * (c2.g - c1.g));
    const b = Math.round(c1.b + t * (c2.b - c1.b));
  
    return `rgb(${r}, ${g}, ${b})`;
  };