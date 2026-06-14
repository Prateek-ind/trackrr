const Footer = () => {
  return (
    <footer className="border-t border-dark-border py-16 bg-dark-900">
      <div className="container mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-bold text-xl text-brand-purple">Trackrr</h3>

          <p className="mt-4 text-text-muted">
            The modern standard for tracking your job search.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Product</h4>

          <ul className="mt-4 space-y-2 text-text-muted">
            <li>Features</li>
            <li>Analytics</li>
            <li>Chrome Extension</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Company</h4>

          <ul className="mt-4 space-y-2 text-text-muted">
            <li>About</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Connect</h4>

          <ul className="mt-4 space-y-2 text-text-muted">
            <li>Twitter</li>
            <li>LinkedIn</li>
            <li>GitHub</li>
          </ul>
        </div>
      </div>

      <p className="text-center mt-12 text-sm text-text-muted">
        © 2026 Trackrr. Built for modern job seekers.
      </p>
    </footer>
  );
};

export default Footer;
