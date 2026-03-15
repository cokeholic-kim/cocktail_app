type OfflineDataNoticeProps = {
    pageLabel: string;
    errorMessage?: string | null;
};

const getDefaultErrorMessage = (pageLabel: string) => `${pageLabel}: 백엔드 연결이 원활하지 않습니다.`;

const getDefaultHintMessage = (errorMessage?: string | null) =>
    errorMessage
        ? `오류: ${errorMessage}`
        : "캐시된 샘플 데이터로 화면을 표시합니다.";

export function OfflineDataNotice({ pageLabel, errorMessage }: OfflineDataNoticeProps) {
    return (
        <div
            className="mx-4 mt-4 rounded border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-900"
            role="status"
            aria-live="polite"
        >
            <p className="font-semibold">{getDefaultErrorMessage(pageLabel)}</p>
            <p className="mt-1 text-xs text-yellow-900/80">
                {getDefaultHintMessage(errorMessage)}
            </p>
        </div>
    );
}
