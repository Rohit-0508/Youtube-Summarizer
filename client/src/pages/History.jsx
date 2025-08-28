import React, { useEffect, useState } from "react";
import { Calendar, Clock, Download, Eye, Search } from "lucide-react";
import fetchHistory from "../utils/fetchHistory";
import { useAuth } from "../context/AuthContext";
import SummaryOutput from "../components/SummaryOutput";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SummaryPDF from "../components/SummaryPDF";

export default function HistoryPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [summaryHistory, setSummaryHistory] = useState([]);
    const [selectedSummary, setSelectedSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [limit] = useState(6); // how many per page
    const [totalPages, setTotalPages] = useState(1);


    const { token } = useAuth();

    useEffect(() => {
        const loadHistory = async () => {
            if (!token) return;
            try {
                const data = await fetchHistory(token, page, limit);
                setSummaryHistory(data.history || []);
                setTotalPages(data.pagination?.totalPages || 1);
            } catch (error) {
                console.error("Failed to fetch history:", error);
            } finally {
                setLoading(false);
            }
        };
        loadHistory();
    }, [token, page]);

    const filteredHistory = summaryHistory.filter(
        (item) =>
            item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );








    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-100">
            {/* Search bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Summary History</h1>
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search summaries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full border border-gray-300 bg-white text-gray-900 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 focus:ring-0 transition-all"
                    />
                </div>
            </div>

            {/* Loader / Empty / Results */}
            {loading ? (
                <p className="text-center text-gray-500 py-10">Loading history...</p>
            ) : filteredHistory.length === 0 ? (
                <div className="text-center py-12">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No summaries found</h3>
                    <p className="text-gray-600">
                        {searchTerm ? "Try adjusting your search terms" : "Start summarizing videos to see your history here"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHistory.map((item) => (
                        <div
                            key={item._id || item.id}
                            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-40 sm:h-44 md:h-48 lg:h-40 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{item.channel}</p>
                                <div className="flex items-center text-xs text-gray-500 mb-4">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {new Date(item.createdAt).toLocaleDateString()}
                                    <span className="mx-2">•</span>
                                    <Eye className="h-3 w-3 mr-1" />
                                    {item.views}
                                </div>

                                {/* View and Download Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedSummary(item)}
                                        className="flex-1 border-2 border-gray-200 cursor-pointer text-sm ss rounded-lg px-3 py-1 hover:bg-gray-100"
                                    >
                                        <Eye className="h-4 w-4 inline-block mr-1" />
                                        View
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="text-gray-700">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}


            {/* Modal View */}
            {selectedSummary && (
                <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50 px-4">
                    <div className="relative max-w-5xl w-full bg-white rounded-lg shadow-lg p-6 pt-12 overflow-auto max-h-[90vh]">

                        {/* ✕ Close Button */}
                        <button
                            onClick={() => setSelectedSummary(null)}
                            className="absolute cursor-pointer top-3 right-3 text-gray-600 hover:text-black text-xl font-bold"
                            aria-label="Close"
                        >
                            ✕
                        </button>

                        {/* 🔽 Download Button aligned top-right */}
                        <div className="absolute top-3 right-12">
                            <PDFDownloadLink
                                document={<SummaryPDF summary={selectedSummary} />}
                                fileName={`${selectedSummary.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition text-sm"
                            >
                                {({ loading }) =>
                                    loading ? "Preparing PDF..." : (
                                        <>
                                            <Download className="h-4 w-4" />
                                            Download PDF
                                        </>
                                    )
                                }
                            </PDFDownloadLink>
                        </div>


                        {/* 🧾 Summary Content */}
                        <div id="summary-pdf-content" className="mt-4">
                            <SummaryOutput
                                summaryData={{
                                    ...selectedSummary,
                                    summary: selectedSummary.summary || selectedSummary.summaryText,
                                }}
                            />
                        </div>

                    </div>
                </div>
            )}


        </div>
    );
}
