const Blockquote = ({ name, children }) => {
  return (
    <blockquote className="rounded-xl border border-border-secondary px-8 py-3  not-italic">
      <span className="text-5xl text-gray-400">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          version="1.1"
          viewBox="0 0 17 17"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g></g>
          <path d="M13.169 7.614c-0.734 0-1.417 0.227-1.982 0.612 1.23-3.472 3.991-3.88 4.134-3.898l-0.123-0.992c-0.051 0.006-5.126 0.704-5.563 7.725l0.015 0.001c0 0.027-0.008 0.054-0.008 0.081 0 1.945 1.583 3.528 3.528 3.528s3.528-1.583 3.528-3.528-1.584-3.529-3.529-3.529zM13.169 13.671c-1.395 0-2.528-1.134-2.528-2.528s1.134-2.528 2.528-2.528 2.528 1.134 2.528 2.528-1.134 2.528-2.528 2.528zM3.733 7.614c-0.734 0-1.416 0.227-1.981 0.612 1.23-3.472 3.99-3.88 4.133-3.898l-0.123-0.992c-0.051 0.006-5.125 0.704-5.564 7.725l0.015 0.001c0 0.027-0.008 0.054-0.008 0.081 0 1.945 1.583 3.528 3.528 3.528s3.528-1.583 3.528-3.528-1.582-3.529-3.528-3.529zM3.733 13.671c-1.395 0-2.528-1.134-2.528-2.528s1.134-2.528 2.528-2.528 2.528 1.134 2.528 2.528-1.133 2.528-2.528 2.528z"></path>
        </svg>
      </span>
      {children}
      <span className="m-0 block border-t border-border-secondary pt-3 text-base font-normal text-text after:hidden">
        {name}
      </span>
    </blockquote>
  );
};

export default Blockquote;
