import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "../../../../features/profile/pages/ProfilePage";

export const Route = createFileRoute("/(dashboard)/dashboard/profile/")({
  component: ProfilePage,
});
