import { Search, Users as UsersIcon } from "lucide-react";

export default function Users() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-[#263126]">
                    Users
                </h3>

                <p className="mt-1 text-sm text-[#7b847a]">
                    View and manage registered users.
                </p>
            </div>

            <div className="rounded-xl border border-[#e1e5de] bg-white shadow-sm">
                <div className="border-b border-[#e8ebe5] p-4">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#929a91]" />

                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full rounded-lg border border-[#dfe4dc] py-2.5 pl-9 pr-3 text-sm text-black outline-none focus:border-[#aab8a5] focus:ring-2 focus:ring-[#edf2ea]"
                        />
                    </div>
                </div>

                <div className="flex min-h-64 flex-col items-center justify-center text-center">
                    <UsersIcon className="h-10 w-10 text-[#b3c0ae]" />

                    <p className="mt-3 text-sm font-medium text-[#596257]">
                        No users to display
                    </p>

                    <p className="mt-1 text-xs text-[#929a91]">
                        User data will be connected later.
                    </p>
                </div>
            </div>
        </div>
    );
}