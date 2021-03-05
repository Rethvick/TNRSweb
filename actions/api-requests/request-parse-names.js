import axios from "axios";

const apiEndPoint = process.env.apiEndPoint;

export const requestParseNames = async (queryNames) => {
  // 
  const parseObject = {
    opts: {
      mode: "parse",
    },
    data: queryNames,
  };
  // 
  return await axios
    .post(apiEndPoint, parseObject, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      return response.data
      //setParsedNames(response.data);
    });
};
