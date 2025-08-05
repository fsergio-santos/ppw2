import { Fragment, type PropsWithChildren } from 'react'
import './tabela.css';

const Table = ({children}:PropsWithChildren) => {
  return (
    <Fragment>
        <table className="app-tabela table table-striped table-bordered table-hover cf">
           {children}
        </table>
    </Fragment>    

  )
}

export default Table
