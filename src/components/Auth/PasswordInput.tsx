import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PasswordInput = ({ value, onChange }: PasswordInputProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border-white/10 border-1 rounded-md"
      />
      <div className="absolute right-2 top-2">
        <button
          className="bg-transparent text-white/70 hover:bg-white/05"
          onClick={() => setShow(!show)}
          tabIndex={-1}
        >
          {show ? <EyeOff /> : <Eye />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
