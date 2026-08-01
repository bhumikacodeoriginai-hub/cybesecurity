'use client';

export default function ProfilePage() {
  return (
    <div className="max-w-4xl space-y-8">
      <h1 className="text-2xl font-bold">Profile</h1>

      {/* Profile Header */}
      <div className="card">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-cyber-400/20 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-cyber-400">DS</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Demo Student</h2>
            <p className="text-dark-400">student@cybersecacademy.com</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="badge-beginner">BEGINNER</span>
              <span className="text-sm text-yellow-400">⚡ 250 XP</span>
              <span className="text-sm text-orange-400">🔥 3 day streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-2xl font-bold text-cyber-400">2</p>
          <p className="text-xs text-dark-400">Courses Enrolled</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-green-400">4</p>
          <p className="text-xs text-dark-400">Lessons Completed</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-purple-400">1</p>
          <p className="text-xs text-dark-400">Labs Completed</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-orange-400">1</p>
          <p className="text-xs text-dark-400">Badges Earned</p>
        </div>
      </div>

      {/* Badges */}
      <div className="card">
        <h3 className="font-semibold mb-4">Badges</h3>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">🚀</span>
            </div>
            <p className="text-xs text-dark-300">First Steps</p>
          </div>
          <div className="text-center opacity-30">
            <div className="w-16 h-16 bg-dark-700 border border-dark-600 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">⚡</span>
            </div>
            <p className="text-xs text-dark-500">Quick Learner</p>
          </div>
          <div className="text-center opacity-30">
            <div className="w-16 h-16 bg-dark-700 border border-dark-600 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">🧪</span>
            </div>
            <p className="text-xs text-dark-500">Lab Rat</p>
          </div>
          <div className="text-center opacity-30">
            <div className="w-16 h-16 bg-dark-700 border border-dark-600 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">🔥</span>
            </div>
            <p className="text-xs text-dark-500">Streak Master</p>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="card">
        <h3 className="font-semibold mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-dark-400 mb-1">First Name</label>
              <input type="text" value="Demo" readOnly className="input-field" />
            </div>
            <div>
              <label className="block text-sm text-dark-400 mb-1">Last Name</label>
              <input type="text" value="Student" readOnly className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-dark-400 mb-1">Email</label>
            <input type="email" value="student@cybersecacademy.com" readOnly className="input-field" />
          </div>
          <button className="btn-secondary text-sm">Update Profile</button>
        </div>
      </div>
    </div>
  );
}
