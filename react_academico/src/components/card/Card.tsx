import { type ReactNode } from "react";
import "./card.css";

type CardProps = {
  icon?: ReactNode;
  titulo?: string;
  total?: number;
  cor?: string;
  percentual?: number;
};

const Card = ({ icon, titulo, total, cor, percentual }: CardProps) => {
  return (
    <div className="col-xl-4 col-lg-4">
      <div className={`card ${cor}`}>
        <div className="card-statistic-3 p-4">
          <div className="card-icon card-icon-large">
            <i>{icon}</i>
          </div>
          <div className="mb-4">
            <h5 className="card-title mb-0">{titulo}</h5>
          </div>
          <div className="row align-items-center mb-2 d-flex">
            <div className="col-8">
              <h2 className="d-flex align-items-center mb-0">{total}</h2>
            </div>
            <div className="col-4 text-right">
              <span>
                {percentual} <i className="fa fa-percentage"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
