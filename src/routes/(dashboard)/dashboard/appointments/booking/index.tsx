import { createFileRoute } from "@tanstack/react-router";
import { DashboardBookingPage } from "../../../../../features/consultations/pages/DashboardBookingPage";

export const Route = createFileRoute(
  "/(dashboard)/dashboard/appointments/booking/"
)({
  component: DashboardBookingPage,
});
