
export const roundScore = (value) => {
  let decimalPlaces = 2;
  let round = Number(
    Math.round(parseFloat(value + "e" + decimalPlaces)) + "e-" + decimalPlaces
  ).toFixed(decimalPlaces);

  // if round is equal to one leave it as it is
  if (round === "1.00") {
    return round;
  }
  // if it less than one, strip the 0
  else {
    return round.slice(1, 4);
  }
};

