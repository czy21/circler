export const validateForm = (form: Promise<any>, successCallback: (value: any) => void, errorCallback?: (err: any) => void) => {
    form.then(value => successCallback(value)).catch(err => errorCallback && errorCallback(err))
}

export const dispatchOption = (keys: string[]) => {
    // stub.api.post("option/query", {keys: keys}).then((t: any) => {
    //     stub.store.dispatch(stub.reducer.action.option.put(t.data))
    // })
}

export const mapGlobalOptionStateToProps = (state: any) => {
    return {
        globalOption: state.option.data
    }
};