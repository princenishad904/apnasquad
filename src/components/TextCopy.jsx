"use client"; // agar tum Next.js 13+ app router use kar rahe ho

import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function TextCopy({ text = "pass text" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      toast.success("Copied");

      // 2 second baad reset
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="dark w-full py-1 px-2 rounded-md h-auto flex items-center gap-4 border border-gray-700 justify-between">
      <p className="text-gray-300">{text}</p>

      <Button
        onClick={handleCopy}
        variant={"outline"}
        className={"cursor-pointer size-8"}
      >
        <Copy size={5} />
      </Button>
    </div>
  );
}
