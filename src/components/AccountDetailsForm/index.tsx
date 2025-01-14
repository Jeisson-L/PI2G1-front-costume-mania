import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { UserData } from "@/pages/account";
import Form from "../Form";
import FormInput from "../Form/FormInput";
import Button from "../Button";

// validation
const AccountDetailsSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should have at least 6 characters")
    .max(32, "Max password length is 32")
    .required("Password is required"),
  lastName: yup
    .string()
    .min(2, "Last name should have at least 2 characters")
    .max(50, "Last name should not exceed 50 characters")
    .required("Last name is required"),
  firstName: yup
    .string()
    .min(2, "First name should have at least 2 characters")
    .max(50, "First name should not exceed 50 characters")
    .required("First name is required"),
  personalId: yup.string().required("First name is required"),
  phone: yup
    .string()
    .min(8, "Phone number should have at least 8 characters")
    .required("Phone number is required"),
  address: yup
    .string()
    .min(5, "Address should have at least 5 characters")
    .max(100, "Address should not exceed 100 characters")
    .required("Address is required"),
  city: yup
    .string()
    .min(3, "City should have at least 3 characters")
    .required("City is required"),
  zipCode: yup
    .string()
    .min(4, "Zip code should have at least 4 characters")
    .required("Zip code is required"),
  country: yup
    .string()
    .min(3, "City should have at least 3 characters")
    .required("City is required"),
});

function AccountDetailsForm({ account, className }: { account: UserData, className?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AccountDetailsSchema) });

  const { data: session } = useSession();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <>
      <Form className={`w-full rounded p-2 border mb-8 ${className}`} onSubmit={onSubmit} >
        <h3 className="border-b-2 border-purple-3 py-2 mb-4 text-2xl font-bold">Account details</h3>
        <Form.Body register={register} className="flex flex-wrap">
          <FormInput
            name="email"
            type="email"
            label="Email"
            error={errors.email?.message}
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            value={account.email}
          />
          <FormInput
            name="password"
            type="password"
            label="Password"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            value={account.password}
            error={errors.password?.message}
          />
        </Form.Body>

        {/* Personal information */}
        <h3 className="border-b-2 border-purple-3 py-2 mb-4 text-2xl font-bold">Personal Information</h3>
        <Form.Body register={register} className="flex flex-wrap">
          <FormInput
            name="lastName"
            label="Last Name"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            value={account.lastName}
            error={errors.lastName?.message}
          />
          <FormInput
            name="firstName"
            label="First Name"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            value={account.firstName}
            error={errors.firstName?.message}
          />
          <FormInput
            name="personalId"
            label="Identification Number"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            value={account.personalId}
            error={errors.personalId?.message}
          />
          <FormInput
            name="birth"
            label="Birthday"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            value={account.birth}
            error={errors.address?.message}
          />
        </Form.Body>

        {/* Contact */}
        <h3 className="border-b-2 border-purple-3 py-2 mb-4 text-2xl font-bold">Contact</h3>
        <Form.Body register={register} className="flex flex-wrap">
          <FormInput
            name="phone"
            label="Phone Number"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            value={account.phone}
            error={errors.phone?.message}
          />
          <FormInput
            name="address"
            label="Address"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            value={account.address}
            error={errors.address?.message}
          />
          <FormInput
            name="city"
            label="City"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            value={account.city}
            error={errors.city?.message}
          />
          <FormInput
            name="zipCode"
            label="Zip Code"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            value={account.zipCode}
            error={errors.zipCode?.message}
          />
          <FormInput
            name="country"
            label="Country"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            value={account.country}
            error={errors.country?.message}
          />
        </Form.Body>
        <Form.ButtonSection className="mt-4 flex justify-center gap-4">
          <Button label="Save" buttonStyle="primary" type="submit"/>
        </Form.ButtonSection>
      </Form>
    </>
  );
}

export default AccountDetailsForm;
