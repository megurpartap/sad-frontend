import AddAdminButton from "@/components/Extra/AddAdminButton";
import MembersTable from "@/components/Tables/MembersTable";
import { Input } from "@/components/ui/input";
import memberService from "@/services/crudServices/memberServices";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  // useEffect(() => {
  //   console.log("this is inside dashboard");
  //   if (authStatus === false) {
  //     //   navigate("/");
  //     console.log("authStatus is false");
  //   }
  // }, [authStatus, navigate]);

  useEffect(() => {
    setLoading(true);
    try {
      memberService.getAllMembers().then((members) => {
        setData(members);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="mx-5">
      <div className="flex justify-end items-center mb-3">
        <AddAdminButton />
      </div>
      {!loading && data?.length > 0 && <MembersTable tableData={data} />}
    </div>
  );
};

export default AdminDashboardPage;
