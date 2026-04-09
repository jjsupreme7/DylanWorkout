export default function ProgressPage() {
  const prs = [
    { exercise: "Bench Press", current: "225 lbs", previous: "215 lbs", date: "Apr 5" },
    { exercise: "Deadlift", current: "315 lbs", previous: "305 lbs", date: "Apr 2" },
    { exercise: "Squat", current: "275 lbs", previous: "265 lbs", date: "Mar 28" },
    { exercise: "Overhead Press", current: "145 lbs", previous: "135 lbs", date: "Mar 25" },
    { exercise: "Barbell Row", current: "205 lbs", previous: "195 lbs", date: "Mar 20" },
  ];

  const measurements = [
    { label: "Body Weight", value: "182 lbs", change: "-3 lbs", positive: true },
    { label: "Body Fat", value: "14.2%", change: "-1.8%", positive: true },
    { label: "Chest", value: '42"', change: '+0.5"', positive: true },
    { label: "Waist", value: '32"', change: '-1.5"', positive: true },
    { label: "Arms", value: '15.5"', change: '+0.3"', positive: true },
    { label: "Thighs", value: '24"', change: '+0.5"', positive: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Progress</h1>
        <p className="text-dragon-muted mt-1">Track your gains and body composition</p>
      </div>

      {/* Weight Chart Placeholder */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Weight Trend</h2>
          <div className="flex gap-1">
            {["1M", "3M", "6M", "1Y"].map((period) => (
              <button
                key={period}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  period === "3M"
                    ? "bg-dragon-red/20 text-dragon-red-glow"
                    : "text-dragon-muted hover:text-white"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        {/* Simple visual chart representation */}
        <div className="h-40 flex items-end gap-1 px-2">
          {[188, 187, 186, 186, 185, 185, 184, 184, 183, 183, 182, 182].map(
            (weight, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-gradient-to-t from-dragon-red to-dragon-gold opacity-80"
                  style={{ height: `${((weight - 178) / 12) * 100}%` }}
                />
              </div>
            )
          )}
        </div>
        <div className="flex justify-between text-[10px] text-dragon-muted mt-2 px-2">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
        </div>
      </div>

      {/* Personal Records */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Personal Records</h2>
          <span className="badge-gold">{prs.length} PRs</span>
        </div>
        <div className="space-y-3">
          {prs.map((pr) => (
            <div
              key={pr.exercise}
              className="flex items-center justify-between py-3 px-4 bg-dragon-dark rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-dragon-gold/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-dragon-gold-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{pr.exercise}</p>
                  <p className="text-dragon-muted text-xs">
                    Previous: {pr.previous}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-dragon-gold-light font-bold font-mono">
                  {pr.current}
                </p>
                <p className="text-dragon-muted text-xs">{pr.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Body Measurements */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Body Measurements</h2>
          <button className="text-dragon-red-glow text-xs font-medium hover:underline">
            + Update
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {measurements.map((m) => (
            <div
              key={m.label}
              className="bg-dragon-dark rounded-lg p-3"
            >
              <p className="text-dragon-muted text-xs">{m.label}</p>
              <p className="text-white font-bold text-lg mt-1">{m.value}</p>
              <p className={`text-xs font-medium mt-0.5 ${m.positive ? "text-green-400" : "text-red-400"}`}>
                {m.change}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Photos */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Progress Photos</h2>
          <button className="text-dragon-red-glow text-xs font-medium hover:underline">
            + Upload
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {["Front", "Side", "Back"].map((view) => (
            <div
              key={view}
              className="aspect-[3/4] bg-dragon-dark rounded-lg border border-dashed border-dragon-border flex flex-col items-center justify-center gap-2"
            >
              <svg className="w-8 h-8 text-dragon-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-dragon-muted text-xs">{view}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
