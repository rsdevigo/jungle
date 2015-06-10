'use strict';

describe('Controller: ConsumersCtrl', function () {

  // load the controller's module
  beforeEach(module('jungleApp'));

  var ConsumersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConsumersCtrl = $controller('ConsumersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
