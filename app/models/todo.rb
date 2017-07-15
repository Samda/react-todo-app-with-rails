class Todo < ApplicationRecord

  validates :title, presence: true

  private
    def self.permitted_params
      [:title, :completed]
    end
end
