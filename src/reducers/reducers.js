const initialState = {
 user: {},
  loading: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER_DATA":
      return {user:{...action.payload}, loading: false}
    default:
      return state
  }
}
