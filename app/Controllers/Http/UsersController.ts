// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Event from "App/Models/Event";
import Database from "@ioc:Adonis/Lucid/Database";
export default class UsersController {


    public async get() {
        return await User.all();
    }


    public async attendEvent({ params,response }:HttpContextContract) {
       const user_id = params.uid;
       const event_id = params.eid
       const user =  await User.find(user_id);
        if(!user){
            return response.status(404).send({
                message:'user not found'
            })
        }


        const event =  await Event.find(event_id);
        if(!event){
            return response.status(404).send({
                message:'event not found'
            })
        }
        try {
              const rows = await Database.table('event_users').returning(['attendant_id','event_id']).insert({
            attendant_id:user_id,
            event_id:event_id
        });

        return rows 

        } catch (error) {
            if(error.code ==='23505'){
                return response.status(400).send({message:'user alredy attendening this event'})
            }
             return error.message;
        }
       
    }

    public async getUserEvents({ params,response }:HttpContextContract) {
        const id = params.id;
        const user = await User.find(id);
        if(user){

            await user?.load('events');
            return user?.events
        }else{
            response.status(404).send({
                message:'user not found'
            })
        }

    }

    public async post({ request }: HttpContextContract) {
        const newUser = request.only(['firstname','lastname','email']) as Partial<User>
        const user = await User.create(newUser)
        return user
    }
}

