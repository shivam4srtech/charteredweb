/**
 * SAMPLE DATA for the MVP pages.
 * Everything here is placeholder content until the dashboard backend is connected.
 * Replace each export with an API call (keep the same shapes) and the pages keep working.
 */

/* ---------- user ---------- */
export const sampleUser = {
  name: "Amit Sharma",
  firstName: "Amit",
  role: "Business User",
  email: "amit.sharma@example.com",
  phone: "+91 98765 43210",
  avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
  memberSince: "2026-03-14",
  business: {
    name: "Sharma Foods & Exports LLP",
    entityType: "Limited Liability Partnership",
    pan: "ABCFS1234K",
    gstin: "36ABCFS1234K1Z5",
    state: "Telangana",
    address: "Plot 42, Jubilee Hills, Hyderabad 500033",
  },
};

/* ---------- requests (My Services) ---------- */
export type RequestStatus = "in_progress" | "document_review" | "payment_pending" | "action_needed" | "completed";

export const REQUEST_STATUS: Record<RequestStatus, { label: string; tone: string }> = {
  in_progress: { label: "In Progress", tone: "blue" },
  document_review: { label: "Document Review", tone: "orange" },
  payment_pending: { label: "Payment Pending", tone: "yellow" },
  action_needed: { label: "Action Needed", tone: "red" },
  completed: { label: "Completed", tone: "green" },
};

export type ServiceRequest = {
  id: string;
  serviceId: string;
  serviceName: string;
  /** Mini icon: one character + colour theme (c-blue, c-green …) */
  mini: { text: string; color: string };
  status: RequestStatus;
  progress: number;
  eta: string;
  currentStep: string;
  startedOn: string;
  updatedOn: string;
  amount: number;
  specialist: string;
};

export const sampleRequests: ServiceRequest[] = [
  {
    id: "REQ-2026-000245",
    serviceId: "EXIM-IEC",
    serviceName: "Import Export Code (IEC)",
    mini: { text: "⚓", color: "c-blue" },
    status: "in_progress",
    progress: 60,
    eta: "2 Days Left",
    currentStep: "Filed with DGFT",
    startedOn: "2026-10-01",
    updatedOn: "2026-10-07",
    amount: 1500,
    specialist: "Priya Menon",
  },
  {
    id: "REQ-2026-000231",
    serviceId: "FSSAI-BASIC",
    serviceName: "FSSAI Registration",
    mini: { text: "f", color: "c-green" },
    status: "document_review",
    progress: 40,
    eta: "3 Days Left",
    currentStep: "Document Review",
    startedOn: "2026-09-29",
    updatedOn: "2026-10-06",
    amount: 2000,
    specialist: "Rahul Verma",
  },
  {
    id: "REQ-2026-000198",
    serviceId: "LAB-LIC",
    serviceName: "Labour License",
    mini: { text: "⚑", color: "c-purple" },
    status: "payment_pending",
    progress: 20,
    eta: "--",
    currentStep: "Payment",
    startedOn: "2026-09-24",
    updatedOn: "2026-09-24",
    amount: 15000,
    specialist: "Unassigned",
  },
  {
    id: "REQ-2026-000187",
    serviceId: "IP-TM",
    serviceName: "Trademark Registration - 1 Class",
    mini: { text: "™", color: "c-purple" },
    status: "action_needed",
    progress: 25,
    eta: "Waiting on you",
    currentStep: "Upload Documents",
    startedOn: "2026-09-20",
    updatedOn: "2026-10-03",
    amount: 2500,
    specialist: "Priya Menon",
  },
  {
    id: "REQ-2026-000163",
    serviceId: "GST-REG",
    serviceName: "GST Registration",
    mini: { text: "₹", color: "c-blue" },
    status: "completed",
    progress: 100,
    eta: "Completed",
    currentStep: "Certificate delivered",
    startedOn: "2026-09-02",
    updatedOn: "2026-09-09",
    amount: 1500,
    specialist: "Rahul Verma",
  },
  {
    id: "REQ-2026-000150",
    serviceId: "REG-UDYAM",
    serviceName: "Udyam MSME Registration",
    mini: { text: "U", color: "c-teal" },
    status: "completed",
    progress: 100,
    eta: "Completed",
    currentStep: "Certificate delivered",
    startedOn: "2026-08-18",
    updatedOn: "2026-08-19",
    amount: 1000,
    specialist: "Priya Menon",
  },
];

