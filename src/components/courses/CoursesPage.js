import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as authorActions from "../../redux/actions/authorsActions";
import CourseList from "./courseList";
import Spinner from "../common/Spinner";
import { Redirect } from "react-router-dom";
function CoursesPage(props) {
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  useEffect(async () => {
    try {
      await props.actions.courses.loadCourses();
      await props.actions.authors.loadAuthors();
    } catch (e) {
      console.error(e);
    } finally {
      setIsloading(false);
    }
  }, []);
  if (redirect) return <Redirect to="/course" />;
  if (isLoading) return <Spinner />;
  return (
    <>
      <h2>Courses</h2>
      <button className="btn btn-primary" onClick={() => setRedirect(true)}>
        Add Course
      </button>
      <CourseList courses={props.courses} authors={props.authors} />
    </>
  );
}
function mapStatetoProps(state) {
  return {
    courses: state.courses,
    authors: state.authors,
  };
}
function mapDispatchtoProps(dispatch) {
  return {
    actions: {
      courses: bindActionCreators(courseActions, dispatch),
      authors: bindActionCreators(authorActions, dispatch),
    },
  };
}
CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
};
export default connect(mapStatetoProps, mapDispatchtoProps)(CoursesPage);
