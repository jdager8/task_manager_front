"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input, Button } from "@nextui-org/react";

import { EyeSlashFilledIcon } from "../../../shared/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../../shared/icons/EyeFilledIcon";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();

  const handleSignIn = async () => {
    setIsSubmitting(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });
      if (res?.status === 200) {
        router.push("/tasks");
      }
    } catch (error) {}
  };

  return (
    <div className="mt-10">
      <form className="flex flex-col items-center gap-5">
        <Input
          isRequired
          isClearable
          type="text"
          label="Usuario"
          className="max-w-xs"
          variant="underlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          isRequired
          label="Contraseña"
          variant="bordered"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-xs"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between items-center gap-10">
          <Button
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            color="primary"
            variant="bordered"
            type="button"
            onPress={handleSignIn}
          >
            Iniciar sesión
          </Button>
          <Link href="/register">Registrarse</Link>
        </div>
      </form>
    </div>
  );
}
