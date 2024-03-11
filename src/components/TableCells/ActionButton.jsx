import { AiFillEdit } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import React, { useState } from "react";
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
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import moment from "moment";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "../ui/label";
import conf from "@/conf/conf";
import memberService from "@/services/crudServices/memberServices";
import { toast } from "../ui/use-toast";
import { Input } from "../ui/input";

const camelToFlat = (camel) => {
  const camelCase = camel.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");

  let flat = "";

  camelCase.forEach((word) => {
    flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " ";
  });
  return flat;
};

const ActionButton = ({ row, column, table }) => {
  const [doj, setDoj] = useState(row.original?.attributes?.doj);
  const [printDoj, setPrintDoj] = useState(row.original?.attributes?.doj);
  const [manualId, setManualId] = useState(row.original?.attributes?.manualId);
  const [printManualId, setPrintManualId] = useState(
    row.original?.attributes?.manualId
  );
  const member = row.original;
  const memberPhotoData = member.attributes.photo?.data?.attributes;
  const changeDoj = () => {
    memberService
      .manageMember({ doj: doj }, member.id)
      .then((res) => {
        table.options.meta?.updateData(row.index, "doj", doj);
        toast({
          variant: "success",
          description: "Date of Issue Updated",
        });
        setPrintDoj(doj);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: "Date of Issue Update Failed",
        });
      });
  };

  const changeManualId = () => {
    memberService
      .manageMember({ manualId: manualId }, member.id)
      .then((res) => {
        table.options.meta?.updateData(row.index, "manualId", manualId);
        toast({
          variant: "success",
          description: "Serial Number Updated",
        });
        setPrintManualId(manualId);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: "Serial Number Update Failed. " + err.message,
        });
      });
  };

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
            <div className="flex justify-between items-center ">
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
              <div className="flex flex-col items-start">
                <div className="mt-3 flex items-center gap-4">
                  <Label>Date of Issue :</Label>
                  <p>{printDoj || "Not Set"}</p>
                  <Dialog>
                    <DialogTrigger>
                      <div>
                        <BsPencilSquare />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-[400px]">
                      <DialogHeader>
                        <DialogTitle>Edit Date of Issue</DialogTitle>
                        <DialogDescription>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] justify-start text-left font-normal mt-2",
                                  !doj && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {doj ? (
                                  format(doj, "PPP")
                                ) : (
                                  <span>Select Date of Issue</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="end"
                              side="down"
                            >
                              <Calendar
                                mode="single"
                                selected={doj}
                                onSelect={(e) => {
                                  setDoj(moment(e).format("YYYY-MM-DD"));
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </DialogDescription>
                        <DialogFooter>
                          <Button size="sm" onClick={() => changeDoj()}>
                            Save
                          </Button>
                        </DialogFooter>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <Label>Serial Number :</Label>
                  <p>{printManualId || "Not Set"}</p>
                  <Dialog>
                    <DialogTrigger>
                      <div>
                        <BsPencilSquare />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-[400px]">
                      <DialogHeader>
                        <DialogTitle>Edit Serial Number</DialogTitle>
                        <DialogDescription>
                          <Input
                            className="w-[240px] justify-start text-left font-normal mt-2"
                            placeholder="Enter Serial Number"
                            value={manualId || ""}
                            onChange={(e) => setManualId(e.target.value)}
                          />
                        </DialogDescription>
                        <DialogFooter>
                          <Button size="sm" onClick={() => changeManualId()}>
                            Save
                          </Button>
                        </DialogFooter>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
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
                    "skills",
                    "volunteerRegion",
                    "village",
                    "tehsil",
                    "uid",
                    "doj",
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
