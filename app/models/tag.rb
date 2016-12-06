class MyValidator < ActiveModel::Validator
  def validate(tag)
    unless tag.xCoordinate > 0 && tag.xCoordinate <= 2800
      tag.errors[:coordinates] << "xCoordinate out of bounds"
    end
    unless tag.yCoordinate > 0 && tag.yCoordinate <= 1760
      tag.errors[:coordinates] << "yCoordinate out of bounds"
    end
  end
end

class Tag < ApplicationRecord
  include ActiveModel::Validations
  validates_with MyValidator
end
