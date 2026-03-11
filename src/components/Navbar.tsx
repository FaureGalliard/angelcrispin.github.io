import Link from 'next/link'

const NAV_LINKS = ['about', 'projects', 'contact', 'experience'] as const

export default function Nav() {
    return (
        <nav className="top-0 inset-x-0 bg-white z-50">
            <div className="max-w-[760px] mx-auto px-6 flex items-center justify-between h-13">
                <Link
                    href="#"
                    className="text-[13px] text-black">
                    © Coded By Angel
                </Link>
                <ul className="flex gap-7 list-none">
                    {NAV_LINKS.map((l) => (
                        <li key={l}>
                            <Link
                                href={`#${l}`}
                                className="text-[13px] text-gray hover:text-black transition-colors">
                                {l.charAt(0).toUpperCase() + l.slice(1)}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
