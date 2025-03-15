const express = require("express");
const cron = require("node-cron");
const app = express();
const dotenv = require("dotenv");
const dbConnection = require("./utils/db");
const { sendDetailsProspectEmail } = require("./EmailService/sendDetailsProspect");
const { sendElibilityEmail } = require("./EmailService/sendEligibilityEmail");
const { sendDetailsDonorEmail } = require("./EmailService/sendDonorDetailsEmail");
const { sendBloodDonationReminder } = require("./EmailService/sendBloodDonationReminder");
const { sendOrderApprovalEmail } = require("./EmailService/sendOrderApprovalEmail");

dotenv.config();

const run = () => {
    cron.schedule("* * * * * *", async() => {
        sendElibilityEmail();
        sendDetailsProspectEmail();
        sendDetailsDonorEmail();
        sendBloodDonationReminder();
        
    });

    cron.schedule("*/30 * * * * *", () => {
        sendOrderApprovalEmail();
    });
  };
  
  run();
  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`Backgroundservice is running on port ${PORT}`);
    dbConnection();
  });
  
