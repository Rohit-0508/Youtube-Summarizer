import { Clock, Eye, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

const SummaryOutput = ({ summaryData }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (summaryData && summaryData.summary) {
      console.log(summaryData)
      // Slight delay to trigger transition
      const timer = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setVisible(false); // Hide when data is cleared
    }
  }, [summaryData]);

  if (!summaryData || !summaryData.summary) return null;

  const points = summaryData.summary
    .split('\n\n')
    .map((point, index) => {
      const htmlFormatted = point
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<strong>$1</strong>');

      return (
        <li key={index} className="flex items-start">
          <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: htmlFormatted.trim() }}
          />
        </li>
      );
    });

  return (
    <div
      className={`
    ${typeof window !== "undefined" && window.html2pdfPrinting ? "" : "transition-all duration-700 ease-out"}
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
  `}
    >

      <div className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden">
        <div className="p-8 flex flex-col md:flex-row gap-6">
          {/* Left: Thumbnail + Stats */}
          <div className="md:w-1/3">
            <img
              src={summaryData.thumbnail || "no Image"}
              alt="Video thumbnail"
              className="w-full rounded-lg shadow-md"
              height="200"
            />
            <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {summaryData.duration || "0:00"}
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {summaryData.views || "0"} views
              </div>
            </div>
          </div>

          {/* Right: Title + Points */}
          <div className="md:w-2/3">
            <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
              {summaryData.title}
            </h3>

            <div className="space-y-3">
              <h4 className="font-bold text-black flex items-center">
                <ThumbsUp className="h-4 w-4 mr-2 text-blue-600" />
                Key Points:
              </h4>

              <ul className="space-y-2">{points}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryOutput;
