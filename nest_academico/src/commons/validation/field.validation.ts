import { ValidationFieldsExcepiton } from '../exceptions/error/fields.error.execptions';

export class ValidationFields {
  static validarCampo(field: string, camposPermitidos: string[], nomeEntidade: string): void {
    if (!camposPermitidos.includes(field)) {
      throw new ValidationFieldsExcepiton(`Campo inválido: ${field} para ${nomeEntidade}.`);
    }
  }
}
