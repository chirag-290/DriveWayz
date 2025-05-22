const nodemailer = require("nodemailer");

/**
 * Send email using nodemailer
 * @param {Object} options - Email options
 * @param {String} options.email - Recipient email
 * @param {String} options.subject - Email subject
 * @param {String} options.message - Email body text
 * @param {String} options.html - Email HTML content (optional)
 */
exports.sendEmail = async (options) => {
  console.log("Sending email with options:", options.email);

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `'DriveWayz' <${process.env.EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);

  console.log(`Email sent: ${info.messageId}`);
};

/**
 * Send exam reminder email
 * @param {String} email - Recipient email
 * @param {String} name - Recipient name
 * @param {Object} exam - Exam details
 */
exports.sendExamReminder = async (email, name, exam) => {
  const subject = `Reminder: ${exam.title} starts in 24 hours`;
  const message = `
    Dear ${name},

    This is a friendly reminder that your exam "${
      exam.title
    }" is scheduled to start in 24 hours.

    Exam Details:
    - Title: ${exam.title}
    - Start Date: ${new Date(exam.startDate).toLocaleString()}
    - Duration: ${exam.duration} minutes
    - Total Marks: ${exam.totalMarks}
    - Passing Score: ${exam.passingScore}

    Please ensure you have a stable internet connection and a quiet environment for your exam.

    Good luck!

    Best regards,
    Online Exam Platform Team
  `;

  await this.sendEmail({
    email,
    subject,
    message,
  });
};

/**
 * Send ride completion email to user
 * @param {Object} userData - User data
 * @param {Object} rideData - Ride details
 */
exports.sendRideCompletionEmailToUser = async (userData, rideData) => {
  const subject = `Your ride has been completed - DriveWayz`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>🚗 Your Ride Has Been Completed!</h2>
      <p>Dear ${userData.fullname.firstname},</p>
      <p>Thank you for choosing DriveWayz. Your ride has been successfully completed.</p>
      
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Ride Details:</h3>
        <p><strong>From:</strong> ${rideData.pickup}</p>
        <p><strong>To:</strong> ${rideData.destination}</p>
        <p><strong>Fare:</strong> ₹${rideData.fare}</p>
      </div>
      
      <p>We hope you enjoyed your ride. Please take a moment to rate your experience and provide feedback to help us improve our service.</p>
      
      <div style="margin: 20px 0;">
        <p><strong>How was your ride?</strong></p>
        <p>Click on a star to rate your experience:</p>
        <div style="text-align: center;">
          <a href="${process.env.WEBSITE_URL}/feedback/${rideData._id}/1" style="text-decoration: none; font-size: 24px; margin: 0 5px;">⭐</a>
          <a href="${process.env.WEBSITE_URL}/feedback/${rideData._id}/2" style="text-decoration: none; font-size: 24px; margin: 0 5px;">⭐⭐</a>
          <a href="${process.env.WEBSITE_URL}/feedback/${rideData._id}/3" style="text-decoration: none; font-size: 24px; margin: 0 5px;">⭐⭐⭐</a>
          <a href="${process.env.WEBSITE_URL}/feedback/${rideData._id}/4" style="text-decoration: none; font-size: 24px; margin: 0 5px;">⭐⭐⭐⭐</a>
          <a href="${process.env.WEBSITE_URL}/feedback/${rideData._id}/5" style="text-decoration: none; font-size: 24px; margin: 0 5px;">⭐⭐⭐⭐⭐</a>
        </div>
      </div>
      
      <p>Thank you for riding with us!</p>
      <p>Best regards,</p>
      <p><strong>DriveWayz Team</strong></p>
    </div>
  `;

  await this.sendEmail({
    email: userData.email,
    subject,
    html,
  });
};

/**
 * Send ride completion email to captain
 * @param {Object} captainData - Captain data
 * @param {Object} rideData - Ride details
 */
exports.sendRideCompletionEmailToCaptain = async (captainData, rideData) => {
  const subject = `Ride successfully completed - DriveWayz`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>🚗 Ride Successfully Completed!</h2>
      <p>Dear ${captainData.fullname.firstname},</p>
      <p>You have successfully completed a ride.</p>
      
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Ride Details:</h3>
        <p><strong>Passenger:</strong> ${rideData.user.fullname.firstname} ${
    rideData.user.fullname.lastname || ""
  }</p>
        <p><strong>From:</strong> ${rideData.pickup}</p>
        <p><strong>To:</strong> ${rideData.destination}</p>
        <p><strong>Fare:</strong> ₹${rideData.fare}</p>
      </div>
      
      <p>Thank you for providing excellent service to our customers. The payment for this ride will be processed according to our standard schedule.</p>
      
      <p>Keep up the good work!</p>
      <p>Best regards,</p>
      <p><strong>DriveWayz Team</strong></p>
    </div>
  `;

  await this.sendEmail({
    email: captainData.email,
    subject,
    html,
  });
};
