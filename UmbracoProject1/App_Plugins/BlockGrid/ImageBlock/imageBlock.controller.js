angular.module("umbraco").controller("imageBlockController", function ($scope, mediaResource) {
    var imageUdi = $scope.block.data.oImage;
    $scope.borderRadius = $scope.block.data.oBorderRadius ?? 0;
    $scope.height = $scope.block.data.oHeight === 0 ? 500 : $scope.block.data.oHeight;

    if (imageUdi) {
        mediaResource.getById(imageUdi)
            .then(function(media) {
                $scope.image = media;
            });
    }
});