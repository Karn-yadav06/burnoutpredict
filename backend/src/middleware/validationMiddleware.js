import { body, validationResult } from 'express-validator';

// Standard error responder for validation results
export const validateSchema = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

export const registerValidators = [
  body('name')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter'),
  
  validateSchema
];

export const loginValidators = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required'),
    
  validateSchema
];

export const contactValidators = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('company')
    .trim()
    .notEmpty().withMessage('Company name is required'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isMobilePhone().withMessage('Please provide a valid phone number'),
  
  body('employees')
    .notEmpty().withMessage('Number of employees is required')
    .isInt({ min: 1 }).withMessage('Number of employees must be at least 1')
    .toInt(),
  
  body('hrSoftware')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 }).withMessage('HR Software name is too long'),
  
  body('industry')
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty().withMessage('Industry cannot be empty if specified'),
  
  body('requirements')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 5, max: 2000 }).withMessage('Requirements description must be between 5 and 2000 characters'),
  
  validateSchema
];

export const predictionValidators = [
  body('employeeName')
    .trim()
    .notEmpty().withMessage('Employee name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Employee name must be between 2 and 50 characters'),
  
  body('department')
    .trim()
    .notEmpty().withMessage('Department is required'),
  
  body('workloadLevel')
    .notEmpty().withMessage('Workload level is required')
    .isInt({ min: 1, max: 5 }).withMessage('Workload level must be an integer between 1 and 5')
    .toInt(),
  
  body('weeklyHours')
    .notEmpty().withMessage('Weekly working hours is required')
    .isNumeric({ min: 10, max: 100 }).withMessage('Weekly working hours must be a number between 10 and 100')
    .toFloat(),
  
  body('jobSatisfaction')
    .notEmpty().withMessage('Job satisfaction level is required')
    .isInt({ min: 1, max: 5 }).withMessage('Job satisfaction level must be an integer between 1 and 5')
    .toInt(),
  
  body('remoteWork')
    .notEmpty().withMessage('Remote work status is required')
    .isBoolean().withMessage('Remote work status must be a boolean')
    .toBoolean(),
  
  body('sickDays')
    .notEmpty().withMessage('Sick days count is required')
    .isInt({ min: 0, max: 300 }).withMessage('Sick days count must be an integer between 0 and 300')
    .toInt(),
  
  validateSchema
];
