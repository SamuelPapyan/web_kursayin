import nodemailer from 'nodemailer';

class MailService {
    private transporter;

    setupMailService() {
        const {
            MAIL_USER,
            MAIL_PASS
        } = process.env;
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: MAIL_USER, 
                pass: MAIL_PASS,
            },
        });

        this.transporter.verify((error, success) => {
            if (error) {
                console.log("Transporter error:", error);
            } else {
                console.log("Mail Service configured successfully");
            }
        });
    }

    async sendMail(to, subject, html) {
        try {
            const info = await this.transporter.sendMail({
                to,
                subject,
                html
            })
            console.log("Message sent: ", info.messageId);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    }
}

export default new MailService();
