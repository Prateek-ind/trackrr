import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant={"secondary"}
      onClick={() => navigate(-1)}
      className="  text-text-secondary hover:text-text-primary bg-dark-600 transition-colors px-8 py-2 mb-4 cursor-pointer"
    >
      <ArrowLeft size={24} />
      Back
    </Button>
  );
};

export default BackButton;
