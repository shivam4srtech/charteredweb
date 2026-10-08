"use client";

import Link from "next/link";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { cx, initials } from "@/lib/format";
import { sampleConversations, type Conversation } from "@/lib/mock";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";

function timeLabel(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
}
function dayLabel(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

export function MessagesView() {
  const [convos, setConvos] = useState<Conversation[]>(sampleConversations);
  const [activeId, setActiveId] = useState(sampleConversations[0]?.id ?? "");
  const [showThread, setShowThread] = useState(false); // mobile: list ↔ thread
  const [q, setQ] = useState("");
  const [draft, setDraft] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  const active = convos.find((c) => c.id === activeId) ?? null;
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return convos.filter((c) => !term || (c.name + " " + c.role).toLowerCase().includes(term));
  }, [convos, q]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [activeId, active?.messages.length]);

  const open = (id: string) => {
    setActiveId(id);
    setShowThread(true);
    setConvos((cs) => cs.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  };

  // MVP: messages are kept in the page. Connect to the messaging API to send for real.
  const send = () => {
    const text = draft.trim();
    if (!text || !active) return;
    const msg = { id: "m" + Date.now(), from: "me" as const, text, at: new Date().toISOString() };
    setConvos((cs) => cs.map((c) => (c.id === active.id ? { ...c, messages: [...c.messages, msg] } : c)));
    setDraft("");
  };

  return (
    <section className="content">
      <PageHeader title="Messages" sample description="Talk to the specialists working on your requests." />

      <div className={cx("chat", showThread && "show-thread")}>
        <aside className="chat-list" aria-label="Conversations">
          <div className="field search-service">
            <input type="search" placeholder="Search conversations..." aria-label="Search conversations" value={q} onChange={(e) => setQ(e.target.value)} />
            <Icon name="search" strokeWidth={1} style={{ right: 28, top: 26 }} />
          </div>
          <ul>
            {filtered.map((c) => {
              const last = c.messages[c.messages.length - 1];
              return (
                <li key={c.id}>
                  <button type="button" className={cx("convo", c.id === activeId && "active")} onClick={() => open(c.id)}>
                    <span className={cx("avatar", c.online && "online")}>{initials(c.name)}</span>
                    <span style={{ minWidth: 0 }}>
                      <b>{c.name}</b>
                      <small>{last ? (last.from === "me" ? "You: " : "") + last.text : c.role}</small>
                    </span>
                    <span className="meta">
                      {last && <span suppressHydrationWarning>{dayLabel(last.at).split(",")[0]}</span>}
                      {c.unread > 0 && <span className="unread">{c.unread}</span>}
                    </span>
                  </button>
                </li>
              );
            })}
            {!filtered.length && <li className="muted" style={{ padding: 14 }}>No conversations found.</li>}
          </ul>
        </aside>

        <div className="thread">
          {active ? (
            <>
              <div className="thread-head">
                <button type="button" className="icon-btn back" aria-label="Back to conversations" onClick={() => setShowThread(false)}>
                  <Icon name="chevronRight" size={18} style={{ transform: "rotate(180deg)" }} />
                </button>
                <span className={cx("avatar", active.online && "online")}>{initials(active.name)}</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <b>{active.name}</b>
                  <small>
                    {active.role}
                    {active.online ? " · Online" : ""}
                  </small>
                </span>
                {active.requestId && (
                  <Link href={"/my-services?request=" + active.requestId} className="btn sm outline">
                    View request
                  </Link>
                )}
              </div>

              <div className="thread-body" ref={bodyRef}>
                {active.messages.map((m, i) => {
                  const prev = active.messages[i - 1];
                  const newDay = !prev || dayLabel(prev.at) !== dayLabel(m.at);
                  return (
                    <Fragment key={m.id}>
                      {newDay && (
                        <span className="day-sep" suppressHydrationWarning>
                          {dayLabel(m.at)}
                        </span>
                      )}
                      <div className={cx("bubble", m.from === "me" && "me")}>
                        {m.text}
                        <time dateTime={m.at} suppressHydrationWarning>
                          {timeLabel(m.at)}
                        </time>
                      </div>
                    </Fragment>
                  );
                })}
              </div>

              <form
                className="composer"
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
              >
                <textarea
                  rows={1}
                  placeholder={"Message " + active.name.split(" ")[0] + "..."}
                  aria-label="Message"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                />
                <button type="submit" className="btn primary" disabled={!draft.trim()}>
                  <Icon name="send" size={17} />
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="empty" style={{ margin: 20 }}>
              <b>Select a conversation</b>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
