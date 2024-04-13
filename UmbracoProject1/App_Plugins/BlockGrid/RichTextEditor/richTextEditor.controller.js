angular.module("umbraco").controller("richTextEditorController", function ($scope, $sce) {
    $scope.trustAsHtml = function (html) {
        return $sce.trustAsHtml(html);
    };
});