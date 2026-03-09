export function OfflineDataNotice({ pageLabel }: { pageLabel: string }) {
  return (
    <div className="mx-4 mt-4 rounded border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-900">
      {pageLabel} data API is unavailable. Showing fallback UI for design preview.
    </div>
  );
}
