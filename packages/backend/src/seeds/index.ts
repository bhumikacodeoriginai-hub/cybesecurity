import { PrismaClient, Difficulty, LessonType, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean existing data
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.userBadge.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.challengeAttempt.deleteMany();
  await prisma.labInstance.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lab.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();
  await prisma.learningPath.deleteMany();
  await prisma.user.deleteMany();

  console.log('Creating users...');
  await seedUsers();
  console.log('Creating learning paths...');
  await seedLearningPaths();
  console.log('Creating badges...');
  await seedBadges();
  console.log('Creating challenges...');
  await seedChallenges();
  console.log('Done!');
}


async function seedUsers() {
  const passwordHash = await bcrypt.hash('Admin123!', 12);

  await prisma.user.createMany({
    data: [
      {
        email: 'admin@cybersecacademy.com',
        passwordHash,
        firstName: 'System',
        lastName: 'Admin',
        role: UserRole.SUPER_ADMIN,
        emailVerified: true,
      },
      {
        email: 'instructor@cybersecacademy.com',
        passwordHash,
        firstName: 'Alex',
        lastName: 'Morgan',
        role: UserRole.INSTRUCTOR,
        emailVerified: true,
        bio: 'Senior Security Engineer with 10+ years experience',
      },
      {
        email: 'student@cybersecacademy.com',
        passwordHash: await bcrypt.hash('Student123!', 12),
        firstName: 'Demo',
        lastName: 'Student',
        role: UserRole.STUDENT,
        emailVerified: true,
        xpPoints: 250,
        currentStreak: 3,
      },
    ],
  });
}


