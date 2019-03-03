const initialState = {
  data: null,
  type: '0'
};

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN' || action.type === 'USER_UPDATED')
  {
    return Object.assign({}, state, {
      data: action.payload,
      type: action.payload.type
    })
  }

  if (action.type === 'USER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      data: null,
      type: '0'
    })
  }

  return state
};

export default userReducer
