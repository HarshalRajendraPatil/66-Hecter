import catchAsync from "../utils/catchAsync.js";

// Add to comparison list
const addAndRemoveFromComparisonList = catchAsync(async (req, res, next) => {
  const propertyId = req.params.propertyId;

  if (!req.user.comparisons.includes(propertyId)) {
    req.user.comparisons.push(propertyId);
  } else {
    req.user.comparisons.pull(propertyId);
  }

  const user = await req.user.save();

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// Get comparison list
const getComparisonList = catchAsync(async (req, res, next) => {
  const comparisonList = req.user.comparisons;

  res.status(200).json({
    status: "success",
    data: {
      comparisonList,
    },
  });
});

export { addAndRemoveFromComparisonList, getComparisonList };
