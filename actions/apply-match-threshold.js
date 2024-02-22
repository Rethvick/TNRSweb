
// TODO: this function does not belong here
// this function groups names that matched the same species
export const applyMatchThreshold = (rows, matchingThreshold) => {
  // group data using
  // Author_matched + Name_matched + Overall_score + Accepted_name
  return (
    _.chain(rows)
      // group all records returned for a specific name together
      .groupBy("Name_submitted")
      .map((group) => {
        // count the number of matches above threshold
        let aboveThresholdCount = 0;
        let clearedGroup = group.map((row) => {
          // clear out matches bellow threshold
          if (row["Overall_score"] < matchingThreshold) {
            return {
              ID: row["ID"],
              Name_submitted: row["Name_submitted"],
              Overall_score: "",
              Name_matched_id: "",
              Name_matched: "[No match found]",
              Name_score: "",
              Name_matched_rank: "",
              Author_submitted: row["Author_submitted"],
              Author_matched: "",
              Author_score: "",
              Canonical_author: "",
              Name_matched_accepted_family: "",
              Genus_submitted: row["Genus_submitted"],
              Genus_matched: "",
              Genus_score: "",
              Specific_epithet_submitted: row["Specific_epithet_submitted"],
              Specific_epithet_matched: "",
              Specific_epithet_score: "",
              Family_submitted: row["Family_submitted"],
              Family_matched: "",
              Family_score: "",
              Infraspecific_rank: "",
              Infraspecific_epithet_matched: "",
              Infraspecific_epithet_score: "",
              Infraspecific_rank_2: "",
              Infraspecific_epithet_2_matched: "",
              Infraspecific_epithet_2_score: "",
              Annotations: "",
              Unmatched_terms: "",
              Name_matched_url: "",
              Name_matched_lsid: "",
              Phonetic: "",
              Taxonomic_status: "",
              Accepted_name: "",
              Accepted_species: "",
              Accepted_name_author: "",
              Accepted_name_id: "",
              Accepted_name_rank: "",
              Accepted_name_url: "",
              Accepted_name_lsid: "",
              Accepted_family: "",
              Overall_score_order: "1",
              Highertaxa_score_order: "1",
              Source: "",
              Warnings: "",
              selected: true,
              unique_id: row["unique_id"],
            };
          }
          // if the record is not bellow threshold increase count and return it filled
          aboveThresholdCount = aboveThresholdCount + 1;
          return row;
        });
        // if number of matches above threshold >= 1
        if (aboveThresholdCount >= 1) {
          // remove all records that did not match the threshold
          return clearedGroup.filter(
            (row) => row["Name_matched"] !== "[No match found]"
          );
        } else {
          // else return the single top entry with empty fields
          return clearedGroup[0];
        }
      })
      // flatten to remove groupById
      .flatten()
      .value()
  );
};


