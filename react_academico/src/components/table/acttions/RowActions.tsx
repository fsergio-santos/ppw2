import { Fragment } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';

import { DANGER, INFO, WARNING } from '../../../service/constant/Constantes';
import { ROTA_SISTEMA } from '../../../service/constant/Url';
import LinkButton from '../../LinkButton/LinkButton';

type RowActionsProps = {
  path?: string;
  id?: string;
};

const RowActions = ({ path, id }: RowActionsProps) => {
  return (
    <Fragment>
      <td className="app-coluna-detalhe-centro" data-title="Ações">
        <LinkButton
          to={`/${ROTA_SISTEMA}/${path}/alterar/${id}`}
          type="button"
          title={`Alterar dados do ${path}`}
          variant={INFO}
          cssClass="btn-lg"
          icon={<FaIcons.FaPencilAlt />}
        />
      </td>
      <td className="app-coluna-detalhe-centro" data-title="Ações">
        <LinkButton
          to={`/${ROTA_SISTEMA}/${path}/excluir/${id}`}
          type="button"
          title={`Excluir dados do ${path}`}
          variant={DANGER}
          cssClass="btn-lg"
          icon={<FaIcons.FaTrashAlt />}
        />
      </td>
      <td className="app-coluna-detalhe-centro" data-title="Ações">
        <LinkButton
          to={`/${ROTA_SISTEMA}/${path}/buscar/${id}`}
          type="button"
          title={`Consultar dados do ${path}`}
          variant={WARNING}
          cssClass="btn-lg"
          icon={<AiIcons.AiFillSecurityScan />}
        />
      </td>
    </Fragment>
  );
};

export default RowActions;
