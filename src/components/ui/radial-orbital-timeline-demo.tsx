"use client";

import { Zap, ShieldCheck, Maximize, Brain, Activity, Globe } from "lucide-react";
import RadialOrbitalTimeline from "./radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Fast",
    date: "Engineered Speed",
    content: "Blazing Fast Performance. Sub-100ms API Response Times, CDN-Powered Global Delivery, Optimized Database Indexing, and Edge Caching & Compression.",
    category: "Performance",
    icon: Zap,
    relatedIds: [2, 3, 5],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Secure",
    date: "Military-Grade",
    content: "Security is woven into every layer. Zero-Trust Architecture, End-to-End Encryption (AES-256), SOC 2 & ISO 27001 Compliance, and Real-Time Threat Detection.",
    category: "Security",
    icon: ShieldCheck,
    relatedIds: [1, 4, 6],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 3,
    title: "Scalable",
    date: "High Capacity",
    content: "Infinitely Scalable. Auto-Scaling Infrastructure, Microservices Architecture, Global Multi-Region Deployment, and Load Balancing & Failover mechanisms.",
    category: "Architecture",
    icon: Maximize,
    relatedIds: [1, 4, 5],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 4,
    title: "Intelligent",
    date: "AI-Powered",
    content: "AI-Powered Intelligence. Predictive Analytics, ML-Based Anomaly Detection, Self-Healing Systems, and AI-Driven Optimization across the entire stack.",
    category: "Innovation",
    icon: Brain,
    relatedIds: [2, 3, 6],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 5,
    title: "Reliable",
    date: "99.99% Uptime",
    content: "Rock-solid reliability. Fault-Tolerant systems, Automated Backups, Real-time Health Monitoring, and Self-Healing Infrastructure to ensure zero downtime.",
    category: "Operations",
    icon: Activity,
    relatedIds: [1, 3, 6],
    status: "completed" as const,
    energy: 98,
  },
  {
    id: 6,
    title: "Global",
    date: "World-Wide",
    content: "True Global Presence. Multi-Region Edge computing, Latency-Optimized Routing, Localized Content Delivery, and Geolocation-Aware intelligent balancing.",
    category: "Network",
    icon: Globe,
    relatedIds: [2, 4, 5],
    status: "completed" as const,
    energy: 92,
  }
];

export function RadialOrbitalTimelineDemo() {
  return (
    <>
      <RadialOrbitalTimeline timelineData={timelineData} />
    </>
  );
}
