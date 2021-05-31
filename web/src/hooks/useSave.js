import { useMutation } from "react-query";
import { BASE_URL } from "../utils/constants";
import { Cookies } from "react-cookie";
import { useQueryClient } from "react-query";
import axios from "axios";

const cookies = new Cookies();

const useSave = (url, queryName) => {
  const query = useQueryClient();
  return useMutation(
    (values) => {
      axios.put(`${BASE_URL}/${url}`, values, {
        headers: {
          "x-auth-token": cookies.get("jwt"),
          "Content-Type": "application/json"
        },
      });
    },
    {
      onSuccess: () => {
        query.invalidateQueries(`${queryName}`);
      },
    }
  );
};

export default useSave;
