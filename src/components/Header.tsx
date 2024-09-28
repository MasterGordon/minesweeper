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
import banner from "../images/banner.png";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const [, setLocation] = useLocation();
  const { data: username } = useWSQuery("user.getSelf", null);
  const queryClient = useQueryClient();
  const logout = useWSMutation("user.logout", () => {
    queryClient.invalidateQueries();
  });

  return (
    <div className="w-full flex gap-4">
      <div className="grow" />
      <img src={banner} className="w-auto h-16 hidden sm:block" />
      <div className="grow" />

      {username ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <UserRound className="text-white/70" />
              <p className="text-white/70 font-bold">{username}</p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-white/70 w-auto mt-2 bg-black">
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
