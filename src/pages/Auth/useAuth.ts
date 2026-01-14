import { useCallback, useMemo } from "react";
import { AuthService } from "@/services/AuthService";
import { Role } from "@/enums/Role";

export function useAuth() {
  const user = useMemo(() => AuthService.getUser(), []);

  const canAccess = useCallback(
    (roles: Role[]) => !!user && roles.includes(user.role as Role),
    [user]
  );

  return { user, canAccess };
}
