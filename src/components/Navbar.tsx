import Link from "next/link";

function Navbar() {
    return (
        <nav className="flex justify-center my-8">
            <div className="max-w-lg w-1/2 px-8 py-4 flex justify-between items-center rounded-full shadow-xl bg-neutral-200 text-neutral-700">
            <div>
                <h1 className="font-extrabold">
                    <Link href='/'>
                        Transcribely
                    </Link>
                </h1>
            </div>
            <div className="">
                <a className="mx-2">About</a>
                <a className="mx-2">Contact</a>
            </div>
            </div>
        </nav>
    )
}

export default Navbar;