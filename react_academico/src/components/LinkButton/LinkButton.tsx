import { Fragment, type ReactNode } from "react";
import { Link, type To } from "react-router-dom";

type LinkButtonProps = {
  to: To;
  type?: string;
  title?: string;
  variant?: string;
  cssClass?: string;
  label?: string;
  icon?: ReactNode;
};

const LinkButton = ({
  to,
  type,
  title,
  variant,
  cssClass,
  label,
  icon,
}: LinkButtonProps) => {
  return (
    <Fragment>
      <Link
        to={to}
        type={type}
        title={title}
        className={`btn btn-${variant} ${cssClass}`}
      >
        {icon && (
          <span className="btn-icon">
            <i>{icon}</i>
          </span>
        )}
        {label && <span className="btn-label">{label}</span>}
      </Link>
    </Fragment>
  );
};

export default LinkButton;
