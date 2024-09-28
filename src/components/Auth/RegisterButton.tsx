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

const RegisterButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const register = useWSMutation("user.register");
  const [, setToken] = useAtom(loginTokenAtom);

  useEffect(() => {
    setUsername("");
    setPassword("");
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">Register</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
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
              register
                .mutateAsync({ username, password })
                .then((res) => {
                  setToken(res.token);
                  queryClient.invalidateQueries();
                })
                .catch((e) => {
                  setError(e);
                });
            }}
          >
            Register
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterButton;
