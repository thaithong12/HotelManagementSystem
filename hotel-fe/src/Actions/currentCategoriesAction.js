


  
  

export const setCategoryInfo = (obj) => {
  return (dispatch) => {
    if (obj) {
      dispatch(_setCategoryInfo(obj));
    }
  }
}

export const _setCategoryInfo = (obj) => ({
  type: 'SET_CATEGORY_INFO',
  category: {...obj}
});





