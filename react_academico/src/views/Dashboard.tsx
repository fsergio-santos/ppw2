import React, { useEffect, useState } from 'react'
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import Form from '../components/form/Form';
import Loading from '../components/loading/Loading';
import { BUTTON_SIZE_SHOW_MESSAGE, DASHBOARD } from '../service/constant/Constantes';
import { URL_DASHBOARD } from '../service/constant/Url';
import { useAlert } from '../context/AlertContexto';

const navegacaoDashboard = {
  titulo: "Página Principal",
  descricao: "Página principal do sistema",
  iconTitulo: <AiIcons.AiFillDashboard size={BUTTON_SIZE_SHOW_MESSAGE} />,
  iconReturn: <MdIcons.MdList size={BUTTON_SIZE_SHOW_MESSAGE} />,
  toReturn:DASHBOARD,
  toUrl:URL_DASHBOARD,
}

const Dashboard = () => {

   const { loading } = useAlert();
  
  return (
    <Form navegacao={navegacaoDashboard}>
      {loading ? <Loading /> : null}
    </Form>

  )
}

export default Dashboard
