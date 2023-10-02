import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex justify-center mt-8 mb-20">
      <div className="max-w-lg w-9/12 md:w-1/2 py-4 flex justify-center items-center space-x-4 rounded-full shadow-xl bg-cream text-neutral-700">
        <Link href="/about" className="mx-2">
          About
        </Link>
        <h1 className="font-extrabold text-lg">
          <Link href="/">Transcribely</Link>
        </h1>
        <Link href="/contact" className="mx-2">
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
