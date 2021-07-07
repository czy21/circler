const Action = {
    Collapse: () => {
        return {type: Action.Collapse.name}
    }
}

const Home = (state: any = {collapsed: false}, action: any) => {
    switch (action.type) {
        case Action.Collapse.name:
            return Object.assign({}, state, {collapsed: !state.collapsed});
        default:
            return state
    }
};


export {Home, Action}