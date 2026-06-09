type NotificationType = "placement" | "result" | "event";

interface Notification {
  id: number;
  title: string;
  type: NotificationType;
  unread: boolean;
  timestamp: string;
}

const weights = {
  placement: 3,
  result: 2,
  event: 1,
};

export function getTopNotifications(
  notifications: Notification[],
  n: number = 10,
): Notification[] {
  return notifications
    .filter((n) => n.unread)
    .sort((a, b) => {
      const weightDiff = weights[b.type] - weights[a.type];

      if (weightDiff !== 0) return weightDiff;

      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    })
    .slice(0, n);
}
