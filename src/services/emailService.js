// src/services/emailService.js
import { supabase } from '../supabaseClient';

class EmailService {
  constructor() {
    this.emailProvider = 'supabase'; // or 'emailjs' for client-side
  }

  // Send contract expiry notification
  async sendContractExpiryNotification(contractData, recipientEmail) {
    try {
      const emailData = {
        to: recipientEmail,
        subject: 'แจ้งเตือน: สัญญาเช่าใกล้หมดอายุ',
        template: 'contract_expiry',
        data: {
          contractId: contractData.id,
          roomName: contractData.room_name,
          tenantName: contractData.tenant_name,
          expiryDate: new Date(contractData.end_date).toLocaleDateString('th-TH'),
          daysRemaining: this.calculateDaysRemaining(contractData.end_date)
        }
      };

      return await this.sendEmail(emailData);
    } catch (error) {
      console.error('Error sending contract expiry notification:', error);
      throw error;
    }
  }

  // Send new user registration notification
  async sendUserRegistrationNotification(userData, adminEmail) {
    try {
      const emailData = {
        to: adminEmail,
        subject: 'แจ้งเตือน: มีผู้ใช้ใหม่สมัครสมาชิก',
        template: 'user_registration',
        data: {
          userEmail: userData.email,
          registrationDate: new Date().toLocaleDateString('th-TH'),
          needsApproval: true
        }
      };

      return await this.sendEmail(emailData);
    } catch (error) {
      console.error('Error sending user registration notification:', error);
      throw error;
    }
  }

  // Send payment reminder
  async sendPaymentReminder(paymentData, recipientEmail) {
    try {
      const emailData = {
        to: recipientEmail,
        subject: 'แจ้งเตือน: ชำระค่าเช่าประจำเดือน',
        template: 'payment_reminder',
        data: {
          tenantName: paymentData.tenant_name,
          roomName: paymentData.room_name,
          amount: paymentData.monthly_rent,
          dueDate: new Date(paymentData.due_date).toLocaleDateString('th-TH')
        }
      };

      return await this.sendEmail(emailData);
    } catch (error) {
      console.error('Error sending payment reminder:', error);
      throw error;
    }
  }

  // Send system alert to admins
  async sendSystemAlert(alertData, adminEmails) {
    try {
      const promises = adminEmails.map(email => {
        const emailData = {
          to: email,
          subject: `แจ้งเตือนระบบ: ${alertData.title}`,
          template: 'system_alert',
          data: {
            alertType: alertData.type,
            message: alertData.message,
            timestamp: new Date().toLocaleString('th-TH'),
            severity: alertData.severity || 'info'
          }
        };
        return this.sendEmail(emailData);
      });

      return await Promise.all(promises);
    } catch (error) {
      console.error('Error sending system alert:', error);
      throw error;
    }
  }

  // Core email sending method
  async sendEmail(emailData) {
    try {
      // Method 1: Using Supabase Edge Function (recommended for production)
      if (this.emailProvider === 'supabase') {
        const { data, error } = await supabase.functions.invoke('send-email', {
          body: emailData
        });

        if (error) throw error;
        return data;
      }

      // Method 2: Using EmailJS (for client-side sending)
      if (this.emailProvider === 'emailjs') {
        // Note: You'll need to install emailjs-com: npm install emailjs-com
        // import emailjs from 'emailjs-com';
        
        const templateParams = {
          to_email: emailData.to,
          subject: emailData.subject,
          ...emailData.data
        };

        // Replace with your EmailJS configuration
        const result = await window.emailjs.send(
          'YOUR_SERVICE_ID',
          'YOUR_TEMPLATE_ID',
          templateParams,
          'YOUR_USER_ID'
        );

        return result;
      }

      // Method 3: Simple notification storage (fallback)
      return await this.storeNotification(emailData);

    } catch (error) {
      console.error('Error in sendEmail:', error);
      // Fallback to storing notification
      return await this.storeNotification(emailData);
    }
  }

  // Store notification in database as fallback
  async storeNotification(emailData) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert([
          {
            recipient_email: emailData.to,
            subject: emailData.subject,
            template: emailData.template,
            data: emailData.data,
            status: 'pending',
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      
      console.log('Notification stored in database:', emailData.subject);
      return data;
    } catch (error) {
      console.error('Error storing notification:', error);
      throw error;
    }
  }

  // Check for contracts expiring soon
  async checkAndNotifyExpiringContracts() {
    try {
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      const { data: contracts, error } = await supabase
        .from('contracts')
        .select(`
          *,
          rooms:room_id(room_name),
          tenants:tenant_id(full_name),
          landlords:landlord_id(full_name, email)
        `)
        .lte('end_date', thirtyDaysFromNow.toISOString().split('T')[0])
        .eq('status', 'ใช้งาน');

      if (error) throw error;

      // Send notifications for each expiring contract
      const notifications = contracts.map(contract => {
        const landlordEmail = contract.landlords?.email;
        if (landlordEmail) {
          return this.sendContractExpiryNotification({
            id: contract.id,
            room_name: contract.rooms?.room_name,
            tenant_name: contract.tenants?.full_name,
            end_date: contract.end_date
          }, landlordEmail);
        }
      }).filter(Boolean);

      return await Promise.all(notifications);
    } catch (error) {
      console.error('Error checking expiring contracts:', error);
      throw error;
    }
  }

  // Utility method to calculate days remaining
  calculateDaysRemaining(endDate) {
    const today = new Date();
    const expiry = new Date(endDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  // Get admin emails for notifications
  async getAdminEmails() {
    try {
      const { data: users, error } = await supabase.auth.admin.listUsers();
      if (error) throw error;

      // Filter admin users based on your allowedUsers configuration
      const adminEmails = ['panutorn@gmail.com', 'magic_oil@hotmail.com'];
      return adminEmails;
    } catch (error) {
      console.error('Error getting admin emails:', error);
      return ['panutorn@gmail.com', 'magic_oil@hotmail.com']; // Fallback
    }
  }
}

// Create and export singleton instance
const emailService = new EmailService();
export default emailService;

// Export individual methods for convenience
export const {
  sendContractExpiryNotification,
  sendUserRegistrationNotification,
  sendPaymentReminder,
  sendSystemAlert,
  checkAndNotifyExpiringContracts
} = emailService;