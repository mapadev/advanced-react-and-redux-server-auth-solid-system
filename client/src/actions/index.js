import axios from "axios";

import { AUTH_USER, AUTH_ERROR } from "./types";

// export const signup = ({ email, password }) => dispatch => {
//     axios.post("http://localhost:3090/signup", { email, password });
// };

// Because we destructure props just to make another object with those props,
// we can just pass props directly:
export const signup = formProps => async dispatch => {
    try {
        const response = await axios.post(
            "http://localhost:3090/signup",
            formProps
        );

        dispatch({ type: AUTH_USER, payload: response.data.token });
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: "Wrong credentials" });
    }
};
