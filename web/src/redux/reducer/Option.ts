import stub from "@/init";

export const Action = {
    Put: (option: {}) => {
        return {type: Action.Put.name, data: option}
    }
}

export const Option = (state: any = {option: {}}, action: any) => {
    switch (action.type) {
        case Action.Put.name:
            return Object.assign({}, state, {option: action.data});
        default:
            return state
    }
};