async function seedLearningPaths() {
  const paths = [
    {
      title: 'Cybersecurity Foundations',
      slug: 'cybersecurity-foundations',
      description: 'Start your cybersecurity journey from zero. Learn core concepts, terminology, and fundamental security principles.',
      difficulty: Difficulty.BEGINNER,
      durationHours: 40,
      orderIndex: 1,
      isPublished: true,
      icon: 'shield',
      color: '#00d4ff',
    },
    {
      title: 'Network Security',
      slug: 'network-security',
      description: 'Master networking fundamentals and learn how to secure network infrastructure against threats.',
      difficulty: Difficulty.INTERMEDIATE,
      durationHours: 60,
      orderIndex: 2,
      isPublished: true,
      icon: 'network',
      color: '#8b5cf6',
    },
    {
      title: 'Linux Security',
      slug: 'linux-security',
      description: 'Learn Linux from basics to advanced security hardening. Essential for every security professional.',
      difficulty: Difficulty.INTERMEDIATE,
      durationHours: 50,
      orderIndex: 3,
      isPublished: true,
      icon: 'terminal',
      color: '#10b981',
    },
    {
      title: 'Web Application Security',
      slug: 'web-application-security',
      description: 'Understand web vulnerabilities, learn to identify them, and implement secure solutions.',
      difficulty: Difficulty.INTERMEDIATE,
      durationHours: 70,
      orderIndex: 4,
      isPublished: true,
      icon: 'globe',
      color: '#f59e0b',
    },
    {
      title: 'Ethical Hacking',
      slug: 'ethical-hacking',
      description: 'Learn authorized security testing methodologies in controlled environments.',
      difficulty: Difficulty.ADVANCED,
      durationHours: 80,
      orderIndex: 5,
      isPublished: true,
      icon: 'bug',
      color: '#ef4444',
    },

    {
      title: 'SOC & Blue Team',
      slug: 'soc-blue-team',
      description: 'Learn Security Operations Center workflows, incident detection, and defensive security.',
      difficulty: Difficulty.ADVANCED,
      durationHours: 70,
      orderIndex: 6,
      isPublished: true,
      icon: 'eye',
      color: '#3b82f6',
    },
    {
      title: 'Digital Forensics',
      slug: 'digital-forensics',
      description: 'Learn evidence collection, analysis methodology, and forensic investigation techniques.',
      difficulty: Difficulty.ADVANCED,
      durationHours: 60,
      orderIndex: 7,
      isPublished: true,
      icon: 'search',
      color: '#6366f1',
    },
    {
      title: 'Cloud Security',
      slug: 'cloud-security',
      description: 'Secure cloud infrastructure across AWS, Azure, and GCP platforms.',
      difficulty: Difficulty.ADVANCED,
      durationHours: 65,
      orderIndex: 8,
      isPublished: true,
      icon: 'cloud',
      color: '#06b6d4',
    },
    {
      title: 'Cryptography',
      slug: 'cryptography',
      description: 'Understand encryption, hashing, certificates, and cryptographic protocols.',
      difficulty: Difficulty.INTERMEDIATE,
      durationHours: 35,
      orderIndex: 9,
      isPublished: true,
      icon: 'lock',
      color: '#d946ef',
    },
    {
      title: 'DevSecOps',
      slug: 'devsecops',
      description: 'Integrate security into CI/CD pipelines, container security, and infrastructure-as-code.',
      difficulty: Difficulty.PROFESSIONAL,
      durationHours: 55,
      orderIndex: 10,
      isPublished: true,
      icon: 'code',
      color: '#84cc16',
    },
  ];

  for (const path of paths) {
    await prisma.learningPath.create({ data: path });
  }


  // Create courses for Cybersecurity Foundations path
  const foundationsPath = await prisma.learningPath.findUnique({
    where: { slug: 'cybersecurity-foundations' },
  });

  if (foundationsPath) {
    const course1 = await prisma.course.create({
      data: {
        learningPathId: foundationsPath.id,
        title: 'Introduction to Cybersecurity',
        slug: 'intro-to-cybersecurity',
        description: 'Learn what cybersecurity is, why it matters, and the fundamental concepts every security professional needs to know.',
        longDescription: 'This course provides a comprehensive introduction to cybersecurity. You will learn about threats, vulnerabilities, risk management, the CIA triad, and security controls. By the end, you will have a solid understanding of the cybersecurity landscape.',
        difficulty: Difficulty.BEGINNER,
        durationHours: 8,
        orderIndex: 1,
        isPublished: true,
        skills: JSON.stringify(['CIA Triad', 'Threat Analysis', 'Risk Assessment', 'Security Controls']),
      },
    });

    // Module 1: What is Cybersecurity?
    const mod1 = await prisma.module.create({
      data: {
        courseId: course1.id,
        title: 'What is Cybersecurity?',
        description: 'Understanding the basics of cybersecurity and its importance in the modern world.',
        orderIndex: 1,
      },
    });


    // Lessons for Module 1
    await prisma.lesson.createMany({
      data: [
        {
          moduleId: mod1.id,
          title: 'Introduction to Cybersecurity',
          slug: 'introduction-to-cybersecurity',
          lessonType: LessonType.THEORY,
          orderIndex: 1,
          durationMinutes: 20,
          xpReward: 15,
          content: JSON.stringify([
            { type: 'heading', content: 'What is Cybersecurity?' },
            { type: 'paragraph', content: 'Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These attacks are usually aimed at accessing, changing, or destroying sensitive information, extorting money, or disrupting normal business processes.' },
            { type: 'callout', variant: 'info', content: 'Cybersecurity is not just about technology — it encompasses people, processes, and technology working together to protect digital assets.' },
            { type: 'heading', level: 2, content: 'Why Cybersecurity Matters' },
            { type: 'paragraph', content: 'In today\'s connected world, everyone benefits from advanced cyber defense programs. A cybersecurity attack can result in identity theft, extortion attempts, and the loss of important data.' },
            { type: 'list', items: ['Protection of sensitive data', 'Prevention of financial loss', 'Maintaining trust and reputation', 'Regulatory compliance', 'National security'] },
            { type: 'heading', level: 2, content: 'The Cybersecurity Landscape' },
            { type: 'paragraph', content: 'The cybersecurity field covers many domains including network security, application security, cloud security, and operational security. As threats evolve, so must our defenses.' },
            { type: 'diagram', title: 'Cybersecurity Domains', data: { type: 'mindmap', center: 'Cybersecurity', branches: ['Network Security', 'Application Security', 'Cloud Security', 'Endpoint Security', 'Identity & Access', 'Data Security'] } },
          ]),
          keyTerms: JSON.stringify(['Cybersecurity', 'Digital Attack', 'Threat', 'Vulnerability', 'Risk', 'Asset']),
        },
        {
          moduleId: mod1.id,
          title: 'The CIA Triad',
          slug: 'the-cia-triad',
          lessonType: LessonType.THEORY,
          orderIndex: 2,
          durationMinutes: 25,
          xpReward: 15,
          content: JSON.stringify([
            { type: 'heading', content: 'The CIA Triad: Foundation of Information Security' },
            { type: 'paragraph', content: 'The CIA Triad is the most fundamental model in information security. It stands for Confidentiality, Integrity, and Availability — the three core principles that guide security policies and controls.' },
            { type: 'diagram', title: 'CIA Triad', data: { type: 'triangle', points: ['Confidentiality', 'Integrity', 'Availability'] } },
            { type: 'heading', level: 2, content: 'Confidentiality' },
            { type: 'paragraph', content: 'Ensuring that information is only accessible to those authorized to access it. Methods include encryption, access controls, and authentication.' },
            { type: 'example', title: 'Real-World Example', content: 'When you log into your bank account, only YOU should be able to see your balance. Encryption protects your data in transit, and authentication ensures only you can access it.' },
            { type: 'heading', level: 2, content: 'Integrity' },
            { type: 'paragraph', content: 'Ensuring that data has not been altered or tampered with. Methods include hashing, digital signatures, and version control.' },
            { type: 'example', title: 'Real-World Example', content: 'When you download software, a hash checksum lets you verify the file hasn\'t been modified by an attacker during download.' },
            { type: 'heading', level: 2, content: 'Availability' },
            { type: 'paragraph', content: 'Ensuring that systems and data are accessible when needed. Methods include redundancy, backups, and disaster recovery.' },
            { type: 'example', title: 'Real-World Example', content: 'A hospital\'s patient records system must be available 24/7. DDoS attacks try to break availability by overwhelming systems with traffic.' },
          ]),
          keyTerms: JSON.stringify(['Confidentiality', 'Integrity', 'Availability', 'CIA Triad', 'Encryption', 'Hashing']),
        },

        {
          moduleId: mod1.id,
          title: 'Threats, Vulnerabilities, and Risks',
          slug: 'threats-vulnerabilities-risks',
          lessonType: LessonType.THEORY,
          orderIndex: 3,
          durationMinutes: 30,
          xpReward: 20,
          content: JSON.stringify([
            { type: 'heading', content: 'Understanding Threats, Vulnerabilities, and Risks' },
            { type: 'paragraph', content: 'These three concepts form the basis of risk assessment in cybersecurity. Understanding the relationship between them is critical for building effective security strategies.' },
            { type: 'heading', level: 2, content: 'Threats' },
            { type: 'paragraph', content: 'A threat is any potential danger that could exploit a vulnerability and cause harm. Threats can be natural (earthquakes), human (hackers), or environmental (power failures).' },
            { type: 'heading', level: 2, content: 'Vulnerabilities' },
            { type: 'paragraph', content: 'A vulnerability is a weakness that can be exploited by a threat. Examples include unpatched software, weak passwords, or misconfigured systems.' },
            { type: 'heading', level: 2, content: 'Risks' },
            { type: 'paragraph', content: 'Risk is the potential for loss when a threat exploits a vulnerability. Risk = Threat x Vulnerability x Impact.' },
            { type: 'callout', variant: 'formula', content: 'Risk = Threat x Vulnerability x Impact' },
            { type: 'diagram', title: 'Risk Relationship', data: { type: 'flow', nodes: ['Threat Actor', 'Exploits', 'Vulnerability', 'Causes', 'Impact', 'To', 'Asset'] } },
          ]),
          keyTerms: JSON.stringify(['Threat', 'Vulnerability', 'Risk', 'Impact', 'Exploit', 'Attack Surface', 'Threat Actor']),
        },
        {
          moduleId: mod1.id,
          title: 'Security Controls and Defense',
          slug: 'security-controls-defense',
          lessonType: LessonType.THEORY,
          orderIndex: 4,
          durationMinutes: 25,
          xpReward: 15,
          content: JSON.stringify([
            { type: 'heading', content: 'Security Controls' },
            { type: 'paragraph', content: 'Security controls are safeguards or countermeasures to avoid, detect, counteract, or minimize security risks. They are categorized into three main types.' },
            { type: 'heading', level: 2, content: 'Preventive Controls' },
            { type: 'paragraph', content: 'Controls that prevent security incidents from occurring. Examples: firewalls, encryption, access controls, security awareness training.' },
            { type: 'heading', level: 2, content: 'Detective Controls' },
            { type: 'paragraph', content: 'Controls that detect security incidents in progress or after they occur. Examples: IDS/IPS, log monitoring, security audits.' },
            { type: 'heading', level: 2, content: 'Corrective Controls' },
            { type: 'paragraph', content: 'Controls that restore systems after an incident. Examples: backups, patch management, incident response procedures.' },
            { type: 'list', title: 'Common Security Controls', items: ['Firewalls', 'Antivirus/EDR', 'Encryption', 'Multi-Factor Authentication', 'Access Control Lists', 'Intrusion Detection Systems', 'Security Policies', 'Security Awareness Training'] },
          ]),
          keyTerms: JSON.stringify(['Security Controls', 'Preventive', 'Detective', 'Corrective', 'Defense in Depth', 'Firewall', 'IDS']),
        },
      ],
    });


    // Module 2: Authentication & Access Control
    const mod2 = await prisma.module.create({
      data: {
        courseId: course1.id,
        title: 'Authentication & Access Control',
        description: 'Learn how systems verify identity and control access to resources.',
        orderIndex: 2,
      },
    });

    await prisma.lesson.createMany({
      data: [
        {
          moduleId: mod2.id,
          title: 'Authentication Fundamentals',
          slug: 'authentication-fundamentals',
          lessonType: LessonType.THEORY,
          orderIndex: 1,
          durationMinutes: 20,
          xpReward: 15,
          content: JSON.stringify([
            { type: 'heading', content: 'Authentication: Proving Your Identity' },
            { type: 'paragraph', content: 'Authentication is the process of verifying the identity of a user, device, or system. It answers the question: "Are you who you claim to be?"' },
            { type: 'heading', level: 2, content: 'Authentication Factors' },
            { type: 'list', items: ['Something you KNOW (password, PIN)', 'Something you HAVE (smart card, phone)', 'Something you ARE (fingerprint, face)'] },
            { type: 'heading', level: 2, content: 'Multi-Factor Authentication (MFA)' },
            { type: 'paragraph', content: 'MFA requires two or more factors to authenticate. This significantly reduces the risk of unauthorized access even if one factor is compromised.' },
          ]),
          keyTerms: JSON.stringify(['Authentication', 'MFA', 'Password', 'Biometrics', 'Token', 'Single Sign-On']),
        },
        {
          moduleId: mod2.id,
          title: 'Authorization and Access Control',
          slug: 'authorization-access-control',
          lessonType: LessonType.THEORY,
          orderIndex: 2,
          durationMinutes: 25,
          xpReward: 15,
          content: JSON.stringify([
            { type: 'heading', content: 'Authorization: What Can You Access?' },
            { type: 'paragraph', content: 'While authentication verifies WHO you are, authorization determines WHAT you can do. It controls access to resources based on policies and permissions.' },
            { type: 'heading', level: 2, content: 'Access Control Models' },
            { type: 'list', items: ['DAC - Discretionary Access Control', 'MAC - Mandatory Access Control', 'RBAC - Role-Based Access Control', 'ABAC - Attribute-Based Access Control'] },
            { type: 'heading', level: 2, content: 'Principle of Least Privilege' },
            { type: 'paragraph', content: 'Users should only have the minimum permissions necessary to perform their job functions. This limits the blast radius if an account is compromised.' },
          ]),
          keyTerms: JSON.stringify(['Authorization', 'RBAC', 'Least Privilege', 'Access Control', 'Permissions']),
        },
      ],
    });


    // Course 2: Computer Fundamentals for Security
    const course2 = await prisma.course.create({
      data: {
        learningPathId: foundationsPath.id,
        title: 'Computer Fundamentals for Security',
        slug: 'computer-fundamentals-security',
        description: 'Understand how computers work at a fundamental level — essential knowledge for security analysis.',
        difficulty: Difficulty.BEGINNER,
        durationHours: 10,
        orderIndex: 2,
        isPublished: true,
        skills: JSON.stringify(['Operating Systems', 'File Systems', 'Processes', 'Memory Management']),
      },
    });

    const mod3 = await prisma.module.create({
      data: {
        courseId: course2.id,
        title: 'Operating System Fundamentals',
        description: 'How operating systems manage hardware and software resources.',
        orderIndex: 1,
      },
    });

    await prisma.lesson.createMany({
      data: [
        {
          moduleId: mod3.id,
          title: 'How Computers Work',
          slug: 'how-computers-work',
          lessonType: LessonType.THEORY,
          orderIndex: 1,
          durationMinutes: 25,
          xpReward: 15,
          content: JSON.stringify([
            { type: 'heading', content: 'Computer Architecture Basics' },
            { type: 'paragraph', content: 'Understanding how a computer works is essential for cybersecurity. Every attack and defense involves the fundamental components of a computer system.' },
            { type: 'heading', level: 2, content: 'Core Components' },
            { type: 'list', items: ['CPU - The brain that executes instructions', 'RAM - Temporary fast memory for running programs', 'Storage (HDD/SSD) - Permanent data storage', 'Network Interface - Communication with other systems', 'I/O Devices - Keyboard, mouse, display'] },
            { type: 'diagram', title: 'Computer Architecture', data: { type: 'flow', nodes: ['CPU', 'RAM', 'Storage', 'Network', 'I/O'] } },
          ]),
          keyTerms: JSON.stringify(['CPU', 'RAM', 'Storage', 'Process', 'Thread', 'Kernel']),
        },
        {
          moduleId: mod3.id,
          title: 'Processes and Services',
          slug: 'processes-and-services',
          lessonType: LessonType.THEORY,
          orderIndex: 2,
          durationMinutes: 20,
          xpReward: 15,
          content: JSON.stringify([
            { type: 'heading', content: 'Processes, Services, and Daemons' },
            { type: 'paragraph', content: 'A process is a running instance of a program. Services (or daemons) are background processes that run continuously. Understanding these is crucial for detecting malicious activity.' },
            { type: 'callout', variant: 'security', content: 'Attackers often disguise malicious processes as legitimate services. Learning to identify normal vs. abnormal processes is a key security skill.' },
          ]),
          keyTerms: JSON.stringify(['Process', 'Service', 'Daemon', 'PID', 'Thread', 'System Call']),
        },
      ],
    });
  }


  // Create courses for Network Security path
  const networkPath = await prisma.learningPath.findUnique({
    where: { slug: 'network-security' },
  });

  if (networkPath) {
    const netCourse = await prisma.course.create({
      data: {
        learningPathId: networkPath.id,
        title: 'Networking Fundamentals',
        slug: 'networking-fundamentals',
        description: 'Master TCP/IP, DNS, HTTP, and network protocols essential for security.',
        difficulty: Difficulty.BEGINNER,
        durationHours: 12,
        orderIndex: 1,
        isPublished: true,
        skills: JSON.stringify(['TCP/IP', 'DNS', 'HTTP', 'Subnetting', 'Routing']),
      },
    });

    const netMod1 = await prisma.module.create({
      data: {
        courseId: netCourse.id,
        title: 'TCP/IP and the OSI Model',
        description: 'Understanding network communication layers.',
        orderIndex: 1,
      },
    });

    await prisma.lesson.createMany({
      data: [
        {
          moduleId: netMod1.id,
          title: 'The OSI Model Explained',
          slug: 'osi-model-explained',
          lessonType: LessonType.THEORY,
          orderIndex: 1,
          durationMinutes: 30,
          xpReward: 20,
          content: JSON.stringify([
            { type: 'heading', content: 'The OSI Model: 7 Layers of Networking' },
            { type: 'paragraph', content: 'The OSI (Open Systems Interconnection) model is a conceptual framework for understanding how network communication works. It divides networking into 7 layers, each with specific responsibilities.' },
            { type: 'diagram', title: 'OSI Model Layers', data: { type: 'stack', layers: ['7. Application', '6. Presentation', '5. Session', '4. Transport', '3. Network', '2. Data Link', '1. Physical'] } },
            { type: 'heading', level: 2, content: 'Security at Each Layer' },
            { type: 'paragraph', content: 'Each layer has unique security considerations. Understanding where attacks occur helps you choose the right defenses.' },
          ]),
          keyTerms: JSON.stringify(['OSI Model', 'TCP/IP', 'Layer', 'Protocol', 'Encapsulation']),
        },
        {
          moduleId: netMod1.id,
          title: 'IP Addressing and Subnetting',
          slug: 'ip-addressing-subnetting',
          lessonType: LessonType.PRACTICAL,
          orderIndex: 2,
          durationMinutes: 35,
          xpReward: 25,
          content: JSON.stringify([
            { type: 'heading', content: 'IP Addresses: The Language of Networks' },
            { type: 'paragraph', content: 'Every device on a network needs a unique IP address. Understanding IP addressing is fundamental to network security — it helps you identify sources of attacks and segment networks.' },
            { type: 'heading', level: 2, content: 'IPv4 Addressing' },
            { type: 'paragraph', content: 'IPv4 uses 32-bit addresses written in dotted decimal notation (e.g., 192.168.1.1). Each octet ranges from 0 to 255.' },
            { type: 'command', command: 'ip addr show', explanation: 'Shows network interfaces and their IP addresses on Linux', output: 'inet 192.168.1.100/24 brd 192.168.1.255 scope global eth0' },
          ]),
          keyTerms: JSON.stringify(['IPv4', 'IPv6', 'Subnet Mask', 'CIDR', 'Private IP', 'Public IP', 'NAT']),
          commands: JSON.stringify([
            { command: 'ip addr show', description: 'Display network interfaces' },
            { command: 'ping 192.168.1.1', description: 'Test network connectivity' },
            { command: 'nslookup example.com', description: 'DNS lookup' },
          ]),
        },
      ],
    });
  }


  // Create courses for Linux Security path
  const linuxPath = await prisma.learningPath.findUnique({
    where: { slug: 'linux-security' },
  });

  if (linuxPath) {
    const linuxCourse = await prisma.course.create({
      data: {
        learningPathId: linuxPath.id,
        title: 'Linux Fundamentals for Security',
        slug: 'linux-fundamentals-security',
        description: 'Master the Linux command line and understand Linux security from the ground up.',
        difficulty: Difficulty.BEGINNER,
        durationHours: 15,
        orderIndex: 1,
        isPublished: true,
        skills: JSON.stringify(['Linux CLI', 'File Permissions', 'User Management', 'Services', 'Logs']),
      },
    });

    const linMod1 = await prisma.module.create({
      data: {
        courseId: linuxCourse.id,
        title: 'Linux Command Line Essentials',
        description: 'Master the terminal - your primary tool as a security professional.',
        orderIndex: 1,
      },
    });

    await prisma.lesson.createMany({
      data: [
        {
          moduleId: linMod1.id,
          title: 'Navigating the Linux Filesystem',
          slug: 'navigating-linux-filesystem',
          lessonType: LessonType.PRACTICAL,
          orderIndex: 1,
          durationMinutes: 30,
          xpReward: 20,
          content: JSON.stringify([
            { type: 'heading', content: 'The Linux Filesystem' },
            { type: 'paragraph', content: 'The Linux filesystem is organized in a hierarchical tree structure starting from the root directory (/). Understanding this structure is essential for security analysis, log investigation, and system hardening.' },
            { type: 'diagram', title: 'Linux Directory Structure', data: { type: 'tree', root: '/', children: ['/bin', '/etc', '/home', '/var', '/tmp', '/usr', '/root', '/proc'] } },
            { type: 'command', command: 'ls -la /etc', explanation: 'List all files in /etc with details. The /etc directory contains system configuration files.', output: 'drwxr-xr-x  2 root root 4096 Jan 15 10:00 ssh\n-rw-r--r--  1 root root  104 Jan 15 10:00 hosts' },
            { type: 'command', command: 'pwd', explanation: 'Print Working Directory - shows your current location in the filesystem', output: '/home/student' },
            { type: 'command', command: 'cd /var/log', explanation: 'Change to the logs directory - crucial for security monitoring', output: '' },
            { type: 'callout', variant: 'security', content: 'The /var/log directory is critical for security. It contains authentication logs, system logs, and application logs that help detect intrusions.' },
          ]),
          keyTerms: JSON.stringify(['Root Directory', 'Home Directory', 'Path', 'Absolute Path', 'Relative Path']),
          commands: JSON.stringify([
            { command: 'ls', description: 'List directory contents' },
            { command: 'cd', description: 'Change directory' },
            { command: 'pwd', description: 'Print working directory' },
            { command: 'cat', description: 'Display file contents' },
            { command: 'find', description: 'Search for files' },
          ]),
        },
        {
          moduleId: linMod1.id,
          title: 'File Permissions and Ownership',
          slug: 'file-permissions-ownership',
          lessonType: LessonType.PRACTICAL,
          orderIndex: 2,
          durationMinutes: 35,
          xpReward: 25,
          content: JSON.stringify([
            { type: 'heading', content: 'Linux File Permissions' },
            { type: 'paragraph', content: 'File permissions are the first line of defense in Linux security. They control who can read, write, or execute files and directories.' },
            { type: 'heading', level: 2, content: 'Permission Types' },
            { type: 'list', items: ['r (read) - View file contents or list directory', 'w (write) - Modify file or add/remove directory entries', 'x (execute) - Run file as program or enter directory'] },
            { type: 'command', command: 'chmod 750 script.sh', explanation: 'Set permissions: owner=rwx, group=r-x, others=none', output: '' },
            { type: 'command', command: 'chown root:admin /etc/config', explanation: 'Change owner to root and group to admin', output: '' },
            { type: 'callout', variant: 'warning', content: 'Never set permissions to 777 on production systems. This gives everyone full access and is a major security risk.' },
          ]),
          keyTerms: JSON.stringify(['Permission', 'chmod', 'chown', 'SUID', 'SGID', 'Sticky Bit', 'umask']),
          commands: JSON.stringify([
            { command: 'chmod', description: 'Change file permissions' },
            { command: 'chown', description: 'Change file owner' },
            { command: 'ls -la', description: 'List with permissions' },
          ]),
        },
      ],
    });
  }


  // Create courses for Web Application Security path
  const webPath = await prisma.learningPath.findUnique({
    where: { slug: 'web-application-security' },
  });

  if (webPath) {
    await prisma.course.create({
      data: {
        learningPathId: webPath.id,
        title: 'Web Security Fundamentals',
        slug: 'web-security-fundamentals',
        description: 'Learn HTTP, web architecture, and common vulnerabilities from the OWASP Top 10.',
        difficulty: Difficulty.INTERMEDIATE,
        durationHours: 15,
        orderIndex: 1,
        isPublished: true,
        skills: JSON.stringify(['HTTP', 'OWASP Top 10', 'XSS', 'SQL Injection', 'CSRF']),
      },
    });
  }

  // Create courses for Ethical Hacking path
  const ethicalPath = await prisma.learningPath.findUnique({
    where: { slug: 'ethical-hacking' },
  });

  if (ethicalPath) {
    await prisma.course.create({
      data: {
        learningPathId: ethicalPath.id,
        title: 'Introduction to Ethical Hacking',
        slug: 'intro-ethical-hacking',
        description: 'Learn the methodology, tools, and ethics of authorized security testing.',
        difficulty: Difficulty.INTERMEDIATE,
        durationHours: 12,
        orderIndex: 1,
        isPublished: true,
        skills: JSON.stringify(['Reconnaissance', 'Scanning', 'Enumeration', 'Reporting']),
      },
    });
  }

  // Create course for SOC path
  const socPath = await prisma.learningPath.findUnique({
    where: { slug: 'soc-blue-team' },
  });

  if (socPath) {
    await prisma.course.create({
      data: {
        learningPathId: socPath.id,
        title: 'SOC Analyst Fundamentals',
        slug: 'soc-analyst-fundamentals',
        description: 'Learn the daily operations, tools, and processes of a Security Operations Center.',
        difficulty: Difficulty.INTERMEDIATE,
        durationHours: 14,
        orderIndex: 1,
        isPublished: true,
        skills: JSON.stringify(['Alert Triage', 'Log Analysis', 'SIEM', 'Incident Response']),
      },
    });
  }
}


