angular.module("umbraco").controller("embeddedVideoController", function ($scope, $sce) {
    $scope.url = $scope.block.data.oVideoUrl[0].url;
    
    $scope.heightStyle = $scope.block.data.oHeight + 'px';
    $scope.isYoutubeVideo = $scope.url.includes('youtu');
    $scope.youtubeVideoUrl = '';

    const pattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
    const regex = new RegExp(pattern);
    const match = regex.exec($scope.url ?? '');

    if (match) {
        $scope.youtubeVideoUrl = $sce.trustAsResourceUrl(`https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1`);
    }
});