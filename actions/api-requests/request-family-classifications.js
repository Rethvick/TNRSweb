import axios from "axios";

const apiEndPoint = process.env.apiEndPoint;


// TODO: move this to an action
export const requestFamilyClassifications = async () => {
  // query source
  let query = {
    opts: {
      mode: "classifications",
    },
  };
  // axios
  return await axios
    .post(apiEndPoint, query, {
      headers: { "Content-Type": "application/json" },
    })
    .then(
      (response) => {
        return response.data;
      },
      () => {
        alert("There was an error while retrieving the classifications");
      }
    );
};






