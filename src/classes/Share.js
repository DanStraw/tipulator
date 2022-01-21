class Share {
  constructor(shareAmountText, isManual = false, percentTotal = 100) {
    this.shareAmountText = shareAmountText;
    this.isManual = isManual;
    this.shareAmountNum = null;
    this.percentTotal = percentTotal;
    this.dollarSmallIncrementAllowed = true;
    this.dollarLargeIncrementAllowed = true;
    this.dollarSmallDecrementAllowed = true;
    this.dollarLargeDecrementAllowed = true;
    this.percentSmallIncrementAllowed = true;
    this.percentLargeIncrementAllowed = true;
    this.percentSmallDecrementAllowed = true;
    this.percentLargeDecrementAllowed = true;
  }
}

export default Share;