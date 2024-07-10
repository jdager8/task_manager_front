"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input, Button } from "@nextui-org/react";

import { register } from "../../../services/auth";

import { EyeSlashFilledIcon } from "../../../shared/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../../shared/icons/EyeFilledIcon";

export default function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await register({ username, email, password });
      if (res?.status === 200) {
        router.push("/login");
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
          isClearable
          type="email"
          label="Email"
          className="max-w-xs"
          variant="underlined"
          onChange={(e) => setEmail(e.target.value)}
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
            color="primary"
            variant="bordered"
            type="button"
            onPress={handleSignIn}
          >
            Registrar
          </Button>
          <Link href="/login">Volver</Link>
        </div>
      </form>
    </div>
  );
}
