import { useEffect, useState } from "react";

import type { DashboardStats } from "@model/dashboard/dashboard.model";
import { getDashboardStats } from "@service/dashboard/dashboardHome.service";

export function useDashboardStats() {
    const [stats, setStats] = useState<DashboardStats | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadStats() {
            try {
                setLoading(true);
                setError(null);

                const data = await getDashboardStats();

                setStats(data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load dashboard statistics."
                );
            } finally {
                setLoading(false);
            }
        }

        loadStats();
    }, []);

    return {
        stats,
        loading,
        error,
    };
}