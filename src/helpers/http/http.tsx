export const getRequestUrl = (url: string, params: any) => {
    if(!params) {
        return url;
    }

    const urlParams = Object.keys(params).map((param) => {
        const value = params[`${param}`]
        return `${param}=${value}`
    }).join('&')

    return `${url}?${urlParams}`
}
