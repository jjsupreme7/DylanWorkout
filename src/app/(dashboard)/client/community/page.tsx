export default function CommunityPage() {
  const posts = [
    {
      author: "Coach Dylan",
      role: "Coach",
      avatar: "CD",
      time: "2 hours ago",
      content: "New training tip: If you're stalling on bench press, try paused reps at 70% of your 1RM for 3 weeks. The bottom position strength transfers directly to your max. Who's trying this?",
      likes: 12,
      comments: 5,
      pinned: true,
    },
    {
      author: "Mike R.",
      role: "Client",
      avatar: "MR",
      time: "5 hours ago",
      content: "Hit a 315 deadlift PR today! Been grinding for months. This program is no joke. Thanks Coach!",
      likes: 24,
      comments: 8,
      type: "win",
    },
    {
      author: "Sarah K.",
      role: "Client",
      avatar: "SK",
      time: "Yesterday",
      content: "Question: Is it better to do cardio before or after lifting? I've been doing 20 min on the bike before my sessions but wondering if that's eating into my performance.",
      likes: 6,
      comments: 12,
      type: "question",
    },
    {
      author: "Coach Dylan",
      role: "Coach",
      avatar: "CD",
      time: "2 days ago",
      content: "Weekly Q&A replay is up! We covered periodization basics, when to deload, and how to structure training around a busy schedule. Check it out.",
      likes: 18,
      comments: 3,
      type: "video",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Community</h1>
        <p className="text-dragon-muted mt-1">Connect with your coach and fellow athletes</p>
      </div>

      {/* New Post */}
      <div className="card">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-dragon-red to-dragon-gold flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">JJ</span>
          </div>
          <div className="flex-1">
            <textarea
              placeholder="Share a win, ask a question, or start a discussion..."
              rows={3}
              className="input-field resize-none text-sm"
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2">
                <button className="badge-gold cursor-pointer hover:opacity-80 transition-opacity">
                  Win
                </button>
                <button className="badge-red cursor-pointer hover:opacity-80 transition-opacity">
                  Question
                </button>
              </div>
              <button className="btn-primary py-2 px-4 text-sm">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map((post, i) => (
          <div key={i} className="card-hover">
            {/* Pinned Badge */}
            {post.pinned && (
              <div className="flex items-center gap-1.5 text-dragon-gold-light text-xs font-medium mb-3">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                </svg>
                Pinned
              </div>
            )}

            {/* Author */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  post.role === "Coach"
                    ? "bg-gradient-to-br from-dragon-gold to-dragon-gold-dark"
                    : "bg-dragon-dark border border-dragon-border"
                }`}
              >
                <span
                  className={`font-bold text-xs ${
                    post.role === "Coach" ? "text-dragon-black" : "text-dragon-text"
                  }`}
                >
                  {post.avatar}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-sm">{post.author}</span>
                  {post.role === "Coach" && (
                    <span className="badge-gold text-[10px]">Coach</span>
                  )}
                  {post.type === "win" && (
                    <span className="badge-green text-[10px]">Win</span>
                  )}
                  {post.type === "question" && (
                    <span className="badge-red text-[10px]">Question</span>
                  )}
                </div>
                <span className="text-dragon-muted text-xs">{post.time}</span>
              </div>
            </div>

            {/* Content */}
            <p className="text-dragon-text text-sm leading-relaxed mb-4">
              {post.content}
            </p>

            {/* Video placeholder */}
            {post.type === "video" && (
              <div className="aspect-video bg-dragon-dark rounded-lg flex items-center justify-center mb-4 border border-dragon-border">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-dragon-red/20 flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-dragon-red-glow ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-dragon-muted text-xs">Weekly Q&A — 42:15</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 text-dragon-muted">
              <button className="flex items-center gap-1.5 text-xs hover:text-dragon-red-glow transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {post.likes}
              </button>
              <button className="flex items-center gap-1.5 text-xs hover:text-dragon-gold-light transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {post.comments}
              </button>
              <button className="flex items-center gap-1.5 text-xs hover:text-white transition-colors ml-auto">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
