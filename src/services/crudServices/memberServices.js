import axios from "axios";
import conf from "../../conf/conf";
import Cookies from "js-cookie";

export class MemberService {
  getAllMembers = async () => {
    try {
      const jwt = Cookies.get("sadSignIn");
      if (jwt) {
        const res = await axios.get(
          `${conf.strapiUrl}/api/members?filters[blocked][$ne]=true&populate=role`,
          {
            headers: {
              Authorization: "Bearer " + jwt,
            },
          }
        );
        if (res.data) return res.data;
      }
      return null;
    } catch (error) {
      throw new Error(
        error.response?.data?.error?.message ||
          error?.message ||
          "An Error Occured"
      );
    }
    return null;
  };

  addNewMember = async ({
    membername,
    fullName,
    email,
    // role,
    mobileNumber,
    password,
  }) => {
    try {
      const jwt = Cookies.get("sadSignIn");
      if (jwt) {
        const res = await axios.post(
          `${conf.strapiUrl}/api/staff/addNewMember`,
          {
            data: {
              membername,
              fullName,
              email,
              // role,
              mobileNumber,
              password,
            },
          },
          {
            headers: {
              Authorization: "Bearer " + jwt,
            },
          }
        );
        if (res.data) return { res: res.data, status: true };
      }
      throw new Error("couldn't Add New Member");
    } catch (error) {
      throw new Error(
        error.response?.data?.error?.message ||
          error?.message ||
          "An Error Occured"
      );
    }
  };

  deleteMember = async (memberId) => {
    try {
      const jwt = Cookies.get("sadSignIn");
      if (jwt) {
        const res = await axios.delete(
          `${conf.strapiUrl}/api/staff/${memberId}`,
          {
            headers: {
              Authorization: "Bearer " + jwt,
            },
          }
        );
        if (res.data) return { res: res.data, status: true };
      }
      throw new Error("Couldn't Delete Member");
    } catch (error) {
      throw new Error(
        error.response?.data?.error?.message ||
          error?.message ||
          "An Error Occured"
      );
    }
  };

  manageMember = async ({
    id,
    membername,
    fullName,
    email,
    // role,
    mobileNumber,
  }) => {
    try {
      const jwt = Cookies.get("sadSignIn");
      if (jwt) {
        const res = await axios.put(
          `${conf.strapiUrl}/api/staff/${id}`,
          {
            data: {
              membername,
              fullName,
              email,
              // role,
              mobileNumber,
            },
          },
          {
            headers: {
              Authorization: "Bearer " + jwt,
            },
          }
        );
        if (res.data) return { res: res.data, status: true };
      }
      throw new Error("couldn't Update Member");
    } catch (error) {
      throw new Error(
        error.response?.data?.error?.message ||
          error?.message ||
          "An Error Occured"
      );
    }
  };
}

const memberService = new MemberService();
export default memberService;
