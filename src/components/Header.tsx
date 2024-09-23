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
import { useWSQuery } from "../hooks";
import RegisterButton from "./Auth/RegisterButton";
import banner from "../images/banner.png";
import mine from "../images/mine.png";

const Header = () => {
  const [, setLocation] = useLocation();
  const { data: username } = useWSQuery("user.getSelf", null);
  return (
    <div className="w-full flex gap-4">
      <div className="grow" />
      <img src={banner} className="w-auto h-16" />
      <img
        src={mine}
        className="w-auto h-16 drop-shadow-[0px_0px_10px_#fff] -rotate-12"
      />
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
            <DropdownMenuItem>Logout</DropdownMenuItem>
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
