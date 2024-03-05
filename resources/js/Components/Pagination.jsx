import { Link } from "@inertiajs/react";

const Pagination = ({ links }) => {
  return (
    <nav className="mt-4 text-center">
      {links.map((link) => (
        <Link
          preserveScroll
          key={link.label}
          href={link.url || ""}
          className={`inline-block py-2 px-3 rounded-lg text-gray-200 text-sm ${
            link.active ? "bg-gray-950" : ""
          } ${
            !link.url
              ? "!text-gray-500 cursor-not-allowed"
              : "hover:bg-gray-950"
          }`}
          dangerouslySetInnerHTML={{ __html: link.label }}
        ></Link>
      ))}
    </nav>
  );
};

export default Pagination;
