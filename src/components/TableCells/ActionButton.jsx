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
import conf from "@/conf/conf";

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
  const memberPhotoData = member.attributes.photo?.data?.attributes;

  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger>
          <div>
            <Button size="sm">View Details</Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activate/Block Member</DialogTitle>
            {memberPhotoData ? (
              <div>
                <img
                  className=" max-w-36 max-h-36 h-auto w-auto"
                  src={`${conf.strapiUrl}${memberPhotoData.url}`}
                  alt="Photo Not Accessible"
                />
              </div>
            ) : (
              <div>
                <h6>Photo Not Available</h6>
              </div>
            )}
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
                    "isWorker",
                    "photo",
                  ].includes(key)
                ) {
                  return (
                    <div key={key} className="py-2 border-b-[1px]">
                      <div className="flex gap-2">
                        <Label>{camelToFlat(key)}</Label>
                      </div>
                      <h6>{String(member.attributes[key]) || "-"}</h6>
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
