import React from "react";

export default function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-base"
    >
      {children}
    </label>
  );
}
