import axios from "axios";

const apiEndPoint = process.env.apiEndPoint;

export const requestSources = async () => {
  // query source
  let query = {
    opts: {
      mode: "sources",
    },
  };
  // axios
  return await axios
    .post(apiEndPoint, query, {
      headers: { "Content-Type": "application/json" },
    })
    .then(
      (response) => {
        // get source names
        let sourceNames = response.data; //.map((s) => s.sourceName);
        //
        return sourceNames;
      },
      () => {
        alert("There was an error while retrieving the sources");
      }
    );
};




