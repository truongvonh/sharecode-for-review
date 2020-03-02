import { FormGroup } from 'reactstrap';
import IonicIcons from 'components/IonicIcons';
import React from 'react';
import './style.scss';
import { func } from 'prop-types';
import handleSearch from 'components/AsyncSearchBox/handleSearch';
import SvgIcons from 'components/SvgIcons';
import i18n from 'locales/i18n';

const AsyncSearchBox = ({
                          ...props
                        }) => {

  const {
    outSideRef,

    keyword,
    isShowResult,
    searchLoading,
    listSuggestion,
    isSuggestion,
    searchData,

    onSeeAllResult,
    navigateDetailPage,
    searchAndSaveKeyword,
    checkSuggestionOrResult,
    onChangeKeyword
  } = handleSearch();

  const checkBorderBottom = React.useCallback((index, data) => index !== data.length - 1 ?
    { borderBottom: '1px solid #eee' } : {},
    []);

  const allSuggestion = (listSuggestion) =>
    <ul className="suggestion-wrapper bg-white overflow-hidden rounded shadow-lg pl-0">
      {listSuggestion.map((suggest, index) => (
        <li key={index}
            className="p-2 d-flex align-items-center cursor-pointer"
            style={checkBorderBottom(index, listSuggestion)}
            onClick={() => onChangeKeyword(suggest)}>
          <IonicIcons name="ion ion-md-time color-link mr-2 fz-18"/>
          <span className="color-link font-weight-bold">{suggest}</span>
          <IonicIcons name="ion-ios-share-alt color-main ml-auto fz-20" />
        </li>
      ))}
    </ul>;

  const allOptionsSearch = (optionData) => {
    const optionResult = optionData.map((option, oIndex) => (
      <li key={oIndex}
          className="p-2 d-flex align-items-center cursor-pointer">
        <div className="mr-2">
          {option.icon}
        </div>
        <span onClick={() => navigateDetailPage(option)}
              className="font-weight-bold fz-14 color-link">
          {option.label}
        </span>
      </li>
    ));
    return <ul className="pl-0 option-result-wrapper">
      {optionResult}
    </ul>;
  };

  const allSearchResult = (searchData) => {
    const result = searchData.map((group, gIndex) => (
      <li key={gIndex}
          className="p-2"
          style={{ borderBottom: '1px solid #eee' }}>
        <span className="text-primary font-weight-bold fz-14">
          {group.label}
        </span>
        { allOptionsSearch(group.options) }
      </li>
    ));
    return <ul className="search-result-wrapper pl-0 rounded bg-white overflow-hidden shadow-lg">
      {result}
      <li className="p-2 cursor-pointer"
          onClick={onSeeAllResult}>
        <span className="color-link font-weight-bold fz-14">{i18n.t('see_all_result')} </span>
      </li>
    </ul>;
  };

  const renderSearchResult = React.useCallback(() => {
    if (!keyword) return null;

    if (searchData.length && isShowResult) {
      return allSearchResult(searchData);
    }

    if (!searchLoading && !searchData.length){
      return <div className="no-data-wrapper bg-white rounded overflow-hidden shadow-lg d-flex justify-content-center align-items-center py-3">
        <SvgIcons noHover fileName="ic_no_data" />
        <span className="font-weight-bold d-inline-block ml-2">{i18n.t('no_data')}</span>
      </div>;
    }

  }, [searchData.length, keyword, searchLoading, isShowResult]);

  const renderSuggest = React.useCallback(() => {
    if (!isSuggestion) return null;

    if (listSuggestion.length) {
      return allSuggestion(listSuggestion);
    }
  }, [listSuggestion, isSuggestion]);

  const checkLoading = React.useMemo(() =>
      (searchLoading && keyword) ?
        <img src="/static/icons/spin_loading.gif" style={{ width: '30px', height: '30px' }} /> :
        <IonicIcons name="ion ion-ios-search color-main fz-24 search-icon"
                    onClick={(e) => searchAndSaveKeyword(e, 'search')}/>
    ,[searchLoading, keyword]);

  return (
    <div className="header-search-wrapper my-2" ref={outSideRef}>
      <FormGroup className="position-relative header-search-form bg-white border-0 rounded mb-0">
        <div className="header-wrapper-nav-search overflow-hidden rounded d-flex align-items-center">
          <input type="text"
                 placeholder="Tìm tất cả ..."
                 value={keyword}
                 onFocus={checkSuggestionOrResult}
                 // onFocus={() => setIsSuggestion(true)}
                 onChange={onChangeKeyword}
                 onKeyDown={(e) => searchAndSaveKeyword(e, 'keypress')}
                 className="d-block w-100 border-0 py-2 pr-4 pl-1 fz-14 color-font"/>
          <div className="ml-auto">
            { checkLoading }
          </div>
        </div>
        { renderSuggest() }
        { renderSearchResult() }
      </FormGroup>
    </div>
  );
};

AsyncSearchBox.propTypes = {
  onSearch: func
};

export default React.memo(AsyncSearchBox);
