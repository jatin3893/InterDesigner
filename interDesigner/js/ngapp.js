$(document).ready(function() {
    // Setup sidebar
    // Hide the secondary panel
    $('#secondaryPanel').slideToggle();

});

$(document).keydown(function(event){
    var keyCode = event.keyCode || event.which;
    switch (keyCode){
        case 65: // A
            $('#secondaryPanel').slideToggle();
            $('#accordion').slideToggle();
            break;
    }
    $('#viewport').trigger('customKeyDown', event);
});

$(document).keyup(function(event){
    $('#viewport').trigger('customKeyUp', event);
});

// Angular parts
var myAppModule = angular.module('sidebar', [])
                        .controller('toolbarController', toolbarController)
                        .controller('secondaryPanelController', secondaryPanelController);

function toolbarController($scope) {
    console.log('test');
    // This list should be obtained from the server depending on the
    // user preferences, account type, etc.
    $scope.tools = {
        id: 'tools_',
        list: [
            sofa = {
                title: 'Sofa set',
                id: 'sofa_',
                prefix: 'images/tools/sofa/',
                list: [
                    'sofa_spot'
                ]
            },
            chair = {
                title: 'Chairs',
                id: 'chair_',
                prefix: 'images/tools/chair/',
                list: [
                    'chair_yellow'
                ]
            },
            cupboard = {
                title: 'Cupboards',
                id: 'cupboard_',
                prefix: 'images/tools/cupboard/',
                list: [
                ]
            },
            table = {
                title: 'Tables',
                id: 'table_',
                prefix: 'images/tools/table/',
                list: [
                ]
            },
            bed = {
                title: 'Bed',
                id: 'bed_',
                prefix: 'images/tools/bed/',
                list: [
                ]
            },
            others = {
                title: 'Others',
                id: 'others_',
                prefix: 'images/tools/others/',
                list: [
                ]
            }
        ],
        actions: [
            addToViewport = {
                title: 'Add to Scene',
                id: 'addToViewport_',
                onMouseClick: function(tool) {
                    console.log('Add to viewport');
                    console.log(tool);
                    $('#viewport').trigger('addToViewport', [tool]);
                }
            },
            favourite = {
                title: 'Favourite',
                id: 'favourite',
                onMouseClick: function(tool) {
                    console.log('Mark as favourite');
                    console.log(tool);
                }            
            },
            similar = {
                title: 'Show similar',
                id: 'showSimilar',
                onMouseClick: function(tool) {
                    console.log('Show similar');
                    console.log(tool);
                }
            }
        ]
    };

    $scope.onActionClick = function(action, tool) {
        console.log('actions clicked');
        action.onMouseClick(tool);
    }
}

function secondaryPanelController($scope) {
}