async function seedBadges() {
  await prisma.badge.createMany({
    data: [
      { name: 'First Steps', description: 'Complete your first lesson', icon: 'rocket', color: '#10b981' },
      { name: 'Quick Learner', description: 'Complete 10 lessons', icon: 'zap', color: '#f59e0b' },
      { name: 'Lab Rat', description: 'Complete your first practical lab', icon: 'flask', color: '#8b5cf6' },
      { name: 'Streak Master', description: 'Maintain a 7-day learning streak', icon: 'flame', color: '#ef4444' },
      { name: 'Security Researcher', description: 'Complete 5 challenges', icon: 'search', color: '#3b82f6' },
      { name: 'Network Ninja', description: 'Complete the Networking course', icon: 'network', color: '#06b6d4' },
      { name: 'Linux Warrior', description: 'Complete the Linux Security course', icon: 'terminal', color: '#84cc16' },
      { name: 'Web Guardian', description: 'Complete the Web Security course', icon: 'shield', color: '#d946ef' },
      { name: 'CTF Champion', description: 'Solve 10 CTF challenges', icon: 'flag', color: '#f97316' },
      { name: 'Knowledge Seeker', description: 'Complete 50 lessons', icon: 'book', color: '#14b8a6' },
    ],
  });
}


async function seedChallenges() {
  const flagHash = await bcrypt.hash('flag{welcome_to_cybersec}', 10);

  await prisma.challenge.createMany({
    data: [
      {
        title: 'Hello Security',
        slug: 'hello-security',
        description: 'A warm-up challenge. Find the hidden flag in the page source of our practice web page.',
        category: 'WEB',
        difficulty: Difficulty.BEGINNER,
        points: 50,
        flagHash,
        hints: JSON.stringify(['Check the HTML source code', 'Look for comments in the page']),
        maxAttempts: 10,
      },
      {
        title: 'Base64 Decode',
        slug: 'base64-decode',
        description: 'The flag has been encoded. Can you decode it? ZmxhZ3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259',
        category: 'CRYPTO',
        difficulty: Difficulty.BEGINNER,
        points: 50,
        flagHash: await bcrypt.hash('flag{base64_is_not_encryption}', 10),
        hints: JSON.stringify(['This is a common encoding scheme', 'Try base64 decode']),
        maxAttempts: 10,
      },
      {
        title: 'Find the User',
        slug: 'find-the-user',
        description: 'A suspicious user has been created on this Linux system. Find their username. The flag format is flag{username}.',
        category: 'LINUX',
        difficulty: Difficulty.BEGINNER,
        points: 75,
        flagHash: await bcrypt.hash('flag{h4cker_user}', 10),
        hints: JSON.stringify(['Check /etc/passwd', 'Look for users with unusual shells']),
        maxAttempts: 10,
      },
      {
        title: 'Packet Detective',
        slug: 'packet-detective',
        description: 'Analyze the provided PCAP file and find the suspicious DNS query. The flag is the queried domain.',
        category: 'NETWORK',
        difficulty: Difficulty.INTERMEDIATE,
        points: 100,
        flagHash: await bcrypt.hash('flag{evil-c2-server.bad}', 10),
        hints: JSON.stringify(['Filter by DNS protocol', 'Look for unusual domain names']),
        maxAttempts: 10,
      },
      {
        title: 'Broken Authentication',
        slug: 'broken-authentication',
        description: 'The login form on our practice application has a vulnerability. Can you bypass it and access the admin panel?',
        category: 'WEB',
        difficulty: Difficulty.INTERMEDIATE,
        points: 150,
        flagHash: await bcrypt.hash('flag{auth_bypass_success}', 10),
        hints: JSON.stringify(['Think about how the application validates input', 'SQL might be involved']),
        maxAttempts: 15,
      },
      {
        title: 'Hidden in Plain Sight',
        slug: 'hidden-plain-sight',
        description: 'A file has been hidden on the Linux system. It contains the flag. Find it.',
        category: 'LINUX',
        difficulty: Difficulty.INTERMEDIATE,
        points: 100,
        flagHash: await bcrypt.hash('flag{hidden_files_found}', 10),
        hints: JSON.stringify(['Hidden files start with a dot', 'Try find command with special options']),
        maxAttempts: 10,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
