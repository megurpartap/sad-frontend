import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import memberService from "@/services/crudServices/memberServices";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "../ui/checkbox";

const IsWorkerCheckBox = ({ row }) => {
  const { toast } = useToast();
  const memberId = row.original.id;
  const memberData = row.original.attributes;
  const [isChecked, setChecked] = useState(row.original.attributes.isWorker);
  const onChangeToggle = () => {
    if (!isChecked) {
      memberService
        .manageMember({ isWorker: true }, memberId)
        .then((res) => {
          toast({
            variant: "success",
            title: `${memberData.fullName} is now a Worker`,
          });
          setChecked(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      memberService
        .manageMember({ isWorker: false }, memberId)
        .then((res) => {
          toast({
            variant: "destructive",
            title: `${memberData.fullName} is no longer a Worker`,
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
      <Checkbox checked={isChecked} onCheckedChange={onChangeToggle} />
    </div>
  );
};

export default IsWorkerCheckBox;
