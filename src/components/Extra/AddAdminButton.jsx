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
import MemberRegisterForm from "../Forms/MemberRegisterForm";
import { useToast } from "@/components/ui/use-toast";

function AddAdminButton() {
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  async function onSubmit() {
    try {
      if (password !== confirmPassword) {
        alert("Password and Confirm Password should be same");
        return;
      }
      // verify each field is filled
      if (!fullName || !email || !username || !password || !confirmPassword) {
        alert("All Fields are Required");
        return;
      }
      // trim mobile number
      setUsername(username.trim());
      // verify mobile number doesn't have country code
      if (username.length !== 10 && username.charAt(0) === "+") {
        alert(
          "Mobile Number should be 10 digits. No Need of country code if present"
        );
        return;
      }
      setLoading(true);
      const res = await memberService.addNewAdmin({
        username,
        password,
        email,
        fullName,
      });
      if (res) {
        toast({
          variant: "success",
          title: "Admin Added Successfully",
        });
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
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant="primary" className="mt-4">
            Add New Admin
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Admin</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Full Name
              </Label>
              <Input
                id="fullName"
                placeholder="Enter Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Mobile Number
              </Label>
              <Input
                id="username"
                placeholder="Enter Mobile Number"
                type="tel"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Enter Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirmPassword" className="text-right">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                placeholder="Enter Password Again"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
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
      <Dialog>
        <DialogTrigger>
          <Button variant="primary" className="mt-4 ml-4">
            Add New Member
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-max overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
          </DialogHeader>
          <MemberRegisterForm redirectUrl="reload" />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddAdminButton;
