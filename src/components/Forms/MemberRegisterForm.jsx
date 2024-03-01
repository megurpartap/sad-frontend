import React from "react";
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

const interests = [
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
  email: z
    .string({
      required_error: "email-Id is required",
    })
    .email({ message: "Invalid email address" }),
  adhaarCardNumber: z
    .string({
      required_error: "Adhaar Card Number is required",
    })
    .length(12, "Adhaar Card Number is required"),
  fatherHusbandName: z
    .string({
      required_error: "Father/Husband Name is required",
    })
    .min(1, "Father/Husband Name is required"),
  isHusbandName: z.boolean(),
  mobileNumber: z
    .string({
      required_error: "Mobile Number is required",
    })
    .length(10, "Mobile Number is required"),
  state: z
    .string({
      required_error: "State is required",
    })
    .min(1, "State is required"),
  country: z
    .string({
      required_error: "State is required",
    })
    .min(1, "State is required"),
  district: z
    .string({
      required_error: "District is required",
    })
    .min(1, "District is required"),
  village: z.string().optional(),
  tehsil: z.string().optional(),
  fullAddress: z
    .string({
      required_error: "Full Address is required",
    })
    .min(1, "Full Address is required"),
  volunteerRegion: z
    .string({
      required_error: "Volunteer Region is required",
    })
    .min(1, "Volunteer Region is required"),
  interests: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

const MemberRegisterForm = () => {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: undefined,
      email: undefined,
      adhaarCardNumber: undefined,
      fatherHusbandName: undefined,
      isHusbandName: false,
      mobileNumber: undefined,
      state: undefined,
      district: undefined,
      village: undefined,
      tehsil: undefined,
      fullAddress: undefined,
      volunteerRegion: undefined,
      interests: [],
    },
  });

  const watchCountry = form.watch("country");
  const watchState = form.watch("state");
  // 2. Define a submit handler.
  function onSubmit(values) {
    console.log(values);
  }
  return (
    <div className="sm:w-[700px] sm:mt-3 sm:border-[1px] border-gray-400 bg-white w-full sm:rounded-lg sm:shadow p-4 relative z-10">
      <div className="formHeader sm:flex sm:justify-around border-b-2 border-gray-100 pb-6 ">
        <div className=" w-2/12 flex items-center justify-center">
          <img src="/sad-logo.png" alt="" srcset="" className="w-full" />
        </div>
        <div className="w-9/12 flex items-center justify-center">
          <h1 className="text-5xl text-center font-bold">
            Shiromani Akali Dal Amritsar Member Registration Form
          </h1>
        </div>
      </div>
      <div className="formBody py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
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
            </div>
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
              <FormField
                control={form.control}
                name="adhaarCardNumber"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Enter Adhaar Card Number / ਤੁਹਾਡਾ ਅਧਾਰ <br />
                      ਕਾਰਡ ਨੰਬਰ
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
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
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
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
              {console.log(form.getValues("country"))}
              {watchCountry === "IN" ? (
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
              ) : (
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
              )}

              {watchCountry === "IN" && watchState === "Punjab" ? (
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
            <div className="grid grid-cols-1 grid-rows-1 gap-4">
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
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
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
                name="email"
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
            </div>
            <div className="grid grid-cols-1 grid-rows-1 gap-4">
              <FormField
                control={form.control}
                name="photo"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Your Photo / ਤੁਹਾਡੀ ਫੋਟੋ </FormLabel>
                    <FormControl>
                      <Input type="file" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 grid-rows-1 gap-4">
              <FormField
                control={form.control}
                name="interests"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        Select Skills / Expertise / ਤੁਹਾਡੇ ਹੁਨਰ
                      </FormLabel>
                    </div>
                    <div className="ml-4 flex flex-col gap-2">
                      {interests.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="interests"
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
            </div>
            <div className="grid grid-cols-1 grid-rows-1 gap-4">
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
            </div>
            <div className="border-t-2 sm:flex border-gray-100 pt-6">
              <Button size="lg" type="submit" className="w-full text-xl">
                Register Now
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MemberRegisterForm;
