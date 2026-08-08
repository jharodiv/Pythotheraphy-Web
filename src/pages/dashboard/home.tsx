import {
    CheckCircle2,
    Leaf,
    ShieldCheck,
    Users,
} from "lucide-react";

function StatCard({
    title,
    value,
    description,
    icon: Icon,
}: {
    title: string;
    value: string;
    description: string;
    icon: typeof Leaf;
}) {
    return (
        <div className="rounded-xl border border-[#e1e5de] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-[#7b847a]">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-semibold text-[#263126]">
                        {value}
                    </p>

                    <p className="mt-1 text-xs text-[#929a91]">
                        {description}
                    </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0f4ed]">
                    <Icon className="h-5 w-5 text-[#486344]" />
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <div className="space-y-6">
            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Plants"
                    value="124"
                    description="Plants in database"
                    icon={Leaf}
                />

                <StatCard
                    title="Verified Plants"
                    value="89"
                    description="Verified by admin"
                    icon={ShieldCheck}
                />

                <StatCard
                    title="Unverified Plants"
                    value="35"
                    description="Awaiting verification"
                    icon={CheckCircle2}
                />

                <StatCard
                    title="Total Users"
                    value="1,248"
                    description="Registered users"
                    icon={Users}
                />
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Plant verification */}
                <div className="rounded-xl border border-[#e1e5de] bg-white p-6 shadow-sm">
                    <div>
                        <h3 className="text-base font-semibold text-[#263126]">
                            Plant Verification
                        </h3>

                        <p className="mt-1 text-sm text-[#7b847a]">
                            Current verification status
                        </p>
                    </div>

                    <div className="mt-8 flex items-center justify-center">
                        <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-[22px] border-[#dfe7dc]">
                            <div className="absolute inset-[-22px] rounded-full border-[22px] border-transparent border-l-[#486344] border-t-[#486344] rotate-[-25deg]" />

                            <div className="text-center">
                                <p className="text-3xl font-semibold text-[#263126]">
                                    72%
                                </p>

                                <p className="text-xs text-[#8a9288]">
                                    Verified
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#486344]" />
                            <span className="text-[#687167]">
                                Verified
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#dfe7dc]" />
                            <span className="text-[#687167]">
                                Unverified
                            </span>
                        </div>
                    </div>
                </div>

                {/* User growth */}
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
                        {[35, 52, 45, 68, 60, 82, 95].map(
                            (height, index) => (
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
                            )
                        )}
                    </div>

                    <div className="mt-3 flex justify-between px-4 text-xs text-[#929a91]">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                    </div>
                </div>
            </div>
        </div>
    );
}