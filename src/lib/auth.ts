// ── 쿠키 이름 ──
export const TOKEN_COOKIE = "auth_token";

// ── 클라이언트 측 유틸리티 ──

/** 로그인 성공 후 JWT 토큰 쿠키 저장 */
export function setTokenCookie(token: string): void {
  const maxAge = 60 * 60 * 24 * 30; // 30일 (백엔드 토큰 만료와 동일)
  document.cookie = `${TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Strict`;
}

/** 로그아웃 시 토큰 쿠키 삭제 */
export function clearTokenCookie(): void {
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0`;
}

/** 클라이언트에서 토큰 가져오기 */
export function getTokenClient(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`${TOKEN_COOKIE}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

/** 클라이언트에서 토큰 존재 여부 확인 */
export function hasTokenClient(): boolean {
  return getTokenClient() !== null;
}

/** JWT 토큰 형식 검증 (xxx.yyy.zzz) */
export function isValidJwtFormat(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  return parts.every((part) => part.length > 0);
}

// ── 서버 측 유틸리티 (Server Component / middleware 전용) ──

/** 서버에서 토큰 읽기 (next/headers 사용) */
export async function getTokenServer(): Promise<string | null> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const value = cookieStore.get(TOKEN_COOKIE)?.value;
  return value ? decodeURIComponent(value) : null;
}
