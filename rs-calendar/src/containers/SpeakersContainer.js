import { connect } from 'react-redux';
import Speakers from '../components/Speakers';

const mapStateToProps = (state) => ({
    speakers: state.speakersList.speakers,
});

const mapDispatchToProps = () => ({});

const SpeakersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Speakers);

export default SpeakersContainer;
