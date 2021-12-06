import stub from "@/init";
import {Action as OptionAction} from "@/redux/reducer/Option";

export const validateForm = (form: Promise<any>, successCallback: (value: any) => void, errorCallback?: (err: any) => void) => {
    form.then(value => successCallback(value)).catch(err => errorCallback && errorCallback(err))
}

export const queryOption = (keys: string[]) => {
    return stub.api.post("option/query", {keys: keys})
}

export const mapGlobalOptionStateToProps = (state: any) => {
    return {
        globalOption: state.Option.option
    }
};

export const mapGlobalOptionDispatchToProps = (dispatch: any) => {
    return {
        putGlobalOption: (data: {}) => {
            dispatch(OptionAction.Put(data))
        }
    }
};