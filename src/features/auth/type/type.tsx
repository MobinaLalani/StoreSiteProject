export type AuthStep = "phone" | "otp" | "register";
export interface PhoneFormValues {
  phoneNumber: string;
}
export interface OtpFormValues {
  otp: string;
}
export interface RegisterFormValues {
  firstName: string;
  lastName: string;
}
export interface AuthState {
  step: AuthStep;
  phoneNumber: string;
  isLoading: boolean;
}
export interface SendOtpRequest {
  phoneNumber: string;
}
export interface SendOtpResponse {
  success: boolean;
  message?: string;
}
export interface VerifyOtpRequest {
  phoneNumber: string;
  otp: string;
}
export interface VerifyOtpResponse {
  success: boolean;
  isNewUser: boolean;
  message?: string;
}
export interface RegisterRequest {
  phoneNumber: string;
  firstName: string;
  lastName: string;
}
export interface RegisterResponse {
  success: boolean;
  message?: string;
}
