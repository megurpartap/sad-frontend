import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import memberService from "@/services/crudServices/memberServices";
import MemberDetailsPanel from "@/components/Extra/MemberDetailsPanel";

const MemberDetailsPage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { memberId } = useParams();
  useEffect(() => {
    setLoading(true);
    memberService
      .getIsActive(memberId)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [memberId]);

  if (loading) {
    return (
      <div className="sm:py-4 w-full registerbg flex justify-center">
        <div className="w-full h-full bg-white fixed top-0 left-0 opacity-70 z-10"></div>
        <div className="sm:w-[700px] sm:border-[1px] h-full grid place-items-center border-gray-400 bg-white w-full sm:rounded-lg sm:shadow p-4 relative z-10">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="sm:py-4 w-full registerbg flex justify-center">
      <div className="w-full h-full bg-white fixed top-0 left-0 opacity-70 z-10"></div>
      {data && Object.keys(data).length > 0 ? (
        <MemberDetailsPanel memberData={data} />
      ) : (
        <div className="sm:w-[700px] sm:border-[1px] h-full grid place-items-center border-gray-400 bg-white w-full sm:rounded-lg sm:shadow p-4 relative z-10">
          <h1 className="text-2xl font-bold">No Member Available</h1>
        </div>
      )}
    </div>
  );
};

export default MemberDetailsPage;
