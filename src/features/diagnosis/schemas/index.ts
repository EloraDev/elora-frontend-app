import { z } from "zod";

export const bookingSearchParamsSchema = z.object({
	slot: z.string().optional(),
	date: z.string().optional(),
});

export type BookingSearchParams = z.infer<typeof bookingSearchParamsSchema>;

export const bookingFormSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required").optional(),
	location: z.string().min(1, "Location is required"),
	date: z.string().min(1, "Date is required"),
	time: z.string().min(1, "Time is required"),
	timezone: z.string().min(1, "Time zone is required"),
	name: z.string().min(1, "Name is required").optional(),
	email: z.string().email("Invalid email address").optional(),
	phone: z.string().min(1, "Phone number is required").optional(),
	success_url: z.string().min(1, "Success URL is required").optional(),
	cancel_url: z.string().min(1, "Cancel URL is required").optional(),
	program: z.string().optional()
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export const appointmentFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email address"),
	phone: z.string().min(1, "Phone number is required"),
	notes: z.string().optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentFormSchema>;

export const appointmentFormUpdateSchema = appointmentFormSchema.partial().extend({
	id: z.string(),
});
export type AppointmentFormUpdateData = z.infer<typeof appointmentFormUpdateSchema>;

// New schema for diagnosis requests
export const diagnosisFormSchema = z.object({
	image: z.instanceof(File).optional(),
	symptoms: z.string().optional(),
});

export type DiagnosisFormData = z.infer<typeof diagnosisFormSchema>;
