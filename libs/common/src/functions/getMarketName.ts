
export const getMarketName = (marketCode: any) => {
    let marketName;
  
    switch (marketCode) {
      case "FS":
        marketName = "Food Service";
        break;
      case "BK":
        marketName = "Bakery";
        break;
      case "XX":
        marketName = "Both";
        break;
      default:
        marketName = marketCode;
        break;
    }
  
    return marketName;
  }