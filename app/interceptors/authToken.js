function authTokenInterceptor($cookies) {
  return {
    request: function(config) {
      if ($cookies.getObject('user')) {
        var token = $cookies.getObject('user').api_token;
        config.headers['autharoo-token'] = token;
        config.headers['useridaroo'] = $cookies.getObject('user').id;
      }
      return config;
    }
  }
}

authTokenInterceptor.$inject = ['$cookies'];

angular.module("listaroo")
  .factory('authTokenInterceptor', authTokenInterceptor)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authTokenInterceptor')
  });
