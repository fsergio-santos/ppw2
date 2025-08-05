
import { Fragment, useState } from 'react';
import * as BsIcons from "react-icons/bs";
import { Link } from 'react-router-dom';
import type { MenuItem } from './SideBarData';


type ShowItemProps = {
  item: MenuItem;
};

const ShowItem = ( {item}:ShowItemProps ) => {
    
   
    const [open, setOpen] = useState<boolean>(false)

    if (item.sub_menu){
        return (
        <Fragment>
             <div className={ open ? "app-sidebar-item open":"app-sidebar-item"}>
               <div className='app-sidebar-title'>
                    <span>
                        { item.icon && <i>{ item.icon }</i> }
                        { item.page }
                    </span>
                    <i><BsIcons.BsChevronDown
                            className='app-toggle-btn'
                            onClick={()=>setOpen(!open)}
                        />
                    </i>
                </div>
                <div className='app-sidebar-content'>
                    {
                        item.sub_menu.map((sub, index)=> {
                            return(
                            <ShowItem
                                key={index}
                                item={sub}
                            />
                            )
                        })
                    }
                </div>
            </div>
        </Fragment>
        )
    } else {
        return (
            <Fragment>
                 <Link to={ item.path || "#" } className='app-sidebar-item plain'>
                    { item.icon && <i>{item.icon}</i>}
                    { item.page }
                </Link>
            </Fragment>
        )
    }

}

export default ShowItem;
