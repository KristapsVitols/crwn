import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {selectSections} from '../../redux/directory/directory.selectors';
import './directory.styles.scss';

const Directory = ({sections}) => (
    <div className="directory-menu">
        {sections.map(({id, ...sectionProps}) => (
            <MenuItem key={id} {...sectionProps}/>
        ))}
    </div>
);

const mapStateToProps = createStructuredSelector({
    sections: selectSections,
});

export default connect(mapStateToProps)(Directory);