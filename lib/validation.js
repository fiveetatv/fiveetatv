const spamPatterns = [
  /\b(viagra|cialis|casino|poker|lottery)\b/i,
  /\b(free money|win prize|click here|act now)\b/i,
  /\b(100%|guaranteed|no risk)\b/i,
  /[^\w\s@.-]/g,
  /(.)\1{4,}/,
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;

export function validateEmail(email) {
  if (!email || typeof email !== "string") return false;
  return emailRegex.test(email.trim());
}

export function validatePhone(phone) {
  if (!phone || typeof phone !== "string") return false;
  const cleaned = phone.replace(/\D/g, "");
  return phoneRegex.test(cleaned);
}

export function sanitizeInput(input) {
  if (!input || typeof input !== "string") return "";
  return input
    .trim()
    .replace(/[<>]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .slice(0, 5000);
}

export function detectSpam(text) {
  if (!text || typeof text !== "string") return false;
  
  const lowerText = text.toLowerCase();
  
  for (const pattern of spamPatterns) {
    if (pattern.test(lowerText)) return true;
  }
  
  const urlCount = (text.match(/https?:\/\//g) || []).length;
  if (urlCount > 3) return true;
  
  const emailCount = (text.match(/@\w+\./g) || []).length;
  if (emailCount > 2) return true;
  
  return false;
}

export function validateFormData(data, rules) {
  const errors = {};
  
  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field];
    
    if (rule.required && (!value || !String(value).trim())) {
      errors[field] = `${field} is required`;
      continue;
    }
    
    if (value) {
      if (rule.type === "email" && !validateEmail(value)) {
        errors[field] = "Invalid email address";
      }
      
      if (rule.type === "phone" && !validatePhone(value)) {
        errors[field] = "Invalid phone number";
      }
      
      if (rule.minLength && String(value).length < rule.minLength) {
        errors[field] = `Minimum ${rule.minLength} characters required`;
      }
      
      if (rule.maxLength && String(value).length > rule.maxLength) {
        errors[field] = `Maximum ${rule.maxLength} characters allowed`;
      }
      
      if (rule.spamCheck && detectSpam(value)) {
        errors[field] = "Invalid input detected";
      }
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateToken() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}