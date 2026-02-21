// Simple admin authentication using environment variables
// In production, you should use Supabase Auth with proper user management

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export function validateAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

// Helper to check if user is authenticated from cookie
export async function isAdminAuthenticated(
  cookieValue?: string
): Promise<boolean> {
  if (!cookieValue) return false;

  try {
    // Simple base64 encoding check
    const decoded = Buffer.from(cookieValue, "base64").toString("utf-8");
    return decoded === "admin_authenticated";
  } catch {
    return false;
  }
}

// Create admin session cookie
export function createAdminSession(): string {
  return Buffer.from("admin_authenticated").toString("base64");
}
