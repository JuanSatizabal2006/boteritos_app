export default function Buscador() {
  return (
    <form className="relative w-full max-w-full">
      <div className="relative flex items-center w-full max-w-[calc(100%_-_20px)] mx-auto">
        <button className="absolute inset-y-0 left-0 flex items-center p-2 text-[#9ca3af]">
          <i className="fas fa-search w-5 h-5"></i>
        </button>
        <input
          className="w-full max-w-[400px] h-10 pl-10 pr-3 py-2 border-2 border-darkBlue rounded-2xl focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
          placeholder="Buscar..."
          required
          type="text"
        />
      </div>
    </form>
  );
}
