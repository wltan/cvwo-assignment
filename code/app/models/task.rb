class Task < ApplicationRecord
  validates :title, presence: true
  validates :due_date, presence: true
end
