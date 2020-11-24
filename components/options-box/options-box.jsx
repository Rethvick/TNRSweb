import { useState } from "react";
import { useStyles } from "./options-box.style";
import {
  Paper,
  Box,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
  Switch,
} from "@material-ui/core";

export function OptionsBox({
  queryType,
  onChangeQueryType,
  sourcesAvailable,
  onChangeSources,
  familiesAvailable,
  onChangeFamily,
}) {
  const classes = useStyles();

  // populate souce state with sources available
  let [sourcesState, setSourcesState] = useState(
    sourcesAvailable?.map((name) => {
      return { name: name, enabled: true };
    })
  );

  const handleChangeSources = (name) => {
    let tmpSourcesState = sourcesState.map((source) => {
      if (source.name == name) {
        // flip switch
        source.enabled = !source.enabled;
      }
      return source;
    });
    // set state
    setSourcesState(tmpSourcesState);
    // send result to the index page
    let sourceNames = tmpSourcesState
      .filter((s) => s.enabled)
      .map((s) => s.name)
      .join(",");
    onChangeSources(sourceNames);
  };

  return (
    <Paper className={classes.paper}>
      <Box p={2}>
        <Box>
          <InputLabel>Processing Mode</InputLabel>
          <FormControl variant="outlined" fullWidth>
            <Select
              value={queryType}
              onChange={(e) => onChangeQueryType(e.target.value)}
            >
              <MenuItem value={"resolve"}>Perform name resolution</MenuItem>
              <MenuItem value={"parse"}>Parse names only</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {queryType === "resolve" && (
          <>
            <Box pt={1} >
              <InputLabel>Family Classification</InputLabel>
              <FormControl variant="outlined" fullWidth>
                <Select value={1} onChange={(e) => onChangeFamily(e.target.value)}>
                  {familiesAvailable.map((f) => (
                    <MenuItem key={f.sourceID} value={f.sourceID}>
                      {f.sourceName.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box pt={1} >
              <FormLabel component="legend">Sources</FormLabel>
              <FormGroup row>
                {sourcesState?.map((s) => {
                  return (
                    <FormControlLabel
                      key={s.name}
                      control={
                        <Switch
                          onClick={() => handleChangeSources(s.name)}
                          checked={s.enabled}
                        />
                      }
                      label={s.name.toUpperCase()}
                    />
                  );
                })}
              </FormGroup>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
}
