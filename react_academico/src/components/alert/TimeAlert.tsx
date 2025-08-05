import { useEffect } from 'react'
import './timealert.css';
import ReactDOM from 'react-dom';
import { useAlert } from '../../context/AlertContexto';

const TimeAlert = () => {

    const {
        message,
        variant,
        show,
        handleShowAlerta,
        duration
    } = useAlert();

    useEffect(() => {
        const timer = setTimeout(async () => {
            handleShowAlerta();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, handleShowAlerta]);

    return ReactDOM.createPortal(
         show && (
                <div className="alert-message">
                    <div className="alert-message-container">
                        <div className={`alert-message-content alert-${variant}`}>
                            <div className="alert-message-header">
                                <span className="alert-text">{message}</span>
                                <span className="app-close-btn" onClick={() => handleShowAlerta()}>
                                    X
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            ), document.body )
    
}

export default TimeAlert
