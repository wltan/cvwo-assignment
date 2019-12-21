class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.date :due_date, null: false
      t.string :tags, null: false
      t.boolean :completed, default: false

      t.timestamps
    end
  end
end
