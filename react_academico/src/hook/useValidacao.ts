import { useCallback, useState } from 'react';
import type { ErrorState, UseValidacaoReturn, ValidationRules } from '../type/validation.types';

export const useValidacao = <TModel extends Record<string, any>>(
  initialModel: TModel,
  validationRules: ValidationRules<TModel>,
): UseValidacaoReturn<TModel> => {
  const [model, setModel] = useState<TModel>(initialModel);
  const [errors, setErrors] = useState<ErrorState<TModel>>({});

  const handleChangeField = useCallback(<K extends keyof TModel>(name: K, value: TModel[K]) => {
    setModel((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
      [`${String(name)}Mensagem`]: undefined,
    }));
  }, []);

  const validateField = useCallback(
    (name: keyof TModel) => {
      const rule = validationRules[name];
      if (!rule) return;

      // A regra agora retorna um array de mensagens
      const messages = rule(model[name], model);

      setErrors((prev) => ({
        ...prev,
        // Há erro se o array de mensagens não estiver vazio
        [name]: messages.length > 0,
        // Guarda o array de mensagens ou undefined se não houver erros
        [`${String(name)}Mensagem`]: messages.length > 0 ? messages : undefined,
      }));
    },
    [model, validationRules],
  );

  const validarFormulario = useCallback(() => {
    let isFormValid = true;
    const newErrors: ErrorState<TModel> = {};

    for (const fieldName in validationRules) {
      const key = fieldName as keyof TModel;
      const rule = validationRules[key];

      if (rule) {
        // A regra agora retorna um array de mensagens
        const messages = rule(model[key], model);

        // Se o array não estiver vazio, há erros
        if (messages.length > 0) {
          isFormValid = false;
          (newErrors as any)[key] = true;
          (newErrors as any)[`${String(key)}Mensagem`] = messages;
        } else {
          (newErrors as any)[key] = false;
          (newErrors as any)[`${String(key)}Mensagem`] = undefined;
        }
      }
    }
    setErrors(newErrors);
    return isFormValid;
  }, [model, validationRules]);

  const setServerErrors = useCallback((serverErrors: Partial<Record<keyof TModel, string>> | null | undefined) => {
    if (!serverErrors) {
      setErrors({});
      return;
    }

    const newErrors: ErrorState<TModel> = {};
    for (const field in serverErrors) {
      const key = field as keyof TModel;
      const message = serverErrors[key];

      if (message) {
        (newErrors as { [K in keyof TModel]?: boolean })[key] = true;
        const mensagemKey = `${String(key)}Mensagem` as keyof {
          [K in keyof TModel as `${K & string}Mensagem`]?: string;
        };
        (newErrors as any)[mensagemKey] = message;
      } else {
        (newErrors as { [K in keyof TModel]?: boolean })[key] = false; // Set boolean flag to false
        const messageKey = `${String(key)}Mensagem` as keyof {
          [K in keyof TModel as `${K & string}Mensagem`]?: string;
        };
        (newErrors as any)[messageKey] = undefined;
      }
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
  }, []);

  function validarCamposVazios<TModel extends Record<string, any>>(
    dados: TModel,
    camposObrigatorios: (keyof TModel)[],
    mensagensCampos?: Partial<Record<keyof TModel, string>>,
  ): Partial<Record<keyof TModel, string>> | null {
    const erros: Partial<Record<keyof TModel, string>> = {};

    camposObrigatorios.forEach((campo) => {
      const valor = dados[campo];
      if (valor === undefined || valor === null || (typeof valor === 'string' && valor.trim() === '')) {
        erros[campo] = mensagensCampos?.[campo] ?? `O campo ${String(campo)} é obrigatório e está vázio`;
      }
    });
    return Object.keys(erros).length > 0 ? erros : null;
  }

  return {
    model,
    setModel,
    errors,
    setErrors,
    handleChangeField,
    handleBlurField: validateField,
    validarFormulario,
    setServerErrors,
    validarCamposVazios,
  };
};
