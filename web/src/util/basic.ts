import stub from "@/init";

export const validateForm = (form: Promise<any>, successCallback: (value: any) => void, errorCallback?: (err: any) => void) => {
    form.then(value => successCallback(value)).catch(err => errorCallback && errorCallback(err))
}

export const option = (key: string) => {
    let optionDict:any = {}
    stub.api.post("option/query", {keys: [key]})
        .then((t: any) => {
            optionDict = t.data
        })
    return optionDict[key]
}