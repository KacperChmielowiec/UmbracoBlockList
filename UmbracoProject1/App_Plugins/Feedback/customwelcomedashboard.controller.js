angular.module("umbraco")
    .controller("CustomWelcomeDashboardController",
        function(
            $scope,
            $http,
            umbRequestHelper,
            notificationsService,
            $element) {

            function openModal() {
                document.getElementById("feedbackModal").style.display = "block";
                document.getElementById("navigation").style.display = "none";
            }

            function closeModal() {
                document.getElementById("feedbackModal").style.display = "none";
                document.getElementById("navigation").style.display = "block";
            }

            function onWindowClick(event) {
                if (event.target === document.getElementById("feedbackModal")) {
                    closeModal();
                }
            }

            $element[0].querySelector("#openModal").addEventListener("click", openModal);
            $element[0].querySelector("#closeModal").addEventListener("click", closeModal);
            window.addEventListener("click", onWindowClick);

            $scope.checkStatus = function () {
                $http.get("/umbraco/api/UserReviews/CheckStatus")
                    .then((response) => {
                        if (response.data !== true) {
                            openModal();
                        }
                    })
                    .catch(() => {
                        openModal();
                    });
            };

            $scope.send = function(name, email, comments, star) {
                if (name != null && email != null) {
                    $scope.isAgreed = false;
                    var FeedbackModel = {
                        feedbackName: name,
                        feedbackEmail: email,
                        feedbackStar: star,
                        feedbackComments: comments,
                        feedbackProjectName: "OskiStarterKit"
                    };

                    $http.post("/umbraco/api/UserReviews/SendReview", FeedbackModel)
                        .then(function () {
                            notificationsService.success("Thank you for being a part of our journey towards continuous improvement!");

                            // Reset the form's state
                            $scope.feedback.$setPristine();
                            $scope.feedback.$setUntouched();

                            $scope.name = null;
                            $scope.email = null;
                            $scope.star = null;
                            $scope.comments = null;
                            $scope.hidden = false;

                            closeModal();

                        })
                        .catch(() => {
                            notificationsService.error("Something went wrong, try sending again");
                        })
                        
                } else {
                    $scope.isAgreed = false;
                    notificationsService.error("\"Name\" and \"email\" fields must be filled in");
                }
            };

            $scope.$on("$destroy",
                function() {
                    window.removeEventListener("click", onWindowClick);
                });

            $scope.checkStatus();
        });