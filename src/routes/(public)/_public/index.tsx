import { createFileRoute } from "@tanstack/react-router";
import { WaitlistPage } from "../../../features/public/pages/waitlist-page";
// import  Home from '../../../features/pages/home-page'

export const Route = createFileRoute("/(public)/_public/")({
  component: () => <WaitlistPage />,
});
