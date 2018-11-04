import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { fade } from '@material-ui/core/styles/colorManipulator';
import HappyFace from '@material-ui/icons/TagFaces';
import SadFace from '@material-ui/icons/Face';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,
  },
  layout: {
    width: 'auto',
    marginTop: 50,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  cardHeaderGreen: {
    backgroundColor: '#01579b',
    color: theme.palette.common.white
  },
  cardHeaderRed: {
    backgroundColor: '#f44336',
    color: theme.palette.common.white
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  cardCount: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
});


class Sentiment extends Component {
  _renderWords = () => {
    const { classes } = this.props
    const { score } = this.props.quotes.selected.sentiment;
    return (
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardHeader
            title={'Word Count'}
            titleTypographyProps={{ align: 'center' }}
            subheaderTypographyProps={{ align: 'center' }}
            className={classes.cardHeader}
          />
          <CardContent>
            <div className={classes.cardCount}>
              <Typography component="h2" variant="h3" color="textPrimary">
                {this.props.quotes.selected.quoteText.split(' ').length}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
    )
  }
  _renderEmoji = () => {
    const { score } = this.props.quotes.selected.sentiment;
    if (score > 0) {
      return (
        <HappyFace fontSize={'large'} color={'primary'} />
      )
    }
    return (
      <SadFace fontSize={'large'} color={'secondary'} />
    )
  }
  _renderSentiment = () => {
    const { classes } = this.props
    const { score } = this.props.quotes.selected.sentiment;
    return (
      <Grid item xs={12} sm={12} md={4}>
        <Card>
          <CardHeader
            title={'Sentiment'}
            titleTypographyProps={{ align: 'center' }}
            subheaderTypographyProps={{ align: 'center' }}
            className={score < 0 ? classes.cardHeaderRed : (score === 0 ? classes.cardHeader : classes.cardHeaderGreen)}
            classes={{
              title: score !== 0 ? 'white-text' : ''
            }}
          />
          <CardContent>
            <div className={classes.cardCount}>
              {this._renderEmoji()}
            </div>
            <Typography variant="subtitle1" align="center">
              Comparative: {this.props.quotes.selected.sentiment.comparative.toFixed(3)}
            </Typography>
            <Typography variant="subtitle1" align="center">
              Score: {score}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  }
  _renderAuthor = () => {
    const { classes } = this.props
    const author = this.props.quotes.selected.quoteAuthor
    return (
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardHeader
            title={'Author'}
            titleTypographyProps={{ align: 'center' }}
            subheaderTypographyProps={{ align: 'center' }}
            className={classes.cardHeader}
          />
          <CardContent>
            <div className={classes.cardCount}>
              <Typography component="h4" variant="h6" color="textPrimary">
                {author && author.length > 0 ? author : 'Unknown'}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
    )
  }
  render() {
    const { classes, quotes } = this.props;
    if (!this.props.quotes.selected) {
      return null;
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
        <Typography variant="h5" color="textPrimary">
          Quote
        </Typography>
        <div style={{ marginBottom: 30 }}>
          <Typography variant="subtitle1" color="textSecondary">
            {this.props.quotes.selected.quoteText}
          </Typography>
        </div>
        <Grid container spacing={40} alignItems="flex-end">
          {this._renderWords()}
          {this._renderSentiment()}
          {this._renderAuthor()}
        </Grid>
        </main>
      </React.Fragment>
    );
  }
}

Sentiment.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    quotes: state.quotes
  }
}


const sentiment = withStyles(styles)(Sentiment);
export default connect(mapStateToProps)(sentiment)
