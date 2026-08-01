'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FileSystemsLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">File Systems & Data Storage</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-beginner">BEGINNER</span>
          <span className="text-xs text-dark-500">Module 2 · Lesson 10</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">File Systems & Data Storage</h1>
        <p className="text-dark-400 leading-relaxed">
          A file system is how an operating system organizes data on a disk. Understanding file systems
          is critical for forensics (recovering deleted evidence), security (where secrets are stored),
          and system administration.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 20 minutes</span><span>⚡ +15 XP</span><span>📖 Theory + Commands</span>
        </div>
      </div>

      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            What is a File System?
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            A file system is like a <strong className="text-white">filing cabinet system</strong>. Without it, 
            your disk would be a massive pile of 1s and 0s with no way to find anything.
          </p>
          <div className="callout-info">
            <p className="text-sm font-medium mb-2">📁 Filing Cabinet Analogy:</p>
            <p className="text-xs opacity-90">
              <strong>Disk</strong> = the physical cabinet. <strong>File system</strong> = the labeling and folder organization system.
              <strong>Files</strong> = individual documents. <strong>Directories</strong> = folders that group documents.
              <strong>Inode</strong> = the index card that says where each document physically is in the cabinet.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">2</span>
            Common File Systems
          </h2>

          <div className="card-glass overflow-hidden p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                  <th className="px-4 py-2.5 text-left text-dark-400">File System</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Used By</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Max File Size</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Security Features</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">ext4</td><td className="px-4 py-2 text-dark-300">Linux (most common)</td><td className="px-4 py-2 text-dark-400">16 TB</td><td className="px-4 py-2 text-dark-400">Unix permissions, journaling, encryption support</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">NTFS</td><td className="px-4 py-2 text-dark-300">Windows</td><td className="px-4 py-2 text-dark-400">16 EB</td><td className="px-4 py-2 text-dark-400">ACLs, encryption (EFS), auditing, compression</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">APFS</td><td className="px-4 py-2 text-dark-300">macOS/iOS</td><td className="px-4 py-2 text-dark-400">8 EB</td><td className="px-4 py-2 text-dark-400">Full-disk encryption built-in, clones, snapshots</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">FAT32</td><td className="px-4 py-2 text-dark-300">USB drives, old devices</td><td className="px-4 py-2 text-dark-400">4 GB</td><td className="px-4 py-2 text-red-400">⚠️ NO permissions at all! Anyone can read anything</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">XFS</td><td className="px-4 py-2 text-dark-300">Linux (enterprise/large files)</td><td className="px-4 py-2 text-dark-400">8 EB</td><td className="px-4 py-2 text-dark-400">ACLs, quotas, high performance</td></tr>
              </tbody>
            </table>
          </div>

          <div className="callout-warning mt-4">
            <p className="text-xs"><strong>Security fact:</strong> USB drives use FAT32 by default — this means <strong>no file permissions</strong>. Anyone who plugs in the USB can read everything. For sensitive data on USB, always use encryption (VeraCrypt, BitLocker To Go).</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">3</span>
            Practical: Checking Disk & File System Info
          </h2>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Check mounted filesystems and disk space</span></div>
            <div className="command-body">
              <div><span className="command-prompt">student@lab:~$ </span><span className="text-white">df -hT</span></div>
              <div className="command-output">
{`Filesystem     Type   Size  Used Avail Use% Mounted on
/dev/sda1      ext4    50G   12G   35G  26% /
tmpfs          tmpfs  2.0G     0  2.0G   0% /dev/shm
/dev/sda2      ext4   450G   89G  338G  21% /home
/dev/sdb1      vfat    32G  4.2G   28G  13% /media/usb`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>-h</strong> = human-readable sizes, <strong>-T</strong> = show filesystem type.</p>
              <p className="mt-1 text-amber-300/80"><strong>🔒 Security analysis:</strong> /dev/sdb1 is a USB drive (vfat = FAT32, no permissions!). /dev/sda1 is ext4 (has proper Linux permissions). If disk is 95%+ full, logs may stop writing = attacker could fill disk intentionally to hide their tracks.</p>
            </div>
          </div>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Check file details with stat</span></div>
            <div className="command-body">
              <div><span className="command-prompt">student@lab:~$ </span><span className="text-white">stat /etc/shadow</span></div>
              <div className="command-output">
{`  File: /etc/shadow
  Size: 1501       Blocks: 8          IO Block: 4096   regular file
Access: (0640/-rw-r-----)  Uid: (0/root)   Gid: (42/shadow)
Access: 2025-01-15 09:58:45.000000000 +0000
Modify: 2025-01-15 09:59:12.000000000 +0000
Change: 2025-01-15 09:59:12.000000000 +0000`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>Key info:</strong> Permissions 0640 (owner read+write, group read only, others nothing). Last modified at 09:59:12 — if the system was compromised at 09:58, this modification (1 minute later) is suspicious! Attacker likely added a new user to /etc/shadow.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">4</span>
            File System Forensics — What Investigators Look For
          </h2>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { what: 'Timestamps (MAC times)', why: 'Modified/Accessed/Changed times show WHEN files were created or altered. Attackers try to change these with "touch" command.', cmd: 'stat file.txt' },
              { what: 'Deleted file recovery', why: 'Deleted files still exist on disk until overwritten. Tools like "extundelete" or "photorec" can recover them.', cmd: 'extundelete /dev/sda1 --restore-all' },
              { what: 'Disk images', why: 'Forensics never works on the original disk — they make a bit-for-bit copy first to preserve evidence.', cmd: 'dd if=/dev/sda of=evidence.img bs=4096' },
              { what: 'File carving', why: 'Recover files by searching for file signatures (headers) in raw disk data, even without filesystem metadata.', cmd: 'foremost -i evidence.img -o recovered/' },
            ].map((item) => (
              <div key={item.what} className="card-glass p-4">
                <p className="text-xs font-semibold text-white mb-1">{item.what}</p>
                <p className="text-[11px] text-dark-400 mb-2">{item.why}</p>
                <code className="text-[10px] text-cyber-400/70 bg-white/[0.03] px-2 py-0.5 rounded font-mono">{item.cmd}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• File systems organize raw disk data into files and directories</li>
            <li>• ext4 (Linux), NTFS (Windows), APFS (Mac) — each has different security features</li>
            <li>• FAT32 has NO permissions — never use for sensitive data without encryption</li>
            <li>• <code>df -hT</code> shows disk usage, <code>stat</code> shows detailed file metadata</li>
            <li>• Timestamps reveal WHEN files were modified — critical for timeline analysis</li>
            <li>• Deleted files can be recovered until the disk space is overwritten</li>
          </ul>
        </section>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (<span className="text-emerald-400 text-sm">✅ Completed! +15 XP</span>) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/processes-services-daemons" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: Processes & Services</Link>
          <Link href="/lessons/users-permissions-access" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: Users, Permissions & Access →</Link>
        </div>
      </div>
    </div>
  );
}
