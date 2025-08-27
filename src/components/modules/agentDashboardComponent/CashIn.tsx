

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTransactionHistoryQuery } from "@/redux/features/agent/agent.api";

export default function CashIn() {
    const { data, isLoading, isError } = useTransactionHistoryQuery({
        page: 1,
        limit: 10,
    });

    if (isLoading)
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-xl font-semibold text-gray-700">Loading...</div>
            </div>
        );
    if (isError)
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-xl font-semibold text-red-500">Something went wrong!</div>
            </div>
        );

    const cashInTransactions = (data?.data || [])
        .filter((tx: any) => tx.type === "CASH_IN")
        .slice(0, 5);

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Recent Cash-In Transactions
            </h1>

            {cashInTransactions.length === 0 ? (
                <div className="flex items-center justify-center h-48 bg-white rounded-lg shadow-md">
                    <p className="text-gray-500 text-lg">No cash-in transactions found.</p>
                </div>
            ) : (
                <ul className="space-y-4">
                    {cashInTransactions.map((tx: any) => (
                        <li
                            key={tx._id}
                            className="relative p-6 bg-white rounded-xl shadow-lg border border-gray-200 transition-transform transform hover:scale-[1.02] hover:shadow-2xl duration-300 ease-in-out"
                        >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-4 md:space-y-0">
                                <div className="flex-1 space-y-2">
                                    <p className="text-lg text-gray-700">
                                        <span className="font-semibold text-gray-900">Amount:</span>{" "}
                                        <span className="text-blue-600 font-bold text-xl">${tx.amount}</span>
                                    </p>
                                    <p className="text-md text-gray-600">
                                        <span className="font-medium text-gray-800">User (Receiver):</span>{" "}
                                        {tx.receiverId?.name}
                                        <span className="text-sm text-gray-500 ml-2">({tx.receiverId?.email})</span>
                                    </p>
                                    <div>
                                        <div>
                                            <p className="text-md text-gray-600">
                                                <span className="font-medium text-gray-800">Status:</span>{" "}
                                                <span
                                                    className={`font-semibold text-white px-3 py-1 rounded-full text-xs uppercase tracking-wide ${tx.status === "SUCCESS"
                                                        ? "bg-green-500"
                                                        : tx.status === "PENDING"
                                                            ? "bg-yellow-500"
                                                            : "bg-red-500"
                                                        }`}
                                                >
                                                    {tx.status}
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            <div className="flex-none text-right pr-5">
                                                <p className="text-sm text-gray-500">
                                                    <span className="font-medium text-gray-700">Date:</span>{" "}
                                                    {new Date(tx.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
