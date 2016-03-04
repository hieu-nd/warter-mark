const linkfirebase = "https://watermark.firebaseio.com/";
const objFirebase = new Firebase("https://watermark.firebaseio.com/");

const User = new Firebase(linkfirebase + "user");


const firebasedate = Firebase.ServerValue.TIMESTAMP;

var $localstorage = function($window) {
    return {
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            try {
                var temp = $window.localStorage[key];
                if (temp) {
                    return JSON.parse(temp || "{}");
                }
            } catch (e) {
                return JSON.parse("{}");
            }
        },
        remove: function(key) {
            $window.localStorage.removeItem(key);
        },
        clearAll: function() {
            $window.localStorage.clear();
        }
    };
};

$localstorage.$inject = ["$window"];
angular.module("factories", []).factory("$localstorage", $localstorage);

angular.module('services', [])
    .service('userService', function($rootScope, $firebaseObject, $firebaseArray, $firebaseAuth) {

        var service = {};
        var Authentication = new Firebase(linkfirebase);
        var Auth = $firebaseAuth(Authentication);
        service.AllUser = $firebaseArray(User);

        var objUser = {};


        service.createuser = function(objUser, callback) {
            Auth.$createUser({
                email: objUser.email,
                password: objUser.password
            }).then(function(userData) {
                objUser.password = null;
                objUser.uid = userData.uid;
                objUser.createdate = firebasedate;
                objUser.updatedate = firebasedate;
                objUser.soruceid = "manual";
                service.AllUser.$add(objUser);
                callback(true);
            }).catch(function(error) {
                callback(error);
            });
        }

        service.login = function(email, password, callback) {
            Auth.$authWithPassword({
                email: email,
                password: password
            }).then(function(authData) {
                User.orderByChild("uid").equalTo(authData.uid).on("child_added", function(snapshot) {
                    var UserData = service.AllUser.$getRecord(snapshot.key());
                    if (UserData) {
                        $rootScope.User = UserData;



                        var balance = {};
                        balance.uid = authData.uid;
                        balance.note = "Each Day Login ";
                        balance.categorybalanceid = each_day_logged_in;
                        service.addBalance(balance);


                        callback(true);
                    } else {
                        var error = {};
                        error.message = "Please check internet connection. And try again.";
                        callback(error);
                    }
                });
            }).catch(function(error) {
                callback(error);
            });

        }

        var checkEmailexit = function(email) {
            var isexit = false;
            service.AllUser.forEach(function(obj) {
                if (email.trim() == obj.email.trim()) {
                    isexit = true;
                    objUser = obj;
                }
            });
            return isexit;

        }
        service.facebookAuth = function(location, callback) {
            objFirebase.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    callback(error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    var isexitemail = checkEmailexit(authData.facebook.email);
                    objUser.email = authData.facebook.email;
                    objUser.firstname = authData.facebook.cachedUserProfile.first_name;
                    objUser.lastname = authData.facebook.cachedUserProfile.last_name;
                    objUser.sociallink = authData.facebook.cachedUserProfile.link;
                    objUser.userimage = authData.facebook.profileImageURL;
                    objUser.gender = authData.facebook.cachedUserProfile.gender;
                    objUser.dateofbirth = authData.facebook.cachedUserProfile.birthday ? authData.facebook.cachedUserProfile.birthday : "";
                    objUser.lat = location.lat;
                    objUser.lng = location.lng;
                    objUser.address = location.address ? location.address : "";
                    objUser.createdate = firebasedate;
                    objUser.updatedate = firebasedate;
                    objUser.source = authData.provider;
                    objUser.socialid = authData.facebook.id;
                    objUser.uid = authData.uid;

                    var balance = {};
                    balance.uid = authData.uid;

                    balance.note = "Each Day Login ";
                    balance.categorybalanceid = each_day_logged_in;
                    service.addBalance(balance);

                    if (isexitemail) {
                        service.AllUser.$save(objUser);
                    } else {
                        service.AllUser.$add(objUser);
                    }
                    $rootScope.User = objUser;




                    callback(true);
                }
            }, {
                remember: "sessionOnly",
                scope: "email,user_likes,public_profile,user_birthday"
            });
        }

        service.googleAuth = function(location, callback) {
            objFirebase.authWithOAuthPopup("google", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    callback(error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    var isexitemail = checkEmailexit(authData.google.email);
                    objUser.email = authData.google.email;
                    objUser.firstname = authData.google.cachedUserProfile.given_name;
                    objUser.lastname = authData.google.cachedUserProfile.family_name;
                    objUser.sociallink = authData.google.cachedUserProfile.link;
                    objUser.userimage = authData.google.profileImageURL;
                    objUser.gender = authData.google.cachedUserProfile.gender;
                    objUser.dateofbirth = authData.google.cachedUserProfile.birthday ? authData.google.cachedUserProfile.birthday : "";
                    objUser.lat = location.lat;
                    objUser.lng = location.lng;
                    objUser.address = location.address ? location.address : "";
                    objUser.createdate = firebasedate;
                    objUser.updatedate = firebasedate;
                    objUser.source = authData.provider;
                    objUser.socialid = authData.google.id;
                    objUser.uid = authData.uid;
                    if (isexitemail) {
                        service.AllUser.$save(objUser);
                    } else {
                        service.AllUser.$add(objUser);
                    }
                    $rootScope.User = objUser;
                    var balance = {};
                    balance.uid = authData.uid;;
                    balance.note = "Each Day Login ";
                    balance.categorybalanceid = each_day_logged_in;
                    service.addBalance(balance);
                    callback(true);
                }
            }, {
                remember: "sessionOnly",
                scope: "email,profile"
            });
        }

        return service;
    });
