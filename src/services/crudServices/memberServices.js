import axios from "axios";
import conf from "../../conf/conf";
import Cookies from "js-cookie";

export class MemberService {
  getAllMembers = async () => {
    try {
      const jwt = Cookies.get("sadSignIn");
      if (jwt) {
        const res = await axios.get(
          `${conf.strapiUrl}/api/members?filters[isBlocked][$ne]=true&populate=*`,
          {
            headers: {
              Authorization: "Bearer " + jwt,
            },
          }
        );
        if (res.data) return res.data.data;
      }
      return null;
    } catch (error) {
      throw new Error(
        error.response?.data?.error?.message ||
          error?.message ||
          "An Error Occured"
      );
    }
  };

  uploadImage = async (formData) => {
    try {
      const id = await fetch(`${conf.strapiUrl}/api/upload`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          return { id: data[0]?.id, status: true };
        });
      if (id.status) return id.id;
      else return null;
    } catch (error) {
      throw new Error(
        error.response?.data?.error?.message ||
          error?.message ||
          "An Error Occured"
      );
    }
  };

  addNewMember = async (data) => {
    try {
      const res = await axios.post(`${conf.strapiUrl}/api/members`, {
        data: data,
      });
      if (res.data) return { res: res.data, status: true };
      throw new Error("couldn't Add New Member");
    } catch (error) {
      throw new Error(
        error.response?.data?.error?.message ||
          error?.message ||
          "An Error Occured"
      );
    }
  };

  addNewAdmin = async (data) => {
    try {
      const { username, password, email, fullName } = data;
      const jwt = Cookies.get("sadSignIn");
      if (jwt) {
        const res = await axios.post(
          `${conf.strapiUrl}/api/users`,
          {
            username,
            email,
            fullName,
            password,
            role: 1,
            isConfirmed: true,
          },
          {
            headers: {
              Authorization: "Bearer " + jwt,
            },
          }
        );
        if (res.data) return { res: res.data, status: true };
        throw new Error("couldn't Add New Admin");
      }
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

  manageMember = async (data, id) => {
    try {
      const jwt = Cookies.get("sadSignIn");
      if (jwt) {
        const res = await axios.put(
          `${conf.strapiUrl}/api/members/${id}`,
          {
            data: data,
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

  getIsActive = async (memberId) => {
    console.log(memberId);
    try {
      const res = await axios.get(
        `${conf.strapiUrl}/api/member/${Number(memberId)}/isActiveMember`
      );
      if (res.data) return res.data;
      return null;
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
