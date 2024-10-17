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
import { useQueryClient } from "@tanstack/react-query";
import { useWSMutation } from "../../hooks";
import { useAtom } from "jotai";
import { loginTokenAtom } from "../../atoms";
import PasswordInput from "./PasswordInput";
import { wsClient } from "../../wsClient";

const LoginButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const login = useWSMutation("user.login");
  const [, setToken] = useAtom(loginTokenAtom);

  useEffect(() => {
    setUsername("");
    setPassword("");
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Login</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
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
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              login
                .mutateAsync({ username, password })
                .then(async (res) => {
                  setToken(res.token);
                  await wsClient.dispatch("user.loginWithToken", {
                    token: res.token,
                  });
                  await queryClient.resetQueries();
                })
                .catch((e) => {
                  setError(e);
                });
            }}
          >
            Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginButton;
