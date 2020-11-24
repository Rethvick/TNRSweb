import { Link, Tooltip } from "@material-ui/core";

import {
  Link as LinkIcon,
} from "@material-ui/icons";

// receives a row and generate the links to the sources
export const mkSourceLinks = (row) => {
  let sources = row.Source.split(",");
  let links = row.Name_matched_url.split(";");
  //
  return _.zip(sources, links).map(
    (pair) =>
      pair[1] && (
        <Link key={row.unique_id + pair[0]} href={pair[1]} target="_blank">
          {" "}
          {pair[0].toUpperCase()}
        </Link>
      )
  );
};

// receives a row and generate the links to the sources
export const mkAcceptedNameLinks = (row) => {

  let sources = row.Source.split(",");
  let links = row.Name_matched_url.split(";");
  //
  return _.zip(sources, links).map(
    (pair) =>
      pair[1] && (
        <Link key={row.unique_id + pair[0]} href={pair[1]} target="_blank">
          <Tooltip title={pair[0].toUpperCase()} placement='left' arrow >
          <LinkIcon />
          </Tooltip>
        </Link>
      )
  );

};
