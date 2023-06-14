import axios from "axios";

const apiEndPoint = process.env.apiEndPoint;

// TODO: move this to an action
export const requestMeta = async () => {
  // query source
  let query = {
    opts: {
      mode: "meta",
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
        let meta = response.data; //.map((s) => s.sourceName);
        // the API returns a vector with one element
        return meta[0];
      },
      () => {
        alert("There was an error while retrieving the meta information");
      }
    );
};




