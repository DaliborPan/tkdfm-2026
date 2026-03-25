"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useFormSecurityContext } from "../../../security/form";
import { Button } from "../../atoms/button";
import { FormInput } from "../../form/RHF-fields/form-input";
import { FormProvider } from "../../form/context/form-provider";

const formSchema = z
  .object({
    username: z.string().min(1, {
      message: "Uživatelské jméno musí být vyplněno",
    }),
    password: z.string().min(1, {
      message: "Heslo musí být vyplněno",
    }),
  })
  .required();

type FormSchema = z.infer<typeof formSchema>;

const useLogin = () => {
  const { loginCallback } = useFormSecurityContext();

  return useMutation({
    mutationFn: async ({ username, password }: FormSchema) => {
      await loginCallback(username, password);
    },
  });
};

export function LoginForm() {
  const { mutate, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: FormSchema) => {
    mutate(values);
  };

  return (
    <div className="space-y-10 bg-white p-10">
      <FormProvider editing={true} {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto my-8 w-96 space-y-2"
        >
          <FormInput name="username" label="Uživatelské jméno" size="m" />
          <FormInput
            type={showPassword ? "text" : "password"}
            name="password"
            label="Heslo"
            iconRight={{
              Icon: showPassword ? EyeOff : Eye,
              onClick: () => setShowPassword(!showPassword),
              className: "cursor-pointer pointer-events-auto",
            }}
            size="m"
          />
          <div className="pt-6 text-center">
            <Button
              variant="outlined"
              type="submit"
              size="m"
              isLoading={isPending}
            >
              Přihlásit se
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
