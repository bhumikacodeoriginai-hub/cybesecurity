export const lesson = {
  id: 'L03',
  title: 'Threats, Vulnerabilities & Risks',
  slug: 'threats-vulnerabilities-risks',
  type: 'THEORY',
  duration: 30,
  xpReward: 15,
  difficulty: 'beginner',
  module: { title: 'Introduction to Cybersecurity', slug: 'intro-cybersecurity' },
  course: { title: 'CyberSec Academy', slug: 'cybersec-academy' },
  keyTerms: ['Threat', 'Vulnerability', 'Risk', 'Exploit', 'Attack Vector', 'Threat Actor', 'Risk Assessment'],
  content: [
    { type: 'heading', content: 'Threats, Vulnerabilities & Risks' },
    { type: 'paragraph', content: "These three terms are the foundation of all security decision-making. Understanding the difference between them — and how they interact — is how security professionals prioritize what to fix first." },
    { type: 'callout', variant: 'info', content: "Analogy: Your house has a window (asset). The window has a crack (vulnerability). A burglar exists in the neighborhood (threat). The RISK is the chance the burglar exploits the cracked window to steal your stuff. Risk = Threat x Vulnerability x Impact." },
    { type: 'heading', level: 2, content: 'Definitions' },
    { type: 'list', items: [
      "Threat — Anything that COULD cause harm (hackers, malware, natural disasters, insider mistakes)",
      "Vulnerability — A weakness that CAN be exploited (unpatched software, weak password, open port)",
      "Risk — The PROBABILITY of a threat exploiting a vulnerability, multiplied by the IMPACT",
      "Exploit — The actual technique/code used to take advantage of a vulnerability",
      "Attack Vector — The path an attacker uses to reach the vulnerability (email, network, USB)"
    ]},
    { type: 'heading', level: 2, content: 'The Risk Equation' },
    { type: 'paragraph', content: "Risk = Threat x Vulnerability x Impact" },
    { type: 'list', items: [
      "High threat + High vulnerability + High impact = CRITICAL risk (fix immediately)",
      "High threat + Low vulnerability + High impact = MEDIUM risk (the vulnerability is hard to exploit)",
      "Low threat + High vulnerability + Low impact = LOW risk (unlikely to be targeted, low damage)",
      "No threat OR no vulnerability = NO risk (if there is no attacker or no weakness, no risk exists)"
    ]},
    { type: 'heading', level: 2, content: 'Types of Threats' },
    { type: 'list', items: [
      "Malware — Viruses, worms, ransomware, trojans, spyware",
      "Phishing — Fake emails/websites that trick users into revealing credentials",
      "Denial of Service (DoS/DDoS) — Overwhelming systems with traffic until they crash",
      "Man-in-the-Middle — Intercepting communications between two parties",
      "SQL Injection — Inserting malicious code into database queries",
      "Social Engineering — Manipulating people into breaking security procedures",
      "Insider Threats — Employees or contractors who misuse their access",
      "Physical Threats — Theft of devices, natural disasters, power outages"
    ]},
    { type: 'heading', level: 2, content: 'Types of Vulnerabilities' },
    { type: 'list', items: [
      "Software bugs — Buffer overflows, logic errors, race conditions",
      "Misconfigurations — Default passwords, open ports, debug mode enabled",
      "Unpatched systems — Known CVEs that have fixes available but not applied",
      "Weak authentication — Simple passwords, no MFA, shared credentials",
      "Human factors — Untrained employees clicking phishing links",
      "Design flaws — Architecture decisions that cannot be patched (must redesign)",
      "Zero-day — Vulnerabilities unknown to the vendor (no patch exists yet)"
    ]},
    { type: 'heading', level: 2, content: 'Risk Management Strategies' },
    { type: 'list', items: [
      "Avoid — Eliminate the risk entirely (disconnect the system from the internet)",
      "Mitigate — Reduce the risk to acceptable levels (patch, add firewall, enable MFA)",
      "Transfer — Shift the risk to someone else (cyber insurance, outsourcing)",
      "Accept — Acknowledge the risk and do nothing (cost to fix > potential damage)"
    ]},
    { type: 'callout', variant: 'security', content: "Real-world example: A hospital runs Windows XP on medical devices (vulnerability). Ransomware gangs actively target healthcare (threat). Patient data and lives are at stake (high impact). Risk = CRITICAL. But they cannot easily patch because the medical device vendor does not support newer OS. Solution: Network segmentation (mitigate) + cyber insurance (transfer)." },
    { type: 'heading', level: 2, content: 'Summary' },
    { type: 'list', items: [
      "Threat = potential harm, Vulnerability = weakness, Risk = probability x impact",
      "Risk only exists when a threat AND a vulnerability are present together",
      "Risk management: Avoid, Mitigate, Transfer, or Accept",
      "Zero-day = no patch exists; you must rely on detection and segmentation",
      "Next: Who are the attackers and what motivates them?"
    ]},
  ],
  navigation: {
    prev: { title: 'The CIA Triad', slug: 'the-cia-triad' },
    next: { title: 'Types of Attackers & Motivations', slug: 'types-of-attackers' },
  },
};
