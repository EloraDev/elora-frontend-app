export const authKeys = {
    all: ["auth"] as const,
    me: () => [...authKeys.all, "me"] as const,
  } as const;
  
  export const notificationKeys = {
    all: ["users"] as const,
    settings: () => [...notificationKeys.all, "settings", "notification"] as const,
    type: (notificationType: string) => [...notificationKeys.all, notificationType] as const,
  } as const;
  
  export const ReminderKeys = {
    all: ["users"] as const,
    settings: () => [...ReminderKeys.all, "settings", "reminder"] as const,
  } as const;
  
  export type AuthResponseType = Exclude<
    { success: true; error: null } | { success: false; error: string },
    { error: null }
  >;
  