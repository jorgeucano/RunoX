export enum Value {
  // numbers
  ZERO = "cero",
  ONE = "uno",
  TWO = "dos",
  THREE = "tres",
  FOUR = "cuatro",
  FIVE = "cinco",
  SIX = "seis",
  SEVEN = "siete",
  EIGHT = "ocho",
  NINE = "nueve",
  PLUS_TWO = "mas-dos",
  REVERSE = "reversa",
  SKIP = "saltar",
  // special cards
  WILDCARD = "comodin",
  PLUS_FOUR = "mas-cuatro",
}

export const VALUES = [
  Value.ZERO,
  Value.ONE,
  Value.TWO,
  Value.THREE,
  Value.FOUR,
  Value.FIVE,
  Value.SIX,
  Value.SEVEN,
  Value.EIGHT,
  Value.NINE,
  Value.PLUS_TWO,
  Value.REVERSE,
  Value.SKIP,
  Value.WILDCARD,
  Value.PLUS_FOUR,
];

export function isSpecial(value: Value) {
  return value === Value.WILDCARD || value === Value.PLUS_FOUR;
}

export function isValidValue(value: Value) {
  return VALUES.indexOf(value) !== -1;
}
