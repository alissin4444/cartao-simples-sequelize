# cartao-simples-sequelize
Javascript and finance study. I did it for my personal enhancement

## Routes
  - (get)    "/users"      -> users list
  - (post)   "/users"      -> users register
  - (get)    "/users/:id"  -> show a user
  - (put)    "/users/:id"  -> update a user
  - (delete) "users/:id"   -> delete a user
  
  - (get)    "/purchases"            -> purchases list
  - (post)   "/users/:id/purchases"  -> purchase registers and portions
  - (get)    "/purchases/:id"        -> show a purchase with portions
  - (delete) "purchases/:id"         -> delete a purchase
  
  - (put) "/users/:user_id/purchases/:purchase_id/portions/:portion_id" -> update a portion
