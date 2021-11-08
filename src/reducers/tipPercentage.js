import { isValidPercent, characterValidationLoop, isANumber, formatPercentage } from '../validation/percent';


export default (state = "15.0", action) => {
  switch (action.type) {
    case 'TIP_PERCENTAGE_UPDATE':
      const isValidString = isValidPercent(action.text.toString(), 2);
      if (!isValidString) {
        return state;
      }

      const formatted = formatPercentage(action.text);
      return formatted;
    default:
      return state;
  }
}