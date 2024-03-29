import jwt_decode from "jwt-decode"
import AsyncStorage from "@react-native-community/async-storage"
import Toast from "react-native-toast-message"
import baseURL from "../../assets/common/baseUrl"
import axios from "axios"
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
    axios
    .post(`${baseURL}/login`, user,  { headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }})
    .then((res) => {
        // console.log(res)
        if (res) {
            const token = res.data;
            console.log("Token in login Function "+token);
            AsyncStorage.setItem("jwt", token)
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded, user))
        } else {
           logoutUser(dispatch)
        }
    })
    .catch((err) => {
        Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Kiểm tra lại email hoặc password.",
            text2: ""
        });
        logoutUser(dispatch)
    });
};

export const getUserProfile = (id) => {
    fetch(`${baseURL}/user/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}