// 1. One-to-Many

Table users {

id integer [primary key, increment]

username varchar(50) [not null, unique]

email varchar(255) [not null, unique]

  

Note: '''

*Core user account information.*

'''

}

  

Table posts {

id integer [primary key, increment]

user_id integer [ref: > users.id, not null]

title varchar(200) [not null]

content text

published_at timestamp [default: `now()`]

  

Note: '''

*Blog posts written by users.*

- Each post belongs to one user.

'''

}

  

// 2. One-to-One

Table user_profiles {

id integer [primary key, increment]

user_id integer [ref: - users.id, unique, not null]

bio text

profile_picture_url varchar(255)

  

Note: '''

*Extended user profile (1:1 relationship).*

- `user_id` is unique and not null.

'''

}

  

// 3. Many-to-Many

Table tags {

id integer [primary key, increment]

name varchar(50) [not null, unique]

  

Note: '''

*Tags used to categorize posts.*

'''

}

  

Table post_tags {

post_id integer [ref: > posts.id, not null]

tag_id integer [ref: > tags.id, not null]

created_at timestamp [default: `now()`]

  

primary key (post_id, tag_id)

  

Note: '''

*Many-to-Many relationship between posts and tags.*

'''

}

  

// 4. Self-Referencing (Hierarchical)

Table comments {

id integer [primary key, increment]

user_id integer [ref: > users.id, not null]

post_id integer [ref: > posts.id, not null]

parent_id integer [ref: > comments.id, null]

content text [not null]

  

Note: '''

*Nested comments system.*

- Self-referencing `parent_id` for replies.

'''

}

  

// 5. Optional 1:1 Self-Referencing

Table reviewers {

id integer [primary key, increment]

name varchar(100)

paired_with_id integer [ref: - reviewers.id, unique, null]

  

Note: '''

*Optional self-pairing for peer review (1:1).*

'''

}

  

// 6. Referential Actions

Table orders {

id integer [primary key, increment]

user_id integer [ref: > users.id]

status varchar(20) [default: 'pending']

  

Note: '''

*Orders linked to users.*

- If user deleted → user_id becomes null.

'''

}

  

Table products {

id integer [primary key, increment]

name varchar(100) [not null]

  

Note: '''

*Available products.*

'''

}

  

Table order_items {

id integer [primary key, increment]

order_id integer [ref: > orders.id]

product_id integer [ref: > products.id]

  

Note: '''

*Items in an order.*

- Cascades on order deletion.

- Restricts product deletion if used.

'''

}

  

// 7. Polymorphic

Table attachments {

id integer [primary key, increment]

file_url varchar(255) [not null]

attachable_type varchar(50) [not null]

attachable_id integer [not null]

  

Note: '''

*Polymorphic relationship.*

- Can attach to posts, comments, etc.

- Managed in application logic.

'''

}

  

// 8. Composite Keys

Table students {

id integer [primary key, increment]

name varchar(100)

}

  

Table courses {

id integer [primary key, increment]

title varchar(100)

}

  

Table semesters {

id integer [primary key, increment]

name varchar(20)

}

  

Table course_enrollments {

student_id integer [ref: > students.id]

course_id integer [ref: > courses.id]

semester_id integer [ref: > semesters.id]

enrollment_date date [not null]

  

primary key (student_id, course_id, semester_id)

  

Note: '''

*Enrollments with composite primary key.*

- Prevents duplicate enrollments in the same semester.

'''

}

  

// 9. Time-Based (Historical)

Table employees {

id integer [primary key, increment]

name varchar(100)

}

  

Table positions {

id integer [primary key, increment]

title varchar(100)

}

  

Table employee_positions {

employee_id integer [ref: > employees.id]

position_id integer [ref: > positions.id]

start_date date [not null]

end_date date

  

Note: '''

*Employee position history.*

- Tracks start and end of employment roles.

'''

}

  

// 10. Inheritance via STI

Table vehicles {

id integer [primary key, increment]

type varchar(20) [not null] // Car, Truck, Motorcycle

make varchar(50) [not null]

model varchar(50) [not null]

car_specific_field varchar(50)

truck_specific_field integer

  

Note: '''

*Single Table Inheritance for vehicles.*

- Fields vary by `type`.

'''

}

  

// 11. Soft Deletes

Table soft_products {

id integer [primary key, increment]

name varchar(100) [not null]

deleted_at timestamp

  

Note: '''

*Soft delete using `deleted_at`.*

- Rows are hidden, not deleted.

'''

}