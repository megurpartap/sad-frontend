import { BsPencilSquare } from "react-icons/bs";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";

const camelToFlat = (camel) => {
  const camelCase = camel.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");

  let flat = "";

  camelCase.forEach((word) => {
    flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " ";
  });
  return flat;
};

const ActionButton = ({ row }) => {
  const member = row.original;

  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger>
          <div>
            <Button size="sm">Manage</Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activate/Block Member</DialogTitle>
            <div className=" grid grid-cols-4 py-4 ">
              {Object.keys(member.attributes).map((key) => {
                if (
                  ![
                    "id",
                    "createdAt",
                    "updatedAt",
                    "publishedAt",
                    "isBlocked",
                    "isActive",
                  ].includes(key)
                ) {
                  return (
                    <div key={key} className="py-2 border-b-[1px]">
                      <div className="flex gap-2">
                        <Label>{camelToFlat(key)}</Label>
                        {/* <BsPencilSquare
                          className="h-4 w-4 opacity-65"
                          color="gray"
                        /> */}
                      </div>
                      <h6>{String(member.attributes[key])}</h6>
                    </div>
                  );
                }
              })}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionButton;
