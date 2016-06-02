angular.module("listaroo")
  .service("listService", function($http) {
    this.getLists = function(callback) {
      $http.get("http://localhost:3000/api/lists.json")
        .then(callback);
    }

    this.deleteList = function(list, callback) {
      $http({
      method: 'DELETE',
      url: 'http://localhost:3000/api/lists/' + list.id
      }).then(callback);
    }

    this.deleteListItem = function(listItem, callback) {
      $http.delete('http://localhost:3000/api/list_items/' + listItem.id)
        .then(callback);
    }

    this.addListItem = function(list, item_content, callback) {
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/list_items',
        headers: {
          'Content-Type' : 'application/json'
        },
        data: {
          'list_item' : {
            'content' : item_content,
            'list_id' : list.id
          }
        }
      })
        .then(callback);
    }

  });
