import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import memberService from "@/services/crudServices/memberServices";
import { useState } from "react";

function AddAdminButton() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  async function onSubmit() {
    try {
      setLoading(true);
      const res = await memberService.addNewAdmin({
        username,
        password,
        email: `username@sad.com`,
      });
      if (res) {
        alert("Member Added Successfully");
        setLoading(false);
      } else {
        alert("Error Occured");
        setLoading(false);
      }
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="primary">Add New Admin</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Admin</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onSubmit()} variant="primary">
            Add Admin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddAdminButton;
