export const sortByColumn = (data, column) => {
  // To Ensure the right columns are used
  if (!["Highertaxa_score_order", "Overall_score_order"].includes(column)) {
    throw new Error("Trying to sort using a wrong column");
  }

  // Sort the data based on the specified column
  const sortedData = [...data].sort((a, b) => {
    // The values in the specified column are numeric scores
    const scoreA = parseFloat(a[column]);
    const scoreB = parseFloat(b[column]);
    // Sort in descending order of scores
    return scoreB - scoreA;
  });


  return sortedData;
};
