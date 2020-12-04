

export const setCustomerInfo = (obj) => {
  return (dispatch) => {
    if (obj) {
      dispatch(_setCustomerInfo(obj));
    }
  }
}

export const _setCustomerInfo = (obj) => ({
  type: 'SET_CUSTOMER_INFO',
  customer: {...obj}
});

export const removeCustomerInfo = () => {
  return (dispatch) => {
    dispatch(_removeCustomerInfo());
  }
}

export const _removeCustomerInfo= () => ({
  type: 'REMOVE_CUSTOMER_INFO',
})

