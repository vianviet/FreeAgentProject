const userinfo = {
    au: false,
    username: null
}
const user = (state = userinfo, action) => {
    switch (action.type) {
        case 'LOGIN':
            return state.au = true;
        case 'LOGOUT':
            return state.au = false;
        default:
            return state;
    }
}

export default user;