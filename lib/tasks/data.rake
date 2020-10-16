
=begin

namespace :data do
  desc "TODO"
  task importdata: :environment do
  end
end

=end
#file location
file_goods = "lib/assets/goods.csv"
file_carts = "lib/assets/carts.csv"
file_users = "lib/assets/users.csv"
file_properties = "lib/assets/properties.csv"

#goods import
goods_import = Proc.new{
  count_row = 0  
  CSV.foreach(file_goods,
              headers: true,
              skip_blanks: true,
              skip_lines: /^(?:,\s*)+$/) do |row|
                count_row += 1
                puts "Imported row #{count_row}"
                #import data from csv file
                Good.create!(
                  id: row[0],
                  cid: row[1],
                  desc: row[2],
                  price: row[3],
                  sold: row[4],
                  titles: row[5],
                  cover: row[6]
                )
               end
  puts "============ENDS============="
}

#properties import
properties_import = Proc.new{
  count_row = 0  
  CSV.foreach(file_properties,
              headers: true,
              skip_blanks: true,
              skip_lines: /^(?:,\s*)+$/) do |row|
                count_row += 1
                puts "Imported row #{count_row}"
                #import data from csv file
                Property.create!(
                  good_id: row[0],
                  attr_name: row[1],
                  attr_val: row[2]
                )
               end
  puts "============ENDS============="
}


#carts import
carts_import = Proc.new{
  count_row = 0  
  CSV.foreach(file_carts,
              headers: true,
              skip_blanks: true,
              skip_lines: /^(?:,\s*)+$/) do |row|
                count_row += 1
                puts "Imported row #{count_row}"
                #import data from csv file
                Cart.create!(
                  user_id: row[0],
                  good_id: row[1],
                  num: row[2]
                )
               end
  puts "============ENDS============="
}

#user import
users_import = Proc.new{
  count_row = 0  
  CSV.foreach(file_users,
              headers: true,
              skip_blanks: true,
              skip_lines: /^(?:,\s*)+$/) do |row|
                count_row += 1
                puts "Imported row #{count_row}"
                #import data from csv file
                User.create!(
                  id: row[0],
                  username: row[1],
                  password: row[2],
                  email: row[3]
                )
               end
  puts "============ENDS============="
}

#data import from here
require 'csv'
require 'date'
namespace :data do
  desc "Import data from CSV files"
  task importdata: :environment do

    Property.destroy_all
    Good.destroy_all
    goods_import.call
    properties_import.call

    #Cart.destroy_all
    #User.destroy_all
  end
end

