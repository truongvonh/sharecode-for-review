import React from 'react';
import { Container, Row, Col, FormGroup, InputGroup, Input, InputGroupAddon, InputGroupText } from 'reactstrap';

const SearchPlace = () => {
  return (
    <Container>
      <Row>
        <Col>
          <FormGroup>
            <InputGroup className="my-4">
              <Input placeholder="Tìm kiếm địa điểm" type="text" />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="ni ni-zoom-split-in" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPlace;
