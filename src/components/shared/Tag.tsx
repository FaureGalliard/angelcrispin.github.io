interface TagProps {
    children: string
}

export default function Tag({ children }: TagProps) {
    return (
        <span className="text-[11px] px-3 py-[5px] bg-white text-gray border-gray border text-center">
            {children}
        </span>
    )
}
