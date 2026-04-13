"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { setSessionCookie } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [chatId, setChatId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const trimmed = chatId.trim();
    if (!trimmed) {
      setError("Telegram Chat ID를 입력해주세요.");
      return;
    }
    if (!/^-?\d+$/.test(trimmed)) {
      setError("Chat ID는 숫자만 입력 가능합니다.");
      return;
    }

    setLoading(true);

    try {
      const result = await login(trimmed);

      if (result.success && result.data?.chatId) {
        // 로그인 성공 → 세션 쿠키 저장 후 대시보드로 이동
        setSessionCookie(result.data.chatId);
        router.push("/dashboard");
      } else {
        // 서버에서 반환한 실패 메시지 표시
        setError(result.message || "로그인에 실패했습니다.");
      }
    } catch (err) {
      setError("서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-inv-dark flex flex-col items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-md">
        {/* Logo + Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-inv-nav mb-4">
            {/* Telegram icon */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path
                d="M18 3C9.716 3 3 9.716 3 18s6.716 15 15 15 15-6.716 15-15S26.284 3 18 3z"
                fill="#2AABEE"
              />
              <path
                d="M25.47 11.47l-2.888 13.617c-.218 1.01-1.274 1.455-2.09.87l-3.896-2.872-1.823 1.758c-.22.213-.465.33-.756.33l.257-3.63 6.558-5.924c.289-.258-.062-.4-.444-.143L9.888 21.2l-3.822-1.196c-.83-.259-.847-.83.173-1.23L24.266 10.28c.692-.258 1.292.172 1.204.89v.3z"
                fill="white"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">로그인</h1>
          <p className="text-gray-400 text-sm mt-1">Telegram Chat ID로 접속합니다</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* How to get ID guide */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
            <p className="text-xs font-bold text-inv-blue mb-2 uppercase tracking-wider">
              Chat ID 발급 방법
            </p>
            <ol className="space-y-1.5 text-sm text-inv-text">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-inv-blue text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                  1
                </span>
                텔레그램에서 봇을 검색하여 대화를 시작합니다
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-inv-blue text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                  2
                </span>
                채팅창에{" "}
                <code className="bg-white border border-inv-border rounded px-1.5 py-0.5 text-xs font-mono text-inv-blue">
                  /start
                </code>{" "}
                를 입력하고 전송합니다
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-inv-blue text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                  3
                </span>
                봇이 발급한 <strong>Chat ID</strong>를 아래에 입력합니다
              </li>
            </ol>
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="chatId"
                className="block text-sm font-semibold text-inv-text mb-1.5"
              >
                Telegram Chat ID
              </label>
              <input
                id="chatId"
                type="text"
                inputMode="numeric"
                placeholder="예: 123456789"
                value={chatId}
                onChange={(e) => {
                  setChatId(e.target.value);
                  setError("");
                }}
                disabled={loading}
                className={`w-full px-4 py-3 border rounded-xl text-inv-text placeholder-gray-300 text-sm
                  focus:outline-none focus:ring-2 focus:ring-inv-blue focus:border-transparent transition-all
                  disabled:bg-gray-100 disabled:cursor-not-allowed
                  ${error ? "border-inv-red bg-red-50" : "border-inv-border bg-white"}`}
              />
              {error && (
                <p className="mt-1.5 text-xs text-inv-red flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-inv-blue hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed
                text-white font-bold py-3 rounded-xl transition-colors
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-inv-blue
                flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  로그인 중...
                </>
              ) : (
                "로그인"
              )}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Chat ID는 본인 인증 용도로만 사용됩니다
        </p>
      </div>
    </div>
  );
}
