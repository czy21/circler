export const validateForm = (form: Promise<any>, successCallback: (value: any) => void, errorCallback?: (err: any) => void) => {
    form.then(value => successCallback(value)).catch(err => errorCallback && errorCallback(err))
}