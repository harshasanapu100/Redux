import axios from "axios";
import { apiCallBegan, apiCallFailed, apiCallSuccess } from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) return next(action);

    const { url, method, data, onSuccess, onError, onStart } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
      const response = await axios.request({
        baseURL: "http://localhost:9002/api",
        url: url,
        method,
        data,
      });

      // General sucess dispatch
      dispatch(apiCallSuccess(response.data));

      //specific sucess dispatch
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      // General error dispatch
      dispatch(apiCallFailed(error.message));

      // Specific error dispatch
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;
