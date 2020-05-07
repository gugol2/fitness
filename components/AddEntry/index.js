import { AddEntry } from './AddEntry';
import { mapStateToProps } from './mapToProps';
import { connect } from 'react-redux';

export const ConnectedAddEntry = connect(mapStateToProps)(AddEntry);
