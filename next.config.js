module.exports = {
  trailingSlash: true,
  env: {
    apiServer: "https://tnrsapi.xyz/",
    // development api
    apiEndPoint: "http://vegbiendev.nceas.ucsb.edu:8975/tnrs_api.php",
    // production api
    // apiEndPoint: "https://tnrsapi.xyz/tnrs_api.php",
    defaultMatchingThreshold: .53
  },
};
