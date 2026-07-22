// Server Component — fetches data at request time to prove the deployment
// can reach the network and render a live response end to end.
async function getStatusLine() {
  try {
    const res = await fetch("https://api.github.com/zen", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Upstream returned ${res.status}`);
    return { ok: true, line: await res.text() };
  } catch {
    return { ok: false, line: "Upstream unreachable" };
  }
}

export default async function HealthPage() {
  const status = await getStatusLine();
  const checkedAt = new Date().toISOString();

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="font-display text-4xl tracking-wide mb-8">
        System status
      </h1>
      <div className="bg-surface border border-border rounded-sm p-6 font-mono text-sm space-y-3">
        <Row label="Build" value="OK — page rendered" ok />
        <Row
          label="Network fetch"
          value={status.ok ? "OK — reached api.github.com" : "Failed"}
          ok={status.ok}
        />
        <Row label="OMDB_API_KEY" value={process.env.OMDB_API_KEY ? "set" : "not set (add in Vercel env vars)"} ok={!!process.env.OMDB_API_KEY} />
        <Row label="Checked at" value={checkedAt} ok />
      </div>
      <blockquote className="mt-6 border-l-2 border-accent-gold pl-4 text-muted italic">
        &ldquo;{status.line}&rdquo;
      </blockquote>
    </div>
  );
}

function Row({
  label,
  value,
  ok,
}: {
  label: string;
  value: string;
  ok: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className={ok ? "text-accent-gold" : "text-accent"}>{value}</span>
    </div>
  );
}
