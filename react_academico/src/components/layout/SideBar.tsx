import { Fragment } from 'react';
import ShowItem from './ShowItem';
import { SideBarData } from './SideBarData';

type SideBarProps = {
  sidebar: boolean;
};

const SideBar = ({ sidebar }: SideBarProps) => {
  return (
    <Fragment>
      <div className={sidebar ? 'app-sidebar active' : 'app-sidebar'}>
        {' '}
        {SideBarData.map((item, index) => {
          return <ShowItem key={index} item={item} />;
        })}
      </div>
    </Fragment>
  );
};

export default SideBar;
