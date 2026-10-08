"use client";

import { useMemo, useRef, useState } from "react";
import { cx, formatDate } from "@/lib/format";
import {
  DOC_STATUS,
  sampleDocumentRequests,
  sampleDocuments,
  type DocCategory,
  type DocumentRequest,
  type UserDocument,
} from "@/lib/mock";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { EmptyState, StatusPill } from "@/components/ui/Status";
import { Tabs } from "@/components/ui/Tabs";
import { useToast } from "@/components/ui/Toast";

type TabKey = "all" | DocCategory;
const CATEGORIES: DocCategory[] = ["KYC", "Business", "Certificates", "Tax"];
const CATEGORY_COLOR: Record<DocCategory, string> = { KYC: "c-blue", Business: "c-orange", Certificates: "c-green", Tax: "c-purple" };

function prettySize(bytes: number) {
  if (bytes < 1024 * 1024) return Math.max(1, Math.round(bytes / 1024)) + " KB";
  return (bytes / 1024 / 1024).toFixed(1) + " MB";
}

export function DocumentsView() {
  const toast = useToast();
  const [docs, setDocs] = useState<UserDocument[]>(sampleDocuments);
  const [requests, setRequests] = useState<DocumentRequest[]>(sampleDocumentRequests);
  const [tab, setTab] = useState<TabKey>("all");
  const [q, setQ] = useState("");
  const [drag, setDrag] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadFor = useRef<DocumentRequest | null>(null);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return docs.filter(
      (d) =>
        (tab === "all" || d.category === tab) &&
        (!term || (d.name + " " + d.fileName + " " + (d.serviceName || "")).toLowerCase().includes(term)),
    );
  }, [docs, tab, q]);

  const tabs = [{ value: "all" as TabKey, label: "All Documents", count: docs.length }].concat(
    CATEGORIES.map((c) => ({ value: c as TabKey, label: c, count: docs.filter((d) => d.category === c).length })),
  );

  // MVP: files are listed locally. Hook this up to the documents API to actually store them.
  const addFiles = (files: FileList | null) => {
    if (!files || !files.length) return;
    const req = uploadFor.current;
    const today = new Date().toISOString().slice(0, 10);
    const added: UserDocument[] = Array.from(files).map((f, i) => ({
      id: "u" + Date.now() + i,
      name: req ? req.name : f.name.replace(/\.[^.]+$/, ""),
      fileName: f.name,
      category: !req && tab !== "all" ? tab : "Business",
      requestId: req?.requestId,
      serviceName: req?.serviceName,
      status: "under_review",
      uploadedOn: today,
      size: prettySize(f.size),
    }));
    setDocs((d) => [...added, ...d]);
    if (req) setRequests((r) => r.filter((x) => x.id !== req.id));
    uploadFor.current = null;
    toast(added.length === 1 ? "Uploaded “" + added[0].fileName + "” for review" : added.length + " files uploaded for review");
  };

  const pick = (req: DocumentRequest | null) => {
    uploadFor.current = req;
    fileRef.current?.click();
  };

  return (
    <section className="content">
      <PageHeader
        title="Documents"
        sample
        description="Everything you've shared with us and every certificate we've delivered, in one place."
        actions={
          <button type="button" className="btn primary" onClick={() => pick(null)}>
            <Icon name="upload" size={18} />
            Upload Documents
          </button>
        }
      />
      <input
        ref={fileRef}
        type="file"
        multiple
        hidden
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <Tabs items={tabs} value={tab} onChange={setTab} label="Document categories" />

      <div className="page-grid">
        <div className="stack">
          <div className="toolbar" style={{ margin: 0 }}>
            <div className="field search-service">
              <input type="search" placeholder="Search documents..." aria-label="Search documents" value={q} onChange={(e) => setQ(e.target.value)} />
              <Icon name="search" strokeWidth={1} />
            </div>
          </div>

          {list.length ? (
            <Panel>
              <div className="table-scroll">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Document</th>
                      <th>Linked Request</th>
                      <th>Category</th>
                      <th>Uploaded</th>
                      <th>Status</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((d) => {
                      const st = DOC_STATUS[d.status];
                      return (
                        <tr key={d.id}>
                          <td>
                            <div className="doc-name">
                              <span className={"mini-icon " + CATEGORY_COLOR[d.category]}>
                                <Icon name="fileText" />
                              </span>
                              <span>
                                <b>
                                  {d.name}
                                  {d.issued && <span className="issued-tag">Issued</span>}
                                </b>
                                <small>
                                  {d.fileName} · {d.size}
                                </small>
                              </span>
                            </div>
                          </td>
                          <td className="wrap">
                            {d.serviceName ? (
                              <>
                                {d.serviceName}
                                <br />
                                <small className="muted">{d.requestId}</small>
                              </>
                            ) : (
                              <span className="muted">—</span>
                            )}
                          </td>
                          <td>{d.category}</td>
                          <td>{formatDate(d.uploadedOn)}</td>
                          <td>
                            <StatusPill tone={st.tone}>{st.label}</StatusPill>
                          </td>
                          <td className="num">
                            <button
                              type="button"
                              className="icon-btn"
                              aria-label={"Download " + d.name}
                              onClick={() => toast("Downloads will work once documents are connected to the backend")}
                            >
                              <Icon name="download" size={18} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Panel>
          ) : (
            <EmptyState title="No documents found">Try another category or clear the search.</EmptyState>
          )}
        </div>

        <div className="stack">
          <Panel title={"Requested From You" + (requests.length ? " (" + requests.length + ")" : "")}>
            {requests.length ? (
              <ul className="rows">
                {requests.map((r) => (
                  <li key={r.id}>
                    <span className="row-main">
                      <b>{r.name}</b>
                      <small>
                        {r.serviceName} · due {formatDate(r.dueOn, { day: "numeric", month: "short" })}
                      </small>
                      <small>{r.note}</small>
                    </span>
                    <button type="button" className="btn sm outline" onClick={() => pick(r)}>
                      Upload
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="panel-body muted">You&apos;re all caught up — nothing pending.</div>
            )}
          </Panel>

          <div
            className={cx("dropzone", drag && "drag")}
            role="button"
            tabIndex={0}
            onClick={() => pick(null)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                pick(null);
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              uploadFor.current = null;
              addFiles(e.dataTransfer.files);
            }}
          >
            <span className="dz-ico">
              <Icon name="upload" size={22} />
            </span>
            <b>Drag &amp; drop files here</b>
            <small>or click to browse · PDF, JPG, PNG, DOC up to 10 MB</small>
          </div>
        </div>
      </div>
    </section>
  );
}
