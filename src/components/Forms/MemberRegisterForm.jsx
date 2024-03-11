import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import countries from "@/constants/countries.json";
import indianStates from "@/constants/indianStates.json";
import punjabDistricts from "@/constants/punjabDistricts.json";
import memberService from "@/services/crudServices/memberServices";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "../ui/label";

const skills = [
  {
    id: "journalism",
    label: "Journalism",
  },
  {
    id: "publicSpeaking",
    label: "Public Speaking",
  },
  {
    id: "socialMediaCampaign",
    label: "Social Media Campaign",
  },
  {
    id: "communityOrganizer",
    label: "Community Organizer",
  },
  {
    id: "audioVideoEditing",
    label: "Audio / Video Editing",
  },
  {
    id: "graphicsDesigner",
    label: "Graphics Designer",
  },
  {
    id: "webDesigner",
    label: "Web Designer",
  },
  {
    id: "writer",
    label: "Writer (Literature / Philosophy / Short Story)",
  },
];

const formSchema = z.object({
  fullName: z
    .string({
      required_error: "Full Name is required",
    })
    .min(1, "Full Name is required"),
  // email: z
  //   .string({
  //     required_error: "email-Id is required",
  //   })
  //   .email({ message: "Invalid email address" }),
  // adhaarNumber: z
  //   .string({
  //     required_error: "Adhaar Card Number is required",
  //   })
  //   .length(12, "Adhaar Card Number is required"),
  fatherHusbandName: z
    .string({
      required_error: "Father/Husband Name is required",
    })
    .min(1, "Father/Husband Name is required"),
  isHusbandName: z.boolean(),
  // mobileNumber: z
  //   .string({
  //     required_error: "Mobile Number is required",
  //   })
  //   .min(10, "Enter Valid Mobile Number"),
  // state: z
  //   .string({
  //     required_error: "State is required",
  //   })
  //   .min(1, "State is required"),
  // country: z
  //   .string({
  //     required_error: "Country is required",
  //   })
  //   .min(1, "Country is required"),
  // district: z
  //   .string({
  //     required_error: "District is required",
  //   })
  //   .min(1, "District is required"),
  // village: z.string().optional(),
  // tehsil: z.string().optional(),
  fullAddress: z
    .string({
      required_error: "Full Address is required",
    })
    .min(1, "Full Address is required"),
  // volunteerRegion: z
  //   .string({
  //     required_error: "Volunteer Region is required",
  //   })
  //   .min(1, "Volunteer Region is required"),
  // skills: z.array(z.string()).refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one item.",
  // }),
});

