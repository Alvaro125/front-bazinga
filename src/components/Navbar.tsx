import Image from "next/image";

export function Navbar() {
    return (
        <nav className="h-auto bg-indigo-700">
            <Image src="/logo_white.png" width={50} height={50} alt="logo" />
            <ul></ul>
        </nav>
    );
}
