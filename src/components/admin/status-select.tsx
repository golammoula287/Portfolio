// Status dropdown shared across all CMS forms. The explicit background and
// option colors fix a bug where the option text was invisible (white on
// white) in some browsers, making it unclear whether Draft or Published was
// selected.
export function StatusSelect({ defaultValue }: { defaultValue?: string }) {
  return (
    <select
      id="status"
      name="status"
      defaultValue={defaultValue ?? "draft"}
      className="h-9 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 [&>option]:bg-popover [&>option]:text-popover-foreground"
    >
      <option value="draft">Draft (hidden from site)</option>
      <option value="published">Published (visible on site)</option>
    </select>
  );
}
