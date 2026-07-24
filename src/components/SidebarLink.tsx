import { NavLink } from "react-router-dom";

type SidebarLinkProps = {
  to: string;
  count?: number;
  name?: string;
};

export default function SidebarLink({ to, count, name }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `inline-flex shrink-0 whitespace-nowrap items-center justify-center px-3 py-2 border-b-3 lg:border-s-3 lg:border-b-0 ${
          isActive
            ? "shadow-primary-soft bg-primary-active border-primary text-primary"
            : "border-border hover:bg-surface-hover group text-muted"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <p className="text-sm font-medium uppercase transition-colors group-hover:text-text">
            {name}
          </p>
          <p
            className={`ml-2 text-xs font-medium transition-colors ${
              isActive
                ? "px-2 bg-primary text-bg rounded-sm"
                : "text-muted group-hover:text-text"
            }`}
          >
            {count !== undefined ? count : null}
          </p>
        </>
      )}
    </NavLink>
  );
}
