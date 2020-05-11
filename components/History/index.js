import { mapStateToProps } from './mapToProps';
import { History } from './History';
import { connect } from 'react-redux';

export const ConnectedHistory = connect(mapStateToProps)(History);
