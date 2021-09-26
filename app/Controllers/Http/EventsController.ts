// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Event from "App/Models/Event";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from "App/Models/User";

export default class EventsController {
    public async get({ response}: HttpContextContract) {
        try {
            const events= await Event.all();
            response.send(events)
        } catch (error) {
            console.log(error);
            response.status(500).send(error);
        }
    }

    public async getUser() {
        const events = await Event.query().preload('user');
        return events
    }


    public async post({ request ,params,response}: HttpContextContract) {
     
        const user_id = request.input('user_id');

        const user =await User.find(user_id);
    
        if (user){
            const NewEvent = request.only(['title','description','user_id']) as Partial<Event>
            const event = await Event.create(NewEvent,user_id)
           response.status(201).send({
               message:'event created successfully',
               event
           })
        }else{
            response.status(404).send({
                message:'cannot create event for this user'
            })
        }
    }

}
