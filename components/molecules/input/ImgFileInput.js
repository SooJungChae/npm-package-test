import React, { useState, useEffect } from 'react';
import { API, HOST_UPLOAD_STORAGE_API } from 'library/API';
import cx from 'classnames';
import styles from './ImgFileInput.module.scss';
import { Debug } from '../../../library/Debug';

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
 * Preview Img File Input
 * @param {Object} {data}
 * @param {String} {data.id} *필수
 * @param {String} {data.name}
 * @param {String} {data.className}
 * @param {String} {data.defaultValue}
 * @param {Int} {data.width} 컴포넌트 이미지 영역 width
 * @param {Int} {data.height} 컴포넌트 이미지 영역 height
 * @param {Int} {data.fixedWidth} 고정 크기의 이미지 width
 * @param {Int} {data.fixedHeight} 고정 크기의 이미지 height
 * @param {Int} {data.maxSize} 이미지 최대 용량 (byte 기준)
 * @param {function} {data.onChange} *필수
 * @return {(id, returnUrl)}
 * @example
 */

const ImgFileInput = ({ data }) => {
  const {
    id,
    name,
    className,
    width,
    height,
    fixedWidth = 0,
    fixedHeight = 0,
    maxSize,
    defaultValue,
    extensionValue,
    onChange = () => {},
  } = data;
  const style = { width: `${width * 1 + 2}px`, height: `${height * 1 + 36}px` };

  const [fileUrl, setFileUrl] = useState(defaultValue);

  const getTempImageUrl = async (e, file) => {
    const response = await uploadTempFile(file);
    const { result, data } = response.data;

    if (result.code === 1) {
      setFileUrl(data.returnUrl);
    } else {
      alert(result.message);
    }
  };

  // 확장자 체크
  const onFileExtension = (e, f) => {
    if (extensionValue === 'jpeg') {
      // 이미지 파일 전체
      if (!f.type.match('image/jpeg')) {
        e.target.value = '';
        alert('이미지 파일은 (.jpg)만 업로드 가능합니다.');
        return false;
      }
    }
    return true;
  };

  // 1024000byte = 1024KB = 1MB
  const convertToMB = byte => {
    return byte / 1024 / 1000;
  };

  const handleChange = e => {
    const { files } = e.target;
    const path = Array.prototype.slice.call(files);
    const file = path[0];
    const { type } = file;

    if (!type.match('image.*')) {
      e.target.value = '';
      alert('이미지 파일만 가능합니다.');
      return false;
    }

    if (!onFileExtension(e, file)) return; // 확장자 체크

    const reader = new FileReader();

    reader.onload = e => {
      const tempImage = new Image();
      tempImage.src = e.target.result;

      tempImage.onload = () => {
        // 해상도 체크
        if (fixedWidth || fixedHeight) {
          if (fixedWidth !== tempImage.width || fixedHeight !== tempImage.height) {
            alert(`업로드 가능한 이미지 사이즈는 ${fixedWidth}px X ${fixedHeight}px 이하 입니다. `);
            return false;
          }
        }

        // 이미지 크기 체크
        if (maxSize) {
          if (!files[0]) {
            Debug.error(`파일이 선택되지 않았습니다.`);
            return false;
          }

          // files[0].size -> 바이트 단위
          if (files[0].size > maxSize) {
            alert(`업로드 가능한 이미즈의 사이즈는 ${maxSize}KB (${convertToMB(maxSize)} MB) 입니다.`);
            return false;
          }
        }

        // validation 통과
        getTempImageUrl(e, file);
      };
    };

    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setFileUrl('');
  };

  useEffect(() => {
    setFileUrl(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    onChange(id, fileUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUrl]);

  return (
    <div
      className={cx(styles.wrap, {
        [styles.uploaded]: fileUrl,
        [className]: className,
      })}
      style={style}
    >
      {fileUrl ? (
        <>
          <a href={fileUrl} className={styles.image} download>
            <img src={fileUrl} alt={name} />
          </a>
          <button type="button" className={`btn-default ${styles.button}`} onClick={handleRemove}>
            삭제
          </button>
        </>
      ) : (
        <label htmlFor={id} className={styles.label}>
          {/* onClick 을 추가해서 같은 파일을 선택했을 때 인식못하는 에러 처리 */}
          <input type="file" id={id} name={name} onChange={handleChange} onClick={e => (e.target.value = null)} />
          <i className="far fa-file-image" />
        </label>
      )}
    </div>
  );
};

export default ImgFileInput;
