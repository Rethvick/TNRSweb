import axios from "axios";
import { translateWarningCode } from "../warnings";
import _ from "lodash";
const apiEndPoint = process.env.apiEndPoint;

// TODO: this function does not belong here
// this function groups names that matched the same species
const groupRows = (rows) => {
  // group data using
  // Author_matched + Name_matched + Overall_score + Accepted_name
  return (
    _.chain(rows)
      //for each ID returned
      .groupBy("ID")
      .map((idGroup) => {
        // group by selected properties
        return (
          _.chain(idGroup)
            .groupBy((row) => {
              return (
                row.Canonical_author +
                row.Name_matched +
                row.Overall_score +
                row.Accepted_name +
                row.Taxonomic_status +
                row.Accepted_name +
                row.Accepted_name_author
              );
            })
            // consolidate Source, Name_matched_url and Accepted_name_url
            .map((eqRow) => {
              let sources = [];
              let accepted_urls = [];
              let matched_urls = [];
              //
              let head = eqRow[0];
              //let tail = eqRow.slice(1);
              eqRow.forEach((row) => {
                //
                if (sources.includes(row.Source) === false) {
                  sources.push(row.Source);
                  matched_urls.push(row.Name_matched_url);
                  accepted_urls.push(row.Accepted_name_url);
                }
              });
              //
              head.Source = sources.join(",");
              head.Name_matched_url = matched_urls.join(";");
              head.Accepted_name_url = accepted_urls.join(";");
              // return only one row per group
              return head;
            })
            .value()
        );
      })
      // flatten to remove groupById
      .flatten()
      .value()
  );
};

export const requestResolveNames = (queryNames, sourcesQuery, familyQuery) => {
  // query object sent to the api
  const queryObject = {
    opts: {
      // sources coming from the options box
      sources: sourcesQuery,
      class: familyQuery,
      mode: "resolve",
      matches: "all",
      acc: "0",
    },
    data: queryNames,
  };

  console.log(queryObject);
  // sending the request to the API
  return axios
    .post(apiEndPoint, queryObject, {
      headers: { "Content-Type": "application/json" },
    })
    .then(
      (response) => {
        // group data
        let groupedData = groupRows(response.data);
        // use the column 'Overall_score_order' to create the column selected
        let responseSelected = groupedData.map((row, idx) => {
          row.Warnings = translateWarningCode(row.Warnings);
          return {
            ...row,
            // TODO: make these compatible with the rest of the data
            ...{ selected: row.Overall_score_order == 1, unique_id: idx },
          };
        });
        return responseSelected;
      },
      () => {
        alert("Error fetching data from API");
      }
    );
};
