import React from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loginUser, logoutUser } from '../modules/auth'

import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { fonts, typeScale, colors } from '../style'

const styles = theme => ({
  accessCode: {
    padding: '.25rem',
    display: 'flex',
    alignItems: 'center',
    margin: '0.5rem 2rem 2rem 2rem',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '24rem',
      margin: '0 auto 2rem auto',
    },
  },
  accessCodeInput: {
    display: 'block',
    marginLeft: '.5rem',
    flex: '1 1 auto',
    ...typeScale(0),
    ...fonts.raleway.medium,
  },
  loggedInText: {
    padding: '6px 0 7px',
  },
  validate: {
    boxShadow: theme.shadows[0],
    marginRight: '.125rem',
  },
  loggedIn: {
    background: colors.dark,
  },
  loggedInInput: {
    color: 'white',
  },
})

class AccessCodeInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      waiting: false,
      encounteredError: false,
    }
    this.handleInputChange = this._handleInputChange.bind(this)
    this.handleSubmit = this._handleSubmit.bind(this)
    this.handleKeyPress = this._handleKeyPress.bind(this)
  }

  _handleInputChange(event) {
    this.setState({ inputValue: event.target.value })
  }

  _handleKeyPress({ key }) {
    if (key === 'Enter') this.handleSubmit()
  }

  _handleSubmit() {
    const { loginUser, logoutUser, user } = this.props
    const { inputValue } = this.state
    const loggedIn = !!user.accessCode

    this.setState({ waiting: true })

    if (loggedIn) {
      logoutUser().then(() => {
        console.log('[AccessCodeInput]', 'logged out')
        this.setState({
          waiting: false,
          encounteredError: false,
          inputValue: '',
        })
      })
    } else {
      loginUser(inputValue)
        .then(user => {
          console.log('[AccessCodeInput]', 'auth success')
          this.setState({
            waiting: false,
            encounteredError: false,
            inputValue: '',
          })
        })
        .catch(err => {
          console.log('[AccessCodeInput]', 'auth failure')
          this.setState({
            waiting: false,
            encounteredError: true,
            inputValue: '',
          })
        })
    }
  }

  render() {
    const { classes, user } = this.props
    const { waiting, inputValue, encounteredError } = this.state

    const loggedIn = !!user.accessCode

    return (
      <Paper
        className={cx(classes.accessCode, loggedIn && classes.loggedIn)}
        elevation={1}
      >
        {loggedIn ? (
          <Typography
            className={cx(
              classes.accessCodeInput,
              classes.loggedInInput,
              classes.loggedInText
            )}
          >{`Hello, ${user.displayName}`}</Typography>
        ) : (
          <InputBase
            className={classes.accessCodeInput}
            placeholder={encounteredError ? 'Wanna try again?' : 'Access code'}
            onChange={loggedIn ? () => {} : this.handleInputChange}
            onKeyPress={waiting || loggedIn ? () => {} : this.handleKeyPress}
            value={inputValue}
            disabled={waiting || loggedIn}
            spellCheck={false}
          />
        )}
        <Button
          color="primary"
          className={classes.validate}
          onClick={waiting ? () => {} : this.handleSubmit}
          disabled={waiting}
        >
          <Typography variant="button" color="primary">
            {loggedIn ? 'Clear' : 'Validate'}
          </Typography>
        </Button>
      </Paper>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginUser, logoutUser }, dispatch)

const mapStateToProps = state => ({
  user: state.auth.currentUser,
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(AccessCodeInput)
