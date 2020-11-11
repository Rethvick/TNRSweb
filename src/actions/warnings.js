

export const translateWarningCode = (code) => {
  switch(parseInt(code)) {
    case(1):
      return '[Partial]'
    case(2):
      return '[Ambiguous]'
    case(4):
      return '[HigherTaxa]'
    case(8):
      return '[Overall]'
    case(3):
      return '[Partial] [Ambiguous]'
    case(5):
      return '[Partial] [HigherTaxa]'
    case(9):
      return '[Partial] [Overall]'
    case(6):
      return '[Ambiguous] [HigherTaxa]'
    case(10):
      return '[Ambiguous] [Overall]'
    case(12):
      return '[HigherTaxa] [Overall]'
    case(7):
      return '[Partial] [Ambiguous] [HigherTaxa]'
    case(11):	
      return '[Partial] [Ambiguous] [Overall]'
    case(13):
      return '[Partial] [HigherTaxa] [Overall]'
    case(14):
      return '[Ambiguous] [HigherTaxa] [Overall]'
    case(15):
      return '[Partial] [Ambiguous] [HigherTaxa] [Overall]'
  }
}

