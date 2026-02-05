import React, { useEffect, useState } from "react";
import { Calendar, Clock, Download, Eye, Search, Loader2 } from "lucide-react";
import fetchHistory from "../utils/fetchHistory";
import { useAuth } from "../context/AuthContext";
import SummaryOutput from "../components/SummaryOutput";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SummaryPDF from "../components/SummaryPDF";

export default function HistoryPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [summaryHistory, setSummaryHistory] = useState([]);
    const [selectedSummary, setSelectedSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [limit] = useState(6);
    const [totalPages, setTotalPages] = useState(1);

    const { token } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPage(1);
        }, 400);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        const loadHistory = async () => {
            if (!token) return;
            try {
                setPageLoading(true);
                const data = await fetchHistory(token, page, limit, debouncedSearch);
                setSummaryHistory(data.history || []);
                setTotalPages(data.pagination?.totalPages || 1);
            } catch (error) {
                console.error("Failed to fetch history:", error);
            } finally {
                setLoading(false);
                setPageLoading(false);
            }
        };
        loadHistory();
    }, [token, page, debouncedSearch]);

    return (
        <div className="max-w-6xl mx-auto p-6 relative">
            {/* Search bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <h1 className="text-3xl font-semibold text-gray-100 mb-4 sm:mb-0">
                    Summary History
                </h1>

                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search summaries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full border border-[#2A314A] bg-[#0B0E14] 
                        text-gray-200 placeholder:text-gray-500 
                        px-3 py-2 rounded-md focus:outline-none 
                        focus:border-[#7C7CFF] transition-all"
                    />
                </div>
            </div>

            {/* Loader / Empty / Results */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                </div>
            ) : summaryHistory.length === 0 ? (
                <div className="text-center py-12">
                    <Clock className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-200 mb-2">
                        No summaries found
                    </h3>
                    <p className="text-gray-400">
                        {searchTerm
                            ? "Try adjusting your search terms"
                            : "Start summarizing videos to see your history here"}
                    </p>
                </div>
            ) : (
                <div className="relative">
                    {/* Page loading overlay */}
                    {pageLoading && (
                        <div className="absolute inset-0 bg-[#0B0E14]/70 backdrop-blur-sm flex items-center justify-center z-10">
                            <Loader2 className="w-10 h-10 text-[#7C7CFF] animate-spin" />
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {summaryHistory.map((item) => (
                            <div
                                key={item._id || item.id}
                                className="bg-[#131824] border border-[#2A314A] 
                                rounded-xl hover:-translate-y-1 transition-all duration-200 flex flex-col"
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-full h-40 sm:h-44 md:h-48 lg:h-40 object-cover rounded-t-xl"
                                />

                                <div className="p-4 flex flex-col h-full">
                                    <h3 className="font-semibold text-gray-200 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 mb-2">
                                        {item.channel}
                                    </p>

                                    <div className="flex items-center text-xs text-gray-500 mb-4">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {new Date(item.createdAt).toLocaleDateString()}
                                        <span className="mx-2">•</span>
                                        <Eye className="h-3 w-3 mr-1" />
                                        {item.views}
                                    </div>

                                    <div className="flex gap-2 mt-auto">
                                        <button
                                            onClick={() => setSelectedSummary(item)}
                                            className="flex-1 border border-[#2A314A] 
                                            cursor-pointer cursor-target text-sm rounded-lg px-3 py-1 
                                            text-gray-300 hover:bg-[#1A2033] transition"
                                        >
                                            <Eye className="h-4 w-4 inline-block mr-1" />
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-[#1A2033] text-gray-300 rounded 
                        hover:bg-[#2A314A] cursor-pointer 
                        disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        Prev
                    </button>

                    <span className="text-gray-400 font-medium">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-[#1A2033] text-gray-300 rounded 
                        hover:bg-[#2A314A] cursor-pointer 
                        disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Modal */}
            {selectedSummary && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4 hide-scrollbar">
                    <div className="relative max-w-5xl w-full bg-[#11141c] 
                    border border-[#2A314A] rounded-xl px-6 py-2 
                    overflow-auto max-h-[90vh] hide-scrollbar">
                        <div className="flex justify-between">

                            <div className="cursor-target">
                                <PDFDownloadLink
                                    document={<SummaryPDF summary={selectedSummary} />}
                                    fileName={`${selectedSummary.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`}
                                    className="flex items-center gap-2 bg-[#7C7CFF] 
                                text-white px-4 py-2 rounded-md 
                                hover:bg-[#6A6AF5] transition text-sm"
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
                            <button
                                onClick={() => setSelectedSummary(null)}
                                className="cursor-pointer  cursor-target w-8
                            text-gray-400 hover:text-gray-200 text-xl font-bold"
                            >
                                ✕
                            </button>
                        </div>

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
