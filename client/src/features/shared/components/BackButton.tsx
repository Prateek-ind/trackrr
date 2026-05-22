import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant={"secondary"}
      onClick={() => navigate(-1)}
      className="  text-text-muted hover:text-text-primary transition-colors px-8 py-2 mb-4"
    >
      <ArrowLeft size={24} />
      Back
    </Button>
  );
};

export default BackButton;
