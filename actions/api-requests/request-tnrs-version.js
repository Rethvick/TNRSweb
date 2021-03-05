import axios from "axios";

const apiEndPoint = process.env.apiEndPoint;

export const requestTNRSVersion = () => {
  let query = {
    opts: {
      mode: "meta",
    },
  };
  return axios
    .post(apiEndPoint, query, {
      headers: { "Content-Type": "application/json" },
    })
    .then(
      (response) => {
        //alert(JSON.stringify(response.data))
        return response.data[0];
      },
      () => {
        alert("There was an error while retrieving TNRS version");
      }
    );
};
