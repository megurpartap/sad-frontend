import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import memberService from "@/services/crudServices/memberServices";
import { useToast } from "@/components/ui/use-toast";

const ActiveSwitch = ({ row }) => {
  const { toast } = useToast();
  const memberId = row.original.id;
  const [isChecked, setChecked] = useState(row.original.attributes.isActive);
  const onChangeToggle = () => {
    if (!isChecked) {
      memberService
        .manageMember({ isActive: true }, memberId)
        .then((res) => {
          toast({
            variant: "success",
            title: "Member Activated",
          });
          setChecked(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      memberService
        .manageMember({ isActive: false }, memberId)
        .then((res) => {
          toast({
            variant: "destructive",
            title: "Member Deactivated",
          });
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
