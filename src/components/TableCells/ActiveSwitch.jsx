import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import memberService from "@/services/crudServices/memberServices";

const ActiveSwitch = ({ row }) => {
  const memberId = row.original.id;
  const [isChecked, setChecked] = useState(row.original.attributes.isActive);
  const onChangeToggle = () => {
    if (!isChecked) {
      memberService
        .manageMember({ isActive: true }, memberId)
        .then((res) => {
          setChecked(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      memberService
        .manageMember({ isActive: false }, memberId)
        .then((res) => {
          setChecked(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="flex justify-center">
      <Switch checked={isChecked} onCheckedChange={onChangeToggle} />
    </div>
  );
};

export default ActiveSwitch;
