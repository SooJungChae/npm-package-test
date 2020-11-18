import React, { useState } from 'react';
import { API, HOST_UPLOAD_STORAGE_API } from 'library/API';
import styles from './FileInput.module.scss';

const uploadTempFile = formData => {
  const method = 'POST';
  const data = new FormData();

  data.append('tempFile', formData);

  const request = {
    method,
    url: `${HOST_UPLOAD_STORAGE_API}/file/upload`,
    data,
  };

  return API(request);
};

/**
 * File input
 * @param {Object} {data}
 * @param {String} {data.id} *필수
 * @param {String} {data.name}
 * @param {String} {data.className} - 'btn-slate' : 기본 스타일
 * @param {String} {data.extensionValue} - string -> 'excel','image','pdf' -> 확장자 제한 필요시 사용
 * @param {String} {data.fileSizeValue}
 * @param {String} {data.disabled}
 * @param {String} {data.multiple}
 * @param {String} {data.onFileSizeCheck} - array -> [number,'string'] -> 이미지 사이즈 제한 필요시 사용 [Byte,KB,MB]
 * @param {function} {data.onChange} *필수
 * @return {(id, returnUrl)} id, returnUrl : multiple == true 일 때 returnUrl은 배열로 내려간다
 * @example   <Input type="file" id="excelUrl" name="excelUrl" className="btn-default" extensionValue="excel" fileSizeValue={[10, 'KB']} onChange={excelUrlChange} />;
 *
 */

const FileInput = ({ data }) => {
  const {
    id,
    name,
    className = 'btn-slate',
    text = '파일 선택',
    extensionValue,
    fileSizeValue,
    placeholder,
    disabled,
    multiple,
    onChange = () => {},
  } = data;

  const [fileName, setFileName] = useState([]); // 파일 업로드시 파일명 노출
  const returnUrlArr = [];

  // 확장자 체크
  const onFileExtension = (e, f) => {
    if (extensionValue === 'excel') {
      // 엑셀파일
      if (!f.type.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
        e.target.value = '';
        alert('엑셀파일이 유효하지 않습니다.\n엑셀 파일(.xlsx)만 가능합니다.');
        return false;
      }
    } else if (extensionValue === 'image') {
      // 이미지 파일 전체
      if (!f.type.match('image/*')) {
        e.target.value = '';
        alert('이미지 파일만 가능합니다.');
        return false;
      }
    } else if (extensionValue === 'pdf') {
      // PDF 파일
      if (!f.type.match('.pdf')) {
        e.target.value = '';
        alert('PDF 파일만 가능합니다.');
        return false;
      }
    }
    return true;
  };

  // 파일 사이즈 체크
  const onFileSizeCheck = (e, f) => {
    if (!fileSizeValue) return true;

    const imgSize = f.size;
    const size = fileSizeValue[0];
    const unit = fileSizeValue[1];

    let limitSize = Math.ceil(size);

    if (unit === 'Byte') {
      limitSize = Math.ceil(size);
    } else if (unit === 'KB') {
      limitSize = Math.ceil(size * 1000);
    } else if (unit === 'MB') {
      limitSize = Math.ceil(size * 1000 * 1000);
    }

    if (imgSize > limitSize) {
      alert(`이미지는 장당 ${size}${unit}이내로 등록해주세요.`);
      return false;
    }
  };

  const getTempFileUrl = async (e, file, index) => {
    const response = await uploadTempFile(file);
    const { result, data } = response.data;

    if (result.code === 1) {
      const { name } = file;
      const { returnUrl } = data;

      // 다중 파일 체크
      if (multiple) {
        returnUrlArr.push(returnUrl);
        onChange(id, returnUrlArr);
      } else {
        onChange(id, returnUrl);
      }

      setFileName(name);
    } else {
      alert(result.message);
    }
  };

  const handleChange = e => {
    const { files } = e.target;
    const path = Array.prototype.slice.call(files);

    path.forEach((file, index) => {
      if (!onFileExtension(e, file)) return; // 확장자 체크
      if (!onFileSizeCheck(e, file)) return; // 파일 사이즈 체크

      const reader = new FileReader();

      reader.onload = e => getTempFileUrl(e, file, index);
      reader.readAsDataURL(file);
    });
  };

  // 동일한 파일을 선택할 때 onChange 메소드가 호출되지 않으므로 파일이 처리 될 때마다 파일 입력 요소를 빈 값으로 만들고 업로드를 진행
  const resetFileName = e => {
    e.target.value = '';
  };

  return (
    <div className="inp-group">
      <input type="text" title={fileName} value={fileName} placeholder={placeholder} readOnly />
      <label htmlFor={id} className={className}>
        <input
          type="file"
          id={id}
          name={name}
          className={styles.input}
          disabled={disabled}
          multiple={multiple}
          onChange={handleChange}
          onClick={resetFileName}
        />
        {text}
      </label>
    </div>
  );
};

export default FileInput;
