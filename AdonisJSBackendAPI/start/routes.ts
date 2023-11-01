import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {

  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");

  Route.group(() => {
    Route.get("todos", "TodosController.index");
    Route.get("todos/:id", "TodosController.show");
    Route.post("todos", "TodosController.create");
    Route.put("todos/:id", "TodosController.update");
    Route.delete("todos/:id", "TodosController.delete");
  }).middleware("auth:api");

}).prefix("api");
