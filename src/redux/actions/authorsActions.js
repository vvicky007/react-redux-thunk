import * as authorsApi from "../../api/authorApi";

function loadAuthorsSuccess(authors) {
  return {
    type: "LOAD_AUTHORS_SUCCESSFULL",
    authors,
  };
}
export function loadAuthors() {
  return (dispatch) => {
    return authorsApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((e) => {
        console.error(e);
      });
  };
}
