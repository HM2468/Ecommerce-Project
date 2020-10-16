# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_20_200934) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "carts", force: :cascade do |t|
    t.integer "num"
    t.integer "user_id"
    t.bigint "good_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["good_id"], name: "index_carts_on_good_id"
  end

  create_table "goods", force: :cascade do |t|
    t.integer "cid"
    t.string "desc"
    t.decimal "price"
    t.integer "sold"
    t.string "titles"
    t.string "cover"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ordergoods", force: :cascade do |t|
    t.integer "num"
    t.integer "price"
    t.text "order_id"
    t.bigint "good_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["good_id"], name: "index_ordergoods_on_good_id"
  end

  create_table "orders", force: :cascade do |t|
    t.text "order_id"
    t.text "lastname"
    t.text "firstname"
    t.text "address"
    t.text "zipcode"
    t.bigint "money"
    t.bigint "time"
    t.text "timestr"
    t.text "email"
    t.boolean "islogin"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "province"
    t.text "city"
  end

  create_table "properties", force: :cascade do |t|
    t.string "attr_name"
    t.string "attr_val"
    t.bigint "good_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["good_id"], name: "index_properties_on_good_id"
  end

  create_table "userbasics", id: false, force: :cascade do |t|
    t.text "lastname"
    t.text "firstname"
    t.text "province"
    t.text "city"
    t.text "address"
    t.text "zipcode"
    t.text "email"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", id: false, force: :cascade do |t|
    t.serial "user_id", null: false
    t.string "username"
    t.string "password"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "visits", force: :cascade do |t|
    t.text "ip"
    t.bigint "time"
    t.text "path"
    t.text "timestr"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "carts", "goods"
  add_foreign_key "ordergoods", "goods"
  add_foreign_key "properties", "goods"
end
