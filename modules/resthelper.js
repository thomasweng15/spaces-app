
export default class RestHelper {

    post(url, data) {
        let self = this;
        return new Promise(function(success, error) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
            success();
            };

            xhr.onerror = error;
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(self.requestBuildQueryString(data));
        })
    }

    get(url) {
        return new Promise(function(success, error) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
            success();
            };

            xhr.onerror = error;
            xhr.open('GET', url);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send();
        })
    }

    requestBuildQueryString(params) {
        var queryString = [];
        for(var property in params)
            if (params.hasOwnProperty(property)) {
            queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
            }
        return queryString.join('&');
    }
}
