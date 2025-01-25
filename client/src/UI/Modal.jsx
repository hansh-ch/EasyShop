function Modal({ isOpen, onClose, children }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center blur-0">
          <div className="fixed inset-0 w-full bg-black">
            <div className="absolute right-[30%] top-[40%] z-10 rounded-lg bg-white p-4">
              <button
                className="absolute right-5 text-right font-semibold text-black"
                onClick={onClose}
              >
                X
              </button>
              <div className="w-[400px]">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Modal;
