import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Event extends BaseModel {
@column()
public id:number
  @column()
  public title: String

  @column()
  public description: String

  @column()
  public userId: number
  @column()
  public user_id: number

  @belongsTo(() => User,{
    foreignKey:'user_id'
  })
  user: BelongsTo<typeof User>

}
