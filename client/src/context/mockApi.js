// Mock API functions for SUVIDHA frontend
// These simulate API calls and return mock data

// Get announcements/notices
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

// Get services list
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

// Get quick action stats
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

// Mock user sign in (placeholder)
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

// Mock user sign up (placeholder)
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

// Mock guest payment (Quick Pay without login)
export const mockQuickPay = async (billData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: 'TXN-' + Date.now(),
        amount: billData.amount,
        status: 'Payment Successful',
      });
    }, 1000);
  });
};

// Check Application Status
export const checkApplicationStatus = async (trackingId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock simple logic: ID ending in various numbers gives different results
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
