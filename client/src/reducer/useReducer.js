export const Reducer = (state, action) => {
    switch (action.type) {
      // Define your action types and their corresponding state updates
      case 'SHOW':
        return { ...state, show: true };
      case 'UNSHOW':
        return { ...state, show: false };
      case 'showModal':
        return { ...state, modal: action.payloadModal };
      case 'setNews':
        return { ...state, news: action.payloadNews };    
      // Add more cases for other actions
      default:
        return state;
    }
  };