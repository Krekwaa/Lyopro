export type CaseStudy = {
  slug: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  metadata: { label: string; value: string }[];
  overview: string[];
  challenge: string[];
  deliverables: { title: string; text: string }[];
  architecture: {
    nodes: string[];
    branches?: string[];
    branchFrom?: string;
    support?: string;
    note?: string;
  };
  technicalApproach: string[];
  engineeringChallenges: { title: string; text: string }[];
  role: string[];
  outcome: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "gis-geological-data-processing",
    number: "01",
    title: "GIS / Geological Data Processing Platform",
    category: "Data & GIS",
    summary: "End-to-end platform for validating, processing and governing structurally complex geological data.",
    tags: ["GIS", "Data Processing", "Python", "AWS"],
    metadata: [
      { label: "Client", value: "Government of Saskatchewan, Canada" },
      { label: "Sector", value: "Public Sector / Geoscience Data" },
      { label: "Engagement", value: "End-to-end data-processing and GIS solution" },
      { label: "Technology", value: "ArcGIS ecosystem · Python · AWS S3" },
    ],
    overview: [
      "The engagement focused on replacing a legacy, largely manual workflow used to enter, validate, process and store geological data.",
      "The existing process relied heavily on Excel files and manual handling, creating limitations around scalability, consistency and data quality.",
      "The delivered platform covered data intake, automated validation, processing, storage and controlled access.",
      "The processing model was designed to support highly variable input data and configurable processing rules rather than a single hard-coded workflow.",
    ],
    challenge: [
      "Geological information was stored in loosely structured files.",
      "The workflow required significant manual effort.",
      "Manual input increased the risk of errors.",
      "Processing was difficult to scale.",
      "The client needed centralized validation and storage.",
      "Different users required different levels of access.",
      "Large file uploads had to work even under unstable network conditions.",
    ],
    deliverables: [
      { title: "Data Intake", text: "Structured interface for geological data submission." },
      { title: "Automated Validation", text: "Validation of incoming data against defined reference information." },
      { title: "Processing Orchestration", text: "Configurable multi-stage processing flows implemented around defined rules." },
      { title: "Centralized Storage", text: "Controlled storage architecture using AWS S3 and target data stores." },
      { title: "Access Control", text: "Role-based and classification-based access to geological information." },
    ],
    architecture: {
      nodes: ["Data Input", "Validation", "Processing", "Configurable Orchestration", "Storage", "Controlled Access"],
    },
    technicalApproach: [
      "ArcGIS-based GIS environment",
      "Python for processing and automation",
      "AWS S3 for storage",
      "Configurable processing orchestration",
      "Role-based and classification-based access model",
      "Architecture supporting large files and unstable network conditions",
    ],
    engineeringChallenges: [
      { title: "Handling Structurally Variable Data", text: "The platform had to normalize and process source data with significant structural variation." },
      { title: "Large File Processing", text: "The architecture had to support large uploads under unreliable network conditions." },
      { title: "Governed Access", text: "Access needed to reflect user roles and data classification rather than a single global permission model." },
    ],
    role: ["Solution Architecture", "Senior Engineering", "Data Processing Design", "GIS Engineering", "Automation", "Access-Control Design", "Cloud Storage Integration"],
    outcome: [
      "The client received a working platform for entering, validating, processing and storing geological data in a controlled and repeatable workflow.",
      "The solution reduced reliance on unstructured Excel-based processes and created a more consistent foundation for geological data operations.",
    ],
  },
  {
    slug: "corporate-reporting-business-intelligence",
    number: "02",
    title: "Corporate Reporting & Business Intelligence Platform",
    category: "Business Intelligence",
    summary: "A governed corporate reporting platform built around Tableau Server and integrated enterprise data sources.",
    tags: ["Tableau", "Business Intelligence", "Data Integration", "Python"],
    metadata: [
      { label: "Client", value: "Vodafone" },
      { label: "Sector", value: "Telecommunications" },
      { label: "Primary users", value: "Marketing and financial reporting; later broader corporate use" },
      { label: "Platform", value: "Tableau Server · On-premises" },
    ],
    overview: [
      "The project began as the deployment of a new business-intelligence service and evolved into a broader corporate reporting platform.",
      "The original environment had not been fully launched successfully, so the service was rebuilt and configured from the infrastructure level upward.",
      "Over time, Tableau became a shared reporting capability used by multiple functions and later became an important reporting component during a billing-platform transformation.",
    ],
    challenge: [
      "Reporting depended heavily on extracts and Excel-based exchange.",
      "Analytical outputs were difficult to share and reuse consistently.",
      "The organization needed governed access to reporting.",
      "BI development responsibilities needed to be defined.",
      "The platform had to integrate with corporate databases.",
      "Security and network architecture had to comply with enterprise policies.",
      "The environment was fully on-premises.",
    ],
    deliverables: [
      { title: "Tableau Platform Deployment", text: "Installation and configuration of Tableau Server." },
      { title: "Access & Security Model", text: "Role-based access and network rules aligned with corporate policies." },
      { title: "Data Source Integration", text: "Secure integration with Oracle, Vertica and CSV-based sources." },
      { title: "Reporting Automation", text: "Python-based generation and email delivery of dashboard PDF snapshots." },
      { title: "CRM Integration", text: "Role-driven report access and embedded dashboards inside the B2B CRM." },
      { title: "Operational Support", text: "Updates, query optimization, troubleshooting and user support." },
    ],
    architecture: {
      nodes: ["Corporate Data Sources", "Tableau Server", "Role-Based Access", "Dashboards / Reporting", "B2B CRM / Email Distribution"],
      support: "Oracle · Vertica · CSV → Corporate Data Sources",
      note: "Deployed inside the corporate security perimeter.",
    },
    technicalApproach: ["Tableau Server", "Linux", "Oracle", "Vertica", "Python", "SQL", "Enterprise network configuration", "Separate VLAN for analytical traffic", "Role-based access", "On-premises deployment", "CRM integration"],
    engineeringChallenges: [
      { title: "Enterprise Security", text: "The platform had to operate fully inside the corporate security perimeter." },
      { title: "Data Connectivity", text: "Reporting needed secure access to multiple enterprise data sources." },
      { title: "Cross-System Authorization", text: "CRM roles were used to determine which embedded dashboards a user was allowed to access." },
      { title: "Reporting Without Direct Licenses", text: "Python components captured dashboard views and distributed PDF versions by email." },
    ],
    role: ["Platform Deployment", "BI Infrastructure", "Enterprise Integration", "Security & Access Design", "Python Automation", "Database Integration", "Network Design", "Technical Documentation", "Operational Support"],
    outcome: [
      "The project established a reusable corporate BI capability rather than a collection of isolated reports.",
      "The platform enabled regularly refreshed dashboards, shared analytical outputs, governed access and integration with broader business systems.",
      "Over time, the environment expanded from an initial BI deployment into a broader corporate reporting platform.",
    ],
  },
  {
    slug: "ai-call-center",
    number: "03",
    title: "AI Call Center",
    category: "AI & Cloud",
    summary: "Cloud-based automated outbound calling platform with configurable conversation flows and international telephony integration.",
    tags: ["AWS", "AI", "Amazon Connect", "Telephony"],
    metadata: [
      { label: "Business objective", value: "Increase conversion while reducing the cost of outbound calling" },
      { label: "Delivery model", value: "Automated call center without human operators in the standard call flow" },
      { label: "Cloud platform", value: "AWS" },
      { label: "Known components", value: "Amazon Connect · AWS conversational services · SIP connectivity" },
    ],
    overview: [
      "The project focused on creating an automated outbound calling platform in which a business or campaign manager could define a campaign and conversation scenario.",
      "The system then executed outbound calls automatically without a human operator handling the standard interaction.",
      "The business objective was to reduce the operating cost of conventional call centers while preserving a natural conversational experience.",
    ],
    challenge: [
      "Traditional outbound campaigns depended on human operators.",
      "Scaling depended directly on staffing capacity.",
      "Each interaction created operational cost.",
      "The automated experience still needed to sound natural.",
      "Multiple languages had to be supported.",
      "International telephony created routing and cost challenges.",
      "Local connectivity had to be established in target countries.",
    ],
    deliverables: [
      { title: "Campaign Configuration", text: "Business-driven configuration of campaign logic and conversation scenarios." },
      { title: "Automated Calling", text: "Execution of outbound calls without human operators in the standard flow." },
      { title: "Conversational Workflow", text: "Language-specific automated interaction based on predefined scenarios." },
      { title: "AWS Architecture", text: "Cloud-based architecture supporting call-center functionality." },
      { title: "International Telephony", text: "Local SIP connectivity and local numbers for target markets." },
      { title: "Partner Integration", text: "Coordination with telephony providers for country-specific connectivity." },
    ],
    architecture: {
      nodes: ["Campaign Manager", "Campaign / Conversation Scenario", "AWS Conversational Layer", "Amazon Connect", "Local SIP Gateway", "Customer"],
      support: "External telephony partners → Local SIP Gateway",
      branchFrom: "Local SIP Gateway",
    },
    technicalApproach: ["AWS", "Amazon Connect", "Configurable conversation flows", "Automated language-specific interaction", "SIP gateways", "Local telephony routing", "Partner integrations"],
    engineeringChallenges: [
      { title: "Natural Conversation Flow", text: "The interaction needed to follow defined scenarios without sounding like a rigid scripted robot." },
      { title: "Cross-Border Telephony", text: "International call routing had to avoid unnecessary international call costs." },
      { title: "Country-Specific Connectivity", text: "Local numbers and SIP gateways required cooperation with external telephony partners." },
    ],
    role: ["Solution Architecture", "AWS Configuration", "Application Logic", "Campaign Flow Design", "Telephony Integration", "Partner Coordination"],
    outcome: [
      "The client received a working automated call-center solution in which a configured campaign scenario could be converted into an outbound calling workflow executed by a robot rather than a human operator.",
      "The solution is not currently in use.",
    ],
  },
  {
    slug: "crm-business-configuration-digital-transformation",
    number: "04",
    title: "CRM & Business Configuration / Digital Transformation",
    category: "Enterprise Transformation",
    summary: "Salesforce Media Cloud architecture and order orchestration for a large-scale telecom digital-transformation program.",
    tags: ["Salesforce", "Media Cloud", "CRM", "Integration"],
    metadata: [
      { label: "Client", value: "British Telecom" },
      { label: "Sector", value: "Telecommunications" },
      { label: "Transformation scope", value: "Legacy-system modernization and end-to-end order-process digitization" },
      { label: "Platform & role", value: "Salesforce Media Cloud · Senior Solution Architecture" },
    ],
    overview: [
      "The project was a large-scale digital-transformation initiative focused on replacing legacy telecom systems and modernizing customer-order processes.",
      "Salesforce Media Cloud served as the central platform.",
      "The solution required extensive integration with the surrounding enterprise environment, including order management, billing-related systems, operational work systems and other external platforms.",
    ],
    challenge: [
      "The client operated an aging application landscape.",
      "Legacy CRM, billing and order systems had to be modernized.",
      "A single customer order could involve many dependent systems.",
      "Significant regulatory requirements increased integration complexity.",
      "Standard platform behavior was not sufficient for all processes.",
      "Performance and time-to-market were important requirements.",
      "The business needed more configurable product and process support.",
    ],
    deliverables: [
      { title: "Salesforce Media Cloud Architecture", text: "Architecture and implementation guidance around the core Salesforce platform." },
      { title: "Order Processing", text: "Design of end-to-end customer-order flows." },
      { title: "Order Orchestration", text: "Coordination of order execution across multiple dependent systems." },
      { title: "Enterprise Integration", text: "Integration with operational, ticketing and billing-related platforms." },
      { title: "Platform Customization", text: "Customization where standard Media Cloud behavior was insufficient." },
      { title: "Integration Documentation", text: "Requirements analysis and detailed documentation of cross-system behavior." },
    ],
    architecture: {
      nodes: ["Customer Request", "Salesforce Media Cloud", "Order Management", "Order Orchestration"],
      branches: ["Billing Systems", "Operational / Ticketing Systems", "External Systems", "Reporting"],
      branchFrom: "Order Orchestration",
    },
    technicalApproach: ["Salesforce Media Cloud", "Order Management", "Order Orchestration", "Enterprise Integration", "Billing Integration", "Requirements Analysis", "Integration Documentation", "Platform Customization"],
    engineeringChallenges: [
      { title: "Complex Order Orchestration", text: "A single customer order could trigger activity across many dependent systems." },
      { title: "Legacy Integration", text: "The new platform had to coexist with and replace elements of an established telecom application landscape." },
      { title: "Platform Customization", text: "Standard Media Cloud behavior was not sufficient for the complete environment." },
      { title: "Regulatory Complexity", text: "The telecom environment required integration with multiple external and government-related systems." },
    ],
    role: ["Senior Solution Architecture", "Architecture Guidance", "Requirements Analysis", "Order-Flow Design", "Enterprise Integration", "Integration Documentation", "Platform Customization Guidance"],
    outcome: [
      "The client received a modernized digital platform supporting core order-related processes and replacing parts of the legacy operating model.",
      "The solution created a more configurable foundation for managing telecom products and customer orders across a complex enterprise environment.",
    ],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find(caseStudy => caseStudy.slug === slug);
}
