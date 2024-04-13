angular.module("umbraco").controller("fullScreenTopContainerController", function ($scope, mediaResource) {
    var imageUdi = $scope.block.data.oImageOrVideoDesktop;
    $scope.title = $scope.block.data.oTitle;
    $scope.fontColor = $scope.block.data.oFontColor?.value ?? "ffffff";
    if (imageUdi) {
        mediaResource.getById(imageUdi)
            .then(function(media) {
                $scope.image = media;
            });
    }
});