import { z } from "zod";
import type { ErrorResponse, SuccessResponse } from "../../../types/response";
import type { loginSchema, resetPasswordSchema } from "../schemas";

export interface LoginSearchParams {
    redirect?: string;
    email?: string;
    status?: "success";
}

export const FormFieldType = {
    TEXT: "text",
    PASSWORD: "password",
    // EMAIL = "email",
    // NUMBER = "number",
    // DATE = "date",
    // TIME = "time",
    // DATE_TIME = "date-time",
} as const;




export type LoginType = z.infer<typeof loginSchema>
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>
export type UpdatePasswordType = {
  token: string;
  password: string;
  confirmPassword?: string
};

export type UserLoginData = Response & {
    user_id: string;
    token: string;
}

export type UserLoginResponse = SuccessResponse<UserLoginData> | ErrorResponse;


export type CreateUserData = Response & {
    user_id: string;
}

export type CreateUserResponse = SuccessResponse<CreateUserData> | ErrorResponse;

export type ResetData = Response & {
    status: string;
    message: string;
}


export type ResetSuccessMessage = {
    status: string
    message: string
}

export type ResetErrorMessage = {
    details: {
        message: string
    }
}

export interface UpdatePasswordSearchParams {
  token?: string;
}

export type AuthUser = {
    first_name: string;
    last_name: string;
    email: string;
    state: string;
    city: string;
    phone_number: string;
    date_of_birth: string;
    avatar?: string;
    gender: string;
    user_id: string;
    user_type: string;
    // health_profile: HealthProfile;
    _id: string;
    passwordis_verified: boolean;
    is_new_user: boolean;
    has_onboarded: boolean;
    registration_date: string;
    is_verified: boolean;
    active: boolean;
    timezone: string;
    delivery_address: {
      street: string;
      city: string;
      state: string;
      zip_code: string;
      phone_number?: string;
    };
    program?: string[];
    has_plan: boolean;
    medical_plan: {
      plan_id: string
      medication: {
        name: string;
        cost: number;
      }
      consultation: {
        name: string;
        cost: number;
      }
      payment_status: string;
      supplementary_questionnaire:null;
    };
    has_recommended_task: boolean;
    consultation: {
      consultation_id:string,
      user_id:string,
      program:string,
      status:string,
      cost:number,
      payment_status:string,
      request_datetime:string,
       plan_id:string};
  }