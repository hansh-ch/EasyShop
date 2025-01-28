import { useState } from "react";
import { FaTimes } from "react-icons/fa";
function AdminMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((c) => !c);
  };
  return (
    <div>
      <button
        className={`${isMenuOpen ? "right-2 top-2" : "right-5 top-5"} fixed rounded-lg`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
            <div className="h-0.5 w-6 bg-white">X</div>
          </>
        )}
      </button>
    </div>
  );
}
export default AdminMenu;
