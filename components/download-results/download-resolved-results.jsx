import { useState } from "react";

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
} from "@material-ui/core";

import { Parser } from "json2csv";
import { saveAs } from "file-saver";

export function DownloadResolvedResults({ data }) {
  // controls the dialog visibility
  const [open, setOpen] = useState(false);
  // the name of the downloaded file
  const [fileName, setFileName] = useState("tnrs_result");
  // format of the download file
  const [fileFormat, setFileFormat] = useState("csv");
  // wether to show all rows or only best results
  const [matchesToDownload, setMatchesToDownload] = useState("all");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Download Data
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Download Options</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              id="outlined-helperText"
              label="File Name"
              defaultValue={fileName}
              onChange={(e) => setFileName(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mt={4}>
            <FormControl>
              <FormLabel>Download Format</FormLabel>
              <RadioGroup
                value={fileFormat}
                onChange={(e) => setFileFormat(e.target.value)}
              >
                <FormControlLabel value="csv" control={<Radio />} label="CSV" />
                <FormControlLabel value="tsv" control={<Radio />} label="TSV" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box mt={2}>
            <FormControl>
              <FormLabel>Results to Download</FormLabel>
              <RadioGroup
                value={matchesToDownload}
                onChange={(e) => setMatchesToDownload(e.target.value)}
              >
                <FormControlLabel
                  value="best"
                  control={<Radio />}
                  label="Best Matches Only"
                />
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="All Matches"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() =>
              generateDownloadFile(
                data,
                fileName,
                fileFormat,
                matchesToDownload
              )
            }
            color="primary"
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const generateDownloadFile = (
  data,
  fileName,
  fileFormat,
  matchesToDownload
) => {
  // add the entire list of columns
  const fields = Object.keys(data[0]);
  // create a new var to hold the results to download
  let downloadData;
  // if we want all matches, simple reference the new var
  if (matchesToDownload === "all") {
    downloadData = data;
    // if we want only best matches, filter data
  } else if (matchesToDownload === "best") {
    downloadData = data.filter((f) => f.selected === true);
  }
  //
  let opts;
  if (fileFormat == "tsv") {
    opts = { fields, delimiter: "\t" };
  } else {
    opts = { fields };
  }
  const parser = new Parser(opts);
  // convert data to CSV
  try {
    // convert data (json) to csv
    const csv = parser.parse(downloadData, opts);
    // create the download file
    const csvBlob = new Blob([csv], { type: "text/plain;charset=utf-8" });
    saveAs(csvBlob, fileName + "." + fileFormat);
    //
  } catch (error) {
    // TODO: think about what to do in case of errors
    // for now, logging the error to the console
    console.error(error);
  }
};
