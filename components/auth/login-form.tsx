"use client";

import { CardWrapper } from "@/components/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/lib/actions/login";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useTransition } from "react";
import {useSearchParams} from "next/navigation";

export const LoginForm = () => {
   const searchParams = useSearchParams();
   const urlError =
       searchParams.get("error") === "OAuthAccountNotLinked" && "Email already in use with different provider!";
   const [isPending, startTransition] = useTransition();
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [isVisible, setIsVisible] = useState<boolean>(false);

   const form = useForm<zod.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = (values: zod.infer<typeof LoginSchema>) => {
      setError("");
      setSuccess("");
      startTransition(() => {
         login(values).then((data) => {
            setError(data?.error);
            setSuccess(data?.success);
         });
      });
   };

   // @ts-ignore
   return (
      <CardWrapper
         headerLabel="Welcome back!"
         backButtonLabel="Don't have an account? Register Here"
         backButtonHref="/auth/register"
         showSocial
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <FormError message={error || urlError} />
               <FormSuccess message={success} />
               <div className="space-y-4">
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input
                                 type="email"
                                 {...field}
                                 placeholder="john.doe@example.com"
                                 disabled={isPending}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl>
                              <div className="flex items-center justify-between relative">
                                 <Input
                                    type={isVisible ? "text" : "password"}
                                    {...field}
                                    disabled={isPending}
                                 />
                                 <span
                                    className={`absolute right-4 cursor-pointer z-10 ${isPending && "text-gray-200 cursor-not-allowed"}`}
                                    onClick={() =>
                                       setIsVisible(
                                          (prevVisible) => !prevVisible
                                       )
                                    }
                                 >
                                    {isVisible ? <FaEye /> : <FaEyeSlash />}
                                 </span>
                              </div>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <Button type="submit" className="w-full">
                  Login
               </Button>
            </form>
         </Form>
      </CardWrapper>
   );
};
