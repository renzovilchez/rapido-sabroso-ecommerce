export const IGV_RATE = 0.18;

export function extractIGV(total) {
  return +((total * IGV_RATE) / (1 + IGV_RATE)).toFixed(2);
}

export function calculateSubtotal(total) {
  return +(total - extractIGV(total)).toFixed(2);
}
