interface ProfileFormData {
  username: string;
  email: string;
  location: string;
  phone: string;
  bio: string;
  targetRole: string;
  workType: "remote" | "hybrid" | "onsite";
  preferredLocation: string;
  salary: string;
  openToWork: boolean;
  github: string;
  linkedin: string;
  portfolio: string;
  skills: string[];
  newPassword: string;
  confirmPassword: string;
}

