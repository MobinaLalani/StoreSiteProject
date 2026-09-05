import * as Yup from "yup";
export const phoneValidationSchema: Yup.ObjectSchema<{ phoneNumber: string }> =
  Yup.object({
    phoneNumber: Yup.string()
      .required("شماره موبایل الزامی است")
      .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  });
export const otpValidationSchema: Yup.ObjectSchema<{ otp: string }> =
  Yup.object({
    otp: Yup.string()
      .required("کد تأیید الزامی است")
      .matches(/^\d{6}$/, "کد تأیید باید ۶ رقم باشد"),
  });
export const registerValidationSchema: Yup.ObjectSchema<{
  firstName: string;
  lastName: string;
}> = Yup.object({
  firstName: Yup.string()
    .required("نام الزامی است")
    .min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  lastName: Yup.string()
    .required("نام خانوادگی الزامی است")
    .min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
});
