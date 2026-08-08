interface HeaderProps {
    title: string;
    description: string;
}

export default function Header({
    title,
    description,
}: HeaderProps) {
    return (
        <header className="flex min-h-20 items-center justify-between border-b border-[#e8ebe5] bg-white px-8">
            <div>
                <h2 className="text-xl font-semibold text-[#263126]">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-[#7b847a]">
                    {description}
                </p>
            </div>
        </header>
    );
}