import { useState } from "react";
import { Parser } from "json2csv";
import { saveAs } from "file-saver";
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
  const cleanedData = data.map((item) => {
    const {WarningsEng, selected, unique_id, ...rest } = item;
    // Determine Best_match_highertaxa based on your criteria
    const Best_match_highertaxa = item.Highertaxa_score_order?.includes("1");
    return {
      ...rest,
      Warnings: item.Warnings,
      Best_match_overall_score: selected,
      Best_match_highertaxa,
      unique_id,
    };
  });

  // Determine fields for CSV/TSV dynamically
  // This step ensures all fields are included in the correct order, and 'unique_id' is at the end
  let fields = Object.keys(cleanedData[0]);

  let downloadData = cleanedData;

  // Filter the data if only best matches are to be downloaded
  if (matchesToDownload === "best") {
    downloadData = cleanedData.filter((f) => f.Best_match_overall_score === true);
  }

  let opts = { fields };
  if (fileFormat == "tsv") {
    opts = { ...opts, delimiter: "\t" };
  }

  const parser = new Parser(opts);

  // Convert data to CSV or TSV
  try {
    const fileContent = parser.parse(downloadData, opts);
    const fileBlob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    saveAs(fileBlob, `${fileName}.${fileFormat}`);
  } catch (error) {
    console.error(error);
  }
};