import { useGetAllAgentsQuery, useGetAllTransactionsQuery, useGetAllUsersQuery } from "@/redux/features/admin/admin.api";
import { useMemo } from "react";
import { FaUsers, FaUserTie, FaMoneyBillWave, FaChartBar } from "react-icons/fa";

// Replace the simple spans with icons from react-icons/fa for a more professional look
const IconUsers = () => <FaUsers className="text-3xl text-white" />;
const IconAgents = () => <FaUserTie className="text-3xl text-white" />;
const IconTransactions = () => <FaMoneyBillWave className="text-3xl text-white" />;
const IconVolume = () => <FaChartBar className="text-3xl text-white" />;

export default function Analytics() {
  const { data: usersResp, isLoading: usersLoading } = useGetAllUsersQuery({});
  const { data: agentsResp, isLoading: agentsLoading } = useGetAllAgentsQuery({});
  const { data: txnsResp, isLoading: txnsLoading } = useGetAllTransactionsQuery({ page: 1, limit: 2000 });

  const overview = useMemo(() => {
    const totalUsers = usersResp?.data?.length ?? 0;
    const totalAgents = agentsResp?.data?.length ?? 0;

    let totalTxns = 0;
    let totalVolume = 0;
    if (txnsResp?.data) {
      totalTxns = txnsResp.data.length;
      for (const t of txnsResp.data) {
        totalVolume += Number(t.amount || 0);
      }
    }

    return { totalUsers, totalAgents, totalTxns, totalVolume };
  }, [usersResp, agentsResp, txnsResp]);

  const cards = [
    {
      title: "Total Users",
      value: overview.totalUsers.toLocaleString(),
      icon: <IconUsers />,
      loading: usersLoading,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Total Agents",
      value: overview.totalAgents.toLocaleString(),
      icon: <IconAgents />,
      loading: agentsLoading,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Transactions",
      value: overview.totalTxns.toLocaleString(),
      icon: <IconTransactions />,
      loading: txnsLoading,
      color: "from-yellow-500 to-orange-600",
    },
    {
      title: "Total Volume",
      value: `$${overview.totalVolume.toLocaleString()}`,
      icon: <IconVolume />,
      loading: txnsLoading,
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
          Admin Dashboard
        </h2>
        <p className="text-lg text-gray-600 text-center mb-10">
          A comprehensive overview of platform statistics.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`relative p-8 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.03] 
                bg-gradient-to-br ${card.color} text-white`}
            >
              <div className="absolute top-0 right-0 h-24 w-24 bg-white/10 rounded-full -mt-4 -mr-4"></div>
              <div className="absolute bottom-0 left-0 h-28 w-28 bg-white/10 rounded-full -mb-4 -ml-4"></div>

              <div className="relative z-10 flex items-center justify-between mb-4">
                <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                  {card.icon}
                </div>
              </div>
              <div className="relative z-10">
                <div className="text-5xl font-bold tracking-tight mb-1">
                  {card.loading ? (
                    <div className="h-10 w-32 bg-white/30 animate-pulse rounded"></div>
                  ) : (
                    card.value
                  )}
                </div>
                <div className="text-xl font-light opacity-90">{card.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}