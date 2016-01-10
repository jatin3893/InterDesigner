// jQuery parts
$(document).ready(function() {
    // Setup sidebar
    // Hide the secondary panel
    $("#secondaryPanel").slideToggle();

});

$(document).keydown(function(e){
    var code = e.keyCode || e.which;
    if (code == 65) {
        $("#secondaryPanel").slideToggle();
        $("#accordion").slideToggle();
    }
});

// Angular parts
var myAppModule = angular.module('sidebar', [])
                        .controller('toolbarController', toolbarController)
                        .controller('secondaryPanelController', secondaryPanelController);

function toolbarController($scope) {
    console.log("test");
    // This list should be obtained from the server depending on the
    // user preferences, account type, etc.
    $scope.tools = {
        id: "tools_",
        list: [
            sofa = {
                title: "Sofa set",
                id: "sofa_",
                prefix: "images/tools/sofa/",
                list: [
                    "sofa_gray.jpg",
                ]
            },
            cupboard = {
                title: "Cupboards",
                id: "cupboard_",
                prefix: "images/tools/cupboard/",
                list: [
                    "cupboard_brown.jpg"
                ]
            },
            table = {
                title: "Tables",
                id: "table_",
                prefix: "images/tools/table/",
                list: [
                    "table_brown.png"
                ]
            },
            chair = {
                title: "Chairs",
                id: "chair_",
                prefix: "images/tools/chair/",
                list: [
                    "chair_pink.jpg"
                ]
            },
            bed = {
                title: "Bed",
                id: "bed_",
                prefix: "images/tools/bed/",
                list: [
                    "bed_brown.jpg"
                ]
            },
            others = {
                title: "Others",
                id: "others_",
                prefix: "images/tools/others/",
                list: [
                    "painting_rect.jpg",
                    "vase_flower.jpg"
                ]
            }
        ],
        actions: [
            addToViewport = {
                title: "Add to Scene",
                id: "addToViewport_",
                onMouseClick: function(tool) {
                    console.log("Add to viewport");
                    console.log(tool);
                }
            },
            favourite = {
                title: "Favourite",
                id: "favourite",
                onMouseClick: function(tool) {
                    console.log("Mark as favourite");
                    console.log(tool);
                }            
            },
            similar = {
                title: "Show similar",
                id: "showSimilar",
                onMouseClick: function(tool) {
                    console.log("Show similar");
                    console.log(tool);
                }
            }
        ]
    };

    $scope.onActionClick = function(action, tool) {
        console.log("actions clicked");
        action.onMouseClick(tool);
    }
}

function secondaryPanelController($scope) {
}