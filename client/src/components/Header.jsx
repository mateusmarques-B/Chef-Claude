import chefClaudeLogo from "/src/images/chef-claude-icon.png";
import React from "react";

export default function Header() {
  return (
    <header>
      <img src={chefClaudeLogo} alt="chef claude icon" />
      <h1> Chef Claude</h1>
    </header>
  );
}
