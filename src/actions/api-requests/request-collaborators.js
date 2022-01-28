import axios from "axios";

const apiEndPoint = process.env.apiEndPoint;

export const requestCollaborators = async () => {
  const query = {
    opts: {
      mode: "collaborators",
    },
  };

  return await axios
    .post(apiEndPoint, query, {
      headers: { "Content-Type": "application/json" },
    })
    .then(
      (response) => {
        return response.data;
      },
      () => {
        alert("There was an error while retrieving Collaborators");
      }
    );
};
