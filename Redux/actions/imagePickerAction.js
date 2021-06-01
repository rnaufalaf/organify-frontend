import { UPLOAD_MULTIPLE_IMAGE } from "./types";

export const uploadMultipleImage = (photos) => (dispatch) => {
  dispatch({
    type: UPLOAD_MULTIPLE_IMAGE,
    payload: {
      photos: photos,
    },
  });
};
