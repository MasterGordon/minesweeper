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

const RegisterButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          <input
            className="border-white/10 border-2 rounded-md p-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary">Register</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterButton;
