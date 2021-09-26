import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'

export default class User extends BaseModel {
  @column()
  public id:number
  @column()
  public firstname: String

  @column()
  public lastname: String

  @column()
  public email: String



  @hasMany(()=> Event)
  events:HasMany<typeof Event>
}
