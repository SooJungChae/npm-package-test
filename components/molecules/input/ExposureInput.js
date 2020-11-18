import React, { useEffect, useState } from 'react';
import { Input } from 'components/molecules';
import { BrandModal, RegionModal, SelectScrollListForm } from 'components/organisms';
import styles from './ExposureInput.module.scss';
import { API, HOST_API } from '../../../library/API';
import { objectArrayToCheckedOption } from '../../../library/Utils';

/**
 * ExposureInput input
 * @param {Object} {data}
 * @param {String} {data.id} *id or name 필수
 * @param {String} {data.name} *id or name 필수
 * @param {String} {data.className}
 * @param {Int} {data.value} *필수 (options에서 선택된 value 값)
 * @param {Array} {data.options}
 * @param {Object} {data.options[0]} - { label: '전체', value: 1 }
 * @param {String} {data.options[1].for} - regions (노출 지역 설정 모달을 연결)
 * @param {String} {data.options[2].for} - brands (노출 프랜차이즈 설정 모달을 연결)
 * @param {String} {data.options[3].for} - categories (노출 카테고리 설정 selectScrollList를 연결)
 * @param {String} {data.options[4].for} - stores (노출 매장번호 textarea를 연결)
 * @param {Array} {data.modalOptions}
 * @param {String} {data.modalOptions[for].id} - 'ID' (RegionPolygon.ID key를 변경하는 옵션, 노출 설정 모달 id와 동일 / stores에는 id가 불필요)
 * @param {String} {data.modalOptions[for].name} - [for] (onChange에서 두번째 인자로 callback, 노출 설정 모달 name과 동일)
 * @param {Array} {data.modalOptions[for].value} - [{ ID: ID, name: name }] (onChange에서 세번째 인자로 callback, 노출 설정 모달 value와 동일)
 * @param {function} {data.onChange} *필수
 * @return {(e, name, value)} e, name, value
 * @example
 * <Input
 *  type="exposure"
 *  id="displayType"
 *  name="displayType"
 *  value={1}
 *  options={[
 *    { label: '전체', value: 1 },
 *    { label: '지역 기준', value: 2, for: 'regions' },
 *    { label: '프랜차이즈 기준', value: 3, for: 'brands' },
 *    { label: '카테고리 기준', value: 4, for: 'categories' },
 *    { label: '매장번호 입력', value: 5, for: 'stores' },
 * }]}
 *  modalOptions={{
 *    regions: {
 *      id: [regionPolygonID],
 *      name: 'regions',
 *      value: {Array},
 *    },
 *    brands: {
 *      id: [brandID],
 *      name: 'brands',
 *      value: {Array},
 *    },
 *    categories: {
 *      id: [categoryID],
 *      name: 'categories',
 *      value: {Array},
 *    },
 *    stores: {
 *      name: 'stores',
 *      value: {Array},
 *    }
 *  }}
 *  onChange={function}
 * />
 */

const callCategoryList = params => {
  const method = 'GET';
  const url = `${HOST_API}/admin/categories`;
  return API({ method, url, params });
}; // 카테고리 목록

