import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import memberService from "@/services/crudServices/memberServices";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import roles from "@/constants/roles";

const RoleChanger = ({ row, table, column }) => {
  const { toast } = useToast();
  const memberId = row.original.id;
  const memberData = row.original.attributes;
  const onChangeToggle = (e) => {
    console.log(e);
    // if (!isChecked) {
    memberService
      .manageMember({ memberRole: e }, memberId)
      .then((res) => {
        table.options.meta?.updateData(row.index, column.id, e);
        toast({
          variant: "success",
          title: `${memberData.fullName} is now ${e}`,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title: `Could not change role of ${memberData.fullName} to ${e}`,
        });
      });
    // } else {
    //   memberService
    //     .manageMember({ isWorker: false }, memberId)
    //     .then((res) => {
    //       toast({
    //         variant: "destructive",
    //         title: `${memberData.fullName} is no longer a Worker`,
    //       });
    //       setChecked(false);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  };
  return (
    <div className="flex justify-center">
      <Select
        defaultValue={memberData.memberRole || "Member"}
        onValueChange={onChangeToggle}
      >
        <SelectTrigger>
          <SelectValue placeholder={memberData.memberRole || "Member"} />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleChanger;
