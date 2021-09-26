import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EventUsers extends BaseSchema {
  protected tableName = 'event_users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.integer('attendant_id').unsigned().references('users.id')
      table.integer('event_id').unsigned().references('events.id')
      table.unique(['attendant_id','event_id']);

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
