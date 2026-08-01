'use client';

export default function AdminPage() {
  const stats = [
    { label: 'Total Users', value: '1,247', change: '+23 this week', icon: '👥' },
    { label: 'Active Labs', value: '34', change: '12 running now', icon: '🧪' },
    { label: 'Courses', value: '10', change: '2 drafts', icon: '📚' },
    { label: 'CTF Challenges', value: '26', change: '3 new', icon: '🚩' },
  ];

  const recentUsers = [
    { name: 'John Smith', email: 'john@example.com', role: 'STUDENT', joined: '2 hours ago' },
    { name: 'Sarah Johnson', email: 'sarah@example.com', role: 'STUDENT', joined: '5 hours ago' },
    { name: 'Mike Wilson', email: 'mike@example.com', role: 'PROFESSIONAL', joined: '1 day ago' },
    { name: 'Emily Davis', email: 'emily@example.com', role: 'STUDENT', joined: '2 days ago' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">⚙️ Admin Panel</h1>
        <p className="text-dark-400 mt-1">Manage platform users, content, and infrastructure</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-dark-400">{stat.label}</p>
                <p className="text-xs text-green-400">{stat.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="card">
          <h3 className="font-semibold mb-4">Recent Registrations</h3>
          <div className="space-y-3">
            {recentUsers.map((user, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-dark-400">{user.email}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-dark-300 px-2 py-0.5 bg-dark-700 rounded">{user.role}</span>
                  <p className="text-xs text-dark-500 mt-1">{user.joined}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-dark-800/50 hover:bg-dark-700/50 rounded-lg border border-dark-700/50 text-left transition-colors">
              <span className="text-2xl">➕</span>
              <p className="text-sm font-medium text-white mt-2">Create Course</p>
              <p className="text-xs text-dark-400">Add new course</p>
            </button>
            <button className="p-4 bg-dark-800/50 hover:bg-dark-700/50 rounded-lg border border-dark-700/50 text-left transition-colors">
              <span className="text-2xl">🧪</span>
              <p className="text-sm font-medium text-white mt-2">Manage Labs</p>
              <p className="text-xs text-dark-400">Lab environments</p>
            </button>
            <button className="p-4 bg-dark-800/50 hover:bg-dark-700/50 rounded-lg border border-dark-700/50 text-left transition-colors">
              <span className="text-2xl">🚩</span>
              <p className="text-sm font-medium text-white mt-2">Add Challenge</p>
              <p className="text-xs text-dark-400">New CTF challenge</p>
            </button>
            <button className="p-4 bg-dark-800/50 hover:bg-dark-700/50 rounded-lg border border-dark-700/50 text-left transition-colors">
              <span className="text-2xl">📊</span>
              <p className="text-sm font-medium text-white mt-2">Analytics</p>
              <p className="text-xs text-dark-400">Platform usage</p>
            </button>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="card">
        <h3 className="font-semibold mb-4">System Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-sm text-dark-300">API Server</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-sm text-dark-300">Database</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-sm text-dark-300">Lab Engine</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-sm text-dark-300">WebSocket</span>
          </div>
        </div>
      </div>
    </div>
  );
}
