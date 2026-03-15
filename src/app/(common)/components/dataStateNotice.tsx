export type DataViewState = "ready" | "loading" | "empty" | "error";

interface DataStateNoticeProps {
    state: DataViewState;
    pageLabel: string;
    message?: string;
}

export function resolveDataState(hasResponse: boolean, hasData: boolean) {
    if (!hasResponse) {
        return "error";
    }
    return hasData ? "ready" : "empty";
}

export function normalizeErrorMessage(errors: Array<string | null | undefined>) {
    const visibleErrors = errors.filter((error): error is string => Boolean(error));
    return visibleErrors.length > 0 ? visibleErrors.join(" | ") : undefined;
}

function getStatusClassName(state: DataViewState) {
    if (state === "ready") {
        return "border-transparent bg-transparent p-0";
    }
    if (state === "loading") {
        return "border-blue-200 bg-blue-50 text-blue-900";
    }
    if (state === "error") {
        return "border-red-200 bg-red-50 text-red-900";
    }
    return "border-yellow-200 bg-yellow-50 text-yellow-900";
}

function getStatusText(state: DataViewState, pageLabel: string, message?: string) {
    if (state === "ready") {
        return `${pageLabel}: Ready`;
    }
    if (state === "loading") {
        return `${pageLabel}: ${message ?? "Loading..."}`;
    }
    if (state === "error") {
        return `${pageLabel}: ${message ?? "Error occurred. Fallback content is rendered."}`;
    }
    return `${pageLabel}: ${message ?? "No data available. Notice message is shown."}`;
}

export function DataStateNotice({ state, pageLabel, message }: DataStateNoticeProps) {
    const statusText = getStatusText(state, pageLabel, message);

    if (state === "ready") {
        return null;
    }

    return (
        <div className={`mx-4 mt-4 rounded border p-3 text-sm ${getStatusClassName(state)}`}>
            <p className="font-semibold" role="status" aria-live="polite">
                {statusText}
            </p>
            <p className="mt-1 text-xs opacity-80">Page state changed: {state}.</p>
        </div>
    );
}
