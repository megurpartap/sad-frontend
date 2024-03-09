import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import authService from "@/services/auth/auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "@/store/authSlice";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(1, "Username is required"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required"),
});

const LoginForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: undefined,
      password: undefined,
    },
  });

  // 2. Define a submit handler.
  const login = async (data) => {
    // dispatch(setError(""));
    try {
      setLoading(true);
      const loginStatus = await authService.login(data);
      if (loginStatus) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          console.log(userData);
          dispatch(authLogin(userData));
          // dispatch(setSuccess("Login successful"));
          toast({
            variant: "success",
            title: "Login successful",
          });
          navigate("/admin/dashboard");
        }
      }
    } catch (error) {
      // dispatch(setError(error.message));
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:w-[700px] sm:my-3 sm:border-[1px] border-gray-400 bg-white w-full sm:rounded-lg sm:shadow p-4 relative z-10">
      <div className="formHeader  flex flex-col items-center sm:flex-row sm:justify-around border-b-2 border-gray-100 pb-6 ">
        <div className=" sm:w-2/12 w-1/3 flex items-center justify-center">
          <img src="/sad-logo.png" alt="" className="w-full" />
        </div>
        <div className=" sm:w-9/12 flex items-center justify-center">
          <h1 className="text-2xl sm:text-5xl text-center font-bold">
            Shiromani Akali Dal Amritsar Login Form
          </h1>
        </div>
      </div>
      <div className="formBody py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(login)} className="space-y-4">
            {/* username and password */}
            <div>
              <FormField
                control={form.control}
                name="username"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Mobile Number / Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Mobile Number / Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="password"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="border-t-2 sm:flex border-gray-100 pt-6">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                className="w-full text-xl"
                disabled={loading}
              >
                {loading && (
                  <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                )}
                {!loading ? "Login Now" : "Logging..."}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
