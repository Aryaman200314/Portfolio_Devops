// src/data/portfolio.js
const data = {
    name: "Aryaman",
    role: "DevOps Engineer • Web Developer",
  
    about:
      "I’m a DevOps engineer specializing in AWS and Kubernetes with a strong foundation in frontend development. I design resilient infrastructure, build CI/CD pipelines, and ship performant React apps. My current focus is EKS operations, infra-as-code, observability, and DX tooling.",
  
    skills: {
      Cloud: ["AWS", "EKS", "EC2", "S3", "IAM", "SCP"],
      DevOps: ["Docker", "Kubernetes", "Helm", "GitHub Actions", "Jenkins"],
      Infra: ["Terraform", "Ansible", "Linux", "Networking"],
      Web: ["React", "Vite", "TailwindCSS", "Node.js", "FastAPI"],
      Observability: ["Prometheus", "Grafana", "ELK"],
    },
  
    projects: [
      {
        title: "Quota Automation (AWS Service Quotas)",
        description:
          "Multi-account automation that audits AWS Service Quotas, alerts owners before thresholds (e.g., 80%), and archives results. A Jenkins pipeline assumes roles into target accounts, generates a consolidated report, delivers custom emails and Slack alerts, and stores history in S3.",
        stack: [
          "Jenkins",
          "AWS Service Quotas",
          "CloudFormation (CFT)",
          "IAM / STS AssumeRole",
          "Python / boto3",
          "AWS SES",
          "Slack Webhooks",
          "S3",
          "EventBridge/CloudWatch"
        ],
        type: "Automation",
        details: [
          "CFT deploys cross-account IAM role; Jenkins assumes role via STS to run checks across selected accounts",
          "Configurable threshold (e.g., 80%) for proactive alerts on nearing quota limits",
          "Generates per-account and consolidated CSV/HTML reports with current usage vs. quota",
          "Sends custom email notifications to account owners via SES with actionable context and links",
          "Posts Slack alerts with run status, affected services, and summary metrics",
          "Persists run artifacts and historical reports to versioned S3 bucket for audits and trend analysis",
          "Scheduled via Jenkins (or EventBridge) with retry & idempotent execution",
        ],
        links: [
          { label: "Sample Report", href: "" }
        ],
      },
  
      {
        title: "EKS Dashboard",
        description:
          "Production-grade FastAPI + React dashboard for managing and monitoring EKS clusters; features include SQLite caching, session pooling, IAM-aware session reuse, and integrated metrics for live customers.",
        stack: [
          "React",
          "FastAPI",
          "AWS EKS",
          "boto3",
          "SQLite",
          "Tailwind",
          "Prometheus",
          "Grafana",
        ],
        type: "Platform",
        details: [
          "Live project actively used by customers in production",
          "Boto3 session cache keyed by STS Expiration with IAM role reuse",
          "SQLite state store with TTL-based refresh on UI navigation",
          "Prometheus/Grafana dashboards for outgoing request/response size metrics",
          "Asynchronous tab-wise data loading for optimized UX",
          "Monthly aggregated traffic stats with automated 6-month retention",
        ],
      },
      {
        title: "CI/CD for Monorepo",
        description:
          "Reusable GitHub Actions workflows for build, test, SBOM/scan, and EKS deploy (blue/green).",
        stack: ["GitHub Actions", "Docker", "ECR", "EKS", "Helm"],
        type: "CI/CD",
        details: [
          "Composite actions with caching layers",
          "Preview envs via ephemeral namespaces",
        ],
        links: [{ label: "Case Study", href: "" }],
      },
      {
        title: "Infra-as-Code on AWS",
        description:
          "Terraform modules for VPC, EKS, RDS, CloudFront, with environments and GitOps promotion.",
        stack: ["Terraform", "AWS", "GitOps"],
        type: "IaC",
        details: [
          "Opinionated modules with examples",
          "Atlantis/Spacelift friendly structure",
        ],
        links: [{ label: "Modules", href: "" }],
      },
      {
        title: "Observability Starter",
        description:
          "K8s manifests + Helm for Prometheus, Grafana, Loki, Tempo, and OTEL collector with dashboards.",
        stack: ["Prometheus", "Grafana", "Loki", "OTEL"],
        type: "Observability",
        details: [
          "Kube-state-metrics, node-exporter, blackbox",
          "Out-of-the-box latency/throughput SLOs",
        ],
        links: [],
      },
    ],
  
    experiences: [
        {
          company: "CloudKeeper",
          title: "DevOps Engineer",
          period: "Aug 2025 — Present",
          bullets: [
            "Designed AWS infra with Terraform/CloudFormation",
            "Built CI/CD (GitHub Actions/Jenkins) for containers",
            "Operated EKS; added observability with Prometheus/Grafana",
            "Working with live customers on production EKS operations and tooling",
          ],
        },
        {
          company: "CloudKeeper",
          title: "DevOps Trainee",
          period: "Jan 2025 — Jul 2025",
          bullets: [
            "Hands-on training in AWS, Kubernetes, and IaC",
            "Built sample EKS clusters and integrated observability (Prometheus/Grafana)",
            "Practiced CI/CD pipelines with GitHub Actions and Jenkins",
            "Learned Terraform, Ansible, and Linux system automation",
          ],
        },
        {
          company: "Full-Stack Internship",
          title: "Full-Stack Developer Intern",
          period: "Jan 2023 — Jun 2023",
          bullets: [
            "Worked on React + FastAPI applications with REST APIs",
            "Implemented responsive UI using TailwindCSS and Vite",
            "Contributed to backend services with Python and Node.js",
            "Learned CI/CD basics and containerization with Docker",
          ],
        },
        {
          company: "Freelance",
          title: "Full-Stack Developer",
          period: "2021 — 2023",
          bullets: [
            "Shipped React + Node/FastAPI apps",
            "Automated testing and deployments",
          ],
        },
      ],
      
      
  
    quickChips: [
      { icon: "Cloud", label: "AWS" },
      { icon: "Boxes", label: "Kubernetes" },
      { icon: "Server", label: "CI/CD" },
      { icon: "Terminal", label: "Automation" },
    ],
  };
  
  export default data;
  