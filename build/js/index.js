'use strict';
angular.module('app',['ui.router']);

'use strict';
angular.module('app').value('dict',{}).run(['dict','$http',function(dict,$http){
	$http.get('/data/city.json').then(function successCallback(resp){
		dict.city = resp;
	});
	$http.get('/data/salary.json').then(function successCallback(resp){
		dict.salary = resp;
	});
	$http.get('/data/scale.json').then(function successCallback(resp){
		dict.scale = resp;
	});
}]);

'use strict';

angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider.state('main',{
		url: '/main',
		templateUrl: 'view/main.html',
		controller: 'mainCtrl'
		
	}).state('position',{
		url: '/position/:id',
		templateUrl:  'view/position.html',
		controller: 'positionCtrl'
	}).state('company',{
		url: '/company/:id',
		templateUrl: 'view/company.html',
		controller: 'companyCtrl'
	}).state('search',{
		url: '/search',
		templateUrl: 'view/search.html',
		controller: 'searchCtrl'
	});
	$urlRouterProvider.otherwise('main');
}]);

'use strict';
angular.module('app').controller('companyCtrl',['$http','$state','$scope',function($http,$state,$scope){
	$http.get('data/company.json?id='+$state.params.id)
		.then(function successCallback(resp){
			$scope.company = resp;
		});
}]);

'use strict';

angular.module('app').controller('mainCtrl',['$http','$scope',function($http,$scope){
	$http.get('/data/positionList.json')
		.then(function successCallback(resp){
			$scope.list = resp;
		});
}]);
'use strict';

angular.module('app').controller('positionCtrl',['$http','$state','$scope',function($http,$state,$scope){
	$http.get('data/position.json?id='+$state.params.id)
		.then(function successCallback(resp){
			$scope.position = resp;
		});
	$http.get('data/company.json?id='+$state.params.id)
		.then(function successCallback(resp){
			$scope.company = resp;
		});
}]);

'use strict';

angular.module('app').controller('searchCtrl',['dict','$http','$scope',function(dict,$http,$scope){
	$scope.name = '';
	$scope.sheet = {};
	$scope.search = function(){
		$http.get('/data/positionList.json?name='+$scope.name)
		.then(function successCallback(resp){
			$scope.list = resp;
		});
	}
	$scope.search();
	$scope.tablist = [
		{
			id: 'city',
			name: '城市'
		},
		{
			id: 'salary',
			name: '薪资'
		},
		{
			id: 'scale',
			name: '公司规模'
		}
	];
	$scope.tClick = function(id,name){
		$scope.sheet.list = dict[id];

		$scope.sheet.visible = true;
		console.log($scope.sheet);
	}

}]);
'use strict';

angular.module('app').directive('appCompanyInfo',[function(){
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'view/templates/companyinfo.html',
		scope: {
			isActive: '=',
			isLogin: '=',
			pos: '='
		},
		link: function(scope){
			scope.imgSrc = scope.isActive ? 'images/star-active.png' : 'images/star.png';
		}
	}
}])

'use strict';

angular.module('app').directive('appFooter',[function(){
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'view/templates/footer.html'
	}
}])
'use strict';

angular.module('app').directive('appHead',[function(){
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'view/templates/head.html'
	}
}])

'use strict';

angular.module('app').directive('appHeadBar',[function(){
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'view/templates/headbar.html',
		scope: {
			text: '@'
		},
		link: function(scope){
			scope.back = function(){
				window.history.back();
			};
		}
	}
}])


'use strict';

angular.module('app').directive('appMaskSheet',[function(){
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'view/templates/masksheet.html',
		scope: {
			list: '=',
			visible: '='
		}
	}
}])
'use strict';
angular.module('app').directive('appMenu',[function(){
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'view/templates/menu.html'
	}
}]);

'use strict';
angular.module('app').directive('appPositionClass',[function(){
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'view/templates/positionclass.html',
		scope: {
			com: '='
		},
		link: function(scope){
			scope.showPositionList = function(idx){
				scope.positionList = scope.com.positionClass[idx].positionList;
				scope.isActive = idx;
			}
			scope.$watch('com',function(newVal){
				if(newVal){
					scope.showPositionList(0);
				}
			})
			
		}
	}
}]);

'use strict';

angular.module('app').directive('appPositionDecr',[function(){
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'view/templates/positiondecr.html'
	}
}]);
'use strict';
angular.module('app').directive('appPositionInfo',[function(){
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'view/templates/positioninfo.html',
		scope: {
			com: '='
		}
	}
}]);

angular.module('app').directive('appPositionList',[function(){
	return {
		restrict: 'A',
		replace: true,
		templateUrl: '../view/templates/positionlist.html',
		scope: {
			data: '='
		}
	}
}]);

'use strict';

angular.module('app').directive('appSearchBar',[function(){
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'view/templates/searchbar.html',	
	}
}])
'use strict';

angular.module('app').directive('appTab',[function(){
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'view/templates/tab.html',
		scope: {
			list: '=',
			tabClick: '&'
		},
		link: function($scope){
			$scope.click = function(tab){
				$scope.selectId = tab.id;
				$scope.tabClick(tab);
			}
		}
	}
}])