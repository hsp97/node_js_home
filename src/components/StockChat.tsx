"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  HubConnectionBuilder,
  HubConnection,
  HubConnectionState,
} from "@microsoft/signalr";
import { getTokenClient } from "@/lib/auth";

interface ChatMessage {
  id?: number;
  userId: number;
  userName: string;
  ticker: string;
  content: string;
  createdAt: string;
}

interface StockChatProps {
  ticker: string;
  onClose?: () => void;
}

const SIGNALR_URL = process.env.NEXT_PUBLIC_SIGNALR_URL || "/chat";

export default function StockChat({ ticker, onClose }: StockChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const connectionRef = useRef<HubConnection | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    const token = getTokenClient();
    if (!token) {
      setError("로그인이 필요합니다");
      setConnecting(false);
      return;
    }

    const connection = new HubConnectionBuilder()
      .withUrl(SIGNALR_URL, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
      .build();

    connectionRef.current = connection;

    connection.on("RecentMessages", (recentMessages: ChatMessage[]) => {
      setMessages(recentMessages);
    });

    connection.on("ReceiveMessage", (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    connection.onreconnecting(() => {
      setConnected(false);
      setConnecting(true);
    });

    connection.onreconnected(() => {
      setConnected(true);
      setConnecting(false);
      connection.invoke("JoinRoom", ticker.toUpperCase()).catch(console.error);
    });

    connection.onclose(() => {
      setConnected(false);
      setConnecting(false);
    });

    connection
      .start()
      .then(() => {
        setConnected(true);
        setConnecting(false);
        return connection.invoke("JoinRoom", ticker.toUpperCase());
      })
      .catch((err) => {
        console.error("SignalR connection error:", err);
        setError("채팅 서버 연결에 실패했습니다");
        setConnecting(false);
      });

    return () => {
      if (connection.state === HubConnectionState.Connected) {
        connection
          .invoke("LeaveRoom", ticker.toUpperCase())
          .catch(console.error)
          .finally(() => connection.stop());
      } else {
        connection.stop();
      }
    };
  }, [ticker]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || !connectionRef.current || !connected) return;

    try {
      await connectionRef.current.invoke(
        "SendMessage",
        ticker.toUpperCase(),
        trimmed
      );
      setInput("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  }

  function formatTime(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-inv-border shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-inv-border shrink-0">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-inv-blue"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span className="font-bold text-inv-text">{ticker.toUpperCase()}</span>
          <span className="text-sm text-inv-text-light">실시간 채팅</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Connection status */}
          <span
            className={`w-2 h-2 rounded-full ${
              connected
                ? "bg-inv-green"
                : connecting
                ? "bg-yellow-400 animate-pulse"
                : "bg-inv-red"
            }`}
            title={connected ? "연결됨" : connecting ? "연결 중..." : "연결 끊김"}
          />
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-inv-text transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-inv-red">{error}</p>
          </div>
        ) : connecting ? (
          <div className="flex items-center justify-center h-full">
            <svg className="animate-spin h-6 w-6 text-inv-blue" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-inv-text-light">
            <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-sm">첫 번째 메시지를 남겨보세요!</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={msg.id ?? idx} className="group">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-sm text-inv-blue">
                  {msg.userName}
                </span>
                <span className="text-[10px] text-inv-text-light">
                  {formatTime(msg.createdAt)}
                </span>
              </div>
              <p className="text-sm text-inv-text mt-0.5 break-words">
                {msg.content}
              </p>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 border-t border-inv-border shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={connected ? "메시지를 입력하세요..." : "연결 중..."}
            disabled={!connected}
            className="flex-1 px-3 py-2 border border-inv-border rounded-lg text-sm
              focus:outline-none focus:ring-2 focus:ring-inv-blue focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed"
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!connected || !input.trim()}
            className="px-4 py-2 bg-inv-blue text-white rounded-lg text-sm font-medium
              hover:bg-blue-700 transition-colors
              disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
