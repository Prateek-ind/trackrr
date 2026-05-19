

const SectionHeader = ({ title }: { title: string }) => {
  return (
    <div className="text-xs px-4 py-2 mb-6 border-l-4 border-brand-purple font-bold text-text-secondary uppercase tracking-widest">
      {title}
    </div>
  );
};

export default SectionHeader;
