import React from 'react';
import TranslationsMenu from './Translations.js';
import { ReactComponent as Logo } from '../img/Logo_CORONATRACKER_Logo.svg';
import { ReactComponent as TextLogo } from '../img/Logo_CORONATRACKER_Text_Logo.svg';
import {Button, Typography, Grid} from '@material-ui/core';
import { useConnect } from '@blockstack/connect';
import { connect } from 'react-redux';
import setLoginLoading from '../redux/actions/actions';
import { useTranslation } from 'react-i18next';
import Loding from './Loding'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  Login: {
    textAlign: 'center',
    height: '100vh',
    backgroundImage: 'linear-gradient(#d7e1fa, #bbcef9)',
  },
  Button: {
    backgroundColor: '#f64141',
    marginTop: '5vh'
  },
  logo: {
    width: '40vw',
    height: '40vh',
    [theme.breakpoints.down('xs')]: {
      height: '20vh',
    },
  },
  textLogo: {
    width: '70vw',
    height: '30vh',

    [theme.breakpoints.down('xs')]: {
      height: '20vh'
    },
  },
}));
const Login = ({ loginLoading, setLoading }) => {
  const classes =useStyles()
  const { doOpenAuth } = useConnect();
  const { t, i18n } = useTranslation();
  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  const onClick = () => {
    setLoading(true);
    doOpenAuth();
  };

  return (
    <div className={classes.Login}>
      {loginLoading['isLoading'] ? (
        <Loding />
      ) : (
        <div>
            <Grid item xs={12}>
              <Logo className={classes.logo} /> </Grid>
          <TextLogo className={classes.textLogo} />
          <Typography variant="h6">{t('login.text')} </Typography>
          <Button variant="login" className={classes.Button} onClick={onClick}>
            {t('login.buttonText')}
          </Button>
          <TranslationsMenu />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ loginLoading }) => ({
  loginLoading,
});

const mapDispatchToProps = dispatch => ({
  setLoading(isLoading) {
    // return () => {
    dispatch(setLoginLoading['setLoginLoading'](isLoading));
    // }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
