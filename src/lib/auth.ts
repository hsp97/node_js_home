// ── 쿠키 이름 ──
export const SESSION_COOKIE = "auth_session";

// ── 클라이언트 측 유틸리티 ──

/** 로그인 성공 후 세션 쿠키 저장 */
export function setSessionCookie(chatId: string): void {
  const maxAge = 60 * 60 * 24 * 7; // 7일
  document.cookie = `${SESSION_COOKIE}=${encodeURIComponent(chatId)}; path=/; max-age=${maxAge}; SameSite=Strict`;
}

/** 로그아웃 시 세션 쿠키 삭제 */
export function clearSessionCookie(): void {
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0`;
}

/** 클라이언트에서 세션 존재 여부 확인 */
export function hasSessionCookieClient(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith(`${SESSION_COOKIE}=`));
}

// ── 서버 측 유틸리티 (Server Component / middleware 전용) ──

/** 서버에서 chatId 읽기 (next/headers 사용) */
export async function getSessionServer(): Promise<string | null> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  return value ? decodeURIComponent(value) : null;
}