const ExposureInput = ({ data }) => {
  const {
    id,
    name,
    className,
    value = 1,
    options = [
      { label: '전체', value: 1 },
      { label: '지역 기준', value: 2, for: 'regions' },
      { label: '프랜차이즈 기준', value: 3, for: 'brands' },
      { label: '카테고리 기준', value: 4, for: 'categories' },
      { label: '매장직접 입력', value: 5, for: 'stores' },
    ],
    onChange = () => {},
  } = data;
  const modalOptions = {
    ...data.modalOptions,
    regions: {
      id: 'ID',
      name: 'regions',
      value: [],
      ...data.modalOptions.regions,
    },
    brands: {
      id: 'ID',
      name: 'brands',
      value: [],
      ...data.modalOptions.brands,
    },
    categories: {
      id: 'ID',
      name: 'categories',
      value: [],
      ...data.modalOptions.categories,
    },
    stores: {
      name: 'stores',
      value: [],
      ...data.modalOptions.stores,
    },
  };
  const selected = options.filter(data => data.value * 1 === value * 1)[0];
  const selectedModal = modalOptions[selected.for];
  const title = `노출 ${selected.label.split(' ')[0]} 설정`;
  const list = selectedModal ? selectedModal.value : false;
  const [show, showModal] = useState(false);
  const [cateList, setCateList] = useState([]);

  // 매장번호 입력 시 onchange event
  const handleChangeStores = e => {
    const { name, value } = e.target;
    // 숫자, 콤마만 가능
    const clean = value
      .replace(/[^\d,]/gm, '')
      .replace(/^,+/m, '')
      .replace(/,{2,}/g, ',')
      .split(',');
    onChange(e, name, value !== clean ? clean : value);
  };

  // 카테고리 리스트 가져오기
  const getCategoryList = async () => {
    const params = {
      datasetID: 1,
      type: 3,
      status: 1,
    };
    const response = await callCategoryList(params);
    if (response) {
      const { result, data } = response.data;
      if (result.code === 1) {
        const categoryOptions = objectArrayToCheckedOption(data, 'name', 'ID', false);
        setCateList(categoryOptions);
      } else {
        window.alert('담당 개발자에게 문의주세요.');
      }
    }
  };

  // 카테고리 변경
  const handleChangeCategories = (e, idx, checked) => {
    const newList = [...cateList];
    newList[idx] = {
      ...cateList[idx],
      checked: !checked,
    };
    setCateList(newList);
    onChange(null, 'categories', newList);
  };
  // 카테고리 전체 선택
  const onSelectAllCategories = () => {
    const newSelectList = cateList.map(item => ({ ...item, checked: true }));
    setCateList(newSelectList);
    onChange(null, 'categories', newSelectList);
  };
  // 카테고리 전체 해제
  const onUnSelectAllCategories = () => {
    const newSelectList = cateList.map(item => ({ ...item, checked: false }));
    setCateList(newSelectList);
    onChange(null, 'categories', newSelectList);
  };

  // 노출기준 설정 시 카테고리 기준이 있을 때만 호출
  useEffect(() => {
    if (selected.for === 'categories') getCategoryList();
  }, []);

  // 저장된 categories가 있을 때 modalOptions.categories.value에 셋팅
  useEffect(() => {
    const categoryOptions = objectArrayToCheckedOption(modalOptions.categories.value, 'name', 'categoryID', true);
    cateList.forEach(v => {
      categoryOptions.forEach(c => {
        if (v.value * 1 === c.value * 1) v.checked = true;
      });
    });
    onChange(null, 'categories', cateList);
  }, [cateList]);

  return (
    <div className="row">
      <div className="col-12">
        <Input
          type="radio"
          id={id}
          name={name}
          className={className}
          value={value}
          options={options}
          onChange={onChange}
        />
      </div>
      {(selected.for === 'regions' || selected.for === 'brands') && (
        <div className="col-12">
          {list.length > 0 && (
            <ul className={`box-comm ${styles.box}`}>
              {list.map(data => {
                const { id } = selectedModal;
                const { name } = data;
                return <li key={data[id]}>{name}</li>;
              })}
            </ul>
          )}
          <button type="button" className={`btn-default ${styles.button}`} onClick={() => showModal(true)}>
            {title}
          </button>
          {selected.for === 'regions' && (
            <RegionModal
              id={selectedModal.id}
              name={selectedModal.name}
              value={selectedModal.value}
              onChange={onChange}
              show={show}
              showModal={showModal}
            />
          )}
          {selected.for === 'brands' && (
            <BrandModal
              id={selectedModal.id}
              name={selectedModal.name}
              value={selectedModal.value}
              onChange={onChange}
              show={show}
              showModal={showModal}
            />
          )}
        </div>
      )}
      {selected.for === 'categories' && (
        <SelectScrollListForm
          title="카테고리"
          list={cateList}
          onSelectChange={handleChangeCategories}
          onSelectAll={() => onSelectAllCategories()}
          onUnSelectAll={() => onUnSelectAllCategories()}
        />
      )}
      {selected.for === 'stores' && (
        <textarea
          rows="10"
          placeholder={`매장번호를 쉼표로 구분하여 등록하세요.\n예) 1234,4565,7898`}
          name={selectedModal.name}
          value={selectedModal.value}
          onChange={e => handleChangeStores(e)}
        />
      )}
    </div>
  );
};

export default ExposureInput;
