import React, { useState, useMemo, useEffect, memo } from 'react';
import { Pagination, PageItem } from 'react-bootstrap';
import { number, func, string, array } from 'prop-types';

const PAGE_LIMIT = [5, 10, 15, 20];

const Paginations = ({
  totalItems,
  pageSize,
  onSelect,
  maxPaginationNumbers,
  activePageProps,
  size,
  rowsPerPageOptions,
  ...restSelect
}) => {
  const getNumberOfPages = () => {
    const auxPages = totalItems / pageSize;
    let pages = parseInt(auxPages, 10);
    pages += pages !== auxPages ? 1 : 0;
    return pages;
  };

  // const getPageLimitOption = () => {
  //   return rowsPerPageOptions.map(value => ({ label: value.toString(), value }));
  // };

  const memoPages = useMemo(() => getNumberOfPages(), [totalItems, pageSize]);

  const [state, setState] = useState({
    activePage: activePageProps,
    firstPaginationNumber: 1,
    pages: memoPages
  });
  const { activePage, firstPaginationNumber, pages } = state;

  useEffect(() => {
    setState({
      ...state,
      pages: memoPages || 1
    });
  }, [totalItems, pageSize]);

  const getLastPaginationNumber = () => {
    const minNumberPages = Math.min(pages, maxPaginationNumbers);
    return firstPaginationNumber + minNumberPages - 1;
  };

  const handlePaginationNumber = activePage => {
    const distance = Math.floor(maxPaginationNumbers / 2);
    const newFPNumber = activePage - distance;
    const newLPNumber = activePage + distance;
    if (newFPNumber <= distance) {
      if (firstPaginationNumber !== 1) {
        setState({
          ...state,
          firstPaginationNumber: 1
        });
      }
    } else if (newLPNumber <= pages) {
      setState({
        ...state,
        firstPaginationNumber: newFPNumber
      });
    } else if (newLPNumber >= pages) {
      setState({
        ...state,
        firstPaginationNumber: pages - maxPaginationNumbers + 1
      });
    }
  };

  const handleClick = event => {
    const newActivePage = parseInt(
      event.currentTarget
        .getAttribute('id')
        .split('pagebutton')
        .pop(),
      10
    );
    setState({
      ...state,
      activePage: newActivePage
    });
    handlePaginationNumber(newActivePage);
    onSelect(newActivePage);
  };

  const firstOrLastPagItem = (name, component, page) => {
    const event = {
      currentTarget: {
        getAttribute: () => `pagebutton${page}`
      }
    };
    return (
      <PageItem key={name} disabled={activePage === page} onClick={() => handleClick(event)}>
        {name}
      </PageItem>
    );
  };

  const handleSelectNextOrPrevious = direction => {
    if ((direction === 'r' && activePage === pages) || (direction === 'l' && activePage === 1)) return;

    const newActivePage = direction === 'r' ? activePage + 1 : activePage - 1;

    setState({
      ...state,
      activePage: newActivePage
    });

    handlePaginationNumber(newActivePage);
    onSelect(newActivePage);
  };

  const nextOrPreviousPagItem = (name, page, direction) => {
    return (
      <PageItem key={name} disabled={activePage === page} onClick={e => handleSelectNextOrPrevious(direction)}>
        {name}
      </PageItem>
    );
  };

  const numberedPagItem = i => {
    return (
      <PageItem key={i} id={`pagebutton${i}`} active={activePage === i} onClick={handleClick}>
        {/* <PaginationLink style={{ minWidth: '43.5px' }}>{i}</PaginationLink> */}
        {i}
      </PageItem>
    );
  };

  const PageItems = () => {
    const items = [];
    const lastPaginationNumber = getLastPaginationNumber();
    items.push(firstOrLastPagItem('<<', 1));
    items.push(nextOrPreviousPagItem('<', 1, 'l'));
    for (let i = firstPaginationNumber; i <= lastPaginationNumber; i++) {
      items.push(numberedPagItem(i));
    }
    items.push(nextOrPreviousPagItem('>', pages, 'r'));
    items.push(firstOrLastPagItem('>>', pages));
    return items;
  };

  return (
    // <NamespacesConsumer ns="translations">
    <div className="pagination-group-main mt-4">
      <div className="select-limit-item d-flex align-items-center">
      </div>
      <Pagination className="pagination-group-item" size={size}>
        {PageItems()}
      </Pagination>
    </div>
  );
};

Paginations.defaultProps = {
  maxPaginationNumbers: 5,
  activePageProps: 1,
  size: 'md',
  rowsPerPageOptions: PAGE_LIMIT
};

Paginations.propTypes = {
  totalItems: number,
  pageSize: number,
  onSelect: func,
  maxPaginationNumbers: number,
  activePageProps: number,
  size: string,
  rowsPerPageOptions: array
};

export default memo(Paginations);
