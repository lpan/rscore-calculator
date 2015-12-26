app.directive('chLang', ['languageService', '$timeout', function (language, $timeout) {
  var link = function (scope, element, attrs) {
    var en = angular.element(element.find('span')[0]);
    var fr = angular.element(element.find('span')[1]);
    var classes = [en, fr];
    // nodeList to list of dom objects
    // language.toList(document.querySelectorAll('.translate'), classes);
    // initialization
    en.addClass('ch-active');
    fr.addClass('ch-still');
    scope.setLang = function (lang) {
      // no effect if active button is clicked
      if (language.lang === lang) {
        return;
      } else {
        // fadein, change language.buttonClicked
        // wait 800ms, change language.lang, fadein
        language.animate(classes, 'animated fadeIn', 'animated fadeOut', 800, function () {
          language.lang = lang;
        });
      }
    };
    // according to the current lang, assign state of lang button
    scope.$watch(function () {
      return language.lang;
    }, function (newVal) {
      language.altButton('en', en, fr, newVal, 'ch-active', 'ch-still');
    });
  };
  return {
    restrict: 'E',
    templateUrl: 'app/shared/ch-lang/ch-lang.html',
    link: link
  };
}]);
