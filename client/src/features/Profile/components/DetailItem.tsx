const DetailItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value?: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-md flex items-center justify-center bg-brand-purple/10 text-brand-purple shrink-0">
      <Icon size={16} />
    </div>
    <div>
      <p className="text-xs font-semibold text-text-muted uppercase">{label}</p>
      <p className="text-sm font-medium text-text-primary mt-0.5">{value || "—"}</p>
    </div>
  </div>
);

export default DetailItem