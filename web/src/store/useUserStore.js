import create from "zustand";
import { BASE_URL } from "../utils/constants";
import { Cookies } from "react-cookie";
import axios from "axios";

const cookie = new Cookies();

const useUserStore = create((set, get) => ({
  users: [],
  user: {},
  members: [],
  error: false,
  success: false,
  successRegister: false,
  invalidCredentials: false,
  register: async (users) => {
    await axios
      .post(`${BASE_URL}/users/create`, users)
      .then((res) => {
        set((state) => ({ ...state, successRegister: true, error: false }));
      })
      .catch((err) => {
        set((state) => ({ ...state, error: true, successRegister: false }));
      });
  },
  signIn: async (values) => {
    await axios
      .post(`${BASE_URL}/auth/signIn`, values)
      .then((res) => {
        cookie.set("jwt", res.data, { maxAge: 3600, secure: true });
        set((state) => ({
          ...state,
          token: res.data,
          success: true,
          invalidCredentials: false,
          error: false,
        }));
      })
      .catch((err) => {
        if (err.response.data.includes("Invalid")) {
          set((state) => ({
            ...state,
            invalidCredentials: true,
            error: false,
            success: false,
          }));
        } else {
          set((state) => ({
            ...state,
            error: true,
            invalidCredentials: false,
            success: false,
          }));
        }
      });
  },
  fetchUser: () => {
    axios
      .get(`${BASE_URL}/auth/me`, {
        headers: {
          "x-auth-token": cookie.get("jwt"),
        },
      })
      .then((res) => {
        set((state) => ({ ...state, user: res.data }));
      })
      .catch((err) => {
        set((state) => ({ ...state, user: {}, errror: true }));
      });
  },
  fetchUsers: async () => {
    const res = await axios.get(`${BASE_URL}/users/inactive`, {
      headers: {
        "x-auth-token": cookie.get("jwt"),
      },
    });
    return res.data;
  },
  fetchActiveUser: async () => {
    await axios.get(`${BASE_URL}/users/active`, {
      headers: {
        "x-auth-token": cookie.get("jwt"),
      },
    });
  },
  logout: () => {
    cookie.remove("jwt");
    set((state) => ({
      user: null,
      error: false,
      success: false,
      invalidCredentials: false,
    }));
  },
}));

export default useUserStore;
