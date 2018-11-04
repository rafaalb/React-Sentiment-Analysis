import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import SadFace from '@material-ui/icons/Face';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class ChipsArray extends React.Component {
  _onClickChip = (quote) => {
    this.props.onSelectChip(quote)
  }
  _renderLabel = (text) => {
    const size = Math.floor((Math.random() * 30) + 15)
    if (text.length > 20) {
      return `${text.slice(0, size)}...`;
    }
    return text;
  }
  _renderQuotes = () => {
    const { classes } = this.props;
    if (this.props.quotes.fetching_quotes) {
      return <LinearProgress />
    }
    return this.props.quotes.data.map((data, i) => {
      if (data.quoteText && data.quoteText.length > 0) {
        const label = this._renderLabel(data.quoteText);
        const { score } = data.sentiment;
        const icon = score <= 0 ? <SadFace /> : <TagFacesIcon />;
        return (
          <Chip
            key={`chip_${i}`}
            icon={icon}
            label={label}
            className={classes.chip}
            clickable
            onClick={() => this._onClickChip(data)}
            color='primary'
          />
        );
      }
      return null
    });
  }

  render() {
    const { classes } = this.props;
    if (this.props.quotes.fetching_quotes) {
      return <LinearProgress />
    }
    return (
      <Paper className={classes.root}>
        {this._renderQuotes()}
      </Paper>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipsArray);
