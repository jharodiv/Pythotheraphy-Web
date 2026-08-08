import { useState } from "react";

import Sidebar from "@components/dashboard/sidebar";
import Header from "@components/dashboard/header";

import Home from "@pages/dashboard/home";
import Plants from "@pages/dashboard/plants";
import Categories from "@pages/dashboard/categories";
import Users from "@pages/dashboard/users";

export default function DashboardLayout() {
    const [activePage, setActivePage] = useState("home");

    function renderPage() {
        switch (activePage) {
            case "plants":
                return <Plants />;

            case "categories":
                return <Categories />;

            case "users":
                return <Users />;

            default:
                return <Home />;
        }
    }

    function getHeader() {
        switch (activePage) {
            case "plants":
                return {
                    title: "Plants",
                    description:
                        "Manage and verify your plant database.",
                };

            case "categories":
                return {
                    title: "Categories",
                    description:
                        "Manage plant categories.",
                };

            case "users":
                return {
                    title: "Users",
                    description:
                        "Manage registered users.",
                };

            default:
                return {
                    title: "Dashboard",
                    description:
                        "Overview of your Phytotherapy application.",
                };
        }
    }

    const header = getHeader();

    function handleLogout() {
        console.log("Logout clicked");
    }

    return (
        <div className="flex min-h-screen bg-[#f4f6f2]">
            <Sidebar
                activePage={activePage}
                onNavigate={setActivePage}
                onLogout={handleLogout}
            />

            <div className="flex min-w-0 flex-1 flex-col">
                <Header
                    title={header.title}
                    description={header.description}
                />

                <main className="flex-1 overflow-y-auto p-8">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
}