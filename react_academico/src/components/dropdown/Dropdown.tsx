// /components/SearchableDropdown.tsx

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  type FocusEvent,
} from "react";

import "./dropdown.css";

// No seu arquivo de tipos ou no topo do componente
import MensagemErro from "../mensagem/MensagemErro";

// T é um tipo genérico que representa a forma de um único objeto de opção.
// Ex: interface ICidade { id: number; nome: string; }
// Neste caso, T seria ICidade.
export interface SearchableDropdownProps<T extends object> {
  id: string;
  label: string;
  options: T[] | null;

  // A chave do objeto 'T' que será usada para busca e exibição.
  // Ex: se T é ICidade, 'searchKey' poderia ser 'nome'.
  searchKey: keyof T;

  // O objeto de opção INTEIRO que está selecionado, ou null.
  value: T | null;

  // Função chamada quando uma opção é selecionada ou limpa.
  // Retorna o objeto inteiro, dando mais poder ao componente pai.
  onChange: (selected: T | null) => void;

  // Função de onBlur simplificada, apenas notifica que o evento ocorreu.
  handleBlur: (event: FocusEvent<HTMLInputElement>) => void;

  // Props de estado e aparência
  error?: boolean;
  errorMensagem?: string[];
  readonly?: boolean;
  disabled?: boolean;

  // Componente customizado para exibir erros, se necessário
}

// Usamos a assinatura genérica aqui
export const SearchableDropdown = <T extends object>({
  id,
  label,
  options,
  searchKey,
  value,
  onChange,
  handleBlur,
  error,
  errorMensagem,
  readonly = false,
  disabled = false,
}: SearchableDropdownProps<T>) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [touched, setTouched] = useState(false);

  // Tipando a ref para o elemento input
  const inputRef = useRef<HTMLInputElement>(null);

  // Sincroniza o texto do input com o valor selecionado vindo do pai
  useEffect(() => {
    // Se há um valor selecionado e o usuário não está digitando, exibe o valor.
    // O valor da prop 'searchKey' deve ser uma string para exibição.
    if (value && query === "") {
      const displayValue = value[searchKey];
      setQuery(
        typeof displayValue === "string" ? displayValue : String(displayValue)
      );
    } else if (!value) {
      setQuery(""); // Limpa o query se o valor for nulo
    }
  }, [value, searchKey]);

  // Otimização: Filtra as opções apenas quando a busca ou as opções mudam
  const filteredOptions = useMemo(() => {
    if (!query) {
      return []; // Não mostra nada se o input estiver vazio
    }
    return (options ?? []).filter((option) =>
      String(option[searchKey]).toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query, searchKey]);

  // Hook para fechar o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectOption = (option: T) => {
    // Atualiza o texto do input com o valor da opção selecionada
    const displayValue = option[searchKey];
    setQuery(
      typeof displayValue === "string" ? displayValue : String(displayValue)
    );

    // Notifica o componente pai sobre a nova seleção (o objeto inteiro)
    onChange(option);
    setIsOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    // Se o usuário está digitando, a seleção é desfeita.
    // Notifica o pai que a seleção foi limpa.
    onChange(null);
    setIsOpen(newQuery.trim().length > 0);
  };

  const onHandleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    // Notifica o pai sobre o evento de blur
    handleBlur(e);
    // Atraso para fechar para permitir o clique na opção
    setTimeout(() => setIsOpen(false), 150);
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
    <div className="dropdown">
      <div className="control">
        <div className="selected-value">
          <label htmlFor={id} className="app-label">
            {label}
          </label>
          <input
            id={id}
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onBlur={onHandleBlur}
            onClick={() => setIsOpen(query.trim().length > 0)}
            className={getInputClass()}
            readOnly={readonly}
            disabled={disabled}
            autoComplete="off"
          />
        </div>
        <div className={`arrow ${isOpen ? "open" : ""}`}></div>
        {isOpen && !disabled && (
          <div className="options open">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={`${id}-${index}`}
                  className={`option-item ${
                    value === option ? "selected" : ""
                  }`}
                  onClick={() => handleSelectOption(option)}
                  // Previne que o onBlur do input seja disparado antes do onClick
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {String(option[searchKey])}
                </div>
              ))
            ) : (
              <div className="option-item-disabled">
                Nenhum resultado encontrado
              </div>
            )}
          </div>
        )}

        {/* Exibe o componente de erro passado via props */}
        {<MensagemErro error={error} mensagem={errorMensagem} />}
      </div>
    </div>
  );
};
