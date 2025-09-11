import { useEffect, useState } from "react";
import { Button } from "../Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Dialog";
import { useWSMutation } from "../../hooks";
import { useAtom } from "jotai";
import { loginTokenAtom } from "../../atoms";
import { useQueryClient } from "@tanstack/react-query";
import PasswordInput from "./PasswordInput";
import { wsClient } from "../../wsClient";

const RegisterButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const register = useWSMutation("user.register");
  const login = useWSMutation("user.login");
  const [, setToken] = useAtom(loginTokenAtom);

  useEffect(() => {
    setUsername("");
    setPassword("");
    setError("");
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" className="self-start">
          Register
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isLoginMode ? "Login" : "Register"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <label className="text-white/70 font-bold">Username</label>
          <input
            className="border-white/10 border-2 rounded-md p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="text-white/70 font-bold">Password</label>
          <PasswordInput value={password} onChange={setPassword} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setError("");
            }}
            className="text-sm text-white/60 hover:text-white/80"
          >
            {isLoginMode ? "Need an account? Register" : "Already have an account? Login"}
          </Button>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const mutation = isLoginMode ? login : register;
              mutation
                .mutateAsync({ username, password })
                .then(async (res) => {
                  setToken(res.token);
                  await wsClient.dispatch("user.loginWithToken", {
                    token: res.token,
                  });
                  await queryClient.resetQueries();
                  setIsOpen(false);
                })
                .catch((e) => {
                  setError(e);
                });
            }}
          >
            {isLoginMode ? "Login" : "Register"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterButton;
