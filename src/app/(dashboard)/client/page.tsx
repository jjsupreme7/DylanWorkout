export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, <span className="text-dragon-red-glow">JJ</span>
        </h1>
        <p className="text-dragon-muted mt-1">Let&apos;s get after it today.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="stat-value text-dragon-red-glow">12</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="card">
          <div className="stat-value text-dragon-gold-light">4/5</div>
          <div className="stat-label">Sessions This Week</div>
        </div>
        <div className="card">
          <div className="stat-value text-green-400">92%</div>
          <div className="stat-label">Compliance</div>
        </div>
        <div className="card">
          <div className="stat-value text-white">3</div>
          <div className="stat-label">New PRs</div>
        </div>
      </div>

      {/* Today's Workout */}
      <div className="card-hover">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Today&apos;s Workout</h2>
          <span className="badge-red">Push Day</span>
        </div>
        <div className="space-y-3">
          {[
            { name: "Bench Press", sets: "4x8", weight: "185 lbs" },
            { name: "Overhead Press", sets: "3x10", weight: "115 lbs" },
            { name: "Incline DB Press", sets: "3x12", weight: "65 lbs" },
            { name: "Cable Flyes", sets: "3x15", weight: "30 lbs" },
            { name: "Tricep Pushdowns", sets: "3x12", weight: "50 lbs" },
          ].map((exercise) => (
            <div
              key={exercise.name}
              className="flex items-center justify-between py-3 px-4 bg-dragon-dark rounded-lg"
            >
              <div>
                <p className="text-white font-medium text-sm">{exercise.name}</p>
                <p className="text-dragon-muted text-xs">{exercise.sets}</p>
              </div>
              <span className="text-dragon-gold-light text-sm font-mono">
                {exercise.weight}
              </span>
            </div>
          ))}
        </div>
        <button className="btn-primary w-full mt-4">Start Workout</button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="card-hover text-left group">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-dragon-gold/10 flex items-center justify-center group-hover:bg-dragon-gold/20 transition-colors">
              <svg className="w-5 h-5 text-dragon-gold-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Scan Food</p>
              <p className="text-dragon-muted text-xs">AI-powered logging</p>
            </div>
          </div>
        </button>
        <button className="card-hover text-left group">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-dragon-red/10 flex items-center justify-center group-hover:bg-dragon-red/20 transition-colors">
              <svg className="w-5 h-5 text-dragon-red-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Check-in</p>
              <p className="text-dragon-muted text-xs">Weekly submission</p>
            </div>
          </div>
        </button>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="section-title mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: "Completed Pull Day", time: "Yesterday", icon: "check", color: "text-green-400" },
            { action: "New PR: Deadlift 315 lbs", time: "2 days ago", icon: "trophy", color: "text-dragon-gold-light" },
            { action: "Check-in reviewed by coach", time: "3 days ago", icon: "message", color: "text-dragon-red-glow" },
            { action: "Completed Leg Day", time: "4 days ago", icon: "check", color: "text-green-400" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full bg-dragon-dark flex items-center justify-center ${activity.color}`}>
                {activity.icon === "check" && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {activity.icon === "trophy" && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                )}
                {activity.icon === "message" && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">{activity.action}</p>
                <p className="text-xs text-dragon-muted">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