/* ---------- documents ---------- */
export type DocStatus = "verified" | "under_review" | "rejected" | "requested";
export const DOC_STATUS: Record<DocStatus, { label: string; tone: string }> = {
  verified: { label: "Verified", tone: "green" },
  under_review: { label: "Under Review", tone: "orange" },
  rejected: { label: "Re-upload needed", tone: "red" },
  requested: { label: "Requested", tone: "yellow" },
};

export type DocCategory = "KYC" | "Business" | "Certificates" | "Tax";

export type UserDocument = {
  id: string;
  name: string;
  fileName: string;
  category: DocCategory;
  requestId?: string;
  serviceName?: string;
  status: DocStatus;
  uploadedOn: string;
  size: string;
  /** Issued by CharteredONE / government (deliverable) vs. uploaded by you. */
  issued?: boolean;
};

export const sampleDocuments: UserDocument[] = [
  { id: "d1", name: "PAN Card – Firm", fileName: "firm-pan.pdf", category: "KYC", status: "verified", uploadedOn: "2026-08-18", size: "412 KB", requestId: "REQ-2026-000150", serviceName: "Udyam MSME Registration" },
  { id: "d2", name: "Aadhaar – Amit Sharma", fileName: "aadhaar-amit.pdf", category: "KYC", status: "verified", uploadedOn: "2026-08-18", size: "655 KB", requestId: "REQ-2026-000150", serviceName: "Udyam MSME Registration" },
  { id: "d3", name: "Cancelled Cheque", fileName: "cancelled-cheque.jpg", category: "Business", status: "verified", uploadedOn: "2026-10-01", size: "188 KB", requestId: "REQ-2026-000245", serviceName: "Import Export Code (IEC)" },
  { id: "d4", name: "Rent Agreement – Office", fileName: "rent-agreement.pdf", category: "Business", status: "under_review", uploadedOn: "2026-10-05", size: "1.3 MB", requestId: "REQ-2026-000231", serviceName: "FSSAI Registration" },
  { id: "d5", name: "Electricity Bill", fileName: "electricity-bill-sep.pdf", category: "Business", status: "rejected", uploadedOn: "2026-10-03", size: "604 KB", requestId: "REQ-2026-000231", serviceName: "FSSAI Registration" },
  { id: "d6", name: "GST Registration Certificate", fileName: "GST-REG-certificate.pdf", category: "Certificates", status: "verified", uploadedOn: "2026-09-09", size: "320 KB", requestId: "REQ-2026-000163", serviceName: "GST Registration", issued: true },
  { id: "d7", name: "Udyam Registration Certificate", fileName: "udyam-certificate.pdf", category: "Certificates", status: "verified", uploadedOn: "2026-08-19", size: "316 KB", requestId: "REQ-2026-000150", serviceName: "Udyam MSME Registration", issued: true },
  { id: "d8", name: "Form 16 – FY 2025-26", fileName: "form16-fy2526.pdf", category: "Tax", status: "verified", uploadedOn: "2026-07-12", size: "439 KB" },
];

