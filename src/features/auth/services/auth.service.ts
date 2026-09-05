
import type {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  RegisterRequest,
  RegisterResponse,
} from "../type/type";

/**
 * ارسال کد تایید به شماره موبایل
 */
export const sendOtp = async (
  data: SendOtpRequest
): Promise<SendOtpResponse> => {
  // TODO:
  // اینجا API واقعی پروژه قرار می‌گیرد.

  console.log("SEND OTP:", data.phoneNumber);

  return {
    success: true,
    message: "کد تایید ارسال شد",
  };
};

/**
 * بررسی کد تایید
 */
export const verifyOtp = async (
  data: VerifyOtpRequest
): Promise<VerifyOtpResponse> => {
  // TODO:
  // اینجا API واقعی پروژه قرار می‌گیرد.

  console.log(
    "VERIFY OTP:",
    data.phoneNumber,
    data.otp
  );

  return {
    success: true,
    isNewUser: true,
    message: "کد تایید صحیح است",
  };
};

/**
 * ثبت نام کاربر جدید
 */
export const registerUser = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  // TODO:
  // اینجا API واقعی پروژه قرار می‌گیرد.

  console.log("REGISTER:", data);

  return {
    success: true,
    message: "ثبت نام با موفقیت انجام شد",
  };
};

