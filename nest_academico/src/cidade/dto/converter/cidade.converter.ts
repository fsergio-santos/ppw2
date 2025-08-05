import { Cidade } from 'src/cidade/entities/cidade.entity';
import { CidadeRequest } from '../request/cidade.request';
import { CidadeResponse } from '../response/cidade.response';
import { plainToInstance } from 'class-transformer';

export class ConverterCidade {
  static toCidade(cidadeRequest: CidadeRequest): Cidade {
    const cidade = new Cidade();

    if (cidadeRequest.idCidade != null) {
      cidade.idCidade = cidadeRequest.idCidade;
    }

    cidade.codCidade = cidadeRequest.codCidade ?? '';
    cidade.nomeCidade = cidadeRequest.nomeCidade ?? '';

    return cidade;
  }

  static toListCidadeResponse(lista: Cidade[] = []): CidadeResponse[] {
    return plainToInstance(CidadeResponse, lista, { excludeExtraneousValues: true });
  }

  static toCidadeResponse(cidade: Cidade): CidadeResponse {
    return plainToInstance(CidadeResponse, cidade, { excludeExtraneousValues: true });
  }
}