export type DocumentRequest = { id: string; name: string; note: string; requestId: string; serviceName: string; dueOn: string };
export const sampleDocumentRequests: DocumentRequest[] = [
  { id: "r1", name: "Logo / wordmark", note: "High-resolution PNG or JPG of the mark you want to protect", requestId: "REQ-2026-000187", serviceName: "Trademark Registration - 1 Class", dueOn: "2026-10-10" },
  { id: "r2", name: "MSME / Startup proof", note: "Needed to claim the lower government fee", requestId: "REQ-2026-000187", serviceName: "Trademark Registration - 1 Class", dueOn: "2026-10-10" },
  { id: "r3", name: "Electricity bill (latest)", note: "Previous upload was unclear — please upload a full, readable copy", requestId: "REQ-2026-000231", serviceName: "FSSAI Registration", dueOn: "2026-10-09" },
];

/* ---------- payments ---------- */
export type InvoiceStatus = "paid" | "due" | "overdue";
export const INVOICE_STATUS: Record<InvoiceStatus, { label: string; tone: string }> = {
  paid: { label: "Paid", tone: "green" },
  due: { label: "Due", tone: "yellow" },
  overdue: { label: "Overdue", tone: "red" },
};

export type Invoice = {
  id: string;
  requestId: string;
  serviceName: string;
  amount: number;
  issuedOn: string;
  dueOn: string;
  paidOn?: string;
  status: InvoiceStatus;
  method?: string;
};

export const sampleInvoices: Invoice[] = [
  { id: "INV-2026-0158", requestId: "REQ-2026-000198", serviceName: "Labour License", amount: 15000, issuedOn: "2026-09-24", dueOn: "2026-10-10", status: "due" },
  { id: "INV-2026-0151", requestId: "REQ-2026-000245", serviceName: "Import Export Code (IEC)", amount: 1500, issuedOn: "2026-10-01", dueOn: "2026-10-01", paidOn: "2026-10-01", status: "paid", method: "UPI" },
  { id: "INV-2026-0149", requestId: "REQ-2026-000231", serviceName: "FSSAI Registration", amount: 2000, issuedOn: "2026-09-29", dueOn: "2026-09-29", paidOn: "2026-09-29", status: "paid", method: "Card •• 6411" },
  { id: "INV-2026-0144", requestId: "REQ-2026-000187", serviceName: "Trademark Registration - 1 Class", amount: 2500, issuedOn: "2026-09-20", dueOn: "2026-09-20", paidOn: "2026-09-20", status: "paid", method: "Net Banking" },
  { id: "INV-2026-0131", requestId: "REQ-2026-000163", serviceName: "GST Registration", amount: 1500, issuedOn: "2026-09-02", dueOn: "2026-09-02", paidOn: "2026-09-02", status: "paid", method: "UPI" },
  { id: "INV-2026-0117", requestId: "REQ-2026-000150", serviceName: "Udyam MSME Registration", amount: 1000, issuedOn: "2026-08-18", dueOn: "2026-08-18", paidOn: "2026-08-18", status: "paid", method: "UPI" },
];

/* ---------- messages ---------- */
export type ChatMessage = { id: string; from: "me" | "them"; text: string; at: string };
export type Conversation = {
  id: string;
  name: string;
  role: string;
  requestId?: string;
  unread: number;
  online?: boolean;
  messages: ChatMessage[];
};

export const sampleConversations: Conversation[] = [
  {
    id: "c1",
    name: "Priya Menon",
    role: "Compliance Specialist · IEC",
    requestId: "REQ-2026-000245",
    unread: 1,
    online: true,
    messages: [
      { id: "m1", from: "them", text: "Hi Amit, I've verified your PAN and cancelled cheque. Everything looks good.", at: "2026-10-06T10:12:00" },
      { id: "m2", from: "me", text: "Great, thanks Priya. When will the application be filed?", at: "2026-10-06T10:20:00" },
      { id: "m3", from: "them", text: "Filed with DGFT this morning. You should receive the IEC in about 2 working days — I'll upload it to Documents as soon as it's issued.", at: "2026-10-07T09:41:00" },
    ],
  },
  {
    id: "c2",
    name: "Rahul Verma",
    role: "FSSAI Specialist",
    requestId: "REQ-2026-000231",
    unread: 1,
    messages: [
      { id: "m1", from: "them", text: "Hello Amit, the electricity bill you uploaded is cut off at the bottom. Could you upload a full copy?", at: "2026-10-05T16:03:00" },
      { id: "m2", from: "them", text: "Once that's in, I can file the FoSCoS application the same day.", at: "2026-10-05T16:04:00" },
    ],
  },
  {
    id: "c3",
    name: "CharteredONE Billing",
    role: "Payments",
    unread: 0,
    messages: [
      { id: "m1", from: "them", text: "Invoice INV-2026-0158 for Labour License has been generated. You can pay it from the Payments page.", at: "2026-09-24T12:30:00" },
      { id: "m2", from: "me", text: "Noted, will pay this week.", at: "2026-09-24T13:05:00" },
    ],
  },
];

