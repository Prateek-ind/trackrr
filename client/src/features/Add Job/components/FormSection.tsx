import { Input } from "@/components/ui/input";
import { FileText, Building2, MapPin, Paperclip } from "lucide-react";
import StatusSelect from "./StatusSelect";
import { DatePicker } from "./DatePicker";
import { TogglePriority } from "./TogglePriority";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const FormSection = () => {
  return (
    <form className="p-6 max-w-4xl rounded-md shadow-md mt-6 border border-border">
      <section>
        <div className="text-sm px-4 py-2 mb-6 border-l-4 border-brand-purple font-bold text-text-secondary uppercase ">
          <p>Basic Information</p>
        </div>
        <div className="mb-6">
          <div className="text-sm font-semibold text-text-secondary uppercase">
            <div className="flex items-center gap-2">
              <FileText />
              <p>Job role / Postion</p>
            </div>
            <Input
              className="py-6 mt-2"
              placeholder="e.g. Senior Frontend Developer"
            />
          </div>
        </div>
        <div className="mb-6">
          <div className="text-sm font-semibold text-text-secondary uppercase ">
            <div className="flex items-center gap-2">
              <Building2 />
              <p>Company Name</p>
            </div>
            <Input
              className="py-6 mt-2 border border-dark-border text-text-primary placeholder:text-text-muted focus:border-brand-purple"
              placeholder="e.g. Amazon India"
            />
          </div>
        </div>
        <div className="mb-6">
          <div className="text-sm font-semibold text-text-secondary uppercase ">
            <div className="flex items-center gap-2">
              <MapPin />
              <p>Location</p>
            </div>
            <Input
              className="py-6 mt-2 border border-dark-border text-text-primary placeholder:text-text-muted focus:border-brand-purple"
              placeholder="e.g. Amazon India"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="text-sm font-bold px-4 py-2 mb-6 border-l-4 border-brand-purple text-text-secondary uppercase ">
          <p>Status & Tracking</p>
        </div>

        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="mb-6">
            <div className="text-sm font-semibold text-text-secondary uppercase ">
              <p className="mb-2">Current Status</p>
              <StatusSelect />
            </div>
          </div>

          <div className="mb-6">
            <div className=" text-sm font-semibold text-text-secondary uppercase ">
              <p className="mb-2">Applied Date</p>
              <DatePicker />
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm font-semibold text-text-secondary uppercase ">
              <p>Application source Name</p>
              <Input
                className="py-6 mt-2 border border-dark-border text-text-primary placeholder:text-text-muted focus:border-brand-purple"
                placeholder="e.g. Amazon India"
              />
            </div>
          </div>
          <div className="mb-6">
            <div className=" text-sm font-semibold text-text-secondary uppercase ">
              <p className="mb-2">Priority</p>
              <TogglePriority />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-sm font-bold px-4 py-2 mb-6 border-l-4 border-brand-purple text-text-secondary uppercase ">
          <p>Additional Context</p>
        </div>

        <div className="mb-6">
          <div className=" text-sm font-semibold text-text-secondary uppercase ">
            <p className="mb-2">Job Description / Personal Notes</p>
            <Textarea className="h-32" placeholder="Key requirements, interview points or follow-up reminders..." />
          </div>
        </div>

        <div className="mb-6">
          <div className=" text-sm font-semibold text-text-secondary uppercase ">
            <p className="mb-2">Attachments</p>
            <div>
              <Paperclip/>
              <Button/>
            </div>
          </div>
        </div>

      </section>
    </form>
  );
};

export default FormSection;
