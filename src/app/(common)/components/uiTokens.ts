export const uiTokenStyles = {
    card: {
        base: "bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700",
        imageFrame: "absolute inset-0 bg-slate-300 flex items-center justify-center",
        title: "font-normal text-gray-700 dark:text-gray-400 text-lg",
        description: "font-normal text-gray-700 dark:text-gray-400",
    },
    search: {
        wrapper: "flex items-center px-6 py-5 w-full z-10 transition-all duration-500 bg-black/80",
        input: "bg-gray-800 rounded-md text-white px-3 py-2 w-full focus:outline-none min-h-[44px]",
    },
    button: {
        primary:
            "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    },
    layout: {
        section: "px-4 py-8 space-y-10",
        content: "flex justify-start flex-wrap gap-4",
    },
};
