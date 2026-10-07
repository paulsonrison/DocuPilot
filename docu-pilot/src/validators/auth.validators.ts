const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function passwordLengthOk(password: string): boolean {
  return password.length >= 8;
}

export function passwordRules(password: string) {
  return [
    { label: "At least 8 characters", met: password.length >= 8 },
    {
      label: "Upper and lowercase letters",
      met: /[A-Z]/.test(password) && /[a-z]/.test(password),
    },
    { label: "At least one number", met: /\d/.test(password) },
    { label: "At least one special character", met: /[^A-Za-z0-9]/.test(password) },
  ] as const;
}

export function passwordStrengthLabel(password: string): "Weak" | "Fair" | "Strong" {
  const met = passwordRules(password).filter((rule) => rule.met).length;
  if (met >= 4 && password.length > 7) return "Strong";
  if (met >= 2) return "Fair";
  return "Weak";
}

export function validateLogin(email: string, password: string): string | null {
  if (!isValidEmail(email)) return "Enter a valid work email address.";
  if (!password) return "Enter your password to continue.";
  return null;
}

export function validateRegister(input: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};
  if (input.username.trim().length < 3) {
    errors.username = "Username must be at least 3 characters long";
  }
  if (!isValidEmail(input.email)) {
    errors.email = "Please provide a valid email address";
  }
  if (!passwordLengthOk(input.password)) {
    errors.password = "Password must be at least 8 characters long";
  }
  if (input.password !== input.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
}

export function validateEmailOnly(email: string): string | null {
  if (!isValidEmail(email)) return "Please provide a valid email address";
  return null;
}

export function validateResetPassword(password: string, confirmPassword: string): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!passwordLengthOk(password)) {
    errors.password = "Password must be at least 8 characters long";
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
}

export function validateChangePassword(input: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!input.currentPassword) {
    errors.currentPassword = "Current password is required";
  }
  if (!passwordLengthOk(input.newPassword)) {
    errors.newPassword = "New password must be at least 8 characters long";
  }
  if (input.currentPassword && input.currentPassword === input.newPassword) {
    errors.newPassword = "New password must be different from current password";
  }
  if (input.newPassword !== input.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
}

export function validateProfile(username: string, email: string): Record<string, string> {
  const errors: Record<string, string> = {};
  if (username.trim().length < 3) {
    errors.username = "Username must be at least 3 characters long";
  }
  if (!isValidEmail(email)) {
    errors.email = "Please provide a valid email address";
  }
  return errors;
}
