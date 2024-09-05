import twilio from 'twilio';

export default async function handler(req, res) {
    try {
      const { OTP, phone } = req.body;

      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = twilio(accountSid, authToken);
       
        await client.messages.create({
        body:`Hi there! Kindly input the OTP code received from BallotBridge to proceed to the next step to register for your preferred election. 
        Your OTP code is ${OTP}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `${phone}`,
      });
      res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
      console.error("Twilio API Error:", error);
      res.status(500).json({ error: 'An error occurred while sending the message' });
    }
}
