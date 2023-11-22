import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex justify-center mt-10 mb-10">
      <div className="max-w-lg w-9/12 md:w-1/2 py-4 flex justify-center items-center space-x-4 rounded-full outline outline-1 text-neutral-700">
        <Link href="/about" className="mx-2 font-bold hover:opacity-75">
          About
        </Link>
        <Link href="/" className="font-extrabold text-lg hover:opacity-75">
          Transcribely
        </Link>
        <Link href="/contact" className="mx-2 font-bold hover:opacity-75">
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
