import { createFileRoute } from "@tanstack/react-router";
import { MedicalHistoryPage } from "../../../../features/history/pages/MedicalHistoryPage";

export const Route = createFileRoute("/(dashboard)/dashboard/history/")({
  component: MedicalHistoryPage,
});

