import { isDebugLogEnabled } from "./environment";

const SENSITIVE_KEYS = [
    "authorization",
    "cookie",
    "password",
    "token",
    "secret",
    "apikey",
    "apiKey",
    "session",
];

function isSensitiveField(field: string): boolean {
    const lower = field.toLowerCase();
    return SENSITIVE_KEYS.some((target) => lower.includes(target));
}

function maskString(value: string): string {
    return value
        .replace(/(authorization|x-csrf-token|cookie|password|secret|token|apikey|api[_-]?key)\s*[:=]\s*[^\s,"]+/gi, "$1=***")
        .replace(/Bearer\s+[A-Za-z0-9._~-]+/gi, "Bearer ***");
}

function sanitizeArg(value: unknown): unknown {
    if (value instanceof Error) {
        return { ...value, message: maskString(value.message) };
    }
    if (typeof value === "string") {
        return maskString(value);
    }
    if (Array.isArray(value)) {
        return value.map(sanitizeArg);
    }
    if (value && typeof value === "object") {
        return Object.fromEntries(
            Object.entries(value).map(([key, nestedValue]) => [
                key,
                isSensitiveField(key) ? "***" : sanitizeArg(nestedValue),
            ])
        );
    }
    return value;
}

function emitLog(writer: (...args: unknown[]) => void, ...args: unknown[]) {
    if (!isDebugLogEnabled) {
        return;
    }
    writer(...args.map(sanitizeArg));
}

export const logDebug = (...args: unknown[]) => {
    emitLog(console.debug, ...args);
};

export const logInfo = (...args: unknown[]) => {
    emitLog(console.info, ...args);
};

export const logWarn = (...args: unknown[]) => {
    emitLog(console.warn, ...args);
};
