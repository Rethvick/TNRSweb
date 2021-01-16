import { Button } from "@material-ui/core";

import axios from "axios";
import { saveAs } from "file-saver";

const apiEndPoint = "https://tnrsapi.xyz/tnrs_api.php";

const getTNRSVer = () => {
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
        alert("There was an error while retrieving the classifications");
      }
    );
};

export function DownloadSettings({ settings }) {
  const handleDownloadClick = async () => {
    let data = [];
    // retrieve versions from the API
    let versions = await getTNRSVer()
    //alert(JSON.stringify(versions))
    // build file
    data.push("Job type: " + settings.jobType);
    data.push("Database Version: " + versions.db_version );
    data.push("Code Version: " + versions.code_version);
    data.push("API Version: " + versions.api_version);
    data.push("Start time: " + settings.time.start);
    data.push("End time: " + settings.time.end);
    data.push("Sources selected : [" + settings.sourcesSelected + "]");
    data.push("Classification: " + settings.familyClassification);
    data.push("Constrain by higher taxonomy: " + settings.higherTaxonomy);
    // generate download file
    generateDownloadFile(data.join("\n"), "settings", "txt");
  };

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleDownloadClick}
      >
        Download Settings
      </Button>
    </>
  );
}

const generateDownloadFile = (data, fileName, fileFormat) => {
  /*
    E-mail:tnrs@lka5jjs.orv
    Id: 9e5cf7be0f4b4a6bbc1433a9f3a86f32
    Job type: matching
    Contains Id: false
    Start time :Thu Dec 03 15:46:56 MST 2020
    Finish time :null
    TNRS version :3.0
    Sources selected : [tropicos ,tpl ,usda ]
    #Match threshold: 0.05
    Classification :tropicos
    #Allow partial matches? :trueSort by source: false
    Constrain by higher taxonomy: false
  */
  try {
    // convert data (json) to csv
    // create the download file
    const csvBlob = new Blob([data], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(csvBlob, fileName + "." + fileFormat);
    //
  } catch (error) {
    // TODO: think about what to do in case of errors
    // for now, logging the error to the console
    console.error(error);
  }
};
