import { Op } from "sequelize";
import { LeadsModel } from "../models/LeadTable";
import { parseLead } from "../parser/leadParser";
import cron from "node-cron";
import { UserModel } from "apps/user/models/UserTable";
import { ParsedLead } from "../interface/lead";
import { EMAIL_HEADING, EMAIL_TEMPLATE, getEmailTemplate, sendEmail } from "libraries";

let leadCronJob = null;

class LeadCron {
    async getLeadStatusData(): Promise<ParsedLead[]> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // // Get date 7 days ago
        // const sevenDaysAgo = new Date(today);
        // sevenDaysAgo.setDate(today.getDate() - 7);

        try {
            const data = await LeadsModel.findAll({
                where: {
                    status: { [Op.notIn]: ["lost", "converted"]},
                    assignedUser: { [Op.ne]: null },
                    // createdAt: { [Op.lte]: sevenDaysAgo.toISOString() },
                },
                include: [
                    {
                        model: UserModel,
                        as: "assignee", // Use the alias for assignedTo
                        attributes: ["id", "email", "firstName"],
                    },
                ],
            }).then((data) => {
                console.log("data: ", data);
                return data.map((lead) => {
                    return parseLead(lead.dataValues);
                });
            });

            if (!data.length) {
                console.log("No pending leads older than 7 days.");
                return [];
            }

            return data;
        } catch (error) {
            console.error("Error fetching leads in cron job:", error);
            return [];
        }
    }

    async startCron(cronTime: string) {
        try {
            if (leadCronJob) {
                console.log("Stopping the previous lead cron job...");
                leadCronJob.stop();
            }

            leadCronJob = cron.schedule(
                cronTime,
                async () => {
                    console.log(
                        `Running scheduled tasks for leads at ${cronTime}...`,
                    );
                    const leads: ParsedLead[] = await this.getLeadStatusData();

                    if (!leads.length) {
                        console.log("No leads to process.");
                        return;
                    }

                    await this.sendMailForFollowup(leads);
                },
                {
                    timezone: "Asia/Kolkata",
                },
            );

            console.log(
                `New cron job for lead created with schedule: ${cronTime}`,
            );
        } catch (error) {
            console.error("Error starting cron job:", error);
        }
    }

    async sendMailForFollowup(data: ParsedLead[]) {
        try {
            const result: { [key: string]: { 
                email: string; 
                firstName: string; 
                leads: ParsedLead[]; 
            } } = {};
    
            const todayDate = new Date().toISOString().split('T')[0];
            // Organize the leads by assigned user's email
            data.forEach((lead) => {
                const email = lead.assignedUser.email;
                const firstName = lead.assignedUser.firstName;
    
                if (!result[email]) {
                    result[email] = {
                        email,
                        firstName,
                        leads: [],
                    };
                }
    
                result[email].leads.push(lead);
            });
    
            // Iterate over each assigned user to send follow-up reminders
            for (const email in result) {
                const assignedUser = result[email];
    
                // Create the dynamic follow-up list
                const followUps = assignedUser.leads.map((lead) => ({
                    leadName: lead.firstName,
                    followUpDate: todayDate,
                }));
    
                // Email content dynamically generated using the template function
                const emailContent = await getEmailTemplate(
                    EMAIL_TEMPLATE.FOLLOW_UP_REMINDER,
                    {
                        userName: assignedUser.firstName,  // passing first name as userName
                        followUps: followUps,  // passing leads and their follow-up dates
                    }
                );

                const mailOptions = {
                    to: assignedUser.email,
                    subject: EMAIL_HEADING.FOLLOW_UP_REMINDER,
                    templateParams: {
                        heading: EMAIL_HEADING.FOLLOW_UP_REMINDER,
                        description: emailContent,
                    },
                };
    
                // Send the email asynchronously
                await sendEmail(mailOptions.to, mailOptions.subject, mailOptions.templateParams);
                console.log(`Reminder email sent to ${mailOptions.to}`);
            }
        } catch (error) {
            console.error("Error sending follow-up reminder emails:", error);
        }
    }
    
}

export default new LeadCron();
