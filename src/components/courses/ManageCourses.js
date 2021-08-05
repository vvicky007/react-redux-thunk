import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as authorActions from "../../redux/actions/authorsActions";
import CourseForm from "./courseForm";
import { newCourse } from "../../../tools/mockData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ManageCourses(props) {
  const [course, setCourse] = useState({ ...props.course });
  const [error, setError] = useState({});
  const [saving, setSaving] = useState(false);
  function onChange(e) {
    setCourse((prevState) => {
      const { name, value } = e.target;
      return {
        ...prevState,
        [name]: name === "authorId" ? parseInt(value, 10) : value,
      };
    });
  }
  async function onSave(e) {
    e.preventDefault();
    try {
      setSaving(true);
      await props.actions.courses.saveCourses(course);
      toast("Added Course Successfully");
      props.history.push("/courses");
    } catch (e) {
      setSaving(false);
      setError({
        onSave: e.message,
      });
    }
  }
  useEffect(async () => {
    if (props.course) {
      setCourse({ ...props.course });
    }
    try {
      if (props.courses.length === 0) {
        await props.actions.courses.loadCourses();
      }
    } catch (e) {
      setError((prevState) => {
        const newState = { ...prevState, course: e };
        return newState;
      });
      alert(e);
    }
    try {
      if (props.authors.length === 0) {
        await props.actions.authors.loadAuthors();
      }
    } catch (e) {
      setError((prevState) => {
        const newState = { ...prevState, authors: e };
        return newState;
      });
      alert(e);
    }
  }, [props.course]);
  return (
    <>
      <h3>Manage Courses</h3>
      <CourseForm
        course={course}
        authors={props.authors}
        errors={error}
        onChange={onChange}
        onSave={onSave}
        saving={saving}
      />
    </>
  );
}
function mapStatetoProps(state, ownProps) {
  const course = ownProps.match.params.id
    ? state.courses.find((course) => course.slug == ownProps.match.params.id) ||
      newCourse
    : newCourse;
  return {
    course,
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
ManageCourses.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
export default connect(mapStatetoProps, mapDispatchtoProps)(ManageCourses);
