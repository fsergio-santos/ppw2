import { Fragment, useState, type ChangeEvent, type ElementType, type FocusEvent } from 'react';
import MensagemErro from '../mensagem/MensagemErro';

type InputProps = {
  id?: string;
  Icon?: ElementType;
  type?: string;
  label?: string;
  value?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMensagem?: string[];
  readonly?: boolean;
  disabled?: boolean;
};

const Input = ({
  id,
  label,
  Icon,
  type,
  value,
  handleChange,
  handleBlur,
  error,
  errorMensagem,
  readonly = false,
  disabled = false,
}: InputProps) => {
  const [touched, setTouched] = useState(false);

  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    if (!readonly && !disabled) {
      handleBlur?.(e);
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!readonly && !disabled) {
      handleChange?.(e);
    }
  };

  const getInputClass = (): string => {
    if (touched) {
      if (error) {
        return 'form-control is-invalid app-label input-error';
      } else if (error === false) {
        return 'form-control is-valid app-label input-valid';
      }
    } else {
      if (error) return 'form-control is-invalid app-label input-error';
    }
    return 'form-control app-label';
  };

  return (
    <Fragment>
      <div className="mb-2">
        <label htmlFor={id} className="app-label">
          {label}
        </label>
      </div>
      <div className="input-group">
        {Icon && (
          <div className="input-group-preappend">
            <span className="input-group-text">
              <Icon size={42} />
            </span>
          </div>
        )}
        <input
          type={type}
          id={id}
          name={id}
          value={value || ''}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          className={getInputClass()}
          readOnly={readonly}
          disabled={disabled}
          autoComplete="off"
        />
      </div>
      {<MensagemErro error={error} mensagem={errorMensagem} />}
    </Fragment>
  );
};

export default Input;
