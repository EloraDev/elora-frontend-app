import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "../../../features/public/pages/landing-page";
// import  Home from '../../../features/pages/home-page'

export const Route = createFileRoute("/(public)/_public/")({
  component: () => <LandingPage />,
});
