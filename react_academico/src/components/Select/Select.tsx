import { Fragment, useState, type ChangeEvent, type FocusEvent } from "react";
import MensagemErro from "../mensagem/MensagemErro.js";

type OptionItem = {
  value: string | number;
  name: string;
};

type SelectProps = {
  id?: string;
  label?: string;
  value?: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleBlur: (event: FocusEvent<HTMLSelectElement>) => void;
  array: OptionItem[];
  error?: boolean;
  errorMensagem?: string[];
  readonly?: boolean;
  disabled?: boolean;
};

const Select = ({
  id,
  label,
  value,
  handleChange,
  handleBlur,
  array,
  error,
  errorMensagem,
  readonly = false,
  disabled = false,
}: SelectProps) => {
  const [touched, setTouched] = useState(false);

  const onBlurHandler = (e: FocusEvent<HTMLSelectElement>) => {
    setTouched(true);
    if (!readonly && !disabled) {
      handleBlur(e);
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!readonly && !disabled) {
      handleChange(e);
    }
  };

  const getInputClass = (): string => {
    if (touched) {
      if (error) {
        return "form-select is-invalid app-label mb-2";
      } else if (error === false) {
        return "form-select is-valid app-label mb-2";
      }
    }
    return "form-select app-label mb-2";
  };

  return (
    <Fragment>
      <div className="form-group">
        <label htmlFor={id} className="app-label">
          {label}
        </label>
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          className={getInputClass()}
        >
          <option value="" disabled>
            {`Selecione ${label}`}
          </option>
          {array.map((arr, index) => (
            <option key={index} value={arr.value}>
              {arr.name}
            </option>
          ))}
        </select>
        {<MensagemErro error={error} mensagem={errorMensagem} />}
      </div>
    </Fragment>
  );
};

export default Select;
