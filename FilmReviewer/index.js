(function() {
    'use strict'

    angular
        .module('filmReviewer', ['ngAnimate'])
        .controller('filmController', filmController)

    function filmController() {
        var vm = this,
            index;

        vm.id = 1;
        vm.films = [{
            id: 1,
            title: 'Ex Machina',
            information: 'A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a breath-taking humanoid A.I',
            rating: 9.8,
            genre: 'Sci-fi',
            length: '1h 50min',
            image: 'ex-machina',
            booking: false
        }, {
            id: 2,
            title: 'Divergent',
            information: 'In a world divided by factions based on virtues, Tris learns shes Divergent and wont fit in. When she discovers a plot to destroy Divergents, Tris and the mysterious Four must find out what makes Divergents dangerous before its too late',
            rating: 7.9,
            genre: 'Adventure',
            length: '2h 20min',
            image: 'divergent',
            booking: true
        }, {
            id: 3,
            title: 'Deadpool',
            information: 'A former Special Forces operative turned mercenary is subjected to a rogue experiment that leaves him with accelerated healing powers, adopting the alter ego Deadpool',
            rating: 9.5,
            genre: 'Action',
            length: '1h 48min',
            image: 'deadpool',
            booking: true
        }];
        vm.next = next;
        vm.prev = prev;

        function next() {
            if (vm.id < vm.films.length) {
                vm.id++;
            } else {
                return false;
            }
        }

        function prev() {
            if (vm.id == 1) {
                return false;
            } else {
                vm.id--;
            }
        }

    }

})();
