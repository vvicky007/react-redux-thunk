import initialState from "../initialState";
export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case "CREATE_COURSE":
      return [...state, { ...action.course }];
    case "LOAD_COURSES_SUCCESSFULL":
      return action.courses;
    case "SAVE_COURSE_SUCCESS":
      return state.map((course) =>
        course.id === action.course.id ? action.course : course
      );
    default:
      return state;
  }
}
