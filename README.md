# Mid-Project in react:
A one page site, that presents all the users data (users' personal information, users' todos and posts).

All data came from data API (https://jsonplaceholder.typicode.com).
___
## Functionalities Of Data Structure:
### Users:
Create a new user (add button side to search): 
  - Create a new user. 
  - Name and email input is a must.
  - It's possible to fill in other details when the new user is displayed in the list of users (by hovering the mouse on Other Data).
  - When clicking on the user ID, add todo and add post will display.
  - Every user gets a unique id (if the user removed it before, his ID won't be used again).

Update:
  - Update user infomation. 
  - Only the fields that are not empty will update the user
  
Delete:
 - Will delete the user, and also all his todos and posts.
 ___
### Todos: 
Create:
   - Add a new todo by click on Add button, And new component will show.
   - Fill the title input and by click on Add button new todo will insert to the todo list.
   - 
Mark Completed / Uncompleted:
  - Update if the task is completed or not.
  - User who has done all his tasks, his component border will change from red to green.
 ___

### Posts:
Create:
  - Add A new post to the user`s list post
  - You have to fill title and body input to add a new post.  
 ___

***  All inputs should be filled with a value, empty input will not be added to the data.
