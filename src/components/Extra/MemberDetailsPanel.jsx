import React from "react";
import { Badge } from "@/components/ui/badge";
import conf from "@/conf/conf";

const MemberDetailsPanel = ({ memberData }) => {
  return (
    <div className="sm:w-[700px] sm:border-[1px] border-gray-400 bg-white w-full sm:rounded-lg sm:shadow p-4 relative z-10">
      <div className="formHeader  flex flex-col items-center sm:flex-row sm:justify-around border-b-2 border-gray-100 pb-6 ">
        <div className=" sm:w-2/12 w-1/3 flex items-center justify-center">
          <img src="/sad-logo.png" alt="" className="w-full" />
        </div>
        <div className=" sm:w-9/12 flex items-center justify-center">
          <h1 className="text-2xl sm:text-5xl text-center font-bold">
            Shiromani Akali Dal Amritsar{" "}
            {memberData.memberRole ? memberData.memberRole : "Member"} Details
          </h1>
        </div>
      </div>
      <div className="formBody py-6">
        {/* Photo */}
        <div className="grid grid-cols-2 py-3 border-b-[1px] ">
          <h4 className=" text-xl font-bold">Photo</h4>
          <img
            className=" max-w-52 max-h-52 h-auto w-auto"
            // src={`${conf.strapiUrl}${memberData.photo.url}`}
            src={`${conf.strapiUrl}${memberData.photo.url}`}
          />
        </div>
        {/* Name */}
        <div className="grid grid-cols-2 py-3 border-b-[1px] ">
          <h4 className=" text-xl font-bold">Name</h4>
          <h4 className=" text-xl">{memberData.fullName}</h4>
        </div>
        {/* Father/Husband Name */}
        <div className="grid grid-cols-2 py-3 border-b-[1px] ">
          <h4 className=" text-xl font-bold">
            {memberData.isHusbandName ? "Husband's Name" : "Father's Name"}
          </h4>
          <h4 className=" text-xl">{memberData.fatherHusbandName}</h4>
        </div>
        {/* Adhaar Number */}
        <div className="grid grid-cols-2 py-3 border-b-[1px] ">
          <h4 className=" text-xl font-bold">Adhaar Number</h4>
          <h4 className=" text-xl">
            {memberData.adhaarNumber
              ? `XXXXXXXX${memberData.adhaarNumber.slice(8)}`
              : "-"}
          </h4>
        </div>
        {/* Country */}
        <div className="grid grid-cols-2 py-3 border-b-[1px] ">
          <h4 className=" text-xl font-bold">Country</h4>
          <h4 className=" text-xl">{memberData.country || "-"}</h4>
        </div>
        {/* State */}
        <div className="grid grid-cols-2 py-3 border-b-[1px] ">
          <h4 className=" text-xl font-bold">State</h4>
          <h4 className=" text-xl">{memberData.state || "-"}</h4>
        </div>
        {/* District */}
        <div className="grid grid-cols-2 py-3 border-b-[1px] ">
          <h4 className=" text-xl font-bold">District</h4>
          <h4 className=" text-xl">{memberData.district || "-"}</h4>
        </div>
        {/* Address */}
        <div className="grid grid-cols-2 py-3 border-b-[1px] ">
          <h4 className=" text-xl font-bold">Address</h4>
          <h4 className=" text-xl">{memberData.fullAddress || "-"}</h4>
        </div>
        {/* Phone */}
        <div className="grid grid-cols-2 py-3 border-b-[1px] ">
          <h4 className=" text-xl font-bold">Phone</h4>
          <h4 className=" text-xl">{memberData.mobileNumber || "-"}</h4>
        </div>
        {/* Email */}
        <div className="grid grid-cols-2 py-3 border-b-[1px] ">
          <h4 className=" text-xl font-bold">Email</h4>
          <h4 className=" text-xl">{memberData.email || "-"}</h4>
        </div>
        {/* Verified */}
        <div className="grid grid-cols-2 py-3 border-b-[1px] ">
          <h4 className=" text-xl font-bold">
            {`${
              memberData.memberRole ? memberData.memberRole : "Member"
            } Verification Status`}
          </h4>
          <Badge className="bg-green-600 w-min hover:bg-green-600 font-bold">
            Verified
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsPanel;
