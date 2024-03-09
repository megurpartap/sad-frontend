import memberService from "@/services/crudServices/memberServices";
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { AiFillDelete } from "react-icons/ai";

const BlockButton = ({ row }) => {
  const memberId = row.original.id;
  const blockMember = () => {
    console.log("ran");
    console.log(memberId);
    memberService
      .manageMember({ isBlocked: true }, memberId)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger>
          <AiFillDelete className="h-5 w-5" color="crimson" />
        </DialogTrigger>
        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete This User?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => blockMember()}
            >
              Delete
            </Button>
            <DialogClose>
              <Button size="sm">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlockButton;