export const unreadMessages = sampleConversations.reduce((n, c) => n + c.unread, 0);

/* ---------- notifications (topbar bell) ---------- */
export const sampleNotifications = [
  { id: "n1", icon: "fileText", title: "Document needs re-upload", text: "FSSAI Registration · Electricity bill", href: "/documents" },
  { id: "n2", icon: "card", title: "Payment pending", text: "Labour License · INV-2026-0158", href: "/payments" },
  { id: "n3", icon: "chat", title: "New message from Priya", text: "Your IEC application has been filed", href: "/messages" },
] as const;

/* ---------- dashboard ---------- */
export const sampleDeadlines = [
  { id: "dl1", title: "GSTR-1 (September)", date: "2026-10-11", tag: "GST" },
  { id: "dl2", title: "GSTR-3B (September)", date: "2026-10-20", tag: "GST" },
  { id: "dl3", title: "AOC-4 filing", date: "2026-10-29", tag: "MCA" },
  { id: "dl4", title: "ITR – audit cases", date: "2026-10-31", tag: "Income Tax" },
  { id: "dl5", title: "TDS deposit (October)", date: "2026-11-07", tag: "TDS" },
];

export const sampleActivity = [
  { id: "a1", icon: "upload", text: "IEC application filed with DGFT", at: "2026-10-07T09:40:00", tone: "blue" },
  { id: "a2", icon: "alert", text: "Electricity bill needs re-upload (FSSAI)", at: "2026-10-05T16:03:00", tone: "red" },
  { id: "a3", icon: "card", text: "Payment received for FSSAI Registration", at: "2026-09-29T11:15:00", tone: "green" },
  { id: "a4", icon: "checkCircle", text: "GST Registration certificate delivered", at: "2026-09-09T17:20:00", tone: "green" },
] as const;

/* ---------- support ---------- */
export const sampleTickets = [
  { id: "TCK-1042", subject: "Which address proof works for IEC?", status: "Open", tone: "blue", updatedOn: "2026-10-06" },
  { id: "TCK-1037", subject: "Need GST invoice copy for registration fee", status: "Resolved", tone: "green", updatedOn: "2026-09-12" },
];

export const faqs = [
  {
    q: "How do I start a new service request?",
    a: "Open Explore Services, pick the service and click Request Service. You'll pay the professional fee online, upload the listed documents, and a specialist is assigned right away.",
  },
  {
    q: "Which documents will I need?",
    a: "Every service lists its required documents under View Details. Items marked “if applicable” are only needed for some entity types. You can upload them anytime from the Documents page.",
  },
  {
    q: "How long does a service take?",
    a: "The estimated working days are shown on each service card. Time spent waiting on government authorities is outside our control, but we follow up until approval.",
  },
  {
    q: "Are government fees included in the price?",
    a: "Prices are our professional fee. Each service's price note says whether government fees, stamp duty or DSC charges are extra.",
  },
  {
    q: "How do I track progress?",
    a: "My Services shows every request with its current step and progress. You'll also get a message whenever something needs your attention.",
  },
];
