
  const initialState = {
    axiosInstance : null,
    isLoading : false
  }


  export default function(state=initialState, action) {
    switch (action.type) {

      case UPDATE_ACCESS_TOKEN :
        prevAxiosInstance = axiosInstance
        return {...state,
          axiosInstance:
        }
        

      default:
        return state;
    }
  }

  export const selectAxiosInstance = (state) => state.api.axiosInstance



  // case API_START:
  //   if (action.payload === FETCH_ARTICLE_DETAILS) {
  //     return {
  //       ...state,
  //       isLoadingData: true
  //     };
  //   }
  // case API_END:
  //   if (action.payload === FETCH_ARTICLE_DETAILS) {
  //     return {
  //       ...state,
  //       isLoadingData: false
  //     };
  //   }