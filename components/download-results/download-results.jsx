import { useStyles } from "./download-results.style.js";

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

export function DownloadResults(props) {
  const [open, setOpen] = React.useState(false);
  const [fileName, setFileName] = React.useState("tnrs_result");
  const [fileFormat, setFileFormat] = React.useState("csv");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="secondary">
        Download Settings
      </Button>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Download Data
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Download Options</DialogTitle>
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
              <RadioGroup value={"all"}>
                <FormControlLabel
                  value="best"
                  control={<Radio />}
                  label="Best Matches Only"
                  disabled
                />
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="All Matches"
                  disabled
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
            onClick={() => props.onClickDownload(fileName, fileFormat)}
            color="primary"
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export const generateDownloadFile = (data, fileName, fileFormat) => {
  // TODO: add the entire list of columns
  // TODO ID should be renamed to 'Name_number'
  const fields = ["ID", "Name_submitted", "Overall_score", "Name_matched"];
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
    const csv = parser.parse(data, opts);
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
