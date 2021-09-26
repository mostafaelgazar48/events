/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
/**
 *  url ->  /users
 * method ->  GET
 * return -> return all users 
 * protected  -> none
 */
Route.get('users','UsersController.get')

/**
 *  url ->  /users
 * method ->  POST
 * return ->  add new user to database 
 * protected  -> none
 */

Route.post('users', 'UsersController.post')

/**
 *  url ->  /events
 * method ->  POST
 * return ->  status 201 for created and 404 for if the user who creating the event not found
 * protected  -> none
 */

Route.post('events', 'EventsController.post')

/**
 *  url ->  /events
 * method ->  GET
 * return -> return all events 
 * protected  -> none
 */
Route.get('events', 'EventsController.get')


/**
 *  url ->  /eventsUser
 * method ->  GET
 * return -> return all events loading users 
 * protected  -> none
 */

Route.get('eventsUser', 'EventsController.getUser')


/**
 *  url ->  /user-event/{user_id}
 * method ->  GET
 * return -> return all events for a single user
 * protected  -> none
 */
Route.get('user-event/:id', 'UsersController.getUserEvents')


/**
 *  url ->  /attend-event/user/{user_id}/event/event_id
 * method ->  GET
 * return -> return all events loading users 
 * protected  -> none
 */

Route.post('attend-event/user/:uid/event/:eid', 'UsersController.attendEvent')






Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  return report.healthy ? response.ok(report) : response.badRequest(report)
})
