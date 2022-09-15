

export default (state = true, action) => {
  switch (action.type) {
    case 'editableBill/VALIDATE':
      return false;
    case 'editableBill/UPDATE':
      let isEditable = true;
      action.data.shares.forEach(share => {
        if (share.isManual === true) isEditable = false;
      });
      return isEditable;
    default:
      return true;
  }
}