export enum Color {
  RED = "rojo",
  BLUE = "azul",
  GREEN = "verde",
  YELLOW = "amarillo",
}

export const COLORS = [Color.RED, Color.BLUE, Color.GREEN, Color.YELLOW];

export function isValidColor(color: Color) {
  return COLORS.indexOf(color) !== -1;
}
