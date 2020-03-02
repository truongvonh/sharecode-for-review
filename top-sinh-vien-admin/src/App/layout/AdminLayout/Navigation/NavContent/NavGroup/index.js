import React from 'react';
import Aux from '../../../../../../hoc/_Aux';
import NavCollapse from './../NavCollapse';
import NavItem from './../NavItem';
import { connect } from 'react-redux';
import { ALL_PERMISSIONS } from 'constant';

const navGroup = (props) => {
    
    const { user } = props;
    const { children } = props.group;
    
    let navItems = '';
    if (children) {
        let groups = children;
        if (user) {
            const { permissions: userPermissions } = user.role;
            const checkValidRole = userPermissions.includes(ALL_PERMISSIONS.MANAGE_ALL);
            if (!checkValidRole)
                groups = children.filter(item => (userPermissions.includes(item.authorization) || !item.authorization));
        }
        navItems = Object.keys(groups).map(item => {
            item = groups[item];
            switch (item.type) {
                case 'collapse':
                    return <NavCollapse key={item.id} collapse={item} type="main" />;
                case 'item':
                    return <NavItem layout={props.layout} key={item.id} item={item} />;
                default:
                    return false;
            }
        });
    }

    return (
      <Aux>
        <li key={props.group.id} className="nav-item pcoded-menu-caption"><label>{props.group.title}</label></li>
        {navItems}
      </Aux>
    );
};

const mapStateToProp = (store) => {
    return {
        user: store.auth.user
    };
};

export default connect(mapStateToProp, null)(navGroup);