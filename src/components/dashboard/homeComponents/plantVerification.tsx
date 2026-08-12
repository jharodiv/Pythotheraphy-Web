interface PlantVerificationProps {
    verified: number;
    unverified: number;
}

export default function PlantVerification({
    verified,
    unverified,
}: PlantVerificationProps) {
    const total = verified + unverified;

    const verifiedPercentage =
        total === 0
            ? 0
            : Math.round((verified / total) * 100);

    const unverifiedPercentage =
        total === 0
            ? 0
            : Math.round((unverified / total) * 100);

    return (
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
                    <div
                        className="absolute inset-[-22px] rotate-[-25deg] rounded-full border-[22px] border-transparent border-l-[#486344] border-t-[#486344]"
                    />

                    <div className="text-center">
                        <p className="text-3xl font-semibold text-[#263126]">
                            {verifiedPercentage}%
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
                        Verified{" "}
                        <span className="font-medium text-[#263126]">
                            {verifiedPercentage}%
                        </span>
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#dfe7dc]" />

                    <span className="text-[#687167]">
                        Unverified{" "}
                        <span className="font-medium text-[#263126]">
                            {unverifiedPercentage}%
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}