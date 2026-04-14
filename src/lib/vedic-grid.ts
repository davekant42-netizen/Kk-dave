// The fixed Vedic Grid layout
export const VEDIC_GRID: number[][] = [
  [3, 1, 9],
  [6, 7, 5],
  [2, 8, 4],
];

export interface VedicResult {
  gridCounts: Record<number, number>; // how many times each digit appears
  rootNumber: number;
  destinyNumber: number;
  dobDigits: number[];
  allDigits: number[]; // all digits placed in grid
}

function sumToSingle(n: number): number {
  while (n >= 10) {
    n = String(n).split('').reduce((s, d) => s + Number(d), 0);
  }
  return n;
}

export function calculateVedicGrid(day: number, month: number, year: number): VedicResult {
  // Rule (a): DOB digits — exclude century digits (first 2 of 4-digit year)
  const yearLastTwo = year % 100;
  const dobDigits: number[] = [];

  // Add date digits
  String(day).split('').forEach(d => dobDigits.push(Number(d)));
  // Add month digits
  String(month).split('').forEach(d => dobDigits.push(Number(d)));
  // Add last two year digits
  String(yearLastTwo).split('').forEach(d => dobDigits.push(Number(d)));

  // Rule (c): Root Number
  let rootNumber: number;
  const rootDigits: number[] = [];

  if (day <= 9) {
    // Single digit date: root number = date itself, already in DOB digits
    rootNumber = day;
  } else if (day === 10 || day === 20 || day === 30) {
    // Special dates: root = first digit, already covered by DOB digits
    rootNumber = day === 10 ? 1 : day === 20 ? 2 : 3;
  } else {
    // Double digit: both digits already in DOB, add the sum as root
    rootNumber = sumToSingle(day);
    // Only add root if it's not already produced by the date digits
    const dateDigitsList = String(day).split('').map(Number);
    // Root number is the reduced sum — add it as extra
    rootDigits.push(rootNumber);
  }

  // Rule (b): Destiny Number
  const fullSum = String(day).split('').map(Number).reduce((a, b) => a + b, 0)
    + String(month).split('').map(Number).reduce((a, b) => a + b, 0)
    + String(year).split('').map(Number).reduce((a, b) => a + b, 0);
  const destinyNumber = sumToSingle(fullSum);

  // Combine all digits
  const allDigits = [...dobDigits, ...rootDigits, destinyNumber];

  // Count occurrences of each digit (1-9, 0 is ignored in vedic grid)
  const gridCounts: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) gridCounts[i] = 0;
  allDigits.forEach(d => {
    if (d >= 1 && d <= 9) gridCounts[d]++;
  });

  return { gridCounts, rootNumber, destinyNumber, dobDigits, allDigits };
}
