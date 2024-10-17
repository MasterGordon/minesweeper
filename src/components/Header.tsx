import { UserRound } from "lucide-react";
import { Button } from "./Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { useLocation } from "wouter";
import LoginButton from "./Auth/LoginButton";
import { useWSMutation, useWSQuery } from "../hooks";
import RegisterButton from "./Auth/RegisterButton";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { loginTokenAtom } from "../atoms";
import Gems from "./Gems";

const Header = () => {
  const [, setLocation] = useLocation();
  const { data: username } = useWSQuery("user.getSelf", null);
  const queryClient = useQueryClient();
  const [, setToken] = useAtom(loginTokenAtom);
  const logout = useWSMutation("user.logout", () => {
    setToken(undefined);
    queryClient.resetQueries();
  });
  const { data: gems } = useWSQuery("user.getOwnGems", null);

  return (
    <div className="w-full flex gap-4">
      <div className="grow" />

      {username ? (
        <DropdownMenu>
          {typeof gems?.count === "number" && <Gems count={gems?.count ?? 0} />}
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <UserRound className="text-white/70" />
              <p className="text-white/70 font-bold">{username}</p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setLocation("/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLocation("/settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout.mutate(null)}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <LoginButton />
          <RegisterButton />
        </>
      )}
    </div>
  );
};

export default Header;
