const setUserData = (userObj) => ({type: 'SET_USER_DATA', payload: userObj})

export const authorizeToken = (token) => {
  return (dispatch) => {
    const token = localStorage.getItem("token")
    return fetch(('http://localhost:3000/api/authorize_token'), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`,
      },
    }).then(res => res.json())
      .then(userObj => {
        if (userObj.errors == null) {
          dispatch(setUserData(userObj))
        } else {
          localStorage.removeItem("token")
        }
      })
  }
}

export const login = (loginObj) => {
  return (dispatch) => {
    return fetch(("http://localhost:3000/api/auth/login"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginObj),
    }).then(res => res.json())
      .then(resObj => {
        if (resObj.error == null) {
          localStorage.setItem("token", resObj.access_token)
          dispatch(setUserData({...resObj.user}))
        } else {
          dispatch(({type: 'LOADING_CHANGE', payload: false}))
          alert('Invalid username and password')
        }
      })
  }
}

export const signUp = (userInfo) => {
  return (dispatch) => {
    return fetch(('http://localhost:3000/api/auth/register'), {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo),
    }).then(res => res.json())
      .then(result => {
        if (result.message === "User created successfully") {
          alert("Acount created Successfully")
          return {message: "Success"}
        } else {
          return {message: "Fail", errors: result}
        }
      })
  }
}
