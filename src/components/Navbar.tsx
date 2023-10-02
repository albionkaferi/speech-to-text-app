import Link from "next/link";

function Navbar() {
    return (
        <nav className="flex justify-center my-8">
            <div className="max-w-lg w-1/2 py-4 flex justify-around items-center rounded-full shadow-xl bg-neutral-200 text-neutral-700">
            <div>
                <h1 className="font-extrabold">
                    <Link href='/'>
                        Transcribely
                    </Link>
                </h1>
            </div>
            <div className="">
                <Link href='/about' className="mx-2">About</Link>
                <Link href='/contact' className="mx-2">Contact</Link>
            </div>
            </div>
        </nav>
    )
}

export default Navbar;