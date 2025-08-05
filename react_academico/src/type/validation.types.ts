// /types/validation.types.ts (VERSÃO ATUALIZADA)

/**
 * Agora a propriedade de mensagem é um array de strings.
 */
export type ErrorState<TModel> = {
  [P in keyof TModel]?: boolean;
} & {
  [P in keyof TModel as `${P & string}Mensagem`]?: string[]; // Alterado de string para string[]
};

/**
 * A função de validação agora deve retornar um array de strings.
 * Um array vazio significa que não há erros.
 */
export type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K], model: T) => string[]; // Alterado de string para string[]
};

export type UseValidacaoReturn<TModel extends Record<string, any>> = {
  model: TModel;
  setModel: React.Dispatch<React.SetStateAction<TModel>>;
  errors: ErrorState<TModel>;
  setErrors: React.Dispatch<React.SetStateAction<ErrorState<TModel>>>;
  handleChangeField: <K extends keyof TModel>(field: K, value: TModel[K]) => void;
  handleBlurField: (field: keyof TModel) => void;
  validarFormulario: () => boolean;
  setServerErrors: (errors: Partial<Record<keyof TModel, string>>) => void;
  validarCamposVazios: (
    dados: TModel,
    camposObrigatorios: (keyof TModel)[],
    mensagensCampos?: Partial<Record<keyof TModel, string>>,
  ) => Partial<Record<keyof TModel, string>> | null;
};
