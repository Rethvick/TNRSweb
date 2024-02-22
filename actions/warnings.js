export const translateWarningCode = (code) => {
  switch (parseInt(code)) {
    case 1:
      return "[Partial]";
    case 2:
      return "[Ambiguous]";
    case 4:
      return "[HigherTaxa]";
    case 8:
      return "[Overall]";
    case 3:
      return "[Partial] [Ambiguous]";
    case 5:
      return "[Partial] [HigherTaxa]";
    case 9:
      return "[Partial] [Overall]";
    case 6:
      return "[Ambiguous] [HigherTaxa]";
    case 10:
      return "[Ambiguous] [Overall]";
    case 12:
      return "[HigherTaxa] [Overall]";
    case 7:
      return "[Partial] [Ambiguous] [HigherTaxa]";
    case 11:
      return "[Partial] [Ambiguous] [Overall]";
    case 13:
      return "[Partial] [HigherTaxa] [Overall]";
    case 14:
      return "[Ambiguous] [HigherTaxa] [Overall]";
    case 15:
      return "[Partial] [Ambiguous] [HigherTaxa] [Overall]";
    default:
      return ""
  }
};

export const shortText2LongText = (text) => {
  return text.split(" ").map((m) => {
    switch (m) {
      case "[Partial]":
        return "Partial match";
      case "[Ambiguous]":
        return "Ambiguous match";
      case "[HigherTaxa]":
        return "Better higher taxonomic match available";
      case "[Overall]":
        return "Better overall match available";
      default:
        return ""
    }
  });
};

export const shortText2DetailedExplanation = (text) => {
  return text.split(" ").map((m) => {
    switch (m) {
      case "[Partial]":
        return "Name matched is a higher taxon than the name submitted.";
      case "[Ambiguous]":
        return "More than one name with the same score and acceptance.";
      case "[HigherTaxa]":
        return "Another name with lower overall score has a better matching higher taxon.\n\n\nNote: You may need to lower match threshold to see this match.";
      case "[Overall]":
        return "Another name in different higher taxon has better overall score.";
    }
  });
};
