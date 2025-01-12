function Input({ type, id, value, onChange, placeholder }) {
  let classname =
    "border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      required
      className={classname}
      placeholder={placeholder}
    />
  );
}
export default Input;
