import { AUTH_USER } from "./types";
import axios from "axios";

// export const signup = ({ email, password }) => dispatch => {
//     axios.post("http://localhost:3090/signup", { email, password });
// };

// Because we destructure props just to make another object with those props,
// we can just pass props directly:
export const signup = formProps => async dispatch => {
    const response = await axios.post(
        "http://localhost:3090/signup",
        formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
};
