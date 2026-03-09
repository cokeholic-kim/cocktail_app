type OfflineDataNoticeProps = {
    pageLabel: string;
    errorMessage?: string | null;
};

const getDefaultErrorMessage = (pageLabel: string) =>
    `${pageLabel}: 백엔드 응답이 불안정해 대체 데이터로 렌더링됩니다.`;

const getDefaultHintMessage = (errorMessage?: string | null) =>
    errorMessage
        ? `원인: ${errorMessage}`
        : "잠시 후 다시 요청해 주세요. 데이터 동기화가 완료되면 실데이터가 표시됩니다.";

export function OfflineDataNotice({ pageLabel, errorMessage }: OfflineDataNoticeProps) {
    return (
        <div className="mx-4 mt-4 rounded border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-900">
            <p className="font-semibold">{getDefaultErrorMessage(pageLabel)}</p>
            <p className="mt-1 text-xs text-yellow-900/80">
                {getDefaultHintMessage(errorMessage)}
            </p>
        </div>
    );
}

