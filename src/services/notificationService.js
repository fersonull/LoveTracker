import notifee, { TriggerType, RepeatFrequency } from '@notifee/react-native';
import { DateUtils } from '../utils/date-calculation';

export class NotificationService {
  static async requestPermission() {
    try {
      const permission = await notifee.requestPermission();
      return permission.authorizationStatus >= 1; // AUTHORIZED or higher
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  static async createChannel() {
    try {
      const channelId = await notifee.createChannel({
        id: 'love-reminders',
        name: 'Love Reminders',
        description: 'Gentle reminders for your relationship milestones',
        sound: 'default',
        importance: 4, // HIGH
      });
      return channelId;
    } catch (error) {
      console.error('Error creating notification channel:', error);
      return null;
    }
  }

  static async scheduleMonthlyReminder(relationshipData) {
    try {
      if (!relationshipData.preferences.monthlyReminder) return;

      await this.createChannel();

      const startDate = new Date(relationshipData.startDate);
      const { nextMonthsary } = DateUtils.getNextMilestones(relationshipData.startDate);

      // Schedule notification for 10 AM on monthsary
      nextMonthsary.setHours(10, 0, 0, 0);

      const duration = DateUtils.calculateDuration(relationshipData.startDate);
      const monthCount = duration.totalMonths + 1; // Next month

      await notifee.createTriggerNotification(
        {
          id: 'monthly-reminder',
          title: `Happy ${monthCount}${this.getOrdinalSuffix(monthCount)} Monthsary! 💕`,
          body: `${relationshipData.partner1Name} & ${relationshipData.partner2Name} - Another month of love together ❤️`,
          android: {
            channelId: 'love-reminders',
            smallIcon: 'ic_launcher',
            color: '#F43F5E',
          },
          ios: {
            sound: 'default',
          },
        },
        {
          type: TriggerType.TIMESTAMP,
          timestamp: nextMonthsary.getTime(),
          repeatFrequency: RepeatFrequency.MONTHLY,
        }
      );

      console.log('Monthly reminder scheduled for:', nextMonthsary);
    } catch (error) {
      console.error('Error scheduling monthly reminder:', error);
    }
  }

  static async scheduleAnniversaryReminder(relationshipData) {
    try {
      if (!relationshipData.preferences.yearlyReminder) return;

      await this.createChannel();

      const { nextAnniversary } = DateUtils.getNextMilestones(relationshipData.startDate);

      // Schedule notification for 9 AM on anniversary
      nextAnniversary.setHours(9, 0, 0, 0);

      const duration = DateUtils.calculateDuration(relationshipData.startDate);
      const yearCount = duration.years + (nextAnniversary.getFullYear() > new Date().getFullYear() ? 1 : 0);

      await notifee.createTriggerNotification(
        {
          id: 'anniversary-reminder',
          title: `Happy ${yearCount}${this.getOrdinalSuffix(yearCount)} Anniversary! 🎉`,
          body: `${relationshipData.partner1Name} & ${relationshipData.partner2Name} - ${yearCount} ${yearCount === 1 ? 'year' : 'years'} of beautiful love! 💖`,
          android: {
            channelId: 'love-reminders',
            smallIcon: 'ic_launcher',
            color: '#F43F5E',
          },
          ios: {
            sound: 'default',
          },
        },
        {
          type: TriggerType.TIMESTAMP,
          timestamp: nextAnniversary.getTime(),
          repeatFrequency: RepeatFrequency.YEARLY,
        }
      );

      console.log('Anniversary reminder scheduled for:', nextAnniversary);
    } catch (error) {
      console.error('Error scheduling anniversary reminder:', error);
    }
  }

  static async scheduleAllReminders(relationshipData) {
    // Clear existing reminders first
    await this.clearAllReminders();

    // Request permission
    const hasPermission = await this.requestPermission();
    if (!hasPermission) {
      console.warn('Notification permission not granted');
      return;
    }

    // Schedule new reminders based on preferences
    await this.scheduleMonthlyReminder(relationshipData);
    await this.scheduleAnniversaryReminder(relationshipData);
  }

  static async clearAllReminders() {
    try {
      await notifee.cancelTriggerNotifications(['monthly-reminder', 'anniversary-reminder']);
      console.log('All reminders cleared');
    } catch (error) {
      console.error('Error clearing reminders:', error);
    }
  }

  static getOrdinalSuffix(number) {
    const j = number % 10;
    const k = number % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
  }

  static async getScheduledNotifications() {
    try {
      const notifications = await notifee.getTriggerNotifications();
      return notifications;
    } catch (error) {
      console.error('Error getting scheduled notifications:', error);
      return [];
    }
  }
}