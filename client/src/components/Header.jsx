import chefClaudeLogo from "/src/images/chef-claude-icon.png";
import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-center gap-[11px] h-20 bg-white shadow-md">
      <img src={chefClaudeLogo} alt="chef claude icon" className="w-12" />
      <h1 className="font-normal"> Chef Claude</h1>
    </header>
  );
}
