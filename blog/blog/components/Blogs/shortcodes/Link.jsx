const Link = ({ children, href }) => {
  return (
    <a href={href} className="text-primary font-semibold">
      {children}
    </a>
  );
};

export default Link;
