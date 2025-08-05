import { Fragment, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from 'react';

type ButtonProps = {
  id: string;
  type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  title: string;
  variant: string;
  cssClass: string;
  label: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon: ReactNode;
};

const Button = ({ id, type, title, variant, cssClass, label, onClick, disabled = false, icon }: ButtonProps) => {
  return (
    <Fragment>
      <button
        id={id}
        type={type}
        title={title}
        className={`btn btn-${variant} ${cssClass}`}
        onClick={type !== 'submit' ? onClick : undefined}
        disabled={disabled}
      >
        {icon && (
          <span className="btn-icon">
            <i>{icon}</i>
          </span>
        )}
        {label && <span className="btn-label">{label}</span>}
      </button>
    </Fragment>
  );
};

export default Button;
