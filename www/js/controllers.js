angular.module('controllers', [])
    .controller('LoginController', function($cordovaFacebook, $scope, $rootScope, $ionicHistory,
        $ionicSideMenuDelegate, $ionicLoading, $location, $state,
        $ionicModal, $ionicPopup, userService, $localstorage) {

        $scope.User = {};
        

        $scope.signin = function() {
            userService.login($scope.User.email, $scope.User.password, function(response) {
                if (response == true) {
                    $state.go("profile");
                } else {
                    $ionicPopup.alert({
                        title: "Error",
                        template: response.message
                    })
                }
            });
        }


    })
    .controller('ForgotController', function($cordovaFacebook, $scope, $rootScope, $ionicHistory,
        $ionicSideMenuDelegate, $ionicLoading, $location, $state,
        $ionicModal, $ionicPopup, userService, $localstorage) {

    })
    .controller('SignupController', function($cordovaFacebook, $scope, $rootScope, $ionicHistory,
        $ionicSideMenuDelegate, $ionicLoading, $location, $state, $cordovaCamera,
        $ionicModal, $ionicPopup, userService, $localstorage) {
        var imagedefault = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///9FiKk5gqWwyNZBhqhqnLY0gKQ8hKYufqJAhqctfaK2zNmTtcg2gaVyobpelbL1+Prm7vLc5+3D1eDu8/bT4OiausyrxdSFrMK80dxjmLRUkK+GrcLN3OWkwNBNjKwz7klCAAAEtElEQVR4nO2d6XaiQBBGp5utaRUVVwT1/d9yQCYxErA3sWjnu/mbeOoemqrqzfz5AwAAAAAAAAAAAAAAAAAAAAAAAADwiax3myIIgmKzW1OH8nq2RVUKEfOWWIiyKrbUQb2O1aGUPEnZT9KEy/Kwog7tJayPsmN3t5RH/8fr6iiSXr2W2tHz5zh76ndzFDPqIF3IhMKvQWTUYVqzuqoe4L/HePV0pG55qCXIWMi9rBzbgQzaR+qlItN9grenyKjDNeek9w5+kZyoAzZlz40EGeN76pDNyKWhIGMypw7aiNLkJWwJS+qgTQhMx2gDD6jDNmBh/gjrh7igDlufi1ke/SK5UAeuzcJKsG5tqAPXZWbzFjZwX6YZpX679kjqSTq1qIVfeFIT93Z5piHxo7GxqRTfUAevQ64zrx9C+LAydbAfpPUwPVCHr0Fmm0kbUh/WbFwGaT1MqcNXs3Y0nP6LWNg2NC28oBZQ4lANGzyoiJlTOWTh9FPN1UmQsSu1gBL7prRFUguoWLml0jqZTn2F37FYeFAu8tjRMJ76BGrnbLijVlAAQ/8NP/89XLsaTj6Xbp2rxeT3Sp0NqQWUfL6ha+c9/UVhp2UaLxZq5o4z4Dm1gBKrzdE7HmzOODY1k29p6gmi2xRYTn16WOOWaULq8DU4Oq3qH6nD18B6B7jBg0RT994uL6Kcet994+P3D11qvgf1vsGhInpQDW9onw3uEibUoWtiPUw9GaQOO/li6ms03yzthmm4pA5cm41d0Y831IHrYyXoSTFssercvOjYvrF6EamDNqIwr/rx9M8oPGCcTj1KpC3GRzA9OXj5A8PGxpt25gdXk+WMdPpHMH5jNBP2Y+bbZaavKL0qhXcq3brPK+pQbYn0FHlEHWg/63PzFRBdHpvnpU5C7Vw97PvU4vz2fdNzlUjeh3wM5aR+ivxRMO//XJFU5zf6zVicDPQs3bOFmeqG0KLzB0O/FyYxe1c+yq/PHozotJfz5xlVdip99mxc8+tbGp+9fF7Ku4cpNnK4RQ1lZ9J7eN6xp/INB2wz1awh7c6CVtHQuo2IOjtNG2UJjUffI87UqeP3LGET9v0VZ91Vi51Gj8BHVpzrVLiem+dNbnr8nZ68oSNYK47ao6tHURt+z1xvd1zEPEnD+ifh8eL4e3X7rNnldd/dl6J7vzdkfRU6D+bZslxm86AvJQa6beyYV021xmgbRWxanyv9ZeTxxqnJFn0ojPL6dmmyOjfaZv/FaI2Ql/pzvkIYLeuMdunb8EBXqFuet5HpytxIKwLmx/B5orNCqGqSehjpEKrFna260qscLwuL9fGR7n/Z3dniyWV4breeC6tNnJHufx0t98y4PAV9kutDqfyus6HPHOfYTWR92ink4lrN8nuOX+WzismhOaaadJx1j8jpGEndqgleRlmWReVC1A2cy4eFUzS8kYYNbiffpm34KmAIQxjSA0MYwpAeGMIQhvTAEIYwpAeGMIQhPTCEIQzpgSEMYUgPDGEIQ3pgCEMY0gNDGMKQHhjCEIb0wBCGMKQHhjCEIT0jGZ7i3u8CoCAe5z9A932dAxWefacUAAAAAAAAAAAAAAAAAAAAAAAAAP4X/gJqhld6ShlEVAAAAABJRU5ErkJggg==";
        $scope.User = {};
        $scope.User.userimage = imagedefault;

        try {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 150,
                targetHeight: 150,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };
            $scope.SelectImage = function() {
                $cordovaCamera.getPicture(options).then(function(imageData) {
                    $scope.User.userimage = "data:image/jpeg;base64," + imageData;
                }, function(err) {
                    // error
                });
            }



        } catch (e) {

        }
        $scope.isEmailAvailable = true;

        userService.AllUser.$watch(function(event, prevChildKey) {
            if (event.event == "child_added") {
                var objUser = userService.AllUser.$getRecord(event.key);
                if ($scope.User && objUser.email.trim() == $scope.User.email.trim()) {
                    $rootScope.User = objUser;
                    $state.go("home");
                }
            }
        });

        $scope.checkEmailExit = function() {
            $scope.isEmailAvailable = true;
            if ($scope.User.email && $scope.User.email.length > 10) {
                userService.AllUser.forEach(function(user) {
                    if (user.email.trim() == $scope.User.email.trim()) {
                        $scope.isEmailAvailable = false;
                    }
                });
            }
        }

        $scope.CreateAccount = function() {
            if (!$scope.User.userimage == imagedefault) {
                $ionicPopup.alert({
                    title: "Warning",
                    template: "Please select your Avatar",
                });
                return;
            }
            if (!$scope.User.gender) {
                $ionicPopup.alert({
                    title: "Warning",
                    template: "Please select gender",

                });
                return;
            }
            if (!$scope.User.firstname) {
                $ionicPopup.alert({
                    title: "Warning",
                    template: "Please enter firstname",

                });
                return;
            }
            if (!$scope.User.lastname) {
                $ionicPopup.alert({
                    title: "Warning",
                    template: "Please enter lastname",

                });
                return;
            }
            if (!$scope.User.email) {
                $ionicPopup.alert({
                    title: "Warning",
                    template: "Please enter email",

                });
                return;
            }
            if (!$scope.isEmailAvailable) {
                $ionicPopup.alert({
                    title: "Warning",
                    template: "Email Not Available",

                });
                return;
            }
            if (!$scope.User.birthday) {
                $ionicPopup.alert({
                    title: "Warning",
                    template: "Please enter birthday",
                });
                return;
            }
            if (!$scope.User.password) {
                $ionicPopup.alert({
                    title: "Warning",
                    template: "Please enter password",
                });
                return;
            }
            $scope.User.lat = $rootScope.positions.lat;
            $scope.User.lng = $rootScope.positions.lng;
            $scope.User.address = $rootScope.positions.address;
            $ionicLoading.show({ template: "Loading..." });
            userService.createuser($scope.User, function(response) {
                $ionicLoading.hide();
                if (response == true) {
                    $state.go("gallery");
                } else {
                    $ionicPopup.alert({
                        title: "Error",
                        template: response.message
                    })
                }
            });
        }
    })
    .controller('HomeController', function($scope, $rootScope, $ionicHistory, $ionicSideMenuDelegate,
        $ionicLoading, $location, $state, $ionicModal, userService) {

    })
    .controller('GalleryController', function($scope, $rootScope, $ionicHistory, $ionicSideMenuDelegate,
        $ionicLoading, $location, $state, $ionicModal, userService) {

    })
      .controller('UploadImageController', function($scope, $rootScope, $ionicHistory, $ionicSideMenuDelegate,
        $ionicLoading, $location, $state, $ionicModal, userService) {

    });
