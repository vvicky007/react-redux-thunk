import * as courseApi from "../../api/courseApi";
export function createCourse(course) {
  return {
    type: "CREATE_COURSE",
    course,
  };
}
function loadCoursesSuccess(courses) {
  return {
    type: "LOAD_COURSES_SUCCESSFULL",
    courses,
  };
}
function savecourseSuccess(course) {
  return {
    type: "SAVE_COURSE_SUCCESS",
    course,
  };
}
export function loadCourses() {
  return (dispatch) => {
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((e) => {
        console.error(e);
      });
  };
}
export function saveCourses(course) {
  return (dispatch) => {
    return courseApi
      .saveCourse(course)
      .then((course) => {
        dispatch(savecourseSuccess(course));
      })
      .catch((e) => {
        throw e;
      });
  };
}
