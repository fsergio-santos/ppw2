import { Controller, Post } from '@nestjs/common';
import { AcessoService } from '../service/acesso.service';

@Controller('acessos')
export class AcessoController {
  constructor(private readonly acessoService: AcessoService) {}

  @Post()
  create() {
    return null;
  }
}
