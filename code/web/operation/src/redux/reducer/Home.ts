const Home = (state: any = {collapsed: false}, action: any) => {
    switch (action.type) {
        case 'Collapse':
            return Object.assign({}, state, {
                collapsed: !state.collapsed
            });
        default:
            return state
    }
};
export default Home