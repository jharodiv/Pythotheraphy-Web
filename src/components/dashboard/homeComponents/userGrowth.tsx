const userGrowth = [35, 52, 45, 68, 60, 82, 95];

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
];

export default function UserGrowth() {
    return (
        <div className="rounded-xl border border-[#e1e5de] bg-white p-6 shadow-sm">
            <div>
                <h3 className="text-base font-semibold text-[#263126]">
                    User Growth
                </h3>

                <p className="mt-1 text-sm text-[#7b847a]">
                    Registered users over time
                </p>
            </div>

            <div className="mt-8 flex h-48 items-end gap-4 border-b border-l border-[#e8ebe5] px-4 pb-0">
                {userGrowth.map((height, index) => (
                    <div
                        key={index}
                        className="flex flex-1 items-end justify-center"
                    >
                        <div
                            className="w-full max-w-10 rounded-t-md bg-[#9caf94] transition hover:bg-[#486344]"
                            style={{
                                height: `${height}%`,
                            }}
                        />
                    </div>
                ))}
            </div>

            <div className="mt-3 flex justify-between px-4 text-xs text-[#929a91]">
                {months.map((month) => (
                    <span key={month}>{month}</span>
                ))}
            </div>
        </div>
    );
}