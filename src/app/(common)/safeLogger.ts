import { isDebugLogEnabled } from "./environment";

export const logDebug = (...args: unknown[]) => {
    if (isDebugLogEnabled) {
        console.debug(...args);
    }
};

export const logInfo = (...args: unknown[]) => {
    if (isDebugLogEnabled) {
        console.info(...args);
    }
};

export const logWarn = (...args: unknown[]) => {
    if (isDebugLogEnabled) {
        console.warn(...args);
    }
};
