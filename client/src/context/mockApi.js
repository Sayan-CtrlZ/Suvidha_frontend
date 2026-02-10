/**
 * Mock API functions for SUVIDHA frontend
 * These simulate backend API calls and return mock data for development and testing
 * 
 * @module mockApi
 */

/**
 * Fetch system announcements and notices
 * @returns {Promise<Array<{id: number, title: string, description: string, type: string, date: string}>>} List of announcements
 */
export const fetchAnnouncements = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: 'Electricity Bill Payment Extended',
          description: 'Grace period extended until 15th for all users. No late fees applicable.',
          type: 'notice',
          date: 'Updated today',
        },
        {
          id: 2,
          title: 'New Water Service Launched',
          description: 'Water bill payment portal now live for all municipalities.',
          type: 'update',
          date: 'Updated yesterday',
        },
        {
          id: 3,
          title: 'Municipal Registration Approved',
          description: 'Your municipal permit has been successfully approved.',
          type: 'success',
          date: 'Updated 2 days ago',
        },
      ]);
    }, 500);
  });
};

/**
 * Fetch available services list
 * @returns {Promise<Array<{id: number, name: string, description: string, category: string, icon: string}>>} List of services
 */
export const fetchServices = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'Electricity',
          description: 'Pay electricity bills, view usage history, and manage connection details.',
          category: 'Utilities',
          icon: 'Zap',
        },
        {
          id: 2,
          name: 'Gas',
          description: 'Book gas cylinders, apply for new connections, and pay gas bills.',
          category: 'Utilities',
          icon: 'Flame',
        },
        {
          id: 3,
          name: 'Water',
          description: 'Pay water charges, request tanker supply, and report leakage issues.',
          category: 'Utilities',
          icon: 'Droplet',
        },
        {
          id: 4,
          name: 'Sanitation',
          description: 'Request waste collection, report unhygienic conditions, and schedule cleaning.',
          category: 'Municipal',
          icon: 'Trash2',
        },
        {
          id: 5,
          name: 'Municipal Grievances',
          description: 'Lodge complaints regarding roads, streetlights, and other civic issues.',
          category: 'Government',
          icon: 'FileText',
        },
      ]);
    }, 600);
  });
};

/**
 * Fetch platform statistics
 * @returns {Promise<{totalUsers: string, servicesAvailable: string, transactionsPerDay: string, satisfactionRate: string}>} Platform statistics
 */
export const fetchQuickActionStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalUsers: '50M+',
        servicesAvailable: '100+',
        transactionsPerDay: '10M+',
        satisfactionRate: '98%',
      });
    }, 400);
  });
};

/**
 * Mock user sign in
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<{success: boolean, user?: {id: string, name: string, email: string, token: string}, message?: string}>} Sign in result
 * @throws {Object} Error object with success false and message
 */
export const mockSignIn = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        resolve({
          success: true,
          user: {
            id: '123',
            name: 'John Doe',
            email: email,
            token: 'mock_jwt_token_123',
          },
        });
      } else {
        reject({
          success: false,
          message: 'Invalid credentials',
        });
      }
    }, 800);
  });
};

/**
 * Mock user sign up
 * @param {Object} userData - User registration data
 * @param {string} userData.name - User's full name
 * @param {string} userData.email - User's email address
 * @returns {Promise<{success: boolean, message: string, user: {id: string, name: string, email: string}}>} Sign up result
 */
export const mockSignUp = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Account created successfully',
        user: {
          id: '124',
          name: userData.name,
          email: userData.email,
        },
      });
    }, 800);
  });
};

/**
 * Fetch bill details for mock verification
 * @param {string} consumerNumber - The consumer ID to check
 * @param {string} type - Bill type (electricity, water, gas)
 * @returns {Promise<{success: boolean, billDetails?: Object, message?: string}>} Bill details result
 */
export const fetchBillDetails = async (consumerNumber, type) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (consumerNumber && consumerNumber.length >= 8) {
        resolve({
          success: true,
          billDetails: {
            consumerId: consumerNumber,
            consumerName: 'Rajesh Kumar',
            billingMonth: 'February 2026',
            amount: 1450.00,
            dueDate: '2026-02-25',
            status: 'unpaid',
            serviceType: type || 'Electricity'
          }
        });
      } else {
        resolve({
          success: false,
          message: 'Invalid Consumer Number. Please check and try again.'
        });
      }
    }, 1200);
  });
};

/**
 * Mock guest payment (Quick Pay without login)
 * @param {Object} billData - Bill payment data
 * @param {number} billData.amount - Payment amount
 * @returns {Promise<{success: boolean, transactionId: string, amount: number, status: string}>} Payment result
 */
export const mockQuickPay = async (billData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        amount: billData.amount,
        status: 'Payment Successful',
        date: new Date().toLocaleString()
      });
    }, 1500);
  });
};

/**
 * Check application status by tracking ID
 * @param {string} trackingId - Application tracking ID (minimum 5 characters)
 * @returns {Promise<{id: string, service: string, status: string, type: string, message: string}>} Application status
 * @throws {Object} Error object with message if tracking ID is invalid
 */
export const checkApplicationStatus = async (trackingId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!trackingId || trackingId.length < 5) {
        reject({ message: 'Invalid Tracking ID' });
        return;
      }

      const lastChar = trackingId.slice(-1);

      if (lastChar === '1' || lastChar === '2') {
        resolve({
          id: trackingId,
          service: 'Electricity New Connection',
          status: 'Approved',
          type: 'approved',
          message: 'Application Approved'
        });
      } else if (lastChar === '3' || lastChar === '4') {
        resolve({
          id: trackingId,
          service: 'Water Supply Issue',
          status: 'Pending',
          type: 'pending',
          message: 'Under Review'
        });
      } else if (lastChar === '5') {
        resolve({
          id: trackingId,
          service: 'Building Permit',
          status: 'Rejected',
          type: 'rejected',
          message: 'Documents Missing'
        });
      } else {
        resolve({
          id: trackingId,
          service: 'General Inquiry',
          status: 'Processing',
          type: 'processing',
          message: 'In Progress'
        });
      }
    }, 1200);
  });
};
