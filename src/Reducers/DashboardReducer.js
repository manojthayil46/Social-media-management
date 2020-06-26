const initialState = {
  user: "",
  description: "",
  timestamp: "",
  change: [],
};

const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER":
      return {
        ...state,
        user: action.value,
      };
    case "description":
      return {
        ...state,
        description: action.value,
      };
    case "timestamp":
      return {
        ...state,
        timestamp: action.value,
      };

    case "USER_DETAILS":
      return {
        ...state,
        change: action.value,
      };
  }

  return state;
};

export default DashboardReducer;
