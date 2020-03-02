import React from 'react';
import { checkOptionsByType, localStorageGet, localStorageSet } from 'utils/helper';
import { useDebouncedCallback } from 'use-debounce';
import { SEARCH_ENDPOINT } from 'constants/endpoints';
import i18n from 'locales/i18n';
import { Router } from 'routes/routesConfig';
import useOutSideClick from 'hooks/useOutSideClick';
import { useActions } from 'hooks/useActions';
import { onSearchMain } from 'redux/common/actions';
import { NAVIGATE_URL } from 'constants/url';

const KEY_SUGGESTION = 'KEY_SUGGESTION';
const MAX_LENGTH_SUGGEST = 10;

const handleSearch = () => {

  const [keyword, setKeyWord] = React.useState('');
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [isShowResult, setShowResult] = React.useState(false);
  const [searchData, setSearchData] = React.useState([]);
  const [isSuggestion, setIsSuggestion] = React.useState(false);
  const [listSuggestion, setSuggestion] = React.useState(JSON.parse((localStorageGet(KEY_SUGGESTION)) || '[]'));
  const outSideRef = React.useRef(null);
  const onSearchMainAction = useActions(onSearchMain, null);

  useOutSideClick(outSideRef, () => {
    if (isSuggestion) setIsSuggestion(false);
  });

  const onSeeAllResult = React.useCallback(() => {
    onSearchMainAction(keyword);
    Router.pushRoute(
      NAVIGATE_URL.SEARCH_RESULT.URL(keyword),
      NAVIGATE_URL.SEARCH_RESULT.AS
    );
    setShowResult(false);
  }, [searchData, keyword]);

  const [onSearchDebounce] = useDebouncedCallback(async keyword => {

    try {
      const searchResult = await SEARCH_ENDPOINT.LIST_SEARCH({ key_search: keyword });
      const result = [];
      Object.keys(searchResult).forEach(item => {
        if (searchResult[item].length)
          result.push({
            label: i18n.t(`search_label.${item}`),
            options: checkOptionsByType(item, searchResult[item] )
          });
      });
      setSearchData(result);
    } catch (e) {
      console.log('e', e);
    } finally {
      setShowResult(true);
      setSearchLoading(false);
    }

  }, 300);

  const checkSuggestionOrResult = React.useCallback(() => {
    if (keyword) setShowResult(true);
    else setIsSuggestion(true);
  }, [searchData, keyword]);

  const onChangeKeyword = React.useCallback((e) =>
    {
      const keyword = !e.target ? e : e.target.value;

      setKeyWord(keyword);
      setSearchLoading(true);
      onSearchDebounce(keyword);
    },
    [keyword]);

  React.useEffect(() => {
    if (keyword && isSuggestion) setIsSuggestion(false);
  }, [keyword]);

  const checkExistKeyword = React.useCallback(() => {
    if (!listSuggestion.includes(keyword)) {
      if (listSuggestion.length === MAX_LENGTH_SUGGEST) listSuggestion.pop();
      const result = keyword ? [ keyword, ...listSuggestion ] : listSuggestion;
      setSuggestion(result);
      localStorageSet(KEY_SUGGESTION, JSON.stringify(result));
    }
  }, [listSuggestion, keyword]);

  const searchAndSaveKeyword = React.useCallback((e, type = false) => {
    if (type === 'keypress' && e.key === 'Enter') e.preventDefault();

    if (
      (type === 'keypress' &&
      e.key === 'Enter') ||
      (type === 'search')
    ) {
      checkExistKeyword();
      onSeeAllResult();
    }
  }, [keyword]);

  const navigateDetailPage = React.useCallback((detailItem) => {
    setKeyWord(detailItem.label);
    checkExistKeyword();
    Router.pushRoute(
      detailItem.href,
      detailItem.as
    );
    setShowResult(false);
  }, [searchData, keyword]);

  return {
    outSideRef,

    keyword,
    searchLoading,
    listSuggestion,
    isSuggestion,
    isShowResult,
    searchData,

    checkSuggestionOrResult,
    onSeeAllResult,
    navigateDetailPage,
    searchAndSaveKeyword,
    onSearchDebounce,
    setIsSuggestion,
    onChangeKeyword
  };
};

export default handleSearch;
