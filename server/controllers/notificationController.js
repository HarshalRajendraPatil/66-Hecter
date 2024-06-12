import Notification from "../models/notificationModel.js";
import catchAsync from "../utils/catchAsync.js";
import CustomError from "../utils/customError.js";
// import createNotificationForUpdates from "../service/createNotification.js";

// const createNotification = catchAsync(async (req, res, next) => {
//   const { message, user } = req.body;
//   const notification = await createNotificationForUpdates(
//     user,
//     "new_message",
//     message
//   );
//   res.status(201).json({
//     status: "success",
//     data: {
//       notification,
//     },
//   });
// });

// Get all notifications for the logged-in user
const getMyNotifications = catchAsync(async (req, res, next) => {
  const notifications = await Notification.find({ user: req.user._id });

  res.status(200).json({
    status: "success",
    data: {
      notifications,
    },
  });
});

// Mark a notification as read
const markAsRead = catchAsync(async (req, res, next) => {
  const notification = await Notification.findById(req.params.notificationId);

  if (!notification) {
    return next(new CustomError("No notification found with that ID", 404));
  }

  if (notification.user.toString() !== req.user._id.toString()) {
    return next(
      new CustomError(
        "You do not have permission to mark this notification as read",
        403
      )
    );
  }

  notification.read = true;
  await notification.save();

  res.status(200).json({
    status: "success",
    data: {
      notification,
    },
  });
});

// Delete a notification
const deleteNotification = catchAsync(async (req, res, next) => {
  const notification = await Notification.findById(req.params.notificationId);

  if (!notification) {
    return next(new CustomError("No notification found with that ID", 404));
  }

  if (notification.user.toString() !== req.user._id.toString()) {
    return next(
      new CustomError(
        "You do not have permission to delete this notification",
        403
      )
    );
  }

  await notification.remove();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export {
  // createNotification,
  getMyNotifications,
  markAsRead,
  deleteNotification,
};
