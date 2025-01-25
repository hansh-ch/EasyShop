import Input from "./Input";
import Label from "./Label";
import Button from "./Button";
function CategoryForm({ value, setValue, onClick, isOpen, onClick2 }) {
  console.log(isOpen);
  return (
    <div className="p-3">
      <form className="space-y-3">
        <Label htmlFor="name">Name:</Label>
        <Input
          type="text"
          id="name"
          placeholder="e.g., sofa"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <Button variant="" onClick={(e) => onClick(e)}>
            {isOpen ? "update" : "Submit"}
          </Button>
          {isOpen && (
            <button
              className="rounded border-white bg-red-500 px-4 py-2 uppercase text-white hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-pink-500"
              onClick={(e) => onClick2(e)}
            >
              delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
export default CategoryForm;
