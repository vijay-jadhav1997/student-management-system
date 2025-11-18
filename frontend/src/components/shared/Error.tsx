import { useState, type FC } from "react";
import { FiAlertTriangle, FiChevronDown, FiRefreshCw } from "react-icons/fi";

type Props = {
  title?: string;
  message?: string;
  details?: string | React.ReactNode;
  onRetry?: () => void;
  className?: string;
  compact?: boolean; // smaller variant (e.g., inline widgets)
};

const Error: FC<Props> = ({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  details,
  onRetry,
  className = "",
  compact = false,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      role="alert"
      className={[
        "w-full rounded-2xl border border-red-200 bg-red-50/60 text-red-900",
        compact ? "p-3" : "p-5",
        "shadow-sm",
        className,
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-red-100">
          <FiAlertTriangle className="h-5 w-5" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className={"font-semibold " + (compact ? "text-sm" : "text-base")}>
            {title}
          </h3>
          <p className={"mt-1 text-red-800 " + (compact ? "text-xs" : "text-sm")}>
            {message}
          </p>

          {details && (
            <div className="mt-2">
              <button
                type="button"
                onClick={() => setOpen((s) => !s)}
                className="inline-flex items-center gap-1 text-xs font-medium text-red-800/80 hover:text-red-900"
                aria-expanded={open}
              >
                <FiChevronDown
                  className={
                    "h-4 w-4 transition-transform " + (open ? "rotate-180" : "")
                  }
                />
                {open ? "Hide details" : "Show details"}
              </button>

              {open && (
                <div className="mt-2 rounded-lg bg-white/60 p-3 text-xs text-red-900 ring-1 ring-red-100">
                  {typeof details === "string" ? (
                    <pre className="whitespace-pre-wrap break-words">{details}</pre>
                  ) : (
                    details
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className={[
              "ml-2 inline-flex items-center gap-2 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-900",
              "hover:bg-red-50 active:scale-[0.98] transition",
            ].join(" ")}
          >
            <FiRefreshCw className="h-4 w-4" />
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;
