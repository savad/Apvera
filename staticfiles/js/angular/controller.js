/**
 * Created by savad on 23/7/17.
 */
function ApveraController($scope, $http, $localStorage, $location, $route){


    $scope.login_window = true;
    $scope.token = $localStorage.token;


    $scope.userDetails = function () {
        $http.get("/auth/me/", {headers: {'Authorization': 'Token ' + $scope.token}})
        .then(function(response) {
            $scope.user_details = response.data;
        },
        function(data) {
            $scope.auth_error = data.data;
        });
    };


    $scope.logout = function () {
        delete $localStorage.token;
        $location.path('/login/');
    };

    $scope.showSignUp = function () {
        $scope.login_window = false;
    };

    $scope.showLogin = function () {
        $scope.login_window = true;
    };


    $scope.login = function () {
        $scope.login_error = false;
        $http({
            method: 'POST',
            url: '/auth/login/',
            headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
            data: $.param({'username': $scope.login_username, 'password': $scope.login_password})
            })
        .then(function(response) {
                $localStorage.token = response.data.auth_token;
                $location.path('/profile/');
        },
        function(data) {
            $scope.login_error = data.data;
        });
    };


    $scope.signUp = function () {
        $scope.sign_up_error = false;
        $('#sign_up_button').attr('value', 'Please wait');
        $http({
            method: 'POST',
            url: '/auth/register/',
            headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
            data: $.param({'username':$scope.username,
                           'first_name': $scope.first_name,
                           'email': $scope.username,
                           'password': $scope.password,
                           'address': $scope.address,
                           'phone_number': $scope.phone_number})
            })
        .then(function(response) {
                swal({
                  title: "Success",
                  text: "Verification email sent. Please check your email and follow instructions.",
                  type: "success",
                  confirmButtonText: "OK"
                },
                function(){
                    $('#sign_up_form')[0].reset();
                    $('#sign_up_button').attr('value', 'Sign Up');
                });
        },
        function(data) {
            $scope.sign_up_error = data.data;
            $('#sign_up_button').attr('value', 'Sign Up');
        });
    };

    $scope.activateAccount = function () {
        $http({
            method: 'POST',
            url: '/auth/activate/',
            headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
            data: $.param({'token': $route.current.params.token, 'uid': $route.current.params.uid})
            })
        .then(function(response) {
                swal({
                  title: "Verified",
                  text: "Please login to continue!",
                  type: "success",
                  confirmButtonText: "Go to Login"
                },
                function(){
                  $('#activate_text').html("Successfully verified.");
                  $location.path('/');
                });
        },
        function(data) {
            $('#activate_text').html("<p class='red'>Inalid or exprired link</p>");
        });
    };


    $scope.passwordChange = function () {
        $scope.password_error = false;
        $http({
            method: 'POST',
            url: '/auth/password/',
            headers : {'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization': 'Token ' + $scope.token},
            data: $.param({'current_password':$scope.current_password,
                           'new_password': $scope.new_password,
                           're_new_password': $scope.re_new_password})
            })
        .then(function(response) {
                swal({
                  title: "Success",
                  text: "Your password successfully changed",
                  type: "success",
                  confirmButtonText: "OK"
                },
                function(){
                  $('#password_form')[0].reset();
                  $location.path('/profile/');
                });
        },
        function(data) {
            $scope.password_error = data.data;
        });
    };

}