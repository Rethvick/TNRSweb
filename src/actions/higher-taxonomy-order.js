

export const sortByHigherTaxonomy = (data) => {
  // for each point in the data, change the row where Hihertaxa===1
  return data.map(
    row => {
      // if the row order is 1
      if(row.Highertaxa_score_order === "1") {
        // set selected to true
        row.selected = true
      } else {
        // else set it to false
        row.selected = false
      }
      // then return the row
      return row
    }
  )
}
