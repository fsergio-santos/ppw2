import { Fragment, useRef, useState, type ChangeEvent, type MouseEvent } from 'react';
import * as FaIcons from 'react-icons/fa';
import { useAlert } from '../../context/AlertContexto';
import { http } from '../../service/connection/ApiConnection';
import { DANGER, DEFAULT_IMAGEM, SERVIDOR_POST_IMAGEM, SUCCESS, TIME } from '../../service/constant/Constantes';
import { getMessageByStatus, getMessageByType } from '../../service/errors/StatusMensagens';
import './imagemupload.css';

type ImagemUploadProps = {
  id: number;
  urlSalvar: string;
  urlDeletar: string;
  titulo?: string;
  onUploadSuccess: (nomeArquivo: string, ct: string) => void;
  onDeleteSuccess: (nomeArquivo: string, ct: string) => void;
};

const ImagemUpload = ({ id, urlSalvar, urlDeletar, titulo, onUploadSuccess, onDeleteSuccess }: ImagemUploadProps) => {
  const uploadedImage = useRef<HTMLImageElement | null>(null);
  const fileRef = useRef<{ file?: File } | null>({});
  const imageUpLoader = useRef<HTMLInputElement | null>(null);
  const [foto, setFoto] = useState<string>('');
  const { setLoading, showAlert } = useAlert();
  const maxSize = 209715200;

  const selectArquivo = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const [file] = files;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      showAlert(`Esse tipo de arquivo da imagem não é permitido: ${file.type}`, DANGER, TIME);
      return;
    }

    if (file.size > maxSize) {
      showAlert(
        `O tamanho do arquivo máximo da imagem permitido é de ${maxSize} e o enviado é de ${file.size}`,
        DANGER,
        TIME,
      );
      return;
    }

    const reader = new FileReader();
    fileRef.current = { file };

    reader.onload = (event) => {
      if (uploadedImage.current && event.target?.result) {
        uploadedImage.current.src = event.target.result as string;
      }
    };

    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('foto', file);

    try {
      setLoading(true);
      const response = await http.post(urlSalvar, formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      });

      const {
        mensagem,
        status,
        objeto: { nomeArquivo, contentType: ct },
      } = response.data;
      setFoto(nomeArquivo);
      if (imageUpLoader.current) imageUpLoader.current.value = '';
      showAlert(mensagem || getMessageByStatus(status), SUCCESS, TIME);
      onUploadSuccess(nomeArquivo, ct);
    } catch (error: any) {
      showAlert(getMessageByType(error), DANGER, TIME);
    } finally {
      setLoading(false);
    }
  };

  const excluirFoto = async (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();

    if (!foto) return;

    try {
      setLoading(true);
      const response = await http.delete(urlDeletar, {
        headers: { 'Content-type': 'application/json' },
        data: { id, nomeArquivo: foto },
      });

      const { mensagem, status } = response.data;
      showAlert(mensagem || getMessageByStatus(status), SUCCESS, TIME);
      setFoto('');
      if (uploadedImage.current) uploadedImage.current.src = DEFAULT_IMAGEM;
      onDeleteSuccess(DEFAULT_IMAGEM, '');
    } catch (error: any) {
      showAlert(getMessageByType(error), DANGER, TIME);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="card">
        <div className="card-body">
          <div className="custom-container">
            <img
              src={foto === '' || foto === null ? DEFAULT_IMAGEM : `${SERVIDOR_POST_IMAGEM}${foto}`}
              className="avatar"
              ref={uploadedImage}
              onClick={(e) => excluirFoto(e)}
              alt="foto processada"
            />
            <div className="fileInput">
              <input type="file" ref={imageUpLoader} onChange={(e) => selectArquivo(e)} />
              <button id="upload" className="btn btn-success btn-lg upload" title="Upload de foto">
                <i>
                  <FaIcons.FaUpload size={20} />
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <label className="app-label">{titulo || 'Foto'}</label>
    </Fragment>
  );
};

export default ImagemUpload;
