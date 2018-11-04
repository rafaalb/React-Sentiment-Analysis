import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ChipArray from './ChipArray';
import Refresh from '@material-ui/icons/Refresh';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { selectQuote, refreshQuotes } from './../actions/quotes';


const styles = theme => ({
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  button: {
    margin: '0 auto',
    display: 'flex',
    marginTop: 15,
  }
});

class SuggestedQuotes extends Component {
  _refreshQuotes = () => {
    this.props.refreshQuotes();
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Suggested Quotes
        </Typography>
        <ChipArray
          quotes={this.props.quotes}
          onSelectChip={this.props.onSelectQuote}
        />
        {this.props.quotes.data.length > 0 && !this.props.quotes.fetching_quotes &&
          <Button
            variant="fab"
            color="default"
            aria-label="Refresh"
            className={classes.button}
            onClick={this._refreshQuotes}
          >
            <Refresh />
          </Button>
        }
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSelectQuote: (quote) => {
      dispatch(selectQuote(quote))
    },
    refreshQuotes: () => {
      dispatch(refreshQuotes())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    quotes: state.quotes
  }
}

const Suggested = withStyles(styles)(SuggestedQuotes)

export default connect(mapStateToProps, mapDispatchToProps)(Suggested)
