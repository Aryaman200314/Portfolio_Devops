// src/data/portfolio.js
const data = {
    name: "Aryaman",
    role: "DevOps Engineer • Web Developer",
  
    about:
      "I’m a DevOps engineer specializing in AWS and Kubernetes with a strong foundation in frontend development. I design resilient infrastructure, build CI/CD pipelines, and ship performant React apps. My current focus is EKS operations, infra-as-code, observability, and DX tooling.",

    skills: {
      Cloud: ["AWS", "EKS", "EC2", "S3", "IAM", "hh"],
      DevOps: ["Docker", "Kubernetes", "Helm", "GitHub Actions", "Jenkins", "ArgoCD"],
      Infra: ["Terraform", "Ansible", "Linux", "Networking"],
      Web: ["React", "Vite", "TailwindCSS", "Node.js", "FastAPI"],
      Observability: ["Prometheus", "Grafana", "ELK", "OpenTelemetry"],
    },
  
    projects: [
      {
        title: "EKS Dashboard",
        description:
          "FastAPI + React dashboard for EKS clusters; SQLite caching, session pooling, metrics, and IAM-aware session reuse.",
        stack: ["React", "FastAPI", "AWS EKS", "boto3", "SQLite", "Tailwind"],
        type: "Platform",
        details: [
          "Boto3 session cache keyed by STS Expiration",
          "SQLite state store with TTL-refresh on UI",
          "Prometheus/Grafana dashboards for request size",
        ],
        links: [{ label: "GitHub", href: "https://github.com/yourname/eks-dashboard" }],
      },
      {
        title: "CI/CD for Monorepo",
        description:
          "Reusable GitHub Actions workflows for build, test, SBOM/scan, and EKS deploy (blue/green).",
        stack: ["GitHub Actions", "Docker", "ECR", "EKS", "Helm"],
        type: "CI/CD",
        details: ["Composite actions with caching layers", "Preview envs via ephemeral namespaces"],
        links: [{ label: "Case Study", href: "https://your-link.example" }],
      },
      {
        title: "Infra-as-Code on AWS",
        description:
          "Terraform modules for VPC, EKS, RDS, CloudFront, with environments and GitOps promotion.",
        stack: ["Terraform", "AWS", "GitOps"],
        type: "IaC",
        details: ["Opinionated modules with examples", "Atlantis/Spacelift friendly structure"],
        links: [{ label: "Modules", href: "https://your-link.example" }],
      },
      {
        title: "Observability Starter",
        description:
          "K8s manifests + Helm for Prometheus, Grafana, Loki, Tempo, and OTEL collector with dashboards.",
        stack: ["Prometheus", "Grafana", "Loki", "OTEL"],
        type: "Observability",
        details: ["Kube-state-metrics, node-exporter, blackbox", "Out-of-the-box latency/throughput SLOs"],
        links: [],
      },
    ],
  
    experiences: [
      {
        company: "CloudKeeper",
        title: "DevOps Engineer",
        period: "2023 — Present",
        bullets: [
          "Designed AWS infra with Terraform/CloudFormation",
          "Built CI/CD (GitHub Actions/Jenkins) for containers",
          "Operated EKS; added observability with Prometheus/Grafana",
        ],
      },
      {
        company: "Freelance",
        title: "Full-Stack Developer",
        period: "2021 — 2023",
        bullets: ["Shipped React + Node/FastAPI apps", "Automated testing and deployments"],
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
  