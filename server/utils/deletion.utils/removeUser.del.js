const User = require("../../model/userSchema");
const QuizAttempt = require("../../model/quizAttemptSchema");
const DailyIQ = require("../../model/dailyIQSchema");

// Function to delete a user and related records
async function deleteUserAndRelatedRecords(userId) {
  try {
    // Delete related QuizAttempts
    console.log("Deleting QuizAttempts for the user...");
    await QuizAttempt.deleteMany({ user: userId });
    console.log("QuizAttempts for the user deleted successfully.");
    // Delete related DailyIQ records
    console.log("Deleting DailyIQ records for the user...");
    await DailyIQ.deleteMany({ user: userId });
    console.log("DailyIQ records for the user deleted successfully.");
    // Delete the user
    console.log("Deleting the user...");
    await User.findByIdAndDelete(userId);

    console.log("User and related records deleted successfully.");
  } catch (error) {
    console.error("Error deleting user and related records:", error);
  }
}

// Example usage:
const userIdToDelete = "user_id_to_delete";
deleteUserAndRelatedRecords(userIdToDelete);
