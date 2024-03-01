import axios from "axios";
import conf from "../../conf/conf";
import Cookies from "js-cookie";

class AuthService {
  login = async ({ email, password }) => {
    try {
      const res = await axios.post(`${conf.strapiUrl}/api/auth/local`, {
        identifier: email,
        password: password,
      });
      if (res) {
        const { jwt, user } = res.data;
        if (jwt) {
          Cookies.set("sadSignIn", jwt);
          return true;
        } else return false;
      } else return false;
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.error?.message ||
          error?.message ||
          "An Error Occured"
      );
    }
  };

  getCurrentUser = async () => {
    try {
      let user = null;
      const cookiejwt = Cookies.get("sadSignIn");
      if (cookiejwt) {
        const res = await axios.get(
          `${conf.strapiUrl}/api/users/me?populate=role`,
          {
            headers: {
              Authorization: "Bearer " + cookiejwt,
            },
          }
        );
        user = res.data;
      }
      return user;
    } catch (error) {
      throw new Error(
        error.response?.data?.error?.message ||
          error?.message ||
          "An Error Occured"
      );
    }
  };

  logout = () => {
    try {
      Cookies.remove("sadSignIn");
    } catch (error) {
      throw new Error(
        error.response?.data?.error?.message ||
          error?.message ||
          "An Error Occured"
      );
    }
  };
}

const authService = new AuthService();
export default authService;
