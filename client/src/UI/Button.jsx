import React from "react";

export default function Button({ variant, size, onClick, disabled, children }) {
  let classname =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 uppercase";

  const variants = {
    default: "bg-black text-primary-foreground hover:bg-primary/90 text-white",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };
  let newSize;
  if (!size) {
    newSize = sizes.default;
  } else {
    newSize = sizes.size;
  }
  let newVariant;
  if (!variant) {
    newVariant = variants.default;
  } else {
    newVariant = variants.variant;
  }

  return (
    <button
      className={`${classname} ${newSize} ${newVariant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
