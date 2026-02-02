// components/AIProcessingLoader.jsx
import { CheckCircle, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  "Fetching transcript",
  "Understanding context",
  "Generating summary",
];

export default function AIProcessingLoader() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) =>
        prev < steps.length - 1 ? prev + 1 : prev
      );
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center animate-pulse">
      <div
        className="
          w-full max-w-xl rounded-xl p-6
          bg-[#131824]
          border border-[#2A314A]
          shadow-[0_0_0_1px_rgba(124,124,255,0.1)]
        "
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[rgba(124,124,255,0.15)]">
            <Sparkles className="h-4 w-4 text-[#7C7CFF]" />
          </div>
          <h3 className="text-gray-100 font-semibold">
            AI is processing your video
          </h3>
        </div>

        {/* Steps */}
        <ul className="space-y-3">
          {steps.map((step, index) => {
            const isDone = index < activeStep;
            const isActive = index === activeStep;

            return (
              <li
                key={step}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg
                  transition-all duration-300
                  ${isActive ? "bg-[rgba(124,124,255,0.08)]" : ""}
                `}
              >
                {isDone ? (
                  <CheckCircle className="h-5 w-5 text-[#7C7CFF]" />
                ) : isActive ? (
                  <Loader2 className="h-5 w-5 text-[#7C7CFF] animate-spin" />
                ) : (
                  <div className="h-5 w-5 rounded-full border border-[#2A314A]" />
                )}

                <span
                  className={
                    isDone || isActive
                      ? "text-gray-200"
                      : "text-gray-500"
                  }
                >
                  {step}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Subtle progress hint */}
        <div className="mt-5 text-xs text-gray-500">
          This usually takes a few seconds depending on video length
        </div>
      </div>
    </div>
  );
}
