export const sortByColumn = (data, column) => {
  // make sure the right columns are used
  if (
    ["Highertaxa_score_order", "Overall_score_order"].includes(column) === false
  ) {
    throw "Trying to sort using a wrong column"
  }
  // TODO: make sure column has order
  // for each point in the data, change the row where Hihertaxa===1
  return data.map((row) => {
    // if the row order is 1
    if (row[column] === "1") {
      // set selected to true
      row.selected = true;
    } else {
      // else set it to false
      row.selected = false;
    }
    // then return the row
    return row;
  });
};
