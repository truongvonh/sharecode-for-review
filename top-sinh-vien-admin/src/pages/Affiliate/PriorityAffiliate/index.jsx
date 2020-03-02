import React, { useState, useEffect } from 'react';
import { Col, Button, Badge, Card, Row } from 'react-bootstrap';
import useModal from 'hooks/useModal';
import { useActions } from 'hooks/useActions';
import { shallowEqual, useSelector } from 'react-redux';
import { array, number } from 'prop-types';
import SelectSearchBox from '../../../components/SelectSearchBox';
import ButtonWithToolTip from 'components/ButtonWithToolTip';
import UcFirst from '../../../App/components/UcFirst';
import { priorityAffiliate, getPriorityAffiliate } from '../../../store/affiliate/actions';

const PriorityAffiliate = ({ allAffiliates }) => {
  const [affiliate, setAffiliate] = useState([]);
  const [priorityAffiliateAction, getPriorityAffiliateAction] = useActions(
    [priorityAffiliate, getPriorityAffiliate],
    null
  );
  const affiliatePriority = useSelector(store => store.affiliate.affiliatePriority, shallowEqual);

  const allAffiliatesOption = allAffiliates.map(element => {
    return {
      ...element,
      label: element.name,
      value: element._id
    };
  });

  useEffect(() => {
    getPriorityAffiliateAction();
  }, []);

  const renderSortAffiliate = () => {
    const result =
      !!affiliatePriority && affiliatePriority.length !== 0
        ? affiliatePriority.map((element, index) => {
            return (
              <Col sm={6} xl={3} md={3} key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title>{element.name}</Card.Title>
                    <a href={element.link} className="text-primary">
                      <Card.Text>{element.link}</Card.Text>
                    </a>
                    <Card.Text variant="primary">Priority: {element.priority}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        : null;
    return result;
  };

  const onChangeAffilicateOption = affiliate => {
    setAffiliate(affiliate);
  };

  const sortAffiliate = () => {
    try {
      const affiliatePost = affiliate.map(element => element._id);
      priorityAffiliateAction({ affiliate: affiliatePost });
      setAffiliate([]);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <Row>
        <Col sm={12} xl={6} md={6}>
          <SelectSearchBox
            isMulti={true}
            options={allAffiliatesOption}
            value={affiliate}
            onChange={onChangeAffilicateOption}
            keyLabel="Affiliate"
            placeholder="Affiliate"
          />
          <Button className="border-0 theme-bg1 btn-theme mt-2" onClick={sortAffiliate}>
            <UcFirst text="Sắp xếp liên kết" />
          </Button>
        </Col>
        <Col sm={12} xl={6} md={6}></Col>
      </Row>
      <h5 className="mt-3"> Danh sách thứ tự ưu tiên Affiliate</h5>
      <Row>{renderSortAffiliate()}</Row>
    </>
  );
};

PriorityAffiliate.propTypes = {
  allAffiliate: array
};

export default React.memo(PriorityAffiliate);
