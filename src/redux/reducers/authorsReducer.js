import initialState from "../initialState";
export default function courseReducer(state = initialState.authors, action) {
  switch (action.type) {
    case "LOAD_AUTHORS_SUCCESSFULL":
      return action.authors;
    default:
      return state;
  }
}
