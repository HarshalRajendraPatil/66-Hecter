import User from "../models/UserModel.js";
import catchAsync from "../utils/catchAsync.js";
import cloudinary from "../service/cloudinary.js";

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
  const user = await User.findById(req.params.userId)
    .select("-passwordHash")
    .populate("reviews listings");

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

const updateProfilePic = catchAsync(async (req, res) => {
  if (!req.files) return res.status(400).json({ error: "No file uploaded" });

  console.log(req.files.profilePhoto.tempFilePath);

  const result = await cloudinary.uploader.upload(
    req.files.profilePhoto.tempFilePath,
    {
      resource_type: "auto",
    }
  );

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      profileImg: { url: result.secure_url, public_id: result.public_id },
    },
    { new: true }
  );

  res.json({ message: "Profile photo updated successfully", data: user });
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

const getFavorites = catchAsync(async (req, res, next) => {
  const favProperties = await User.findById(req.user._id).populate("favorites");

  if (!favProperties) return next(new CustomError("Please Login", 400));

  res.status(201).json({
    status: "success",
    data: favProperties.favorites,
  });
});

export {
  getAllUsers,
  getUser,
  updateUser,
  updateProfilePic,
  deleteUser,
  getFavorites,
};
