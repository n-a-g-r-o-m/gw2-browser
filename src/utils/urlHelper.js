//import {useCookies} from 'react-cookie';

const BASE_URL = 'https://api.guildwars2.com/v2';

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

export const gw2UrlGenerator = (url, params = {}) => {
    //const [apiKeyCookie] = useCookies(['gw2ApiKey']);
    const paramsString = Object.keys(params).reduce((result, key) => {
        const value = params[key];
        let valueString = value;
        if(Array.isArray(value)) {
            valueString = value.join(',');
        }

        return [...result, `${key}=${valueString}`];
    }, [`access_token=${getCookie('gw2ApiKey')}`]);
    return `${BASE_URL}${url}?${paramsString.join('&')}`
}

export const wrappedFetch = (url, resolve, reject, params = {}, arrayToMapBy = false) => {
    const fetchData = () => {
        fetch(gw2UrlGenerator(url, params))
            .then(response => {
                if([200, 206].includes(response.status)) {
                    response.json()
                        .then(data => resolve(
                            arrayToMapBy && Array.isArray(data)
                            ? data.reduce((result, entry) => ({
                                ...result,
                                [entry[arrayToMapBy]]: entry
                            }), {})
                            : data
                        ))
                } else {
                    response.json().then(error => reject(error.text))
                }
            })
            .catch(err => reject(err));
    }
    fetchData();
}