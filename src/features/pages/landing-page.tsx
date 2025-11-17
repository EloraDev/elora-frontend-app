import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../components/ui/button";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate({ to: "/auth/signup" })}>
        Get Started
      </Button>
    </div>
  );
};
