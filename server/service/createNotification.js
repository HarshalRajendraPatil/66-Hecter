import Notification from "../models/notificationModel.js";

// Middleware to create a notification when a new review is added
const createNotificationForUpdates = async (user, type, message) => {
  const notification = await Notification.create({
    user: user._id,
    type,
    message,
  });
  user.notifications.push(notification._id);

  await user.save();

  return notification;
};

export default createNotificationForUpdates;
