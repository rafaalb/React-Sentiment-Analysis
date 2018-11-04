import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Public';
import SearchIcon from '@material-ui/icons/Search';

import * as QuotesActions from './../actions/quotes';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class SearchAppBar extends Component {
  componentDidMount() {
    this.props.getRandomQuotes()
  }
  _setKey = (val) => {
    const key = val.target.value.replace(/ /g,'');
    this.props.setKey(key);
  }
  _onEnterPress = (ev) => {
    if (ev.key === 'Enter') {
      this.props.searchQuote()
      ev.preventDefault();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Sentiment Analysis
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                #
              </div>
              <InputBase
                placeholder="Search Key…"
                onChange={this._setKey}
                value={this.props.quotes.key}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onKeyPress={this._onEnterPress}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setKey: (key) => {
      dispatch(QuotesActions.setKey(key))
    },
    getRandomQuotes: () => {
      dispatch(QuotesActions.getRandomQuotes())
    },
    searchQuote: () => {
      dispatch(QuotesActions.searchQuote())
    }
  };
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const Search = withStyles(styles)(SearchAppBar);
export default connect(state => state, mapDispatchToProps)(Search);
