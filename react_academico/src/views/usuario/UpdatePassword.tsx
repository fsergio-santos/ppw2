import { AiFillLock } from 'react-icons/ai';
import { BUTTON_SIZE } from '../../service/constant/Constantes';

type StringProps = {
  value: string;
};

const UpdatePassword = ({ value }: StringProps) => {
  console.log(value);
  return (
    <div>
      <span className="btn btn-sm background-secondary">
        {' '}
        <i>{<AiFillLock size={BUTTON_SIZE} />}</i>
      </span>
    </div>
  );
};

export default UpdatePassword;
