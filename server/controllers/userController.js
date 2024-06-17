import User from "../models/UserModel.js";
import catchAsync from "../utils/catchAsync.js";

const getAllUsers = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  const totalUsersInAPage = 10;
  const usersToSkip = (page - 1) * totalUsersInAPage;

  const users = await User.find()
    .skip(usersToSkip)
    .limit(totalUsersInAPage)
    .select("-passwordHash");

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId).select("-passwordHash");

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (
    !(
      req.user.role === "admin" ||
      req.user._id.toString() === user._id.toString()
    )
  )
    return next(new CustomError("Permission denied!", 403));

  await user.updateOne(req.body, { new: true, runValidators: true });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (
    !(
      req.user.role === "admin" ||
      req.user._id.toString() === user._id.toString()
    )
  )
    return next(new CustomError("Permission denied!", 403));

  await user.deleteOne();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export { getAllUsers, getUser, updateUser, deleteUser };