const MemberRegisterForm = ({ redirectUrl }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [photoValue, setPhotoValue] = useState(null);
  const [loading, setLoading] = useState(false);
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: undefined,
      email: undefined,
      adhaarNumber: undefined,
      fatherHusbandName: undefined,
      isHusbandName: false,
      mobileNumber: undefined,
      country: "IN",
      state: undefined,
      district: undefined,
      photo: undefined,
      // village: undefined,
      // tehsil: undefined,
      fullAddress: undefined,
      // volunteerRegion: undefined,
      // skills: [],
    },
  });

  const watchCountry = form.watch("country");
  const watchState = form.watch("state");
  // 2. Define a submit handler.
  async function onSubmit(data) {
    try {
      setLoading(true);
      if (!photoValue) {
        alert("Please Upload Photo");
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("files", photoValue);
      const id = await memberService.uploadImage(formData);
      if (id) {
        const res = await memberService.addNewMember({
          ...data,
          photo: id,
        });
        if (res) {
          toast({
            variant: "success",
            title: "Member Added Successfully",
          });
          setLoading(false);
          if (redirectUrl === "reload") window.location.reload();
          else navigate("/thankyou");
        } else {
          alert("Error Occured");
          setLoading(false);
        }
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
    <div className="sm:w-[1000px] sm:border-[1px] border-gray-400 bg-white w-full sm:rounded-lg sm:shadow p-4 relative z-10">
      <div className="formHeader  flex flex-col items-center sm:flex-row sm:justify-around border-b-2 border-gray-100 pb-6 ">
        <div className=" sm:w-2/12 w-1/3 flex items-center justify-center">
          <img src="/sad-logo.png" alt="" className="w-full" />
        </div>
        <div className=" sm:w-9/12 flex items-center justify-center">
          <h1 className="text-2xl sm:text-5xl text-center font-bold">
            Shiromani Akali Dal Amritsar Member Registration Form
          </h1>
        </div>
      </div>
      <div className="formBody py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* photo */}
            <div className=" sm:grid sm:grid-cols-1 sm:grid-rows-1 gap-4">
              <Label>Upload Your Photo</Label>
              <input
                type="file"
                placeholder="Upload Photo"
                name="photo"
                id="photo"
                onChange={(e) => setPhotoValue(e.target.files[0])}
              />
            </div>
            {/* full Name and fathers name */}
            <div className=" sm:grid sm:grid-cols-2 sm:grid-rows-1 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Full Name / ਤੁਹਾਡਾ ਪੂਰਾ ਨਾਮ</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormField
                  control={form.control}
                  name="fatherHusbandName"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormLabel>
                        Enter Father/Husband Name / ਤੁਹਾਡੇ ਪਿਤਾ / ਪਤੀ ਦਾ ਨਾਮ
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Father/Husband Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isHusbandName"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Please Check This Box If Entering Husband Name
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* email and number*/}
            <div className=" sm:grid sm:grid-cols-2 sm:grid-rows-1 gap-4">
              <FormField
                control={form.control}
                name="email"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Email / ਤੁਹਾਡੀ ਈ-ਮੇਲ ਆਈਡੀ</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobileNumber"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Phone Number / ਤੁਹਾਡਾ ਫੋਨ ਨੰਬਰ</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* address */}
            <div className=" sm:grid sm:grid-cols-1 sm:grid-rows-1 gap-4">
              <FormField
                control={form.control}
                name="fullAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Full Address / ਤੁਹਾਡਾ ਪੂਰਾ ਪਤਾ</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter Full Address " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* country ,state and district*/}
            <div className=" sm:grid sm:grid-cols-3 sm:grid-rows-1 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Country / ਤੁਹਾਡਾ ਨਿਵਾਸ ਦੇਸ਼</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Your Country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.countries.map((country) => (
                          <SelectItem key={country.code} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {watchCountry === "India" ? (
                <div>
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select State / ਤੁਹਾਡੀ ਸਟੇਟ</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {indianStates.states.map((state) => (
                              <SelectItem key={state.code} value={state.name}>
                                {state.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <div>
                  <FormField
                    control={form.control}
                    name="state"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter State / ਤੁਹਾਡੀ ਸਟੇਟ</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {watchCountry === "India" && watchState === "Punjab" ? (
                <div>
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select District / ਤੁਹਾਡਾ ਜ਼ਿਲ੍ਹਾ</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select District" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {punjabDistricts.districts.map((district) => (
                              <SelectItem key={district} value={district}>
                                {district}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="district"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter District / ਤੁਹਾਡਾ ਜ਼ਿਲ੍ਹਾ</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter District" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            {/* adhaar card*/}
            <div className=" sm:grid sm:grid-cols-1 sm:grid-rows-1 gap-4">
              <FormField
                control={form.control}
                name="adhaarNumber"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Enter Adhaar Card Number / ਤੁਹਾਡਾ ਅਧਾਰ ਕਾਰਡ ਨੰਬਰ
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Adhaar Card Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* village and tehsil */}
            {/* <div className=" sm:grid sm:grid-cols-2 sm:grid-rows-1 gap-4">
              <FormField
                control={form.control}
                name="village"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Village / Town / ਤੁਹਾਡਾ ਪਿੰਡ</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Village / Town" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tehsil"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Tehsil / ਤੁਹਾਡੀ ਤਹਿਸੀਲ</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Tehsil" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
            {/* skills */}
            {/* <div className=" sm:grid sm:grid-cols-1 sm:grid-rows-1 gap-4">
              <FormField
                control={form.control}
                name="skills"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        Select Skills / Expertise / ਤੁਹਾਡੇ ਹੁਨਰ
                      </FormLabel>
                    </div>
                    <div className="ml-4 flex flex-col gap-2">
                      {skills.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="skills"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
            {/* volunteer region */}
            {/* <div className=" sm:grid sm:grid-cols-1 sm:grid-rows-1 gap-4">
              <FormField
                control={form.control}
                name="volunteerRegion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Region In Which You Can Volunteer / ਤੁਸੀ ਕਿਸ ਜਿਲ੍ਹੇ ਵਿੱਚੋ
                      ਵਲੰਟੀਅਰ ਕਰ ਸਕਦੇ
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Region In Which You Can Volunteer "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
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
                {!loading ? "Register Now" : "Registering..."}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MemberRegisterForm;
