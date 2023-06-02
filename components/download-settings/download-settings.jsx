import { Button } from "@material-ui/core";
import { saveAs } from "file-saver";
import { requestTNRSVersion } from "../../actions";

export function DownloadSettings({ settings }) {
  const handleDownloadClick = async () => {
    let data = [];
    // retrieve versions from the API
    let versions = await requestTNRSVersion();
    //alert(JSON.stringify(versions))
    // build file
    data.push("Job type: " + settings.jobType);
    data.push("Database Version: " + versions.db_version);
    data.push("Code Version: " + versions.code_version);
    data.push("API Version: " + versions.api_version);
    data.push("Start time: " + settings.time.start);
    data.push("End time: " + settings.time.end);
    data.push("Sources selected : [" + settings.sourcesSelected + "]");
    data.push("Classification: " + settings.familyClassification);
    data.push("Constrain by higher taxonomy: " + settings.higherTaxonomy);
    data.push("Matching Threshold: " + settings.matchingThreshold);
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
    const csvBlob = new Blob([data], {
      type: "text/plain;charset=utf-8",
    });
    // create the download file
    saveAs(csvBlob, fileName + "." + fileFormat);
  } catch (error) {
    // TODO: add an error handler
    console.error(error);
  }
};
