angular.module("listaroo")
  .service("listService", function($http) {
    this.getLists = function(callback) {
      $http.get("http://localhost:3000/api/lists.json")
        .then(callback);
    }

    this.deleteList = function(list) {
      $http({
      method: 'DELETE',
      url: 'http://localhost:3000/api/lists/' + list.id
      });
    }

    this.deleteListItem = function(listItem) {
      $http.delete('http://localhost:3000/api/list_items/' + listItem.id)
    }

    this.addListItem = function(list, item_content) {
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/list_items',
        headers: {
          'Content-Type' : 'text'
        },
        data: {
          'parent_list_id': list.id,
          'content': item_content
        }
      });
    }

  });
