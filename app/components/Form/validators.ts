export function usernameValidator (username: string) {
  if (!username) {
    return 'Username is required'
  } else if (username.length < 5) {
    return 'Username must have a minimum 5 characters'
  }

  return ''
}

export function emailValidator (email: string) {
  if (!email) {
    return 'Email is required'
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return 'Incorrect email format'
  }

  return ''
}

export function passwordValidator (password: string) {
  if (!password) {
    return 'Password is required'
  } else if (password.length < 8) {
    return 'Password must have a minimum 8 characters'
  }

  return ''
}

export function confirmPasswordValidator (confirmPassword: string, form: any) {
  if (!confirmPassword) {
    return 'Confirm password is required'
  } else if (confirmPassword.length < 8) {
    return 'Confirm password must have a minimum 8 characters'
  } else if (confirmPassword !== form.password) {
    return 'Passwords do not match'
  }

  return ''
}

export function channelNameValidator (channelName: string) {
  if (!channelName) {
    return 'Channel name is required'
  } else if (channelName.length < 5) {
    return 'Channel name must have a minimum 5 characters'
  }

  return ''
}